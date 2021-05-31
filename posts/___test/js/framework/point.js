export default class Point {
  #X
  #Y

  constructor(X, Y) {
    this.#X = X
    this.#Y = Y
  }

  get X() {
    return this.#X
  }

  get Y() {
    return this.#Y 
  }
}