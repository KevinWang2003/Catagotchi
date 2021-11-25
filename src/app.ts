import Cat from './cat.js';
import ClockDisplay from './ClockDisplay.js';
import KeyListener from './keylistener.js';
import Ticker from './Ticker.js';

export default class Catagotchi {
  private cat: Cat;

  private keylistener: KeyListener;

  private ticker: Ticker;

  private clockDisplay: ClockDisplay;

  private readonly canvas: HTMLCanvasElement;

  private readonly ctx: CanvasRenderingContext2D;

  private background: HTMLImageElement;

  private lastTickTimeStamp : number;

  /**
   * Creates the Catagotchi game. Sets all of the attributes of the
   * cat (mood, hunger, sleep, aliveness) to their default states.
   * Once set, the DOM elements will be gathered and updated.
   * Finally, the cat will meow to indicate that it is indeed alive!
   *
   * @param canvas draws art
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // this.gameDOM = gameDOM;
    this.cat = new Cat(true, 75, 75, 75);
    this.keylistener = new KeyListener();
    this.background = this.loadNewImage('../resources/HAPPY CAT.png');
    this.ticker = new Ticker(this, 2000);
    this.clockDisplay = new ClockDisplay(document.getElementById('timer'));
    this.start();
  }

  /**
   * Starts the game
   */
  public start(): void {
    this.ticker.start();
  }

  /**
   * Called for every game tick.
   */
  public gameTick(): void {
    if (this.cat.getAlive() === false) {
      this.background = this.loadNewImage('../resources/DEAD CAT.png');
      this.updateDisplays();
    }
    if (this.cat.getAlive() === true) {
      this.clockDisplay.timeTick();
      this.cat.reducer();
      if ((this.cat.getHunger() <= 25 || this.cat.getMood() <= 25) && this.cat.getEnergy() > 25) {
        this.background = this.loadNewImage('../resources/GRUMPY CAT.png');
      }
      if (this.cat.getEnergy() <= 25 && this.cat.getHunger() > 25 && this.cat.getMood() > 25) {
        this.background = this.loadNewImage('../resources/SLEEPY CAT.png');
      }
      if (this.cat.getHunger() > 25 && this.cat.getEnergy() > 25 && this.cat.getMood() > 25) {
        this.background = this.loadNewImage('../resources/NORMAL CAT.png');
      }
      if (this.cat.getHunger() >= 50 && this.cat.getEnergy() >= 50 && this.cat.getMood() >= 50) {
        this.background = this.loadNewImage('../resources/HAPPY CAT.png');
      }
      this.updateDisplays();
      this.keyboardActivity();
    }
  }

  private keyboardActivity() {
    if (this.keylistener.isKeyDown(KeyListener.KEY_P)) {
      this.cat.play();
      this.updateDisplays();
    }
    if (this.keylistener.isKeyDown(KeyListener.KEY_S)) {
      this.cat.sleep();
      this.updateDisplays();
    }
    if (this.keylistener.isKeyDown(KeyListener.KEY_F)) {
      this.cat.feed();
      this.updateDisplays();
    }
  }

  /**
   * Function to update the displays
   */
  private updateDisplays(): void {
    this.clearScreen();

    this.ctx.drawImage(
      this.background,
      100,
      100,
      this.background.width / 1.75,
      this.canvas.height / 1.75,
    );
    this.writeTextToCanvas(`Energy: ${this.cat.getEnergy()}`, 100, 75);
    this.writeTextToCanvas(`Hunger: ${this.cat.getHunger()}`, 100, 100);
    this.writeTextToCanvas(`Mood: ${this.cat.getMood()}`, 100, 125);
  }

  private writeTextToCanvas(
    text: string,
    xCoordinate: number,
    yCoordinate: number,
    fontSize = 20,
    color = 'red',
    alignment: CanvasTextAlign = 'center',
  ) {
    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  // eslint-disable-next-line class-methods-use-this
  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

  /**
   * Removes all painted things from the canvas. Starts at the top-left pixel
   * of the canvas and stops at the bottom-right pixel.
   */
  private clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

const init = () => {
  const catGame = new Catagotchi(document.querySelector('#canvas'));
  catGame.start();
};

window.addEventListener('load', init);
