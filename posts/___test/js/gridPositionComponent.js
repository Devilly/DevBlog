const { default: CustomComponent } = await import('./framework/customComponent.js')

export default class GridPositionComponent extends CustomComponent {
    #X
    #Y

    #deltaX
    #deltaY

    #spriteComponent
    #positionComponent

    constructor(X, Y, {
        deltaX,
        deltaY
    } = {}) {
        super()

        this.#X = X
        this.#Y = Y

        this.#deltaX = deltaX ?? 0
        this.#deltaY = deltaY ?? 0
    }

    init() {
        this.#spriteComponent = this.entity.components.SpriteComponent
        this.#positionComponent = this.entity.components.PositionComponent
    }

    update() {
        const image = this.#spriteComponent.image

        this.#positionComponent.X = this.#X * 300 + image.width / 2 * this.#spriteComponent.scale + this.#deltaX,
        this.#positionComponent.Y = this.#Y * 270 + image.height / 2 * this.#spriteComponent.scale + 100 + this.#deltaY
    }

    get X() {
        return this.#X
    }

    get Y() {
        return this.#Y
    }
}