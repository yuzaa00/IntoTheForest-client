// export class Dog extends Phaser.GameObjects.Container {
//   private shadow: Phaser.GameObjects.Ellipse
//   private player: Phaser.GameObjects.Sprite;

//   constructor(scene: Phaser.Scene, x: number, y: number) {
//     super(scene, x, y)
//     this.shadow = scene.add.ellipse(0, 10, 80, 25, 0x00000, 0.2).setOrigin(0.5, 1)  
//     this.player = scene.add.sprite(100, 500, 'dog').setScale(1.2)

//     scene.physics.add.existing(this)

//     const body = this.body as Phaser.Physics.Arcade.Body
//     body.setCollideWorldBounds(true)

//     this.add(this.shadow);
//     this.add(this.player);

    
//   }
  
  

// }