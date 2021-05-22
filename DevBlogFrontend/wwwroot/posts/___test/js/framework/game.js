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
                this.#updateAndDrawEntities({
                    entities: this.#entities,
                    origin: {
                        X: 0,
                        Y: 0
                    },
                    elapsedTime
                })

                context.restore()
            })()
    }

    #updateAndDrawEntities({
        entities,
        origin,
        elapsedTime
    }) {
        const context = this.#context

        entities.forEach(entity => {
            entity.components.ALL
                .forEach(component => component?.update?.({
                    elapsedTime,
                    view: this.#view
                }))

            // Draw entity
            const positionComponent = entity.components.PositionComponent
            const calculatedPositionX = origin.X + positionComponent.X
            const calculatedPositionY = origin.Y + positionComponent.Y

            const spriteComponent = entity.components.SpriteComponent
            if(spriteComponent) {
                context.drawImage(
                    spriteComponent.image,
                    calculatedPositionX - spriteComponent.image.width / 2,
                    calculatedPositionY - spriteComponent.image.height / 2
                )
            }

            const textComponent = entity.components.TextComponent
            if(textComponent) {
                context.font = textComponent.font
                context.fillText(
                    textComponent.text,
                    calculatedPositionX,
                    calculatedPositionY
                )
            }

            this.#updateAndDrawEntities({
                entities: entity.children.ALL,
                origin: {
                    X: calculatedPositionX,
                    Y: calculatedPositionY
                },
                elapsedTime
            })
        })
    }

    addEntity(entity) {
        this.#entities.push(entity)

        return this
    }
}

