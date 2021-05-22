const { default: CustomComponent } = await import('./framework/customComponent.js')

export default class LogComponent extends CustomComponent {
    #numberOfFrames = 0
    #totalElapsedTime = 0

    update({
        elapsedTime
    }) {
        this.#numberOfFrames += 1
        this.#totalElapsedTime += elapsedTime

        if(this.#totalElapsedTime > 2000) {
            console.log(`Average time per frame: ${this.#totalElapsedTime / this.#numberOfFrames}`)

            this.#numberOfFrames = 0
            this.#totalElapsedTime = 0
        }
    }
}