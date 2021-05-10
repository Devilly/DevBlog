const { default: View } = await import('./view.js')

const { default: SpriteComponent } = await import('./spriteComponent.js')
const { default: PositionComponent } = await import('./positionComponent.js')
const { default: CustomComponent } = await import('./customComponent.js')

export default class Game {
    #context

    #view

    #entities

    constructor(canvas) {
        this.#context = canvas.getContext('2d')

        // Set canvas styling.
        canvas.style.display = "block";
        canvas.style.touchAction = "none";
        canvas.style.width = "100%";

        // Initialize framework
        this.#view = new View(canvas)

        this.#entities = []
    }

    start() {
        const context = this.#context

        let main
            ; (main = async (lastTime, time) => {
                window.requestAnimationFrame(main.bind(this, time))

                const {
                    width,
                    height,
                    scale
                } = this.#view.info

                context.clearRect(0, 0, width, height)

                if (!lastTime) return

                context.save()
                
                context.scale(scale, scale)

                const elapsedTime = time - lastTime

                this.#entities.forEach(entity => {
                    entity.components
                        .filter(component => component instanceof CustomComponent)
                        .forEach(component => component.update({
                            elapsedTime,
                            view: this.#view
                        }))

                    const spriteComponent = entity.components
                        .find(component => component instanceof SpriteComponent)
                    spriteComponent.update(elapsedTime)

                    const positionComponent = entity.components
                        .find(component => component instanceof PositionComponent)

                    if(spriteComponent.image) context.drawImage(spriteComponent.image, positionComponent.X, positionComponent.Y)
                })

                context.restore()
            })()
    }

    addEntity(entity) {
        this.#entities.push(entity)

        return this
    }
}

