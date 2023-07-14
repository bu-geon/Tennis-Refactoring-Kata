import { TennisGame } from './TennisGame';
import Player from './Player';

export class TennisGame1 implements TennisGame {
  #player: Player;
  #opponent: Player;

  constructor(player1Name: string, player2Name: string) {
    this.#player = new Player(player1Name);
    this.#opponent = new Player(player2Name);
  }

  wonPoint(playerName: string): void {
    if (playerName === this.#player.name) this.#player.getScore();
    else this.#opponent.getScore();
  }

  getScore(): string {
    if (this.isDeuce()) {
      return this.deuce();
    }

    if (this.isAdvantage()) {
      if (this.isAdvantageWithPlayer()) return this.advantage(this.#player);
      if (this.isAdvantageWithOpponent()) return this.advantage(this.#opponent);
      if (this.isPlayerWin()) return this.win(this.#player);
      return this.win(this.#opponent);
    }

    return this.score();
  }

  isDeuce() {
    return this.#player.score === this.#opponent.score;
  }

  deuce() {
    const deuces = ['Love-All', 'Fifteen-All', 'Thirty-All'];

    return deuces[this.#player.score] || 'Deuce';
  }

  isAdvantage() {
    return this.#player.score >= 4 || this.#opponent.score >= 4;
  }

  isAdvantageWithPlayer() {
    return this.#player.score - this.#opponent.score === 1;
  }

  isAdvantageWithOpponent() {
    return this.#player.score - this.#opponent.score === -1;
  }

  advantage(player: Player) {
    return `Advantage ${player.name}`;
  }

  isPlayerWin() {
    return this.#player.score - this.#opponent.score >= 2;
  }

  win(player: Player) {
    return `Win for ${player.name}`;
  }

  score() {
    const scores = ['Love', 'Fifteen', 'Thirty', 'Forty'];

    return `${scores[this.#player.score]}-${scores[this.#opponent.score]}`;
  }
}
