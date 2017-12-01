import { JSDOM, DOMWindow, CookieJar, VirtualConsole } from 'jsdom'

// re-export
export { CookieJar, DOMWindow, VirtualConsole }

type SystemJS = SystemJSLoader.System
export { SystemJS }

export interface Domture extends JSDOM {
  /**
   * Window and any global namespaces.
   */
  window: DOMWindow & { [index: string]: any }
  /**
   * SystemJS instance.
   */
  systemjs: SystemJSLoader.System
  /**
   * Import module or file.
   * If you are loading global script file,
   * sometimes this does not work properly because `systemjs` incorrectly detect the file as `amd` or `cjs`.
   * In those cases, you `loadScript()` to load the file.
   * @param identifier Module name or case-insensitive namespace path (`MyPackage.some.thing`)
   * or relative path (`./src/logic`)
   */
  import<M = any>(identifier: string): Promise<M>

  /**
   * Load a script through script tag.
   * (so obviously, it can't be typescript)
   */
  loadScript(identifier: string): Promise<void>
  /**
   * Load a script through script tag.
   * (so obviously, it can't be typescript)
   */
  loadScriptSync(identifier: string): void
}
