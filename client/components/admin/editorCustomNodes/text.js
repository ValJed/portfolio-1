import { Node } from 'tiptap'
import { toggleBlockType } from 'tiptap-commands'

export default class BlockquoteNode extends Node {
  // choose a unique name
  get name () {
    return 'customText'
  }

  get defaultOptions () {
    return {
      alignment: ['left', 'center', 'right']
    }
  }

  // the prosemirror schema object
  // take a look at https://prosemirror.net/docs/guide/#schema for a detailed explanation
  get schema () {
    return {
      attrs: {
        align: {
          // default: 'left'
        }
      },
      content: 'inline*',
      group: 'block',
      defining: true,
      draggable: false,
      // define how the editor will detect your node from pasted HTML
      // every blockquote tag will be converted to this blockquote node
      parseDOM: this.options.alignment
        .map((align) => {
          return {
            tag: 'div',
            getAttrs (dom) {
              const classAttr = dom.getAttribute('class')

              if (classAttr !== align) {
                return false
              }

              return {
                align: classAttr,
                class: classAttr
              }
            }
          }
        }),
      // this is how this node will be rendered
      // in this case a p tag with a class called `awesome-blockquote` will be rendered
      // the '0' stands for its text content inside
      toDOM: ({ attrs }) => {
        return ['div', { class: attrs.align }, 0]
      }
    }
  }

  // this command will be called from menus to add a blockquote
  // `type` is the prosemirror schema object for this blockquote
  // `schema` is a collection of all registered nodes and marks
  commands ({ type, schema }) {
    return attrs => toggleBlockType(type, schema.nodes.customText, attrs)
  }

  // here you can register some shortcuts
  // in this case you can create a blockquote with `ctrl` + `>`
  // keys ({ type }) {
  //   return {
  //     'Ctrl->': toggleWrap(type)
  //   }
  // }

  // // a blockquote will be created when you are on a new line and type `>` followed by a space
  // inputRules ({ type }) {
  //   return [
  //     wrappingInputRule(/^\s*>\s$/, type)
  //   ]
  // }
}
