import preloadBar from "../helper/preloadBar"
import { store } from '../../index'

export default class Loader extends Phaser.Scene {
  private loader!: preloadBar

  constructor() {
    super('Loader')
  }

  preload(): void {
  }

  create(): void {
    const char = store.getState().choiceReducer.char

    this.add.graphics()
      .fillStyle(0xffffff) 
      .fillRect(0, 0, 1200, 600)
      .setDepth(0)
      
    this.add.image(300, 0, 'forestLogo').setOrigin(0, 0).setScale(1.2).setDepth(1)
    
    this.loader = new preloadBar(this, 315, 520)

    this.time.addEvent({
      delay: 40,
      callback: () => {
        let next = this.loader.decrease(-1.4)
        if (next === 'start') {
          this.time.addEvent({
            delay: 1400,
            callback: () => {
              this.scene.stop()
              this.scene.start('Stage1', { char: char })
            },
            callbackScope: this,
            loop: false
          })
        }
      },
      callbackScope: this,
      loop: true,
    })
  }

}