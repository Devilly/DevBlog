export default class Entity {
    #components

    constructor(...components) {
        this.#components = components
    }

    get components() {
        return this.#components
    }
}