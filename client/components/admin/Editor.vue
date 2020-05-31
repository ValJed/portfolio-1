<template>
  <div class="editor">
    <image-modal
      ref="imgModal"
      :images="images"
      :add-image="addImage"
      :delete-img="deleteImg"
      :update-main-img="updateMainImg"
    />
    <editor-menu-bar class="editor-menu" :editor="editor">
      <div
        slot-scope="{ commands, isActive }"
        class="menubar"
      >
        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <icon name="undo" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          @click="commands.redo"
        >
          <icon name="redo" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strike" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <!-- <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </button> -->
        <!-- <button
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <icon name="left" />
        </button> -->
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customText({ align: 'left' }) }"
          @click="commands.customText({ align: 'left' })"
        >
          <icon name="left" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customText({ align: 'center' }) }"
          @click="commands.customText({ align: 'center' })"
        >
          <icon name="center" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customText({ align: 'right' }) }"
          @click="commands.customText({ align: 'right' })"
        >
          <icon name="right" width="0.8rem" height="0.8rem" fill="#000" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customColumn({ columnSize: 1 }) }"
          @click="commands.customColumn({ columnSize: 1 })"
        >
          25%
          <!-- <icon name="left" width="0.8rem" height="0.8rem" fill="#000" /> -->
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customColumn({ columnSize: 2 }) }"
          @click="commands.customColumn({ columnSize: 2 })"
        >
          50%
          <!-- <icon name="left" width="0.8rem" height="0.8rem" fill="#000" /> -->
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customColumn({ columnSize: 3 }) }"
          @click="commands.customColumn({ columnSize: 3 })"
        >
          75%
          <!-- <icon name="left" width="0.8rem" height="0.8rem" fill="#000" /> -->
        </button>

        <button
          class="menubar__button"
          @click="openModal(commands.image)"
        >
          <icon name="image" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customHeading({ level: 1 }) }"
          @click="commands.customHeading({ level: 1 })"
        >
          H1
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customHeading({ level: 2 }) }"
          @click="commands.customHeading({ level: 2 })"
        >
          H2
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.customHeading({ level: 3 }) }"
          @click="commands.customHeading({ level: 3 })"
        >
          H3
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="ul" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="ol" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <icon name="code" width="0.8rem" height="0.8rem" fill="#000" />
        </button>
      </div>
    </editor-menu-bar>
    <editor-content
      ref="editor"
      v-model="content"
      :style="{ height: `${editorHeight}px` }"
      class="editor-content project-content"
      :editor="editor"
      @change="updateContent(content)"
    />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  // Heading,
  OrderedList,
  BulletList,
  Image,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
import ImageModal from '../admin/ImageModal'
import Icon from '../common/Icon'
import CustomText from './editorCustomNodes/text'
import CustomColumn from './editorCustomNodes/column'
import CustomHeading from './editorCustomNodes/heading'

export default {
  name: 'EditorBlock',
  components: {
    EditorContent,
    EditorMenuBar,
    Icon,
    ImageModal
  },
  props: {
    content: {
      type: String,
      required: true
    },
    updateContent: {
      type: Function,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    addImage: {
      type: Function,
      required: true
    },
    deleteImg: {
      type: Function,
      required: true
    },
    updateMainImg: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      editorHeight: 0,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new CustomText({ alignment: ['left', 'center', 'right'] }),
          new CustomColumn({ columnSizes: [1, 2, 3] }),
          new CustomHeading({ levels: [1, 2, 3] }),
          // new Heading({ levels: [1, 2, 3] }),
          new Image(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: this.content,
        onUpdate: ({ getHTML }) => {
          const content = getHTML()

          this.updateContent(content)
        }
      })
    }
  },
  watch: {
    content (newVal, oldVal) {
      this.editor.setContent(newVal)
    }
  },
  mounted () {
    // Computing editor height
    const distance = this.$refs.editor.$el.getBoundingClientRect().top
    this.editorHeight = window.innerHeight - distance
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    openModal (command) {
      this.$refs.imgModal.showModal(command)
    }
  }
}
</script>

<style lang='scss' src="./Editor.scss" />
