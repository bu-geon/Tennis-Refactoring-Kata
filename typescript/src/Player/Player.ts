export default class Player {
  #name: string;
  #score = 0;

  constructor(name: string) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get score() {
    return this.#score;
  }

  getScore() {
    this.#score += 1;
  }
}
