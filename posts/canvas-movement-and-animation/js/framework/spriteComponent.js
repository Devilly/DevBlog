const { default: Component } = await import('./component.js')

export default class SpriteComponent extends Component {
    #images

    #timePerFrame
    #currentFrame
    #elapsedTime

    constructor({ images, fps = 5 }) {
        super()

        this.#images = images

        // Time per frame calculation: seconds / fps * milliseconds
        this.#timePerFrame = 1 / fps * 1000
        this.#currentFrame = 0
        this.#elapsedTime = 0
    }

    update({ elapsedTime }) {
        this.#elapsedTime += elapsedTime

        const framesToMove = Math.floor(this.#elapsedTime / this.#timePerFrame)
        if(framesToMove > 1) {
            this.#currentFrame = (this.#currentFrame + framesToMove) % this.#images.length

            this.#elapsedTime = this.#elapsedTime % 1
        }
    }

    get image() {
        if(!this.#images) return null

        return this.#images[this.#currentFrame]
    }
}