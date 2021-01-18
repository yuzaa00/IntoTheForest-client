export default class Stage2Eventgame extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.BitmapText
  private lifeText!: Phaser.GameObjects.BitmapText

  constructor() {
    super('Stage2Eventgame')
  }

  public init(data: any){
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터
    this.registry.set('life', data.life) // 이전 scene에서 올라온 데이터
    this.registry.set('time', 3000)
    this.registry.set('card', 0)
  }

  public create(): void {
    this.lifeText = this.add // 라이프 텍스트 생성
    .bitmapText(30, 30, 'font', `남은 시간 ${this.registry.values.time}`)
    .setDepth(6)
    
    this.scoreText = this.add // 점수 텍스트 생성
    .bitmapText(530, 30, 'font', `점수 ${this.registry.values.dotori}`)
    .setDepth(6)
  
    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
        delay: 1000,
        callback: this.worldTime,
        callbackScope: this,
        loop: true,
    })
  }

  public update(): void {
    console.log(this.registry.values.score, this.registry.values.life)
    if (this.registry.values.time < 0) { // 30초 지난 후 콜백 실행
        this.time.addEvent({
          delay: 100,
          callback: () => {
            // this.add.tileSprite(0, 0, 800, 600, 'gameOver').setOrigin(0).setDepth(0)
            this.scene.start('Stage3', { score: this.registry.values.score, life: this.registry.values.life  })
          },
          callbackScope: this,
        })
    }
  }

  private worldTime(): void {  // 1초당 실행되는 함수 this.worldTimer 참조
      this.registry.values.dotori += 10
      this.scoreText.setText(`점수 ${this.registry.values.dotori}`)
      this.registry.values.time -= 100
      this.lifeText.setText(`남은 시간 ${this.registry.values.time}`)
  }
}
