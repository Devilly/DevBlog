const { default: Entity } = await import('./framework/entity.js')
const { default: SpriteComponent } = await import('./framework/spriteComponent.js')
const { default: PositionComponent } = await import('./framework/positionComponent.js')

const { default: MoveComponent } = await import('./moveComponent.js')

export default async function main({
    canvas,
    postIdentifier
}) {
    const { default: Game } = await import(`./framework/game.js`)

    const positionComponent = new PositionComponent()
    const moveComponent = new MoveComponent({
        positionComponent
    })

    new Game(canvas)
        .addEntity(new Entity(
            new SpriteComponent({
                urls: [
                    `posts/${postIdentifier}/img/ball0000.png`,
                    `posts/${postIdentifier}/img/ball0001.png`,
                    `posts/${postIdentifier}/img/ball0002.png`,
                    `posts/${postIdentifier}/img/ball0003.png`,
                    `posts/${postIdentifier}/img/ball0004.png`
                ]
            }),
            positionComponent,
            moveComponent
        ))
        .start()
}