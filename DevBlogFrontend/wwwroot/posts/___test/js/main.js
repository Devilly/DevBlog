const { default: Game } = await import(`./framework/game.js`)
const { default: Entity } = await import('./framework/entity.js')
const { default: SpriteComponent } = await import('./framework/spriteComponent.js')
const { default: PositionComponent } = await import('./framework/positionComponent.js')

const { loadAll } = await import(`./framework/util/image.js`)

export default async function main({
    canvas,
    postIdentifier
}) {
    const spriteComponent = new SpriteComponent({
        images: await loadAll([
            `posts/${postIdentifier}/img/Card-(Bomb-Life).png`
        ])
    })
    const positionComponent = new PositionComponent()

    new Game(canvas)
        .addEntity(
            new Entity()
            .setComponents(
                spriteComponent,
                positionComponent
            ))
        .start()
}