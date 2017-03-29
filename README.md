# domster

[![unstable][unstable-image]][unstable-url]
[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Creates a jsdom environment and load packages using systemjs.

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
[npm-image]: https://img.shields.io/npm/v/domster.svg?style=flat
[npm-url]: https://npmjs.org/package/domster
[downloads-image]: https://img.shields.io/npm/dm/domster.svg?style=flat
[downloads-url]: https://npmjs.org/package/domster
[travis-image]: https://img.shields.io/travis/unional/domster.svg?style=flat
[travis-url]: https://travis-ci.org/unional/domster
[coveralls-image]: https://coveralls.io/repos/github/unional/domster/badge.svg
[coveralls-url]: https://coveralls.io/github/unional/domster
