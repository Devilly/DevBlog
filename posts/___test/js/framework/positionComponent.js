const { default: Component } = await import('./component.js')

export default class PositionComponent extends Component {
    #X
    #Y

    constructor() {
        super()

        this.#X = 0
        this.#Y = 0
    }

    get X() {
        return this.#X
    }

    set X(X) {
        this.#X = X
    }

    get Y() {
        return this.#Y
    }

    set Y(Y) {
        this.#Y = Y
    }
}