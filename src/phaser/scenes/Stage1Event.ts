export default class Stage1Event extends Phaser.Scene {

  private popup!: any
  private button!: any
  private startButton!: any

  constructor() {
    super('Stage1Event')
  }

  public init(data: any) {
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('life', data.life)
    this.registry.set('stage', data.stage)
    this.registry.set('bird', data.bird)
    this.registry.set('squi', data.squi)
  }

  preload(): void {

    this.popup = this.add.graphics()
    this.popup.lineStyle(1, 0x2a275c)
    this.popup.fillStyle(0x00ff00, 0.6) // 배경색
    this.popup.strokeRect(25, 25, 750, 550)
    this.popup.fillRect(25, 25, 750, 550)
    //start button square
    this.button = this.add.graphics()
    this.button.lineStyle(1, 0x2a275c)
    this.button.fillStyle(0xf6d304, 0.5)
    this.button.strokeRect(325, 465, 150, 50)
    this.button.fillRect(325, 465, 150, 50)

    this.add
      .text(400, 83, "보너스 게임", {
        color: '#bfff00',
        fontSize: '40px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    this.add
      .text(
        400,
        200,
        '주어진 시간 30초 동안 최대한 많은 수의 카드를 뒤집으세요! 카드를 맞추면 체력이 회복됩니다!',
        {
          color: '#CED4D6',
          fontSize: '20px',
          fontStyle: 'bold',
          align: 'center',
          wordWrap: { width: 480, useAdvancedWrap: true },
        }
      )
      .setOrigin(0.5)

    this.add
      .text(400, 400, '작동방법 : 카드를 마우스로 클릭', {
        color: '#CED4D6',
        fontSize: '20px',
        fontStyle: 'bold',
        align: 'center',
      })
      .setOrigin(0.5)

    this.startButton = this.add
      .text(400, 490, 'Start', {
        color: '#2A275C',
        fontSize: '30px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
    this.startButton.setInteractive()
    this.startButton.on(
      'pointerdown',
      () => {
        console.log(3)
        this.scene.start('Stage1Eventgame', { score: this.registry.values.score, life: this.registry.values.life, stage: 1, bird: this.registry.values.bird, squi: this.registry.values.squi  })
      },
      this
    )
  }


}