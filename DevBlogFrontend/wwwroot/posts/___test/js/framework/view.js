export default class View {
  #width
  #height

  #scale

  constructor(canvas) {
    this.#width = 1800
    this.#height = this.#width / 2

    this.#init(canvas)
  }

  #init(canvas) {
    // Adapt canvas width and height to how it is resized (by the CSS width rule).
    const resizeObserver = new ResizeObserver(entries => {
      canvas.width = entries[0].contentBoxSize[0].inlineSize
      canvas.height = canvas.width / 2

      this.#scale = canvas.width / this.#width
    })
    resizeObserver.observe(canvas)
  }

  get info() {
    return {
      width: this.#width,
      height: this.#height,

      scale: this.#scale
    }
  }
}