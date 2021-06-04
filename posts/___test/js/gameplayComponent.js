const { default: CustomComponent } = await import('./framework/customComponent.js')

const { default: Entity } = await import('./framework/entity.js')
const { default: SpriteComponent } = await import('./framework/spriteComponent.js')
const { default: PositionComponent } = await import('./framework/positionComponent.js')

const { default: GridPositionComponent } = await import('./gridPositionComponent.js')
const { default: VisibilityComponent } = await import('./visibilityComponent.js')
const { default: InteractionComponent } = await import('./interactionComponent.js')

export default class GameplayComponent extends CustomComponent {
  #numberOfColumns = 5
  #numberOfRows = 3

  #initialPlayerPosition = {
    X: Math.floor(this.#numberOfColumns / 2),
    Y: Math.floor(this.#numberOfRows / 2)
  }

  #scale = .8

  #weightedCardsList

  init({
    data
  }) {
    const getGenericImage = name => data.genericImages[name].image

    const cardImages = data.cardImages
    const getCardImage = name => cardImages[name].image

    this.#weightedCardsList = []
    
    Object.keys(cardImages).forEach(key => {
      this.#weightedCardsList = [
        ...this.#weightedCardsList,
        ...Array(cardImages[key].weight).fill(undefined).map(_ => key)
      ]
    })

    // Generate all tiles for the initial boards.
    for (let x = 0; x < this.#numberOfColumns; x++) {
      for (let y = 0; y < this.#numberOfRows; y++) {

        if (x === this.#initialPlayerPosition.X && y === this.#initialPlayerPosition.Y) {
          this.entity.game.addEntity(
            new Entity()
              .setName('face')
              .addComponents(
                new SpriteComponent(data.genericImages['face_motivated.png'].image),
                new PositionComponent(),
                new GridPositionComponent(x, y, {
                  deltaX: -18,
                  deltaY: -18
                })
              )
              .addChildren(
                new Entity()
                  .addComponents(
                    new SpriteComponent(data.genericImages['heart_gold.png'].image),
                    new PositionComponent(0, -110)
                  ),
                new Entity()
                  .addComponents(
                    new SpriteComponent(data.genericImages['heart_red.png'].image),
                    new PositionComponent(-56, 95)
                  ),
                new Entity()
                  .addComponents(
                    new SpriteComponent(data.genericImages['heart_red.png'].image),
                    new PositionComponent(0, 110)
                  ),
                new Entity()
                  .addComponents(
                    new SpriteComponent(data.genericImages['heart_red.png'].image),
                    new PositionComponent(59, 95)
                  )
              ))

          continue
        }

        const randomIndex = Math.floor(Math.random() * this.#weightedCardsList.length)
        const card = data.cardImages[this.#weightedCardsList[randomIndex]]

        this.entity.game.addEntity(
          new Entity()
            .addComponents(
              new SpriteComponent(card.image, {
                scale: this.#scale
              }),
              new PositionComponent(),
              new GridPositionComponent(x, y),
              new VisibilityComponent(),
              new InteractionComponent(card.act)
            )
        )
      }
    }
  }
}