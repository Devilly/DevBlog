const { default: CustomComponent } = await import('./framework/customComponent.js')

export default class ScoreComponent extends CustomComponent {
    #score = 0

    update() {
        this.entity.components.TextComponent.text = `score: ${this.#score}`
    }

    get score() {
        return this.#score
    }

    set score(score) {
        this.#score = score
    }
}