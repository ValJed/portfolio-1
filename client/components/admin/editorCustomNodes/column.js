import { Node } from 'tiptap'
import {
// toggleBlockType
  toggleWrap
} from 'tiptap-commands/dist/commands.common.js'

export default class BlockquoteNode extends Node {
  // choose a unique name
  get name () {
    return 'customColumn'
  }

  get defaultOptions () {
    return {
      columnSizes: [1, 2, 3]
    }
  }

  get schema () {
    return {
      attrs: {
        columnSize: {
          default: 1
        }
      },
      content: 'block*',
      group: 'block',
      defining: true,
      draggable: false,

      parseDOM: this.options.columnSizes
        .map((columnSize) => {
          return {
            tag: 'div',
            attrs: { columnSize }
          }
        }),

      toDOM: ({ attrs }) => {
        return ['div', { class: `column-${attrs.columnSize}` }, 0]
      }
    }
  }

  commands ({ type, schema }) {
    return attrs => toggleWrap(type, attrs)
  }
}
