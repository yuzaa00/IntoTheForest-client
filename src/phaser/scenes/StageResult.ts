import Phaser, { Scene } from 'phaser'
import { store } from '../../index'

export default class StageResult extends Phaser.Scene {
  private player!: any
  private startButton!: any
  private worldTimer: any
  private mainStage: Array<string> = ['Stage1Event', 'Stage2Event', 'StageEndcredits']
  private num: number = 0
  private scoreText: any
  private lifeText: any
  private addNum: number = 0

  constructor() {
    super('StageResult')
  }

  public init(data: any): void {
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('life', data.life || 10000)
    this.registry.set('stage', data.stage - 2 || 0)
    this.registry.set('bird', data.bird || 0)
    this.registry.set('squi', data.squi || 0)
    this.registry.set('char', data.char || 'dog')
    this.registry.set('start', 3)
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

    this.add
      .text(600, 83, `⚡스테이지 ${this.registry.values.stage + 1} 통과⚡️`, {
        color: '#ffffff',
        fontSize: '45px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    this.lifeText = this.add
      .text(800, 250, '', {
        color: '#fbff00',
        fontSize: '35px',
        fontStyle: 'bold',
        align: 'center',
      })
      .setOrigin(0.5)
  }

  public create(): void {
    this.addNum = this.registry.values.life * 0.0055555
    this.worldTimer = this.time.addEvent({ // 게임에서 시간 이벤트 등록, n초당 콜백 호출
      delay: 10,
      callback: this.lifePlus,
      callbackScope: this,
      loop: true,
    })
    this.player.body.setAllowGravity(false)
  }

  public update(): void {
    if (this.registry.values.start === 0) {
      this.time.addEvent({ // 게임에서 시간 이벤트 등록, n초당 콜백 호출
        delay: 1000,
        callback: this.nextStage,
        callbackScope: this,
        loop: false,
      })
    }
  }

  private lifePlus(): void {
    if (this.registry.values.life > this.num) {
      this.num += this.addNum / 3
      this.lifeText.setText(`라이프 ${~~this.num} 점`)
      this.num += this.addNum / 3
      this.lifeText.setText(`라이프 ${~~this.num} 점`)
      this.num += this.addNum / 3
      this.lifeText.setText(`라이프 ${~~this.num} 점`)
    }

    else if (this.registry.values.life < this.num) {
      this.num = this.registry.values.life
      this.lifeText.setText(`라이프 ${this.num} 점`)
    }

    else if (this.registry.values.life === this.num) {
      this.num = 0
      this.worldTimer.destroy()
      this.scoreText = this.add
        .text(800, 350, '', {
          color: '#fbff00',
          fontSize: '35px',
          fontStyle: 'bold',
          align: 'center',
          wordWrap: { width: 480, useAdvancedWrap: true },
        })
        .setOrigin(0.5)
      this.addNum = this.registry.values.score * 0.005
      this.worldTimer = this.time.addEvent({ // 게임에서 시간 이벤트 등록, n초당 콜백 호출
        delay: 10,
        callback: this.scorePlus,
        callbackScope: this,
        loop: true,
      })
    }
  }

  private scorePlus(): void {
    if (this.registry.values.score > this.num) {
      this.num += this.addNum / 3
      this.scoreText.setText(`스코어 ${Math.floor(this.num)} 점`)
      this.num += this.addNum / 3
      this.scoreText.setText(`스코어 ${Math.floor(this.num)} 점`)
      this.num += this.addNum / 3
      this.scoreText.setText(`스코어 ${Math.floor(this.num)} 점`)
    }
    else if (this.registry.values.score < this.num) {
      this.num = this.registry.values.score
      this.scoreText.setText(`스코어 ${this.num} 점`)
    }
    else if (this.registry.values.score === this.num) {
      this.num = 0
      this.addNum = 0
      this.worldTimer.destroy()
      this.time.addEvent({
        delay: 500,
        callback: () => {
          this.startButton = this.add
            .text(590, 515, `다음으로.. ${this.registry.values.start}`, {
              color: '#ffffff',
              fontSize: '35px',
              fontStyle: 'bold',
            })
            .setOrigin(0.5)
          this.time.addEvent({ // 게임에서 시간 이벤트 등록, n초당 콜백 호출
            delay: 1000,
            callback: () => {
              if (this.registry.values.start > 0) {
                this.registry.values.start--
                this.startButton.setText(`다음으로.. ${this.registry.values.start}`)
              }
            },
            callbackScope: this,
            loop: true,
          })
        },
        callbackScope: this,
        loop: false
      })
    }
  }

  private nextStage(): void {
    if (this.registry.values.stage === 2) {
      store.dispatch({
        type: 'GAME_DESTROY',
        isOver: false,
        score: this.registry.values.score + (this.registry.values.bird + this.registry.values.squi) * 500 + this.registry.values.life,
        life: this.registry.values.life || 0,
        stage: this.registry.values.stage + 1 || 1,
        bird: this.registry.values.bird || 0,
        squi: this.registry.values.squi || 0,
      })
    }
    this.scene.start(this.mainStage[this.registry.values.stage], {
      score: this.registry.values.score,
      life: this.registry.values.life,
      stage: this.registry.values.stage,
      bird: this.registry.values.bird,
      squi: this.registry.values.squi
    })
  }
}