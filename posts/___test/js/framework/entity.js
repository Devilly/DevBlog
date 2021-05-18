export default class Entity {
    #components
    #children

    setComponents(...components) {
        this.#components = components

        return this
    }

    getComponents() {
        return this.#components
    }
    
    setChildren(...children) {
        this.#children = children

        return this
    }

    getChildren() {
        return this.#children
    }
}