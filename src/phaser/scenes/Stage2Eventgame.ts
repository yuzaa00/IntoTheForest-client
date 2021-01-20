import { toUnicode } from "punycode"

type MyArray<T> = T[]

export default class Stage2Eventgame extends Phaser.Scene {
  private scoreText!: Phaser.GameObjects.BitmapText
  private lifeText!: Phaser.GameObjects.BitmapText
  private gameState: string =  'preparing'
  private livesCount: number = 3
  private enemies: any = undefined
  private holes: MyArray<object> = [
    { x: 250, y: 236 },
    { x: 154, y: 236 },
    { x: 63, y: 236 },
    { x: 63, y: 350 },
    { x: 154, y: 350 },
    { x: 250, y: 350 },
    { x: 63, y: 470 },
    { x: 154, y: 470 },
    { x: 250, y: 470 },
  ]
   
  
  constructor() {
    super('Stage2Eventgame')
  }

  public init(data: any){
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터
    this.registry.set('life', data.life) // 이전 scene에서 올라온 데이터
    this.registry.set('stage', data.stage)
    this.registry.set('time', 3000)
  }


  

  public preload(): void {
    this.add.image(0, 0, 'molebg').setOrigin(0,0)
  }

  public create(): void {
    this.enemies = this.physics.add.group()

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
    this.startGame()
  }

  public update(): void { 
    // console.log(this.registry.values.score, this.registry.values.life)
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
    var self = this
    if (this.gameState === 'playing' && this.registry.values.time < 28) {
      this.enemies.forEach(function (enemy: any) {
        if (enemy.input.pointerOver()
          && (self.game.input.activePointer.leftButtonDown() || self.game.input.pointers)
          && self.gameState === 'playing') {
          if (enemy.type === 'bomb') {
            // self.sounds.hit.play()
            self.livesCount = 0
            enemy.destroy()
            self.gameState = 'gameOver'
            // self.gameOverState()
          } else {
            self.enemyDestroy(enemy)
          }
        }
      })
    }
  }

  private worldTime(): void {  // 1초당 실행되는 함수 this.worldTimer 참조
      this.registry.values.dotori += 10
      this.scoreText.setText(`점수 ${this.registry.values.dotori}`)
      this.registry.values.time -= 100
      this.lifeText.setText(`남은 시간 ${this.registry.values.time}`)
  }

  private startGame() {

    this.gameState = 'playing'
    // game music
    // this.bgMusic = this.game.add.audio('blue_beat')
    // this.bgMusic.volume = 0.2
    // this.bgMusic.loop = true
    // this.bgMusic.play()

    var self = this
    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
      delay: 1700,
      callback:  function () {
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
     
    if(this.registry.values.time > 2000) {
      arr = [1,2,1,1,1,2,1,1,2]
    }

    else if(this.registry.values.time > 1000) {
      arr = [1,2,2,3,1,3,2,1,2]
    }
    
    else {
      arr = [1,3,3,4,1,2,3,2,2]
    }
    
    let totalEnemies = Math.floor((Math.random() * 10))
    var self = this
    var openSpaces = JSON.parse(JSON.stringify(this.holes))

    for (var x = 0; x < arr[totalEnemies]; x++) {
      var position = Math.floor((Math.random() * openSpaces.length))
      var openSpace = openSpaces[position]
      openSpaces.splice(position, 1)
      console.log(openSpace.x, openSpace.y)
      self.createEnemy(openSpace.x, openSpace.y)
    }
  }

  createEnemy(xPos: number, yPos: number) {
    var randomNumber = Math.floor((Math.random() * 100))
    var spriteType = ''
    if (randomNumber >= 50) {
      spriteType = 'mole'
    } else {
      spriteType = 'mole'
    }
    console.log('crEnemy', xPos, yPos)
    var sprite = this.enemies.create(xPos, yPos, spriteType)
    this.enemies.add(sprite)
    sprite.body.setAllowGravity(false)
    // console.log(sprite)
    // sprite.type = spriteType
    // sprite.state = 'spawing'
    // sprite.inputEnabled = true
    // sprite.setOrigin(0,0)
    sprite.alpha = 0
    console.log('4',sprite)
    var timeline = this.tweens.createTimeline()
    timeline.add({
      targets: sprite,
      alpha:  1 ,
      // alpha: { start: 0, to: 1 },
      // alpha: 1,
      // alpha: '+=1',
      ease: 'Bounce',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 300,
      repeat: 0,            // -1: infinity
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
    setTimeout(function() {
      sprite.destroy()
    }, 1200)
    return sprite
  }

  private enemyDestroy(enemy:any): void {
    // this.sound.smash.play()
    // this.scoreCount += 100
    enemy.destroy()
  }

}