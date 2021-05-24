const { default: Game } = await import(`./framework/game.js`)
const { default: Entity } = await import('./framework/entity.js')
const { default: SpriteComponent } = await import('./framework/spriteComponent.js')
const { default: PositionComponent } = await import('./framework/positionComponent.js')
const { default: TextComponent } = await import('./framework/textComponent.js')

const { loadAll } = await import(`./framework/util/image.js`)

const { default: LogComponent } = await import('./logComponent.js')
const { default: PlacementComponent } = await import('./placementComponent.js')

export default async function main({
  canvas,
  postIdentifier
}) {
  var fontGomarice = new FontFace("gomarice", `url(/posts/${postIdentifier}/font/gomarice_kaiju_monster.ttf)`);
  await fontGomarice.load()
  document.fonts.add(fontGomarice);

  new Game(canvas)
    .addEntity(
      new Entity()
        .addComponents(
          new SpriteComponent(
            await loadAll([
              `posts/${postIdentifier}/img/Card-(Bomb-Life).png`
            ])),
          new PositionComponent(),
          new LogComponent(),
          new PlacementComponent()
        )
        .addChildren(
          new Entity()
            .addComponents(
              new SpriteComponent(
                await loadAll([
                  `posts/${postIdentifier}/img/Face-1.png`
                ])),
              new PositionComponent(50, 10)
            )
            .addChildren(
              new Entity()
                .addComponents(
                  new SpriteComponent(
                    await loadAll([
                      `posts/${postIdentifier}/img/Life-(yellow)_Small.png`
                    ])),
                  new PositionComponent(0, -110)
                ),
              new Entity()
                .addComponents(
                  new SpriteComponent(
                    await loadAll([
                      `posts/${postIdentifier}/img/Life-(red)_Small.png`
                    ])),
                  new PositionComponent(-56, 95)
                ),
              new Entity()
                .addComponents(
                  new SpriteComponent(
                    await loadAll([
                      `posts/${postIdentifier}/img/Life-(red)_Small.png`
                    ])),
                  new PositionComponent(0, 110)
                ),
              new Entity()
                .addComponents(
                  new SpriteComponent(
                    await loadAll([
                      `posts/${postIdentifier}/img/Life-(red)_Small.png`
                    ])),
                  new PositionComponent(59, 95)
                )
            )
        ))
    .addEntity(
      new Entity()
      .addComponents(
        new PositionComponent(900, 50),
        new TextComponent('score: 0', {
          font: '70px gomarice',
          baseline: 'top'
        })
      )
    )
    .addEntity(
      new Entity()
      .addComponents(
        new PositionComponent(1750, 50),
        new TextComponent('highscore: 0', {
          font: '70px gomarice',
          alignment: 'right',
          baseline: 'top'
        })
      )
    )
    .start()
}