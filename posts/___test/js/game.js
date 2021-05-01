export default class Game {
    #canvas
    #scale
    #lastPointerEvent

    #gameWidth
    #gameHeight

    constructor(canvas) {
        this.#canvas = canvas
        this.#setupCanvas(this.#canvas)

        this.#gameWidth = 600
        this.#gameHeight = this.#gameWidth / 2
    }

    #setupCanvas(canvas) {
        // Set canvas styling.
        canvas.style.display = "block";
        canvas.style.touchAction = "none";
        canvas.style.width = "100%";

        // Handle mouse events.
        canvas.addEventListener('pointerdown', event => {
            canvas.setPointerCapture(event.pointerId)

            this.#lastPointerEvent = event
        })
        canvas.addEventListener('pointermove', event => {
            this.#lastPointerEvent = event
        })
        canvas.addEventListener('pointerup', event => {
            canvas.releasePointerCapture(event.pointerId)

            this.#lastPointerEvent = event
        })

        // Adapt canvas width and height to how it is resized (by the CSS width rule).
        const resizeObserver = new ResizeObserver(entries => {
            canvas.width = entries[0].contentBoxSize[0].inlineSize
            canvas.height = canvas.width / 2

            this.#scale = 600 / canvas.width
        })
        resizeObserver.observe(canvas)
    }

    start() {
        const canvas = this.#canvas
        const context = canvas.getContext('2d')

        let main
        ; (main = async (lastTime, time) => {
            window.requestAnimationFrame(main.bind(this, time))

            context.clearRect(0, 0, canvas.width, canvas.height)

            const scale = this.#scale
            const lastPointerEvent = this.#lastPointerEvent

            // Time can be used to calculate timing based actions, e.g. animations and game movements.
            if (!lastTime) return

            context.save()

            

            context.restore()
        })()
    }
}

