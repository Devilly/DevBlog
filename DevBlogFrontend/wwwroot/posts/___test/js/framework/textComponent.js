const { default: Component } = await import('./component.js')

export default class TextComponent extends Component {
  #text
  #font

  constructor(text = '', font = '48px monospace') {
    super()

    this.#text = text
    this.#font = font
  }

  get text() {
    return this.#text
  }

  set text(text) {
    this.#text = text
  }

  get font() {
    return this.#font
  }

  set font(font) {
    this.#font = font
  }
}