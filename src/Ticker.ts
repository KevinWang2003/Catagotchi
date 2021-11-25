import Catagotchi from './app.js';

export default class Ticker {
  private lastTickTimeStamp: number;

  private interval: number;

  private catagotchi: Catagotchi;

  private status: boolean;

  /**
   * constructor
   *
   * @param catagotchi reference to game
   * @param interval interval
   */
  constructor(catagotchi: Catagotchi, interval: number) {
    this.catagotchi = catagotchi;
    this.interval = interval;
    document.getElementById('resume').addEventListener('click', () => {
      this.start();
    });
    document.getElementById('pause').addEventListener('click', () => {
      this.stopRunning();
    });
  }

  /**
   * Start the automatic updating process of this object
   */
  public startRunning(): void {
    // Set the last tick timestamp to current time
    this.lastTickTimeStamp = performance.now();
    // Request the browser to call the step method on next animation frame
    requestAnimationFrame(this.step);
  }

  /**
   * Starts Ticker
   */
  public start(): void {
    this.status = true;
    this.startRunning();
  }

  /**
   * Stops the ticker
   */
  public stopRunning(): void {
    this.status = false;
    console.log(this.status);
  }

  /**
   * This MUST be an arrow method in order to keep the `this` variable working
   * correctly. It will otherwise be overwritten by another object caused by
   * javascript scoping behaviour.
   *
   * @param timestamp a `DOMHighResTimeStamp` similar to the one returned by
   *   `performance.now()`, indicating the point in time when `requestAnimationFrame()`
   *   starts to execute callback functions
   */
  private step = (timestamp: number) => {
    // Check if it is time to perform the next Tick
    if (this.status === true) {
      if (timestamp - this.lastTickTimeStamp >= this.interval) {
        // Call the method of this object that needs to be called
        this.catagotchi.gameTick();
        this.lastTickTimeStamp = timestamp;
      }
    }
    // Request the browser to call the step method on next animation frame

    requestAnimationFrame(this.step);
  };
}
