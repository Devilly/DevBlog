```javascript
const context = canvas.getContext('2d')

let lastMouseEvent
canvas.addEventListener('pointermove', event => lastMouseEvent = event)

;(function main(lastTime, time) {
    window.requestAnimationFrame(main.bind(null, time))

    context.clearRect(0, 0, canvas.width, canvas.height)

    // Time can be used to calculate timing based actions, e.g. animations and game movements
    if(!lastTime) return

    if(!lastMouseEvent) return

    // This code is made so that the event listener can also be applied to the document instead of the canvas itself
    const positionX = Math.min(canvas.width, Math.max(0, lastMouseEvent.clientX - canvas.getBoundingClientRect().left))
    const positionY = Math.min(canvas.height, Math.max(0, lastMouseEvent.clientY - canvas.getBoundingClientRect().top))

    const coordinatesText = `(${positionX},${positionY})`

    const textMetrics = context.measureText(coordinatesText)
    // https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics#measuring_text_width
    const textWidth = Math.abs(textMetrics.actualBoundingBoxLeft) + Math.abs(textMetrics.actualBoundingBoxRight)

    context.save()

    if(positionX + textWidth > canvas.width) {
      context.textAlign = 'end'
    }

    if(positionY < textMetrics.actualBoundingBoxAscent) {
      context.textBaseline = 'top'
    }

    context.fillText(coordinatesText, positionX, positionY)

    context.restore()
})()
```
