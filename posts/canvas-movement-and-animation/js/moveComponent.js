const { default: CustomComponent } = await import('./framework/customComponent.js')

export default class MoveComponent extends CustomComponent {
    #spriteComponent
    #positionComponent

    #xMovement
    #yMovement

    constructor({
        spriteComponent,
        positionComponent
    }) {
        super()

        this.#spriteComponent = spriteComponent
        this.#positionComponent = positionComponent

        const movementSpeed = 300
        this.#xMovement = movementSpeed
        this.#yMovement = movementSpeed
    }

    update({
        elapsedTime,
        view
    }) {
        const minX = 0 + this.#spriteComponent.image.width / 2
        const maxX = view.info.width - this.#spriteComponent.image.width / 2
        const minY = 0 + this.#spriteComponent.image.height / 2
        const maxY = view.info.height - this.#spriteComponent.image.height / 2

        this.#positionComponent.X += this.#xMovement * elapsedTime / 1000

        if(this.#positionComponent.X < minX) {
            this.#positionComponent.X = minX
            this.#xMovement *= -1
        }

        if(this.#positionComponent.X > maxX) {
            this.#positionComponent.X = maxX
            this.#xMovement *= -1
        }

        this.#positionComponent.Y += this.#yMovement * elapsedTime / 1000

        if(this.#positionComponent.Y < minY) {
            this.#positionComponent.Y = minY
            this.#yMovement *= -1
        }

        if(this.#positionComponent.Y > maxY) {
            this.#positionComponent.Y = maxY
            this.#yMovement *= -1
        }
    }
}