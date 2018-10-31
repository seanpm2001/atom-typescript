import {DisposableLike} from "atom"
import {BusySignalService, DatatipService, SignatureHelpRegistry} from "atom/ide"
import {IndieDelegate} from "atom/linter"
import {StatusBar} from "atom/status-bar"
import {State} from "./packageState"
import {PluginManager} from "./pluginManager"
export {deserializeSemanticView} from "./atom/views/outline/semanticView"

let pluginManager: PluginManager | undefined

export async function activate(state: State) {
  // tslint:disable:no-unsafe-any
  const pns = atom.packages.getAvailablePackageNames()
  const packagesProvidingUIServices = ["atom-ide-ui", "linter", "nuclide"]
  if (!packagesProvidingUIServices.some(p => pns.includes(p))) {
    await require("atom-package-deps").install("atom-typescript", true)
  }

  require("etch").setScheduler(atom.views)

  // tslint:disable-next-line:no-shadowed-variable
  const {PluginManager} = require("./pluginManager")
  pluginManager = new PluginManager(state)
  // tslint:enable:no-unsafe-any
}

export function deactivate() {
  if (pluginManager) pluginManager.destroy()
  pluginManager = undefined
}

export function serialize() {
  if (pluginManager) return pluginManager.serialize()
  else return undefined
}

////////////////////////////////// Consumers ///////////////////////////////////
export function consumeLinter(
  register: (opts: {name: string}) => IndieDelegate,
): DisposableLike | void {
  if (pluginManager) return pluginManager.consumeLinter(register)
}

export function consumeStatusBar(statusBar: StatusBar): DisposableLike | void {
  if (pluginManager) return pluginManager.consumeStatusBar(statusBar)
}

export function consumeDatatipService(datatipService: DatatipService): DisposableLike | void {
  if (pluginManager) return pluginManager.consumeDatatipService(datatipService)
}

export function consumeSignatureHelp(registry: SignatureHelpRegistry): DisposableLike | void {
  if (pluginManager) return pluginManager.consumeSigHelpService(registry)
}

export function consumeBusySignal(busySignalService: BusySignalService): DisposableLike | void {
  if (pluginManager) return pluginManager.consumeBusySignal(busySignalService)
}

////////////////////////////////// Providers ///////////////////////////////////
export function provideAutocomplete() {
  if (pluginManager) return pluginManager.provideAutocomplete()
}

export function provideIntentions() {
  if (pluginManager) return pluginManager.provideIntentions()
}

export function provideCodeActions() {
  if (pluginManager) return pluginManager.provideCodeActions()
}

export function provideHyperclick() {
  if (pluginManager) return pluginManager.provideHyperclick()
}
