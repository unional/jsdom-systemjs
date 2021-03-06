import a from 'assertron';
import test from 'ava';
import { createDomture } from './index';

test('import cjs', async t => {
  const domture = await createDomture()
  const makeError = await domture.import('make-error')
  t.is(typeof makeError, 'function')
})

test('import es6', async t => {
  const domture = await createDomture()

  const globalStore = await domture.import('global-store')

  t.is(typeof globalStore, 'object')
  t.is(globalStore.default.name, 'createStore')
})

test('import relative with default rootDir (".")', async t => {
  const domture = await createDomture()

  const foo = await domture.import('./fixtures/cjs/foo.js')
  t.not(foo, undefined)
  t.is(foo(), 'foo')

  // the loaded version will be cached and returned
  const foo2 = await domture.import('./fixtures/cjs/foo.js')
  t.is(foo, foo2)
})

test('import relative', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/cjs'
  })
  const foo = await domture.import('./index')
  t.is(typeof foo, 'function')
})


test('work with requiring pakcage with missing main', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/fix-main'
  })
  const m = await domture.import('./index')
  t.is(m.name, 'makeError')
})

test('preload script', async t => {
  const domture = await createDomture({
    preloadScripts: [
      require.resolve('global-store/dist/global-store.es5.js')
    ]
  })

  t.not(domture.window.GlobalStore, undefined)
})

test('preload color-map script', async t => {
  const domture = await createDomture({
    preloadScripts: [
      require.resolve('color-map/dist/color-map.es5.js')
    ]
  })
  t.not(domture.window.ColorMap, undefined)
})

test('import color-map module', async t => {
  const domture = await createDomture()

  const colorMap = await domture.import('color-map')

  t.not(colorMap, undefined)
})

test('import global-store script file should fill global namespace', async t => {
  const harness = await createDomture()
  await harness.loadScript('./node_modules/global-store/dist/global-store.es5.js')

  t.not(harness.window.GlobalStore, undefined)
})

test('import color-map script file should fill global namespace', async t => {
  const harness = await createDomture()
  await harness.loadScript(require.resolve('color-map/dist/color-map.es5.js'))

  t.not(harness.window.ColorMap, undefined)
})

test('preloadScripts should fill global namespace', async t => {
  const harness = await createDomture(
    {
      rootDir: '.',
      preloadScripts: [
        './node_modules/global-store/dist/global-store.es5.js'
      ]
    })
  t.not(harness.window.GlobalStore, undefined)
})

test('preloadScripts should run sequentially', async t => {
  const harness = await createDomture(
    {
      rootDir: './fixtures/global-deps',
      preloadScripts: [
        './foo.js',
        './boo.js'
      ]
    })

  t.not(harness.window.boo, undefined)
  t.is(harness.window.boo.boo, 1)
})

test(`using jsdom constructor options`, async t => {
  t.plan(1)
  await createDomture({
    jsdomConstructorOptions: {
      beforeParse(window) {
        t.not(window, undefined)
      }
    }
  })
})

test(`loadScript() with relative path`, async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global-deps'
  })
  await domture.loadScript('./foo')

  t.is(domture.window.foo.a, 1)
})

test(`loadScript() with relative path with extension`, async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global-deps'
  })
  await domture.loadScript('./foo.js')

  t.is(domture.window.foo.a, 1)
})

test(`loadScript() with absolute path`, async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global-deps'
  })

  await domture.loadScript(require.resolve('color-map/dist/color-map.es5.js'))

  t.not(domture.window.ColorMap, undefined)
})

test(`loadScript() with invalid path`, async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global-deps'
  })

  const err = await a.throws<NodeJS.ErrnoException>(domture.loadScript('./a.js'))
  t.is(err.code, 'ENOENT')
})

test(`loadScriptSync() with relative path`, async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global-deps'
  })
  domture.loadScriptSync('./foo')

  t.is(domture.window.foo.a, 1)
})

test(`loadScriptSync() with relative path with extension`, async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global-deps'
  })
  domture.loadScriptSync('./foo.js')

  t.is(domture.window.foo.a, 1)
})

test(`loadScriptSync() with absolute path`, async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global-deps'
  })

  domture.loadScriptSync(require.resolve('color-map/dist/color-map.es5.js'))

  t.not(domture.window.ColorMap, undefined)
})

test(`loadScriptSync() with invalid path`, async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global-deps'
  })

  const err = await a.throws<NodeJS.ErrnoException>(() => domture.loadScriptSync('./a.js'))
  t.is(err.code, 'ENOENT')
})

test('support subfolder/index reference', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/with-subfolder'
  })

  const foo = await domture.import('./index')
  t.deepEqual(foo(), { value: 'foo' })
})

test('importing global file should try to get the value using namespaces when it exports nothing', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global'
  })

  let foo = await domture.import('./foo')
  t.deepEqual(foo, { a: 1 })

  let foo2 = await domture.import('./foo.js')
  t.deepEqual(foo2, { a: 1 })
})

test('importing nested global file should try to get the value using namespaces when it exports nothing', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/global'
  })

  let boo = await domture.import('./comp/boo')
  t.deepEqual(boo, { a: 2 })

  let boo2 = await domture.import('./comp/boo.js')
  t.deepEqual(boo2, { a: 2 })
})

test('config webpack devtool, entry, output will throw', async t => {
  await a.throws(createDomture({
    webpackConfig: {
      devtool: 'source-map'
    }
  }))
  await a.throws(createDomture({
    webpackConfig: {
      entry: './src/index'
    }
  }))
  await a.throws(createDomture({
    webpackConfig: {
      output: {}
    }
  }))

  t.pass()
})

test('config webpack directly', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/cjs',
    webpackConfig: {
      module: {
        rules: [{
          test: /\.js$/,
          use: {
            loader: 'istanbul-instrumenter-loader'
          }
        }]
      }
    }
  })

  const foo = await domture.import('./index')
  t.is(foo(), 'foo')
})

test('config with html', async t => {
  const domture = await createDomture({ html: '<p>abc</p>' })
  t.is(domture.window.document.getElementsByTagName('p').length, 1)
})
