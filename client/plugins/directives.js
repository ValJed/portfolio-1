import Vue from 'vue'

let handleOutsideClick

Vue.directive('closable', {
  bind (el, binding, vnode) {
    handleOutsideClick = (e) => {
      const { level, handler, className, excluded = [] } = binding.value

      const elem = level === 'parent' ? el.parentNode
        : level === 'child' ? el.childNodes[0]
          : el

      const isExcluded = excluded
        .some(className => e.target.classList.contains(className))

      if (
        e.target.classList.contains(className) &&
        !elem.contains(e.target) &&
        !isExcluded) {
        vnode.context[handler]()
      }
    }

    document.addEventListener('click', handleOutsideClick)
  },
  unbind () {
    document.removeEventListener('click', handleOutsideClick)
  }
})
