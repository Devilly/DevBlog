```javascript

const { default: Game } = await import(`../posts/${postIdentifier}/js/game.js`)
new Game(canvas).start()

```
