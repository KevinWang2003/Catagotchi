export default class Cat {
  private alive: boolean;

  private mood: number;

  private energy: number;

  private hunger: number;

  /**
   * Constructor
   *
   * @param alive Health
   * @param mood Mood
   * @param energy Energy
   * @param hunger Hunger
   */
  constructor(
    alive: boolean,
    mood: number,
    energy: number,
    hunger: number,
  ) {
    this.alive = alive;
    this.mood = mood;
    this.energy = energy;
    this.hunger = hunger;
  }

  /**
   * dsd
   *
   * @param alive das
   */
  public setAlive(alive:boolean): void {
    this.alive = alive;
  }

  public getAlive(): boolean {
    return this.alive;
  }

  public setHunger(hunger:number): void {
    this.hunger = hunger;
  }

  public getHunger(): number {
    return this.hunger;
  }

  public setEnergy(energy:number): void {
    this.energy = energy;
  }

  public getEnergy(): number {
    return this.energy;
  }

  public setMood(mood:number): void {
    this.mood = mood;
  }

  public getMood(): number {
    return this.mood;
  }

  /**
   * Adds function to feed the cat
   */
  public feed(): void {
    if (this.hunger <= 90) {
      console.log('fed');
      this.hunger += 10;
      console.log(this.hunger);
    }
  }

  /**
   * Adds function to play with the cat
   */
  public play(): void {
    if (this.mood <= 90) {
      console.log('play');
      this.mood += 10;
    }
  }

  /**
   * Adds function to let the cat sleep
   */
  public sleep(): void {
    if (this.energy <= 90) {
      console.log('sleep');
      this.energy += 10;
    }
  }

  /**
   * Adds the function to let the cat meow
   */
  private meow = (): void => {
    const meowAudio = new Audio('../resources/meow.mp3');
    meowAudio.load();
    setTimeout(() => {
      meowAudio.play();
      setTimeout(() => {
        meowAudio.pause();
        meowAudio.currentTime = 0;
      }, 3000);
    });
    // const image = document.getElementById('image');
    // const imageElement = document.createElement('img');
    // imageElement.src = '../resources/lol.jpg';
    // image.append(imageElement);
    console.log('needs care');
  };

  private sleepyTime = (): void => {
    const audio = new Audio('../resources/sleepy.mp3');
    audio.load();
    setTimeout(() => {
      audio.play();
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 3000);
    });
  };

  /**
   * If cat dies this function is called.
   */
  private catDied(): void {
    const audio = new Audio('../resources/kreygasm.mp3');
    audio.load();
    audio.play();
    this.alive = false;
    // const image = document.getElementById('image');
    // const imageElement = document.createElement('img');
    // imageElement.src = '../resources/coffin-dance.gif';
    // image.append(imageElement);
    console.log('Cat Died');
  }

  /**
   * Reduces the stats
   */
  public reducer():void {
    this.mood -= Math.round(Math.random() * 10);
    this.hunger -= Math.round(Math.random() * 10);
    this.energy -= Math.round(Math.random() * 10);
    if (this.hunger < 10 || this.mood < 10) {
      this.meow();
    }
    if (this.energy < 10) {
      this.sleepyTime();
    }
    if (this.hunger <= 0 || this.energy <= 0) {
      this.catDied();
    }
  }
}
