import { test } from 'ava'
import { createDomture } from './index'

test('load ts', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/ts',
    transpiler: 'typescript'
  })
  const m = await domture.import('./index')
  t.is(typeof m, 'object')

  const getLogger = await domture.import('./getLogger')
  t.is(getLogger.getLogger.name, 'getLogger')
})

test('with rootDir should still load packages', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/ts',
    transpiler: 'typescript'
  })

  const globalStore = await domture.import('global-store')
  t.is(typeof globalStore, 'object')
  t.is(globalStore.default.name, 'create')
})

test('import global script', async t => {
  const harness = await createDomture({ transpiler: 'typescript' })
  await harness.import('./fixtures/ts-global/MyCompany/component/TextBox')
  const textBox = harness.window.MyCompany.component.TextBox
  t.deepEqual(textBox, { a: 1 })
})

<<<<<<< 01730bc4648eeb43b6567ec2ce7d1de6aecc6388
=======
test('import global script', async t => {
  const harness = await createDomture({ transpiler: 'typescript' })
  await harness.import('./fixtures/ts-global/MyCompany/component/TextBox')
  const textBox = harness.window.MyCompany.component.TextBox
  t.deepEqual(textBox, { a: 1 })
})

test(`preload global script with type`, async t => {
  const harness = await createDomture({
    transpiler: 'typescript',
    preloadScripts: ['./fixtures/ts-global/MyCompany/component/foo']
  })
  const foo = harness.window.MyCompany.component.foo
  t.deepEqual(foo, 'foo')
})

>>>>>>> Add failing test
test('load ts and js', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/ts',
    transpiler: 'typescript',
    explicitExtension: true
  })
  const foo = await domture.import('./foo.ts')
  t.deepEqual(foo.foo(), { value: 'foo' })

  const boo = await domture.import('./boo.js')
  t.is(boo.boo(), 'boo')
})

test('preload scripts with js extension', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/ts',
    transpiler: 'typescript',
    preloadScripts: [
      require.resolve('color-map/dist/color-map.es5.js')
    ]
  })
  t.not(domture.window.ColorMap, undefined)
})

test('preload scripts with js extension and explicitExtension true', async t => {
  const domture = await createDomture({
    rootDir: './fixtures/ts',
    transpiler: 'typescript',
    explicitExtension: true,
    preloadScripts: [
      require.resolve('color-map/dist/color-map.es5.js')
    ]
  })
  t.not(domture.window.ColorMap, undefined)
})
