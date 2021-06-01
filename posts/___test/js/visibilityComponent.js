const { default: CustomComponent } = await import('./framework/customComponent.js')

export default class VisibilityComponent extends CustomComponent {
  #spriteComponent
  #gridPositionComponent

  #alphaReachable = 1
  #alphaUnreachable = .3

  init() {
    this.#spriteComponent = this.entity.components.SpriteComponent
    this.#gridPositionComponent = this.entity.components.GridPositionComponent
  }

  update() {
    const faceX = this.entity.game.entities.face.components.GridPositionComponent.X
    const faceY = this.entity.game.entities.face.components.GridPositionComponent.Y

    this.#spriteComponent.alpha = Math.abs(faceX - this.#gridPositionComponent.X)
    + Math.abs(faceY - this.#gridPositionComponent.Y) === 1 ? this.#alphaReachable : this.#alphaUnreachable
  }
}