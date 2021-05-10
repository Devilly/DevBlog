const { default: CustomComponent } = await import('./framework/customComponent.js')

export default class MoveComponent extends CustomComponent {
    #positionComponent

    constructor({
        positionComponent
    }) {
        super()

        this.#positionComponent = positionComponent
    }

    update({
        elapsedTime,
        view
    }) {
        this.#positionComponent.X += 30 * elapsedTime / 1000
        this.#positionComponent.Y += 30 * elapsedTime / 1000
    }
}