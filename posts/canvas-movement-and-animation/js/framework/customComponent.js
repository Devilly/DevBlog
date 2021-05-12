const { default: Component } = await import('./component.js')

export default class CustomComponent extends Component {
    update() {
        throw new NotYetImplementedError()
    }
}

class NotYetImplementedError extends Error {
    constructor(...params) {
        super(...params)
    }
}