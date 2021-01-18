export default class StageOver extends Phaser.Scene {
  
  constructor() {
    super('StageOver')
  }

  public init(data: any){
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('life', data.life) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('stage', data.stage) // 이전 scene에서 올라온 데이터 등록
  }

  public create(): void {
    this.add.image(0, 0, 'gameOver').setOrigin(0,0)
      
  }

  public update(): void {
    // store.dispatch
  }

}