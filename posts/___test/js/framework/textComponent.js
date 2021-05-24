const { default: Component } = await import('./component.js')

export default class TextComponent extends Component {
  #text
  #font
  #alignment
  #baseline

  constructor(text = '', {
    font,
    alignment,
    baseline
  } = {}) {
    super()

    this.#text = text

    this.#font = font ?? '48px monospace'
    this.#alignment = alignment ?? 'center'
    this.#baseline = baseline ?? 'middle'
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

  get alignment() {
    return this.#alignment
  }

  set alignment(alignment) {
    this.#alignment = alignment
  }

  get baseline() {
    return this.#baseline
  }

  set baseline(baseline) {
    this.#baseline = baseline
  }
}