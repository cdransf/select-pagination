class SelectPagination extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "select-pagination", SelectPagination);
    }
  }

  static attr = {
    baseIndex: 0,
  }

  get baseIndex() {
    return this.getAttribute(SelectPagination.attr.baseIndex) || 0
  }

  connectedCallback() {
    if (this.shadowRoot) return

    let shadowRoot = this.attachShadow({ mode: 'open' })
    let slot = document.createElement('slot')
    shadowRoot.appendChild(slot)

    const uri = window.location.pathname
    const urlSegments = uri.split('/').filter(segment => segment !== '')
    let pageNumber = parseInt(urlSegments[urlSegments.length - 1]) || 0

    this.control = document.querySelector('select')
    this.control.querySelector(`option[value="${pageNumber.toString()}"]`).setAttribute('selected', 'selected')
    this.control.addEventListener('change', (event) => {
      pageNumber = event.target.value

      if (urlSegments.length === 0 || isNaN(urlSegments[urlSegments.length - 1])) {
        urlSegments.push(pageNumber.toString())
      } else {
        urlSegments[urlSegments.length - 1] = pageNumber.toString()
      }

      if (pageNumber === this.baseIndex) {
        window.location.href = `${window.location.protocol}//${window.location.host}/`
      } else {
        window.location = `${window.location.protocol}//${window.location.host}/${urlSegments.join('/')}`
      }
    })
  }
}

SelectPagination.register();