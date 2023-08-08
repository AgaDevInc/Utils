import { Color } from "@agadev/colors"

export const DenoSymbol: symbol
export const NodeSymbol: symbol

export default class Inspecteable {
  protected toConsoleColor: Color
  toConsole(): string
}
