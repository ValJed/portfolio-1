import { Node } from 'tiptap'
import {
  toggleBlockType
} from 'tiptap-commands'

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
      content: 'inline*',
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
    console.log('type ===> ', type)
    console.log('schema.nodes ===> ', schema)
    return attrs => toggleBlockType(type, schema.nodes.list_item)
  }
}
