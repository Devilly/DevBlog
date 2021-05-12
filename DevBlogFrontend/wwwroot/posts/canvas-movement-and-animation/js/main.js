const { default: Game } = await import(`./framework/game.js`)
const { default: Entity } = await import('./framework/entity.js')
const { default: SpriteComponent } = await import('./framework/spriteComponent.js')
const { default: PositionComponent } = await import('./framework/positionComponent.js')

const { loadAll } = await import(`./framework/util/image.js`)

const { default: MoveComponent } = await import('./moveComponent.js')

export default async function main({
    canvas,
    postIdentifier
}) {
    const spriteComponent = new SpriteComponent({
        images: await loadAll([
            `posts/${postIdentifier}/img/ball0000.png`,
            `posts/${postIdentifier}/img/ball0001.png`,
            `posts/${postIdentifier}/img/ball0002.png`,
            `posts/${postIdentifier}/img/ball0003.png`,
            `posts/${postIdentifier}/img/ball0004.png`
        ])
    })
    const positionComponent = new PositionComponent(100, 100)
    const moveComponent = new MoveComponent({
        spriteComponent,
        positionComponent
    })

    new Game(canvas)
        .addEntity(new Entity(
            spriteComponent,
            positionComponent,
            moveComponent
        ))
        .start()
}