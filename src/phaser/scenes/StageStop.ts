import Phaser from 'phaser'

export default class StageStop extends Phaser.Scene {
  private mainChaname: Array<string> = ['dog', '', '']
  private num: number = 0
  public player: any
  public x: number = 0

  constructor() {
    super('StageStop') 
  }  
  // { x: player.x, score: this.registry.values.score, life: this.registry.values.life, bird: this.birdArr.length, squi: this.squiArr.length, string: 'Stage1'})
  public init(data: any): void {
    this.registry.set('mute', data.mute)
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('life', data.life) 
    this.registry.set('bird', data.bird || 0)
    this.registry.set('squi', data.squi || 0) 
    this.registry.set('stage', data.stage || '') 
    this.registry.set('char', data.char || '') 
  }

  public preload(): void {
    
    const stage = this.registry.values.stage
    const char = this.registry.values.char
    const mute = this.registry.values.mute

    this.player = this.physics.add.sprite(this.cameras.main.scrollX + 600, 270, char).setScale(0.5).setDepth(3)
    this.player.setCollideWorldBounds(true)
    this.anims.create({ // 플레이어 오른쪽 동작시 5번 ~ 8번 프레임 8fps로 재생
      key: 'right',
      frames: this.anims.generateFrameNumbers('dog', { start: 1, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.player.anims.play('right', true)

    this.add.graphics()
    .lineStyle(1, 0x2a275c)
    .fillStyle(0x000000, 0.6) // 배경색
    .strokeRect(this.cameras.main.scrollX + 150, 25, 900, 550)
    .fillRect(this.cameras.main.scrollX + 150, 25, 900, 550)
    
    //start button square
    this.add.graphics()
    .lineStyle(1, 0x2a275c)
    .fillStyle(0xf6d304, 0.5)
    .strokeRect(this.cameras.main.scrollX + 300, 465, 180, 50)
    .fillRect(this.cameras.main.scrollX + 300, 465, 180, 50)

    this.add.graphics()
    .lineStyle(1, 0x2a275c)
    .fillStyle(0xFF5675, 0.5)
    .strokeRect(this.cameras.main.scrollX + 700, 465, 180, 50)
    .fillRect(this.cameras.main.scrollX + 700, 465, 180, 50)

    this.add
      .text(this.cameras.main.scrollX + 600, 83, "일시 정지", {
        color: '#bfff00',
        fontSize: '40px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)

    this.add
      .text(this.cameras.main.scrollX + 900, 200, '', {
        color: '#CED4D6',
        fontSize: '30px',
        fontStyle: 'bold',
        align: 'center',
      })
      .setOrigin(0.5)

    this.add
      .text(this.cameras.main.scrollX + 390, 490, '계속하기', {
        color: '#2A275C',
        fontSize: '30px',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setInteractive()
      .on(
      'pointerdown',
      () => {
        this.scene.resume(stage)
        this.scene.stop('StageStop')
      },
      this
    )
    this.add
    .text(this.cameras.main.scrollX + 790, 490, mute ? '소리켜기' : '소리끄기' , {
      color: '#2A275C',
      fontSize: '30px',
      fontStyle: 'bold',
    })
    .setOrigin(0.5)
    .setInteractive()
    .on(
    'pointerdown',
    () => {
      this.scene.resume(stage)
      mute ? this.sound.mute = false : this.sound.mute = true
      this.scene.stop('StageStop')
    },
    this
  )
  }
  // this.sound.mute = true
    public create(): void {
      this.player.body.setAllowGravity(false)
    }
}