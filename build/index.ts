import { stringify } from 'yaml'
import { writeFileSync } from 'fs'
import { join } from 'path'
import rfdc from 'rfdc'
import never from 'never'

const clone = rfdc()

interface Package {
  name: string
  dir: string
  build: boolean
  test: boolean
  dependencies: string[]
}

const packages: Package[] = [{
  name: 'react-json-input',
  dir: 'packages/react-json-input',
  build: true,
  test: true,
  dependencies: []
}, {
  name: 'antd',
  dir: 'packages/antd',
  build: true,
  test: true,
  dependencies: ['react-json-input']
}, {
  name: 'demo',
  dir: 'demo',
  build: false,
  test: false,
  dependencies: ['react-json-input', 'antd']
}, {
  name: 'build',
  dir: 'build',
  build: false,
  test: false,
  dependencies: []
}]

const checkout = { uses: 'actions/checkout@v2' }
const cache = 'actions/cache@v2'
const installCacheName = 'cache-pnpm-store'
const installCachePath = '~/.pnpm-store'
// eslint-disable-next-line no-template-curly-in-string
const installCacheKey = "${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/pnpm-lock.yaml') }}"
const setupNode = {
  uses: 'actions/setup-node@v1',
  with: { 'node-version': 14 }
}
const installCacheId = 'cache'
const setupPnpm = {
  uses: 'pnpm/action-setup@v2.0.1',
  with: { version: '6.7.6' }
}
const ifInstallCache = `steps.${installCacheId}.outputs.cache-hit != 'true'`
const runsOn = { 'runs-on': 'ubuntu-latest' }
const installJobName = 'install'
const cacheInstall = {
  uses: cache,
  env: { 'cache-name': installCacheName },
  with: { path: installCachePath, key: installCacheKey }
}

const getCacheKey = (dir: string): string => `\${{ runner.os }}-build-\${{ env.cache-name }}-\${{ hashFiles('${dir}') }}`

/* eslint-disable @typescript-eslint/indent */
const getDependenciesSteps = (...dependencies: string[]): any[] => dependencies.length > 0
  ? [
    ...dependencies.map((dependency, index) => {
      const { dir } = packages.find(({ name }) => name === dependency) ??
    never(`No package with name: ${dependency}`)
      return {
        uses: cache,
        id: `cache-build-${index}`,
        env: { 'cache-name': `cache-build-${dependency}` },
        with: { path: `${dir}/dist`, key: getCacheKey(dir) }
      }
    }),
    {
      if: dependencies
        .map((_dependency, index) => `steps.cache-build-${index}.outputs.cache-hit != 'true'`)
        .join(' || '),
      run: 'echo Missing Dependencies\nexit 1'
    }
  ]
  : []
/* eslint-enable @typescript-eslint/indent */

const deployDependencies = ['react-json-input', 'antd']

const needsMapFn = (dependency: string): string => `build-${dependency}`

const workflow = {
  name: 'Test',
  on: {
    push: { branches: ['main'] },
    pull_request: { branches: ['main'] }
  },
  jobs: {
    [installJobName]: {
      ...runsOn,
      steps: [clone(checkout), {
        id: installCacheId,
        ...clone(cacheInstall)
      }, {
        if: ifInstallCache,
        ...setupNode
      }, {
        if: ifInstallCache,
        ...clone(setupPnpm)
      }, {
        if: ifInstallCache,
        run: 'pnpm i'
      }]
    },
    deploy: {
      needs: [installJobName, ...deployDependencies.map(needsMapFn)],
      ...runsOn,
      steps: [
        clone(checkout),
        ...getDependenciesSteps(...deployDependencies),
        clone(cacheInstall),
        clone(setupPnpm), {
          run: 'pnpm i',
          'working-directory': 'demo'
        }, {
          uses: 'sauloxd/review-apps@v1.3.3',
          with: {
            'build-cmd': 'cd demo && pnpm run build && touch .nojekyll',
            dist: 'out'
          }
        }
      ]
    },
    ...Object.fromEntries(packages
      .map(({ name, dir, test, build, dependencies }) => {
        const needs = [installJobName, ...dependencies.map(needsMapFn)]
        const dependencySteps = getDependenciesSteps(...dependencies)
        const setupSteps = [checkout, ...dependencySteps, cacheInstall, setupNode, setupPnpm, {
          run: 'pnpm i',
          'working-directory': dir
        }]
        const jobs: Array<[string, any]> = [[`lint-${name}`, {
          needs: clone(needs),
          ...runsOn,
          steps: [...clone(setupSteps), {
            run: 'pnpm run lint',
            'working-directory': dir
          }]
        }]]
        if (test) {
          jobs.push([`test-${name}`, {
            needs: clone(needs),
            ...runsOn,
            steps: [...clone(setupSteps), {
              run: 'pnpm run test:ci',
              'working-directory': dir
            }]
          }])
        }
        if (build) {
          const buildCacheId = 'cache'
          const ifCache = `steps.${buildCacheId}.outputs.cache-hit != 'true'`
          jobs.push([`build-${name}`, {
            needs: clone(needs),
            ...runsOn,
            steps: [clone(checkout), ...dependencySteps, {
              uses: cache,
              id: buildCacheId,
              env: { 'cache-name': `cache-build-${name}` },
              with: { path: `${dir}/dist`, key: getCacheKey(dir) }
            }, {
              if: ifCache,
              ...clone(cacheInstall)
            }, {
              if: ifCache,
              ...clone(setupPnpm)
            }, {
              if: ifCache,
              run: 'pnpm i',
              'working-directory': dir
            }, {
              if: ifCache,
              run: 'pnpm run build',
              'working-directory': dir
            }]
          }])
        }
        return jobs
      })
      .flat(1))
  }
}

writeFileSync(join(__dirname, '../.github/workflows/test.yaml'), stringify(workflow))
