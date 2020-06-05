import { Node } from 'tiptap'
import {
  toggleBlockType
} from 'tiptap-commands/dist/commands.common.js'

export default class BlockquoteNode extends Node {
  // choose a unique name
  get name () {
    return 'customHeading'
  }

  get defaultOptions () {
    return {
      levels: [1, 2, 3]
    }
  }

  get schema () {
    return {
      attrs: {
        level: {
          default: 1
        }
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      draggable: false,

      parseDOM: this.options.levels
        .map((level) => {
          return {
            tag: `h${level}`,
            attrs: { level }
          }
        }),

      toDOM: ({ attrs }) => {
        return [`h${attrs.level}`, {}, 0]
      }
    }
  }

  commands ({ type, schema }) {
    return attrs => toggleBlockType(type, schema.nodes.paragraph, attrs)
  }
}
