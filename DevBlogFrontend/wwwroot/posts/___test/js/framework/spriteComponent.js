const { default: Component } = await import('./component.js')

export default class SpriteComponent extends Component {
  #images

  #timePerFrame
  #currentFrame
  #elapsedTime

  #scale
  #alpha

  constructor(images,
    {
      fps,
      scale,
      alpha
    } = {}) {
    super()

    this.#images = images instanceof Array ? images : [images]

    fps = fps ?? 5

    // Time per frame calculation: seconds / fps * milliseconds
    this.#timePerFrame = 1 / fps * 1000
    this.#currentFrame = 0
    this.#elapsedTime = 0

    this.#scale = scale ?? 1
    this.#alpha = alpha ?? 1
  }

  update({ elapsedTime }) {
    this.#elapsedTime += elapsedTime

    const framesToMove = Math.floor(this.#elapsedTime / this.#timePerFrame)
    if (framesToMove > 1) {
      this.#currentFrame = (this.#currentFrame + framesToMove) % this.#images.length

      this.#elapsedTime = this.#elapsedTime % 1
    }
  }

  get image() {
    if (!this.#images) return null

    return this.#images[this.#currentFrame]
  }

  get scale() {
    return this.#scale
  }

  set scale(scale) {
    this.#scale = scale
  }

  get alpha() {
    return this.#alpha
  }

  set alpha(alpha) {
    this.#alpha = alpha
  }
}