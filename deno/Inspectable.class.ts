import { FOREGROUND, colorize } from "https://agacdn.onrender.com/AgaDev:colors@1.0.0/"

export const DenoSymbol = Symbol.for('Deno.customInspect')
export const NodeSymbol = Symbol.for('nodejs.util.inspect.custom')

export default class Inspecteable {
  protected toConsoleColor = FOREGROUND.MAGENTA
  toConsole(){
    return colorize(this.toString(), this.toConsoleColor)
  }
  [DenoSymbol](){
    return this.toConsole()
  }
  [NodeSymbol](){
    return this.toConsole()
  }
}
