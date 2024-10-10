export default class GamePlay {
  constructor(board, hero) {
    this.board = board;
    this.boardSize = 8;
    this.hero = hero;
    this.activeHero = null;
  }

  init() {
    this.redrawBoard();
    this.start();
  }

  redrawBoard() {
    const board = this.board.getBoard(this.boardSize);
    const title = document.createElement('h1');    
    const body = document.querySelector('body');
    const container = document.createElement('div');    
    container.classList.add('container');
    title.classList.add('title');
    container.appendChild(title);
    container.appendChild(board);
    body.insertBefore(container, body.firstChild);
    this.cells = [...board.children];
  }

  generateposition() {
    const position = Math.floor(Math.random() * this.boardSize ** 2);
    if (position === this.position) {
      this.generateposition();
      return;
    }
    this.deletedHero();
    this.position = position;
    this.riseHero();
  }

  deletedHero() {
    if (this.activeHero === null) {
      return;
    }
    this.cells[this.position].firstChild.remove();
  }

  riseHero() {
    this.activeHero = this.hero.getHero();
    this.cells[this.position].appendChild(this.activeHero);
  }

  start() {
    setInterval(() => {
      this.generateposition();
    }, 1000);
  }
}
