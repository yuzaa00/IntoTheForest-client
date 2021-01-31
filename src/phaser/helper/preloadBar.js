import Phaser from 'phaser'
export default class preloadBar {
  constructor(scene, x, y) {
    this.bar = new Phaser.GameObjects.Graphics(scene)

    this.x = x
    this.y = y
    this.value = 0
    this.p = 5.66

    this.draw()
    scene.add.existing(this.bar)
  }
  
  set(value) {
    this.value = value
    this.draw()
  }

  decrease(amount) {
    this.value -= amount

    if (this.value < 0) {
      this.value = 0
    }

    if (this.value > 100) {
      this.value = 100
    }

    this.draw()
    if(this.value === 100) {
      return 'start'
    }
  }

  draw() {
    this.bar.clear()

    this.bar.fillStyle(0x000000)
    this.bar.fillRect(this.x, this.y, 570, 50)

    this.bar.fillStyle(0xffffff)

    if (this.value < 10) {
      this.bar.fillStyle(0x809784)
    }
    else if (this.value < 20) {
      this.bar.fillStyle(0x7dab85)
    }
    else if (this.value < 30) {
      this.bar.fillStyle(0x71b07c)
    }
    else if (this.value < 40) {
      this.bar.fillStyle(0x63b671)
    }
    else if (this.value < 50) {
      this.bar.fillStyle(0x54be66)
    }
    else if (this.value < 60) {
      this.bar.fillStyle(0x44bc59)
    }
    else if (this.value < 70) {
      this.bar.fillStyle(0x32c84d)
    }
    else if (this.value < 80) {
      this.bar.fillStyle(0x1fdd41)
    }
    else {
      this.bar.fillStyle(0x1fdd41)
    }
  
    let length = Math.floor(this.p * this.value)

    this.bar.fillRect(this.x + 2, this.y + 2, length, 46)
    this.bar.setDepth(8).setScrollFactor(0)
  }

}