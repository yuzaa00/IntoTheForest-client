import Phaser from 'phaser'
import skys from '../../images/sky.png'
import stars from '../../images/star.png'
import bombs from '../../images/bomb.png'
import trees from '../../images/tree.png'
import platformss from '../../images/platform.png'
import dudes from '../../images/dude.png'

let player: any;
let platforms: any;
let cursors: any;
export default class Boot extends Phaser.Scene {

    constructor() {
        super('Boot');
      }

 preload(): void {
    
    this.load.image('sky', skys);
    this.load.image('ground', platformss);
    // this.load.image('star', stars);
    // this.load.image('bomb', bombs);
    this.load.image('tree', trees);
    this.load.spritesheet('dude', dudes, { frameWidth: 32, frameHeight: 48 });
}

 create (): void {
    this.add.image(800, 450, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(800, 868, 'ground').setScale(4).refreshBody();

    platforms.create(600, 700, 'tree');
    platforms.create(1200, 700, 'tree');
    
    // platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.4);
    player.setCollideWorldBounds(true);
    

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, platforms);
}

  update ():void {
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}
}

