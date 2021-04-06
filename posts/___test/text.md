```javascript
// Let's try executing JS in a blog post.

const context = canvas.getContext('2d')

let lastMouseEvent
document.addEventListener('mousemove', event => lastMouseEvent = event)

;(function main(lastTime, time) {
    window.requestAnimationFrame(main.bind(null, time))

    context.clearRect(0, 0, canvas.width, canvas.height)

    if(!lastTime) return

    if(!lastMouseEvent) return

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
