const { default: CustomComponent } = await import('./framework/customComponent.js')

const { default: Entity } = await import('./framework/entity.js')
const { default: SpriteComponent } = await import('./framework/spriteComponent.js')
const { default: PositionComponent } = await import('./framework/positionComponent.js')

const { default: GridPositionComponent } = await import('./gridPositionComponent.js')
const { default: VisibilityComponent } = await import('./visibilityComponent.js')

export default class GameplayComponent extends CustomComponent {
  #numberOfColumns = 5
  #numberOfRows = 3

  #initialPlayerPosition = {
    X: Math.floor(this.#numberOfColumns / 2),
    Y: Math.floor(this.#numberOfRows / 2)
  }

  #scale = .8

  #weightedCardsList

  init() {
    const cardWeights = {
      'plus_one.png': {
        weight: 8
      },
      'plus_two.png': {
        weight: 4
      },
      'bomb_life.png': {
        weight: 1
      },
      'bomb.png': {
        weight: 2
      },
      'life_gold.png': {
        weight: 1
      },
      'life_red.png': {
        weight: 4
      },
      'poison.png': {
        weight: 6
      }
    }

    this.#weightedCardsList = []

    Object.keys(cardWeights).forEach(key => {
      this.#weightedCardsList = [
        ...this.#weightedCardsList,
        ...Array(cardWeights[key].weight).fill(undefined).map(_ => key)
      ]
    })

    // Generate all tiles for the initial boards.
    for (let x = 0; x < this.#numberOfColumns; x++) {
      for (let y = 0; y < this.#numberOfRows; y++) {

        if (x === this.#initialPlayerPosition.X && y === this.#initialPlayerPosition.Y) {
          const image = this.entity.game.data['face_motivated.png']

          this.entity.game.addEntity(
            new Entity()
              .setName('face')
              .addComponents(
                new SpriteComponent(this.entity.game.data['face_motivated.png']),
                new PositionComponent(),
                new GridPositionComponent(x, y, {
                  deltaX: -18,
                  deltaY: -18
                })
              )
              .addChildren(
                new Entity()
                  .addComponents(
                    new SpriteComponent(this.entity.game.data['heart_gold.png']),
                    new PositionComponent(0, -110)
                  ),
                new Entity()
                  .addComponents(
                    new SpriteComponent(this.entity.game.data['heart_red.png']),
                    new PositionComponent(-56, 95)
                  ),
                new Entity()
                  .addComponents(
                    new SpriteComponent(this.entity.game.data['heart_red.png']),
                    new PositionComponent(0, 110)
                  ),
                new Entity()
                  .addComponents(
                    new SpriteComponent(this.entity.game.data['heart_red.png']),
                    new PositionComponent(59, 95)
                  )
              ))

          continue
        }

        const randomIndex = Math.floor(Math.random() * this.#weightedCardsList.length)
        const image = this.entity.game.data[this.#weightedCardsList[randomIndex]]

        this.entity.game.addEntity(
          new Entity()
            .addComponents(
              new SpriteComponent(image, {
                scale: this.#scale
              }),
              new PositionComponent(),
              new GridPositionComponent(x, y),
              new VisibilityComponent()
            )
        )
      }
    }
  }
}