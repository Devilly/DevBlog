export default class Entity {
    #components = []
    #children = []

    components = new Proxy({}, {
        get: (_, property) => {
            if(property === 'ALL') {
                return this.#components.slice()
            }

            return this.#components.find(component => component.constructor.name === property)
        }
    })

    children = new Proxy({}, {
        get: (_, property) => {
            if(property === 'ALL') {
                return this.#children.slice()
            }

            return undefined
        }
    }) 

    addComponent(component) {
        component.entity = this
        component.init?.()

        this.#components.push(component)

        return this
    }

    addComponents(...components) {
        for(const component of components) {
            this.addComponent(component)
        }

        return this
    }

    addChild(child) {
        this.#children.push(child)

        return this
    }

    addChildren(...children) {
        for(const child of children) {
            this.addChild(child)
        }

        return this
    }
}