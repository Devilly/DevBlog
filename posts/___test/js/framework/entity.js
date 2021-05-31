const { default: AABB } = await import('./AABB.js')
const { default: Point } = await import('./point.js')

export default class Entity {
  #name = undefined

  #components = []
  #children = []

  components = new Proxy({}, {
    get: (_, property) => {
      if (property === 'ALL') {
        return this.#components.slice()
      }

      return this.#components.find(component => component.constructor.name === property)
    }
  })

  children = new Proxy({}, {
    get: (_, property) => {
      if (property === 'ALL') {
        return this.#children.slice()
      }

      return undefined
    }
  })

  setName(name) {
    this.#name = name

    return this
  }

  getName() {
    return this.#name
  }

  addComponents(...components) {
    for (const component of components) {
      component.entity = this

      this.#components.push(component)
    }

    if(this.game) {
      for (const component of components) {
        component.init?.()
      }
    }

    return this
  }

  addChildren(...children) {
    for (const child of children) {
      this.#children.push(child)
    }

    return this
  }

  get AABB() {
    const positionComponent = this.components.PositionComponent
    const spriteComponent = this.components.SpriteComponent

    if(!positionComponent || !spriteComponent) return undefined

    return new AABB(
      new Point(
        positionComponent.X - spriteComponent.image.width / 2,
        positionComponent.Y - spriteComponent.image.height / 2),
      new Point(
        positionComponent.X + spriteComponent.image.width / 2,
        positionComponent.Y + spriteComponent.image.height / 2),
    )
  }
}