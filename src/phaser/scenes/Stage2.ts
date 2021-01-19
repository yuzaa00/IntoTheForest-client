export default class Stage2 extends Phaser.Scene {
  
  constructor() {
    super('Stage2')
  }

  public init(data: any){
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터
    this.registry.set('life', data.life) // 이전 scene에서 올라온 데이터
    this.registry.set('life', data.stage) // 이전 scene에서 올라온 데이터
  }

  public update(): void {
    if (this.registry.values.time < 0) { // 30초 지난 후 콜백 실행
      this.time.addEvent({
        delay: 100,
        callback: () => {
          // this.add.tileSprite(0, 0, 800, 600, 'gameOver').setOrigin(0).setDepth(0)
          this.scene.start('Stage2Event', { score: this.registry.values.score + 10000, life: this.registry.values.life, stage: 3  })
      },
      callbackScope: this,
      })
    }
  }
}
