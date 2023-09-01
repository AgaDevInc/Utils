import { FOREGROUND, colorize } from "https://deno.land/x/colors_string@v1.0.1/mod.ts"

/* The line `export const DenoSymbol = Symbol.for('Deno.customInspect')` is creating a symbol named
`DenoSymbol` and assigning it the value returned by `Symbol.for('Deno.customInspect')`. */
export const DenoSymbol = Symbol.for('Deno.customInspect')
export const NodeSymbol = Symbol.for('nodejs.util.inspect.custom')

/* The Inspecteable class provides a method to convert its instance to a colored string representation
for console output. */
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
