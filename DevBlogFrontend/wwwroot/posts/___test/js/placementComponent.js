const { default: CustomComponent } = await import('./framework/customComponent.js')

export default class PlacementComponent extends CustomComponent {
    #positionComponent

    init() {
        this.#positionComponent = this.entity.components.PositionComponent
    }

    update() {
        this.#positionComponent.X = 200
        this.#positionComponent.Y = 300
    }
}