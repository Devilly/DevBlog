const { default: View } = await import('./view.js')

export default class Game {
    #context
    #view

    #data

    #entities = []

    #events = {}

    constructor(canvas) {
        this.#context = canvas.getContext('2d')

        // Set canvas styling.
        canvas.style.display = 'block'
        canvas.style.touchAction = 'non'
        canvas.style.width = '100%'

        // Add event listeners.
        const eventTypes = [
            'pointerup'
        ]

        eventTypes.forEach(eventType => {
            canvas.addEventListener(eventType, event => {
                const eventObject = {
                    X: (event.clientX - canvas.getBoundingClientRect().left) / this.#view.scale,
                    Y: (event.clientY - canvas.getBoundingClientRect().top) / this.#view.scale
                }

                if(eventType in this.#events) {
                    this.#events[eventType].push(eventObject)
                } else {
                    this.#events[eventType] = [eventObject]
                }
            })
        })

        this.#view = new View(canvas)
    }

    entities = new Proxy({}, {
        get: (_, property) => {
            if (property === 'ALL') {
                return this.#entities.slice()
            }

            return this.#entities.find(entity => entity.getName() === property)
        }
    })

    start() {
        const context = this.#context

        let main
            ; (main = async (lastTime, time) => {
                window.requestAnimationFrame(main.bind(this, time))

                const {
                    width,
                    height,
                    scale
                } = this.#view

                context.clearRect(0, 0, width, height)

                if (!lastTime) return

                context.save()

                context.scale(scale, scale)

                const elapsedTime = time - lastTime
                
                const events = this.#events
                this.#events = {}

                this.#updateAndDrawEntities({
                    entities: this.#entities,
                    origin: {
                        X: 0,
                        Y: 0
                    },
                    elapsedTime,
                    events
                })

                context.restore()
            })()

        return this
    }

    #updateAndDrawEntities({
        entities,
        origin,
        elapsedTime,
        events
    }) {
        const context = this.#context

        entities.forEach(entity => {
            const positionComponent = entity.components.PositionComponent
            const spriteComponent = entity.components.SpriteComponent
            const textComponent = entity.components.TextComponent

            // Find triggered events
            const pointerUp = events.pointerup?.[0]
            const aabb = entity.AABB

            if (pointerUp && aabb &&
                pointerUp.X >= aabb.min.X && pointerUp.X <= aabb.max.X &&
                pointerUp.Y >= aabb.min.Y && pointerUp.Y <= aabb.max.Y) {
                    
                console.log('check! :D')
            }

            // Update all components
            entity.components.ALL
                .forEach(component => component?.update?.({
                    elapsedTime,
                    view: this.#view
                }))

            if (!positionComponent) return

            // Calculate world position
            const calculatedPositionX = origin.X + positionComponent.X
            const calculatedPositionY = origin.Y + positionComponent.Y

            // Draw sprite, if applicable
            if (spriteComponent) {
                const scaledWidth = spriteComponent.image.width * spriteComponent.scale
                const scaledHeight = spriteComponent.image.height * spriteComponent.scale

                context.drawImage(
                    spriteComponent.image,
                    calculatedPositionX - scaledWidth / 2,
                    calculatedPositionY - scaledHeight / 2,
                    scaledWidth,
                    scaledHeight
                )
            }

            // Draw text, if applicable
            if (textComponent) {
                context.font = textComponent.font
                context.textAlign = textComponent.alignment
                context.textBaseline = textComponent.baseline

                context.fillText(
                    textComponent.text,
                    calculatedPositionX,
                    calculatedPositionY
                )
            }

            // Traverse all child entities
            this.#updateAndDrawEntities({
                entities: entity.children.ALL,
                origin: {
                    X: calculatedPositionX,
                    Y: calculatedPositionY
                },
                elapsedTime,
                events
            })
        })
    }

    provideData(data) {
        this.#data = data

        return this
    }

    addEntity(entity) {
        entity.game = this

        for (const component of entity.components.ALL) {
            component.init?.()
        }

        this.#entities.push(entity)

        return this
    }

    get data() {
        return this.#data
    }

    get view() {
        return this.#view
    }
}

