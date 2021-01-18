import Card from '../helper/card'
let target: any
// let cards: any[]
let attempts = 0;
let waitForNewRound = false;
let score: any
const images = {
    'back.png' : "af78827932337650d2785b3bbe3ff81b.png",
    'card1.png' : "768c213aa0755fbb6f0d7539b2469ddb.png",
    'card2.png' : "028bde1ce32a283aa3bcb5b5d6e2de90.png",
    'card3.png' : "a48401c6f2aea3e45d36829cd3c83884.png",
    'card4.png' : "6fe9011c8d13779f879869b529a740fd.png",
    'card5.png' : "768c213aa0755fbb6f0d7539b2469ddb.png",
    'card6.png' : "028bde1ce32a283aa3bcb5b5d6e2de90.png",
    'card7.png' : "a48401c6f2aea3e45d36829cd3c83884.png",
    'card8.png' : "6fe9011c8d13779f879869b529a740fd.png",
    'front.png' : "7ab6fa294abdb99329c00176e38eab0d.png"
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
    this.registry.set('life', data.life) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('stage', data.stage) // 이전 scene에서 올라온 데이터 등록
    this.registry.set('time', 30)
    this.registry.set('dotori', 0)
  }
  
  preload(): void {
    
    this.load.image('back.png', 'images/card/back.png')
    this.load.image('card1.png', 'images/card/card1.png')
    this.load.image('card2.png', 'images/card/card2.png')
    this.load.image('card3.png', 'images/card/card3.png')
    this.load.image('card4.png', 'images/card/card4.png')
    this.load.image('card5.png', 'images/card/card5.png')
    this.load.image('card6.png', 'images/card/card6.png')
    this.load.image('card7.png', 'images/card/card7.png')
    this.load.image('card8.png', 'images/card/card8.png')
    
    this.load.image('front.png', 'images/card/front.png')

    this.newRound()
  } 

  public create(): void {
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
    const INITIAL_X = 170;
    const INITIAL_Y = 150;
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
    console.log(positions.length)
    while (positions.length) {
      const posA = positions.splice(this.getRandomInt(positions.length), 1)[0];
      const posB = positions.splice(this.getRandomInt(positions.length), 1)[0];
      const key = imageNames.splice(this.getRandomInt(imageNames.length), 1)[0];
      console.log(key)
      
      this.cards.push(new Card( {key, gameScene: this, ...posA, handler: this.cardClickHandler.bind(this)} ));
      this.cards.push(new Card( {key, gameScene: this, ...posB, handler: this.cardClickHandler.bind(this)} ));
    }

  }

  public update(): void {
    if (this.registry.values.time < 0) { // 30초 지난 후 콜백 실행
      this.time.addEvent({
        delay: 100,
        callback: () => {
          // this.add.tileSprite(0, 0, 800, 600, 'gameOver').setOrigin(0).setDepth(0)
          this.scene.start('Stage2', { score: this.registry.values.score, life: this.registry.values.life, stage: 2  })
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
    waitForNewRound = true;
    setTimeout(() => {
      if (this.matchCards()) {
        this.setAsReadOnly();
      } else {
        this.faceCardsDown();
      }
      this.updateScore();
      this.selectedCards.length = 0;
      waitForNewRound = false;
      attempts++;
    }, 1000);
  }
  private matchedCards(): number {
    return this.cards.filter((card) => card.outOfTheGame).length / 2;
  }

  private updateScore() {
    var style = { font: 'bold 20px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };

    if (!score) {
      score = this.add.text(580, 20, '', style);
    }
    const efficiency = attempts ? (this.matchedCards()/attempts*100).toFixed(0) : 0;

    score.text = `
      Attempts:${attempts}
      Matches: ${this.matchedCards()}
      Efficiency: ${efficiency}%
    `;
  }

  private cardClickHandler (card: any) {
    if (waitForNewRound || card.out) { return; }
    card.faceUp();
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) {
      this.newRound();
    }
  }

  private setAsReadOnly() {
    this.selectedCards.forEach((card) => card.readOnly());
  }

  private faceCardsDown() {
    this.selectedCards.forEach((card) => card.faceDown());
  }

  private matchCards () {
    if (!this.selectedCards.length) { return; }
    const cardA = this.selectedCards[0];
    const cardB = this.selectedCards[1];

    return cardA.key === cardB.key;
  }

  private getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
}

