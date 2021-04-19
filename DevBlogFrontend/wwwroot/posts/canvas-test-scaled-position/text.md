```javascript

// Set canvas styling.
canvas.style.display = "block";
canvas.style.touchAction = "none";
canvas.style.width = "100%";

// Handle mouse events.
let lastMouseEvent
canvas.addEventListener('pointerdown', event => {
  canvas.setPointerCapture(event.pointerId)

  lastMouseEvent = event
});
canvas.addEventListener('pointermove', event => {
  lastMouseEvent = event
});
canvas.addEventListener('pointerup', event => {
  canvas.releasePointerCapture(event.pointerId)
});

// Adapt canvas width and height to how it is resized (by the CSS width rule).
let scale = 1;

const resizeObserver = new ResizeObserver(entries => {
    canvas.width = entries[0].contentBoxSize[0].inlineSize;
    canvas.height = canvas.width / 2;

    scale = 600 / canvas.width;
});
resizeObserver.observe(canvas);

//////////////////////////////////////////////////

const context = canvas.getContext('2d')

function formatPositionNumber(number) {
  return number.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})
}

;(function main(lastTime, time) {
    window.requestAnimationFrame(main.bind(null, time))

    context.clearRect(0, 0, canvas.width, canvas.height)

    // Time can be used to calculate timing based actions, e.g. animations and game movements.
    if(!lastTime) return

    if(!lastMouseEvent) return

    // Make sure the x and y positions are on the canvas, enabling a pointer to start on the canvas and continue outside of it.
    const positionX = Math.min(canvas.width, Math.max(0, lastMouseEvent.clientX - canvas.getBoundingClientRect().left))
    const positionY = Math.min(canvas.height, Math.max(0, lastMouseEvent.clientY - canvas.getBoundingClientRect().top))

    const scaledPositionX = positionX * scale;
    const scaledPositionY = positionY * scale;

    const coordinatesText = `(${formatPositionNumber(scaledPositionX)},${formatPositionNumber(scaledPositionY)})`

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
