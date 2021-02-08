
import { store } from '../../index'

export default class StageOver extends Phaser.Scene {

  constructor() {
    super('StageOver')
  }

  public init(data: any) {
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('life', data.life) 
    this.registry.set('stage', data.stage) 
    this.registry.set('bird', data.bird) 
    this.registry.set('squi', data.squi) 
    this.registry.set('char', data.char) 
  }

  public create(): void {
    this.add.image(200, 0, 'gameOver').setOrigin(0, 0)
    this.time.addEvent({
      delay: 2000,
      callback: () => store.dispatch({
        type: 'GAME_DESTROY',
        isOver: true,
        score: this.registry.values.score || 0,
        life: this.registry.values.life || 0, 
        stage: this.registry.values.stage || 1,
        bird: this.registry.values.bird || 0,
        squi: this.registry.values.squi || 0,
      }),
      callbackScope: this,
      loop: false
    })
  }

  public update(): void {
    
  }

}
