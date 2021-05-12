const { default: Component } = await import('./component.js')

export default class PositionComponent extends Component {
    #X
    #Y

    constructor(X = 0, Y = 0) {
        super()

        this.#X = X
        this.#Y = Y
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