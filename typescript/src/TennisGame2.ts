import { TennisGame } from './TennisGame';
import Player from './Player';

export class TennisGame2 implements TennisGame {
  #player: Player;
  #opponent: Player;

  constructor(player1Name: string, player2Name: string) {
    this.#player = new Player(player1Name);
    this.#opponent = new Player(player2Name);
  }

  getScore(): string {
    const scores = ['Love', 'Fifteen', 'Thirty', 'Forty'];

    if (this.isDeuce()) {
      const score = this.#player.score;
      if (score < 3) return `${scores[score]}-All`;
      return 'Deuce';
    }

    if (this.isSomeoneLeadSet()) {
      return `${scores[this.#player.score]}-${scores[this.#opponent.score]}`;
    }

    if (this.isPlayerAdvantage()) {
      return this.advantage(this.#player);
    }

    if (this.isOpponentAdvantage()) {
      return this.advantage(this.#opponent);
    }

    if (this.isPlayerWin()) return this.win(this.#player);
    return this.win(this.#opponent);
  }

  isDeuce() {
    return this.#player.score === this.#opponent.score;
  }

  isSomeoneLeadSet() {
    return (
      this.#player.score < 4 &&
      this.#opponent.score < 4 &&
      this.#player.score !== this.#opponent.score
    );
  }

  isPlayerAdvantage() {
    return (
      this.#player.score > this.#opponent.score &&
      this.#opponent.score >= 3 &&
      Math.abs(this.getScoreDifference()) === 1
    );
  }

  isOpponentAdvantage() {
    return (
      this.#opponent.score > this.#player.score &&
      this.#player.score >= 3 &&
      Math.abs(this.getScoreDifference()) === 1
    );
  }

  advantage(player: Player) {
    return `Advantage ${player.name}`;
  }

  isPlayerWin() {
    return this.#player.score >= 4 && this.getScoreDifference() >= 2;
  }

  getScoreDifference() {
    return this.#player.score - this.#opponent.score;
  }

  win(player: Player) {
    return `Win for ${player.name}`;
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1') this.#player.getScore();
    else this.#opponent.getScore();
  }
}
