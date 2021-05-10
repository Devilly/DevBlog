const { default: Component } = await import('./component.js')
const { load } = await import(`./util/image.js`)

export default class SpriteComponent extends Component {
    #images

    #timePerFrame
    #currentFrame
    #elapsedTime

    constructor({ urls, fps = 12 }) {
        super()

        this.#images = []

        // Time per frame calculation: seconds / fps * milliseconds
        this.#timePerFrame = 1 / fps * 1000
        this.#currentFrame = 0
        this.#elapsedTime = 0

        this.#init(urls)
    }

    async #init(urls) {
        this.#images = await Promise.all(urls.map(url => load(url)))
    }

    update(elapsedTime) {
        this.#elapsedTime += elapsedTime

        const framesToMove = Math.floor(this.#elapsedTime / this.#timePerFrame)
        if(framesToMove > 1) {
            this.#currentFrame = (this.#currentFrame + framesToMove) % this.#images.length

            this.#elapsedTime = this.#elapsedTime % 1
        }
    }

    get image() {
        return this.#images[this.#currentFrame]
    }
}