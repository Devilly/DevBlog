export default class Game {
    #canvas
    #scale
    #lastPointerEvent

    constructor(canvas) {
        this.#canvas = canvas
        this.#setupCanvas(this.#canvas)
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
        });
        canvas.addEventListener('pointermove', event => {
            this.#lastPointerEvent = event
        });
        canvas.addEventListener('pointerup', event => {
            canvas.releasePointerCapture(event.pointerId)

            this.#lastPointerEvent = event
        });

        // Adapt canvas width and height to how it is resized (by the CSS width rule).
        const resizeObserver = new ResizeObserver(entries => {
            canvas.width = entries[0].contentBoxSize[0].inlineSize;
            canvas.height = canvas.width / 2;

            this.#scale = 600 / canvas.width;
        });
        resizeObserver.observe(canvas);
    }

    start() {
        const canvas = this.#canvas
        const context = canvas.getContext('2d')

        function formatPositionNumber(number) {
            return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        }

        let main
        ; (main = (lastTime, time) => {
            window.requestAnimationFrame(main.bind(this, time))

            context.clearRect(0, 0, canvas.width, canvas.height)

            const scale = this.#scale
            const lastPointerEvent = this.#lastPointerEvent

            // Time can be used to calculate timing based actions, e.g. animations and game movements.
            if (!lastTime) return

            if (!lastPointerEvent) return

            // Make sure the x and y positions are on the canvas, enabling a pointer to start on the canvas and continue outside of it.
            const positionX = Math.min(canvas.width, Math.max(0, lastPointerEvent.clientX - canvas.getBoundingClientRect().left))
            const positionY = Math.min(canvas.height, Math.max(0, lastPointerEvent.clientY - canvas.getBoundingClientRect().top))

            const scaledPositionX = positionX * scale;
            const scaledPositionY = positionY * scale;

            const coordinatesText = `(${formatPositionNumber(scaledPositionX)}, ${formatPositionNumber(scaledPositionY)})`

            const textMetrics = context.measureText(coordinatesText)
            // https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics#measuring_text_width
            const textWidth = Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight)

            context.save()

            if (positionX + textWidth > canvas.width) {
                context.textAlign = 'end'
            }

            if (positionY < textMetrics.actualBoundingBoxAscent) {
                context.textBaseline = 'top'
            }

            context.fillText(coordinatesText, positionX, positionY)

            context.restore()
        })()
    }
}

