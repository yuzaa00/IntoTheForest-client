import Phaser, { Scene } from 'phaser'
import { store } from '../../index'

export default class StageResult extends Phaser.Scene {
  private player!: any
  private popup!: any
  private button!: any
  private startButton!: any
  private worldTimer: any
  private mainStage: Array<string> = ['Stage1Event', 'Stage2Event', 'StageEndcredits']
  private multiStage: Array<string> = ['Stage1', 'Stage2', 'Stage3']
  private num: number = 0
  private scoreText: any
  private lifeText: any
  private subText: any
  private addNum: number = 0

  constructor() {
    super('StageResult')
  }

  public init(data: any): void {
    this.registry.set('score', data.score || 30000) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('life', data.life || 10000)
    this.registry.set('stage', data.stage - 2 || 0)
    this.registry.set('bird', data.bird || 0)
    this.registry.set('squi', data.squi || 0)
    this.registry.set('char', data.char || 0)
  }

  public preload(): void {
    this.player = this.physics.add.sprite(400, 300, this.registry.values.char).setScale(0.6).setDepth(3)
    this.player.setCollideWorldBounds(true)
    this.anims.create({ // 플레이어 오른쪽 동작시 5번 ~ 8번 프레임 8fps로 재생
      key: 'right',
      frames: this.anims.generateFrameNumbers(this.registry.values.char, { start: 1, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.player.anims.play('right', true)
    this.addNum = Math.floor(this.registry.values.life / 1000 / 2)

    this.popup = this.add.graphics()
    this.popup.lineStyle(1, 0x2a275c)
    this.popup.fillStyle(0x00ff00, 0.6) // 배경색
    this.popup.strokeRect(225, 25, 750, 550)
    this.popup.fillRect(225, 25, 750, 550)
    //start button square
    this.button = this.add.graphics()
    this.button.lineStyle(1, 0x2a275c)
    this.button.fillStyle(0xf6d304, 0.5)
    this.button.strokeRect(525, 465, 150, 50)
    this.button.fillRect(525, 465, 150, 50)

    this.add
      .text(600, 83, "결과 화면", {
        color: '#bfff00',
        fontSize: '40px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    this.lifeText = this.add
      .text(750, 200, '', {
        color: '#CED4D6',
        fontSize: '30px',
        fontStyle: 'bold',
        align: 'center',
      })
      .setOrigin(0.5)

    this.scoreText = this.add
      .text(
        750,
        300,
        `Score ${this.num} 점`,
        {
          color: '#CED4D6',
          fontSize: '30px',
          fontStyle: 'bold',
          align: 'center',
          wordWrap: { width: 480, useAdvancedWrap: true },
        }
      )
      .setOrigin(0.5)

    this.startButton = this.add
      .text(600, 490, 'Start', {
        color: '#2A275C',
        fontSize: '30px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
    this.startButton.setInteractive()
  }

  public create(): void {
    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
      delay: 4000,
      callback: this.nextStage,
      callbackScope: this,
      loop: false,
    })

    console.log(5000 / (this.registry.values.score / 111))
    this.worldTimer = this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
      delay: 5000 / (this.registry.values.score / 111),
      callback: this.lifePlus,
      callbackScope: this,
      loop: true,
    })
    this.player.body.setAllowGravity(false)
  }

  private lifePlus(): void {

    if (this.registry.values.life > this.num) {
      this.num += this.addNum
      this.lifeText.setText(`Life ${this.num} HP`)
      this.num += this.addNum * 10
      this.lifeText.setText(`Life ${this.num} HP`)
      this.num += this.addNum * 30
      this.lifeText.setText(`Life ${this.num} HP`)
    }

    else if (this.registry.values.life < this.num) {
      this.num = this.registry.values.life
      this.lifeText.setText(`Life ${this.num} HP`)
    }

    else if (this.registry.values.life === this.num) {
      this.addNum = this.registry.values.score / 10000
      this.num = 0
      this.worldTimer.destroy()
      this.worldTimer = this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
        delay: 5000 / (this.registry.values.score / 111),
        callback: this.scorePlus,
        callbackScope: this,
        loop: true,
      })
    }
  }

  private scorePlus(): void {
    if (this.registry.values.score > this.num) {
      this.num += this.addNum
      this.scoreText.setText(`Score ${this.num} 점`)
      this.num += this.addNum * 10
      this.scoreText.setText(`Score ${this.num} 점`)
      this.num += this.addNum * 100
      this.scoreText.setText(`Score ${this.num} 점`)
    }
    else if (this.registry.values.score < this.num) {
      this.num = this.registry.values.score
      this.scoreText.setText(`Score ${this.num} 점`)
    }
    else if (this.registry.values.score === this.num) {

    }
  }

  private nextStage(): void {
    const mode = store.getState().gameReducer.mode
    console.log('-----------', mode)
    if (mode === 'M2' || mode === 'M4') {
      this.game.sound.stopAll()
      this.scene.start(this.multiStage[this.registry.values.stage + 1], {
        score: this.registry.values.score,
        life: this.registry.values.life,
        stage: this.registry.values.stage,
        bird: this.registry.values.bird,
        squi: this.registry.values.squi
      })
    }
    else {
      this.scene.start(this.mainStage[this.registry.values.stage], {
        score: this.registry.values.score,
        life: this.registry.values.life,
        stage: this.registry.values.stage,
        bird: this.registry.values.bird,
        squi: this.registry.values.squi
      })
    }
  }
}