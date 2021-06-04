const { default: View } = await import('./view.js')

export default class Game {
  #context
  #view

  #data

  #entities = []

  #events = new Map()

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

        if (this.#events.has(eventType)) {
          this.#events.get(eventType).push(eventObject)
        } else {
          this.#events.set(eventType, [eventObject])
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

        this.#updateAndDrawEntities({
          entities: this.#entities,
          origin: {
            X: 0,
            Y: 0
          },
          elapsedTime,
          events: this.#events
        })

        this.#events.clear()

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

      // Find applicable events
      const applicableEvents = new Map()
      const aabb = entity.AABB

      if (aabb) {
        for (const event of events) {
          const [eventName, eventValues] = event

          const filteredValues = eventValues.filter(eventValue => {
            return eventValue.X >= aabb.min.X && eventValue.X <= aabb.max.X &&
              eventValue.Y >= aabb.min.Y && eventValue.Y <= aabb.max.Y
          })

          if (filteredValues.length > 0) {
            applicableEvents.set(eventName, filteredValues)
          }
        }
      }

      // Update all components
      entity.components.ALL
        .forEach(component => component?.update?.({
          elapsedTime,
          view: this.#view,
          events: applicableEvents,
          data: this.#data
        }))

      if (!positionComponent) return

      // Calculate world position
      const calculatedPositionX = origin.X + positionComponent.X
      const calculatedPositionY = origin.Y + positionComponent.Y

      // Draw sprite, if applicable
      if (spriteComponent) {
        context.save()

        const scaledWidth = spriteComponent.image.width * spriteComponent.scale
        const scaledHeight = spriteComponent.image.height * spriteComponent.scale

        context.globalAlpha = spriteComponent.alpha

        context.drawImage(
          spriteComponent.image,
          calculatedPositionX - scaledWidth / 2,
          calculatedPositionY - scaledHeight / 2,
          scaledWidth,
          scaledHeight
        )

        context.restore()
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
      component.init?.({
        data: this.#data
      })
    }

    this.#entities.push(entity)

    return this
  }
}

