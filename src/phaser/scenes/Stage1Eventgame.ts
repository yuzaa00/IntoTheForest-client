import Card from '../helper/card'
let target: any

let attempts = 0;
let waitForNewRound = false;
let score: any

const images = {
  "back.png": "b9a80f88810fc29b34f58e235214e144.png",
  "card1.png": "9bcf0b24503994316476c7c003e5222f.png",
  "card2.png": "4a9bbf837385923213b414f3535e4037.png",
  "card3.png": "c51db3d76ce12d85f6f71344aaa93fce.png",
  "card4.png": "6b48715741c7f18fe74e7c66b8f1f49d.png",
  "card5.png": "f5ffa19121a0bb258401d2700c05d202.png",
  "card6.png": "5e2b9c97ed48a517c6d111583d110106.png",
  "card7.png": "af02febc13262ff971680447e93e31b8.png",
  "card8.png": "2f9853ca3389e87936ed37d1b076bd01.png",
  "front.png": "7ab6fa294abdb99329c00176e38eab0d.png"
 }

export default class Stage1Eventgame extends Phaser.Scene { // 다람쥐 도토리 줍기 미니게임
  private scoreText!: Phaser.GameObjects.BitmapText
  private lifeText!: Phaser.GameObjects.BitmapText
  private cards: any[] = []
  private selectedCards: any[] = []

  constructor() {
    super('Stage1Eventgame');
  }

  public init(data: any){
    this.registry.set('score', data.score) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('life', data.life) 
    this.registry.set('stage', data.stage) 
    this.registry.set('bird', data.bird) 
    this.registry.set('squi', data.squi) 
    this.registry.set('time', 30)
    this.registry.set('recovery', 0)
  }
  
  preload(): void {
    this.load.image('card1.png', 'images/card/card1.png')
    this.load.image('card2.png', 'images/card/card2.png')
    this.load.image('card3.png', 'images/card/card3.png')
    this.load.image('card4.png', 'images/card/card4.png')
    this.load.image('card5.png', 'images/card/card5.png')
    this.load.image('card6.png', 'images/card/card6.png')
    this.load.image('card7.png', 'images/card/card7.png')
    this.load.image('card8.png', 'images/card/card8.png')
    this.load.image('front.png', 'images/card/front.png')
    this.sound.add('stage1-2_bgm').play({
      loop: true
    }) // 노래 재생하기

    this.newRound()
  } 

  public create(): void {
    
    this.add.image(0, 0, 'cardbg').setOrigin(0,0).setDepth(0)
    this.lifeText = this.add // 라이프 텍스트 생성
    .bitmapText(30, 30, 'font', `남은 시간 ${this.registry.values.time}`)
    .setDepth(6)

    this.time.addEvent({ // 게임에서 시간 이벤트 등록, 1초당 콜백 호출 (콜백내용은 초당 체력 감소)
      delay: 1000,
      callback: this.worldTime,
      callbackScope: this,
      loop: true,
    })

    const MAX_CARD_PER_LINE = 4;
    const PAIRS = 8;
    const H_OFFSET = 120;
    const V_OFFSET = 120;
    const INITIAL_X = 225;
    const INITIAL_Y = 127;
    const lines = 4
    
    const numberOfCards = PAIRS * 2;
    const positions = [];
    
    const imageNames = Object.keys(images).filter((name) => {
      return name.includes('card');
    }).slice(0, PAIRS);
    
    let total = numberOfCards;
    // positions.push({
    //   x: 10,
    //   y: 10
    // })
    // positions.push({
    //   x: 90,
    //   y: 90
    // })
    for (let line = 0; line < lines; line++) {
      for (let pos = 0; pos < MAX_CARD_PER_LINE; pos++) {
        if (total > 0) { 
          positions.push({
            x: INITIAL_X + (H_OFFSET * pos),
            y: INITIAL_Y + (V_OFFSET * line)
          });
        }
        total--;
      }
    }
    positions.forEach(ele => console.log(ele))

    while (positions.length) {
      const posA = positions.splice(this.getRandomInt(positions.length), 1)[0];
      const posB = positions.splice(this.getRandomInt(positions.length), 1)[0];
      const key = imageNames.splice(this.getRandomInt(imageNames.length), 1)[0];

      this.cards.push(new Card( {key, gameScene: this, ...posA, handler: this.cardClickHandler.bind(this)} ));
      this.cards.push(new Card( {key, gameScene: this, ...posB, handler: this.cardClickHandler.bind(this)} ));
    }

  }

  public update(): void {

    if (this.registry.values.time < 1) { // 30초 지난 후 콜백 실행
      this.time.addEvent({
        delay: 100,
        callback: () => {
          // this.add.tileSprite(0, 0, 800, 600, 'gameOver').setOrigin(0).setDepth(0)
          this.game.sound.stopAll()
          this.scene.start('Stage2', { score: this.registry.values.score, life: this.registry.values.life + (attempts * 50) > 10000 ? 10000 : this.registry.values.life + (attempts * 50) , stage: 2,
            bird: this.registry.values.bird, squi: this.registry.values.squi  })
      },
      callbackScope: this,
      })
    }
  }

  private worldTime(): void {  // 1초당 실행되는 함수 this.worldTimer 참조
    this.registry.values.time -= 1
    this.lifeText.setText(`남은 시간 ${this.registry.values.time}`)
  }

  private newRound(): void {
    waitForNewRound = true
    setTimeout(() => {
      if (this.matchCards()) {
        this.setAsReadOnly()
      } else {
        this.faceCardsDown()
      }
      this.updateScore()
      this.selectedCards.length = 0
      waitForNewRound = false
      attempts++
    }, 1500)
  }
  private matchedCards(): number {
    return this.cards.filter((card) => card.outOfTheGame).length / 2;
  }

  private updateScore() {
    var style = { font: 'bold 20px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };

    if (!score) {
      score = this.add.text(11, 50, '', style);
    }

    score.text = `
      시도 : ${attempts}
      맞춘 카드 : ${this.matchedCards()}
      체력 회복 : ${this.matchedCards() * 100} 포인트
    `;
  }

  private cardClickHandler (card: any) {
    console.log('4', card.out)
    if (waitForNewRound || card.out) { return; }
    card.faceUp();
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) {
      this.newRound();
    }
  }

  private setAsReadOnly() {
    this.selectedCards.forEach((card) => card.readOnly())
  }

  private faceCardsDown() {
    this.selectedCards.forEach((card) => card.faceDown())
    waitForNewRound = false
  }

  private matchCards () {
    if (!this.selectedCards.length) { return }
    const cardA = this.selectedCards[0]
    const cardB = this.selectedCards[1]

    return cardA.key === cardB.key
  }

  private getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
}

