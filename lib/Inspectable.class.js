const { FOREGROUND, colorize } = require("@agadev/colors")

const DenoSymbol = Symbol.for('Deno.customInspect')
const NodeSymbol = Symbol.for('nodejs.util.inspect.custom')

class Inspecteable {
  toConsoleColor = FOREGROUND.MAGENTA
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
module.exports = Inspecteable
module.exports.default = module.exports
module.exports.DenoSymbol = DenoSymbol
module.exports.NodeSymbol = NodeSymbol