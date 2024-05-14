class SelectPagination extends HTMLElement {
  static register(tagName) {
    if ("customElements" in window) {
      customElements.define(tagName || "select-pagination", SelectPagination);
    }
  }

  static attr = {
    baseIndex: 'data-base-index',
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

    let pageNumber = this.extractPageNumber(urlSegments) || 0

    this.control = this.querySelector('select')
    this.control.querySelector(`option[value="${pageNumber.toString()}"]`).setAttribute('selected', 'selected')
    this.control.addEventListener('change', (event) => {
      pageNumber = event.target.value

      if (!isNaN(pageNumber)) {
        pageNumber = parseInt(pageNumber)
      }

      const updatedUrlSegments = this.updateUrlSegments(urlSegments, pageNumber)
      window.location.href = `${window.location.protocol}//${window.location.host}/${updatedUrlSegments.join('/')}`
    })
  }

  extractPageNumber(segments) {
    for (let i = segments.length - 1; i >= 0; i--) {
      const segment = segments[i]
      if (!isNaN(segment)) {
        return parseInt(segment)
      }
    }
    return null
  }

  updateUrlSegments(segments, pageNumber) {
    if (segments.length > 0 && !isNaN(segments[segments.length - 1])) {
      segments[segments.length - 1] = pageNumber.toString()
    } else {
      segments.push(pageNumber.toString())
    }
    if (pageNumber === parseInt(this.baseIndex)) segments.pop()

    return segments;
  }
}

SelectPagination.register();