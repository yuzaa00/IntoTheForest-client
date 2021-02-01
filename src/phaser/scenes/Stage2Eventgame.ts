import { store } from '../../index'

type MyArray<T> = T[]

export default class Stage2Eventgame extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.BitmapText
  private lifeText!: Phaser.GameObjects.BitmapText
  private gameState: string = 'preparing'
  private enemies!: Phaser.Physics.Arcade.Group
  private holes: MyArray<object> = [
    { x: 290 + 190, y: 200 },
    { x: 403 + 190, y: 200 },
    { x: 515 + 190, y: 200 },
    { x: 290 + 190, y: 294 },
    { x: 403 + 190, y: 294 },
    { x: 515 + 190, y: 294 },
    { x: 290 + 190, y: 394 },
    { x: 403 + 190, y: 394 },
    { x: 515 + 190, y: 394 },
  ]

  constructor() {
    super('Stage2Eventgame')
  }

  public init(data: any) {
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터
    this.registry.set('life', data.life)
    this.registry.set('stage', data.stage)
    this.registry.set('bird', data.bird)
    this.registry.set('squi', data.squi)
    this.registry.set('moleScore', 0)
    this.registry.set('time', 30)
  }

  public preload(): void {
    this.load.audio('moleClick', 'sound/effect/click.wav')
    this.add.image(0, 0, 'cardbg').setOrigin(0, 0).setDepth(0)
    this.add.image(370, 61, 'moleBG').setOrigin(0, 0).setDepth(0).setScale(1.4)
    this.sound.add('stage2-2_bgm').play({
      loop: true
    }) // 노래 재생하기
    this.sound.volume = 0.4
  }

  public create(): void {
    // store.dispatch({
    //   type: 'MUTE_MULTI_GAME'
    // })
    
    // if(store.getState().gameReducer.multi > 1) {
    //   this.game.sound.mute = true
    //   this.input.enabled = false
    // }

    // if(store.getState().gameReducer.multi === 4) {
    //   store.dispatch({
    //     type: 'MUTE_MULTI_GAME_RESET'
    //   })
    // }

    this.enemies = this.physics.add.group()

    this.lifeText = this.add // 라이프 텍스트 생성
      .bitmapText(30, 30, 'font', `남은 시간 ${this.registry.values.time}`)
      .setDepth(6)

    this.scoreText = this.add // 점수 텍스트 생성
      .bitmapText(1000, 30, 'font', `점수 ${this.registry.values.moleScore}`)
      .setDepth(6)

    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
      delay: 1000,
      callback: this.worldTime,
      callbackScope: this,
      loop: true,
    })
    this.startGame()
  }

  public update(): void {
    if (this.registry.values.time < 0) { // 30초 지난 후 콜백 실행
      this.time.addEvent({
        delay: 100,
        callback: () => {
          this.game.sound.stopAll()
          this.scene.start('Stage3', { 
            score: this.registry.values.score, 
            life: this.registry.values.life, 
            stage: 3,
            bird: this.registry.values.bird,
            squi: this.registry.values.squi 
          })
        },
        callbackScope: this,
      })
    }
    let self = this

    if (this.gameState === 'playing' && this.registry.values.time < 2900) {
      // console.log('?', this.enemies)
      // this.enemies.children.iterate(function (enemy: any) {
      //   console.log('야호', enemy)
      //   if (enemy.input.pointerOver()
      //     && (self.game.input.activePointer.leftButtonDown() || self.game.input.pointers)
      //     && self.gameState === 'playing') {
      //     if (enemy.type === 'bomb') {
      //       // self.sounds.hit.play()
      //       self.livesCount = 0
      //       enemy.destroy()
      //       self.gameState = 'gameOver'
      //       // self.gameOverState()
      //     } else {
      //       self.enemyDestroy(enemy)
      //     }
      //   }
      // })
    }
  }

  private worldTime(): void {  // 1초당 실행되는 함수 this.worldTimer 참조
    this.registry.values.time -= 1
    this.lifeText.setText(`남은 시간 ${this.registry.values.time}`)
  }

  private startGame() {
    this.gameState = 'playing'
    let self = this
    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
      delay: 1700,
      callback: function () {
        if (self.gameState === 'playing') {
          self.showEnemies()
        }
      },
      callbackScope: this,
      loop: true,
    })
    self.showEnemies()
  }

  private showEnemies() {
    let arr = []

    if (this.registry.values.time > 20) arr = [1, 1, 1, 1, 1, 2, 2, 2, 2]
    else if (this.registry.values.time > 10)  arr = [1, 1, 2, 2, 2, 2, 3, 3, 3]
    else  arr = [2, 2, 3, 3, 3, 3, 4, 4, 5]
    
    let totalEnemies = Math.floor((Math.random() * 10))
    let openSpaces = JSON.parse(JSON.stringify(this.holes))

    for (let x = 0; x < arr[totalEnemies]; x++) {
      let position = Math.floor((Math.random() * openSpaces.length))
      let openSpace = openSpaces[position]
      openSpaces.splice(position, 1)
      this.createEnemy(openSpace.x, openSpace.y)
    }
  }

  createEnemy(xPos: number, yPos: number) {
    let randomNumber = Math.floor((Math.random() * 100))
    let spriteType = ''
    if (randomNumber >= 50) {
      spriteType = 'mole'
    } else {
      spriteType = 'mole'
    }
    
    let sprite = this.enemies.create(xPos, yPos, spriteType)
    this.enemies.add(sprite)
    sprite.body.setAllowGravity(false)
    sprite.alpha = 0
    sprite.setInteractive().on('pointerdown', () => {
      this.sound.add('heat').play()
      this.registry.values.moleScore += 100
      this.scoreText.setText(`점수 ${this.registry.values.moleScore}`)
      sprite.destroy()
    })
    let timeline = this.tweens.createTimeline()
    timeline.add({
      targets: sprite,
      alpha: 1,
      ease: 'Elastic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 300,
      repeat: 0,
      yoyo: false
    })
    // timeline.add({
    //   targets: sprite,
    //   alpha: 0.1,
    //   // alpha: { start: 0, to: 1 },
    //   // alpha: 1,
    //   // alpha: '+=1',
    //   ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    //   duration: 300,
    //   repeat: 0,            // -1: infinity
    //   yoyo: false
    // })
    timeline.play()
    setTimeout(function () {
      sprite.destroy()
    }, 1200)
    return sprite
  }

  private enemyDestroy(enemy: any): void {
    // this.sound.smash.play()
    // this.scoreCount += 100
    enemy.destroy()
  }
}