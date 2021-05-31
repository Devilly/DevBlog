const { default: Game } = await import(`./framework/game.js`)
const { default: Entity } = await import('./framework/entity.js')
const { default: SpriteComponent } = await import('./framework/spriteComponent.js')
const { default: PositionComponent } = await import('./framework/positionComponent.js')
const { default: TextComponent } = await import('./framework/textComponent.js')

const { load } = await import(`./framework/util/image.js`)

const { default: ScoreComponent } = await import('./scoreComponent.js')
const { default: HighscoreComponent } = await import('./highscoreComponent.js')
const { default: GameplayComponent } = await import('./gameplayComponent.js')

export default async function main({
  canvas,
  postIdentifier
}) {
  const rootUrl = `/posts/${postIdentifier}`

  var fontGomarice = new FontFace("gomarice", `url(${rootUrl}/font/gomarice_kaiju_monster.ttf)`);
  await fontGomarice.load()
  document.fonts.add(fontGomarice);

  const images = {}
  const imageFiles = [
    'plus_one.png',
    'plus_two.png',
    'bomb_life.png',
    'bomb.png',
    'exit.png',
    'life_gold.png',
    'life_red.png',
    'play.png',
    'poison.png',
    'face_motivated.png',
    'face_surprised.png',
    'face_sad.png',
    'restart.png',
    
    'heart_grey.png',
    'heart_red.png',
    'heart_gold.png'
  ]
  for (const imageFile of imageFiles) {
    const image = await load(`${rootUrl}/img/${imageFile}`)

    images[imageFile] = image
  }

  new Game(canvas)
    .provideData(images)

    .addEntity(
      new Entity()
        .addComponents(
          new GameplayComponent()
        )
    )
    .addEntity(
      new Entity()
        .setName('score')
        .addComponents(
          new PositionComponent(),
          new TextComponent('score: 0', {
            font: '70px gomarice',
            baseline: 'top',
            alignment: 'left'
          }),
          new ScoreComponent()
        )
    )
    .addEntity(
      new Entity()
        .setName('highscore')
        .addComponents(
          new PositionComponent(500, 0),
          new TextComponent('highscore: 0', {
            font: '70px gomarice',
            alignment: 'left',
            baseline: 'top'
          }),
          new HighscoreComponent()
        )
    )

    .start()
}