import { TennisGame } from './TennisGame';
import Player from './Player';

export class TennisGame3 implements TennisGame {
  #player: Player;
  #opponent: Player;

  constructor(p1N: string, p2N: string) {
    this.#player = new Player(p1N);
    this.#opponent = new Player(p2N);
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') this.#player.getScore();
    else this.#opponent.getScore();
  }

  getScore(): string {
    if (this.isNotDeuce()) {
      const scores = ['Love', 'Fifteen', 'Thirty', 'Forty'];

      return this.isDeuce()
        ? `${scores[this.#player.score]}-All`
        : `${scores[this.#player.score]}-${scores[this.#opponent.score]}`;
    }

    if (this.isDeuce()) return 'Deuce';

    return this.isAdvantage()
      ? 'Advantage ' + this.getLeadPlayer()
      : 'Win for ' + this.getLeadPlayer();
  }

  isNotDeuce() {
    return (
      this.#player.score < 4 &&
      this.#opponent.score < 4 &&
      !(this.#player.score + this.#opponent.score === 6)
    );
  }

  isDeuce() {
    return this.#player.score === this.#opponent.score;
  }

  getLeadPlayer() {
    return this.#player.score > this.#opponent.score ? this.#player.name : this.#opponent.name;
  }

  isAdvantage() {
    return this.getScoreDifference() * this.getScoreDifference() === 1;
  }

  getScoreDifference() {
    return this.#player.score - this.#opponent.score;
  }
}
