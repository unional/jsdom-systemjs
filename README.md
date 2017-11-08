# domture

[![unstable][unstable-image]][unstable-url]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge](https://badges.greenkeeper.io/unional/domture.svg)](https://greenkeeper.io/)

`domture` allows you to load packages and scripts directly on a `jsdom` instance for testing purpose.

You can load `npm` packages as well as local files (by default relative to current folder `.`).

Under the hood it uses [`systemjs`](https://github.com/systemjs/systemjs) to do its magic.
You can configure `systemjs` directly however you want.

## Usage

```ts
import test from 'ava' // or your favorite test runner
import { createDomture } from 'domture'

test('basic usage', async t => {
  const domture = await createDomture()

  // load package `foo`
  const foo = await domture.import('foo')

  // load by relative path
  const config = await domture.import('./config')
})

test('customize', async t => {
  const domture = await createDomture({
    // Where to resolve relative path.
    rootDir: './lib',
    // Preload some scripts ahead of time.
    preloadScripts: ['a-package', './someCode.js', './index'],
    // Able to load TypeScript code directly
    transpiler: 'typescript',
    // Need to do `./index.ts` or `./index.js`.
    // Useful when you need to load both types.
    explicitExtension: true,
    systemjsConfig: {
      packages: {
        // This is need for some packages due to https://github.com/systemjs/systemjs/issues/1603
        'make-error': {
          main: 'index'
        }
      },
      meta: {
        // Do this if `some-global-script.js` is not detected correctly as global script when using `import()`.
        'some-global-script.js': {
          format: 'global'
        }
      }
    },
    // configure jsdom.
    // Can't set `url` and `runScripts`.
    // They are used internally.
    jsdomConstructorOptions: { ... }
  })
})
```

## Contribute

```sh
# right after clone
npm install

# begin making changes
git checkout -b <branch>
npm run watch

# edit `webpack.config.es5.js` and `rollup.config.es2015.js` to exclude dependencies for the bundle if needed

# after making change(s)
git commit -m "<commit message>"
git push

# create PR
```

## Npm Commands

There are a few useful commands you can use during development.

```sh
# Run tests (and lint) automatically whenever you save a file.
npm run watch

# Run tests with coverage stats (but won't fail you if coverage does not meet criteria)
npm run test

# Manually verify the project.
# This will be ran during 'npm preversion' so you normally don't need to run this yourself.
npm run verify

# Build the project.
# You normally don't need to do this.
npm run build

# Run tslint
# You normally don't need to do this as `npm run watch` and `npm version` will automatically run lint for you.
npm run lint
```

Generated by [`unional-cli@0.0.0`](https://github.com/unional/unional-cli)

[unstable-image]: http://badges.github.io/stability-badges/dist/unstable.svg
[unstable-url]: http://github.com/badges/stability-badges
[npm-image]: https://img.shields.io/npm/v/domture.svg?style=flat
[npm-url]: https://npmjs.org/package/domture
[downloads-image]: https://img.shields.io/npm/dm/domture.svg?style=flat
[downloads-url]: https://npmjs.org/package/domture
[travis-image]: https://img.shields.io/travis/unional/domture.svg?style=flat
[travis-url]: https://travis-ci.org/unional/domture
[coveralls-image]: https://coveralls.io/repos/github/unional/domture/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/domture
