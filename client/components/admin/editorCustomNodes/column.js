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
          // default: 1
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
            getAttrs (dom) {
              const classAttr = dom.getAttribute('class')

              if (classAttr !== `col-${columnSize}`) {
                return false
              }

              return {
                columnSize: parseInt(dom.getAttribute('columnsize'), 10),
                class: classAttr
              }
            }
          }
        }),

      toDOM: ({ attrs }) => {
        return ['div', { class: `col-${attrs.columnSize}`, columnsize: attrs.columnSize }, 0]
      }
    }
  }

  commands ({ type, schema }) {
    console.log('type ===> ', type)
    return attrs => toggleWrap(type, attrs)
  }
}
