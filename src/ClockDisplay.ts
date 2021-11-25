import Catagotchi from './app.js';
import NumberDisplay from './NumberDisplay.js';
import Ticker from './Ticker.js';

/**
 * The ClockDisplay class implements a digital clock display for a
 * European-style 24 hour clock. The clock shows hours and minutes. The
 * range of the clock is 00:00 (midnight) to 23:59 (one minute before
 * midnight).
 *
 * The clock display receives "ticks" (via the timeTick method) every minute
 * and reacts by incrementing the display. This is done in the usual clock
 * fashion: the hour increments when the minutes roll over to zero.
 *
 * @author Michael Kölling, David J. Barnes and BugSlayer
 */
export default class ClockDisplay {
  private hours: NumberDisplay;

  private minutes: NumberDisplay;

  private seconds: NumberDisplay;

  private catagotchi: Catagotchi;

  private output: HTMLElement;

  /**
   * Construct a new ClockDisplay instance
   *
   * @param output The HTMLElement where the clock output should
   *   be displayed
   */
  public constructor(output: HTMLElement) {
    this.output = output;
    this.hours = new NumberDisplay(24);
    this.minutes = new NumberDisplay(60);
    this.seconds = new NumberDisplay(60);
    this.updateDisplay();
  }

  /**
   * This method should get called once every minute - it makes the clock display
   * go one minute forward.
   */
  public timeTick(): void {
    this.seconds.increment();
    if (this.seconds.getValue() === 0) {
      this.minutes.increment();
      if (this.minutes.getValue() === 0) {
        this.hours.increment();
      }
    }
    this.updateDisplay();
  }

  private updateDisplay() {
    const displayString = `${this.hours.getStringValue()}:${this.minutes.getStringValue()}:${this.seconds.getStringValue()}`;

    this.output.innerText = displayString;
  }
}
