export default class Boot extends Phaser.Scene {

  constructor() {
    super('Boot')
  }

  preload(): void {

  }

  create (): void {

  }
  
  update (): void {
    this.scene.start('Loader');
  }
  
}

