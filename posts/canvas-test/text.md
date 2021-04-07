```javascript
const context = canvas.getContext('2d')

let lastMouseEvent
canvas.addEventListener('pointermove', event => {
  canvas.setPointerCapture(event.pointerId)
  event.preventDefault()

  lastMouseEvent = event
})

;(function main(lastTime, time) {
    window.requestAnimationFrame(main.bind(null, time))

    context.clearRect(0, 0, canvas.width, canvas.height)

    // Time can be used to calculate timing based actions, e.g. animations and game movements.
    if(!lastTime) return

    if(!lastMouseEvent) return

    // Make sure the x and y positions are on the canvas, enabling a pointer to start on the canvas and continue outside of it.
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
