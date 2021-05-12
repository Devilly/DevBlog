export async function load(url) {
    const result = new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => {
            resolve(image)
        })
        image.addEventListener('error', () => {
            reject(`The image for url ${url} could not be loaded`)
        })
        image.src = url
    })

    return result
}

export async function loadAll(urls) {
    return Promise.all(urls.map(url => load(url)))
}