let scene1 = { // A scene showing the begining of the game, require to hit space bar to start
  key: 'scene1',
  active: true,
  preload: preintro,
  create: createintro,
  update: updateintro
}

let scene2 = {
  //Level 1 of 5 - other leverls will be added later
  key: 'scene2',
  active: false,
  preload: mypreload1,
  create: mycreate1,
  update: myupdate1,
}

let scene3 = { //Completed game 
  key: 'scene3',
  active: false,
  preload: preend,
  create: createend,
  update: updateend
}

let scene4 = { //Game over sence
  key: 'scene4',
  active: false,
  preload: preover,
  create: createover,
  update: updateover
}

let scene5 = { // Scene for how to play
  key: 'scene5',
  active: false,
  preload: prelearn,
  create: createlearn,
  update: updatelearn
}

let scene6 = { // Level 2
  key: 'scene6',
  active: false,
  preload: preload2,
  create: create2,
  update: update2
}

let scene7 = { // Level 3
  key: 'scene7',
  active: false,
  preload: preload3,
  create: create3,
  update: update3
}

let scene8 = { // Level 4 
  key: 'scene8',
  active: false,
  preload: preload4,
  create: create4,
  update: update4
}

let scene9 = { // Level 5 - Last
  key: 'scene9',
  active: false,
  preload: preload5,
  create: create5,
  update: update5
}

let config = {
  width: 1000,
  height: 800,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 250 },
      debug: false
    }
  },
  scene: [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  }
};

let mygame = new Phaser.Game(config);

let spacebar;
var bunny;
var bird;
var wolf;
var platform;
var banana;
var carrot;
var watermelon;
var score = 0;
var scoreText;
var death;
var opentune;//opening sound
var hopping//Sound for hopping
var eat; //Sound for eating
var birdCry; //Bird Cry
var woldHowl; // Wolf Howl
var gamesound; //background music to play during the game
var lostsound; // losing sound
var winnersound;

//Begining Scene
function preintro() {
  this.load.image('intro', 'asset/intobackground.jpg');
  this.load.audio('opening', 'sound/opening.mp3');
};
function createintro() {
  this.add.image(500, 400, "intro");
  opentune = this.sound.add('opening');
  opentune.play({
    volume: 0.8,
    loop: true
  });
  score = 0; // added to ensure score reset back to 0
  let titletext = this.add.text(275, 275, ['Bunny Survival Game'],
    {
      fontFamily: '"Press Start 2P",cursive',
      fontSize: '55px',
      color: '#fff',
      align: 'center',
      strokeThickness: 2
    }
  );
  titletext.setOrigin(0.5, 0.5);
  // set up title screen
  let helptext = this.add.text(500, 550, ['Press spacebar to start.', ''],
    {
      fontFamily: '"Press Start 2P",cursive',
      fontSize: '24px',
      color: '#f00',
      align: 'center',
      strokeThickness: 5
    }
  );
  helptext.setOrigin(0.5, 0.5);

  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};
function scene1Transition(that) {
  that.scene.start('scene5');
};
function updateintro() {
  if (spacebar.isDown) {
    scene1Transition(this);
  }
};

//How to play sence section
function prelearn() {
  this.load.image('play', 'asset/how-to-play.png')
};
function createlearn() {
  this.add.image(500, 400, 'play');

  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};
function updatelearn() {
  if (spacebar.isDown) {
    StartGame(this);
  }

  let helptext = this.add.text(550, 490, ['Press spacebar to start.', ''],
    {
      fontFamily: '"Press Start 2P",cursive',
      fontSize: '24px',
      color: '#f00',
      align: 'center',
      strokeThickness: 5
    }
  );
  helptext.setOrigin(0.5, 0.5);
};
function StartGame(that) {
  that.scene.start('scene2');
};




//Level 1
function mypreload1() {
  this.load.image('grassland', 'asset/background-level1.jpg');
  this.load.image('ground', 'asset/ground.png');
  this.load.image('fruit', 'asset/logo1.png');
  this.load.image('hunter', 'asset/bird.png');
  this.load.spritesheet('brownbunny',
    'asset/bunny-hop-spritesheet.png',
    { frameWidth: 48, frameHeight: 32 }
  );
  this.load.audio('hop', 'sound/hop.wav');
  this.load.audio('eat', 'sound/crunch.ogg');
  this.load.audio('cry', 'sound/cry.wav');
  this.load.audio('music', 'sound/gameplay.mp3');
};
function mycreate1() {
  gamesound = this.sound.add('music');
  gamesound.play({
    volume: 0.5,
    loop: true
  });
  this.add.image(500, 400, 'grassland');
  opentune.pause();
  platforms = this.physics.add.staticGroup();

  platforms.create(490, 825, 'ground').setScale(4).refreshBody();
  platforms.create(500, 420, 'ground');
  platforms.create(750, 600, 'ground');
  platforms.create(750, 200, 'ground');
  platforms.create(250, 250, 'ground');
  platforms.create(100, 550, 'ground');
  hopping = this.sound.add('hop');
  eat = this.sound.add('eat');
  bunny = this.physics.add.sprite(250, 600, 'brownbunny');
  birdcry = this.sound.add('cry');

  bunny.setBounce(0.2);
  bunny.setCollideWorldBounds(true);

  let leveltext1 = this.add.text(500, 50, ['LEVEL 1'],
    {
      fontFamily: '"Press Start 2P",cursive',
      fontSize: '55px',
      color: '#fff',
      align: 'center',
      strokeThickness: 2
    }
  );
  leveltext1.setOrigin(0.5, 0.5);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'brownbunny', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.collider(bunny, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  banana = this.physics.add.group({
    key: 'fruit',
    repeat: 13,
    setXY: { x: 17, y: 0, stepX: 70 }
  });

  banana.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });
  this.physics.add.collider(banana, platforms);

  this.physics.add.overlap(bunny, banana, collectFruit, null, this);

  scoreText = this.add.text(750, 16, 'score: 0', { fontSize: '38px', fill: '#000', strokeThickness: 5 });

  bird = this.physics.add.group();

  this.physics.add.collider(bird, platforms);

  this.physics.add.collider(bunny, bird, hitBunny, null, this);

  function hitBunny(bunny, bird) {
    this.physics.pause();
    //console.log('game over');
    this.scene.start('scene4');
    gamesound.pause();
  }


  function collectFruit(bunny, star) {
    star.disableBody(true, true);
    eat.play({
      volume: 2,
      loop: false,
    })
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (banana.countActive(true) === 0) {
      //  A new batch of stars to collect
      banana.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      var x = (bunny.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var birds = bird.create(x, 16, 'hunter');
      birds.setBounce(1);
      birds.setCollideWorldBounds(true);
      birds.setVelocity(Phaser.Math.Between(-200, 200), 20);
      birds.allowGravity = false;
      birdcry.play({
        volume: 1,
        loop: false
      })

    }
    if (score === 500) {
      this.scene.start('scene6');
    }
  }


};
function myupdate1() {
  if (cursors.left.isDown) {
    bunny.setVelocityX(-160);

    bunny.anims.play('left', true);
    hopping.play();
  }
  else if (cursors.right.isDown) {
    bunny.setVelocityX(160);

    bunny.anims.play('right', true);
    hopping.play();
  }
  else {
    bunny.setVelocityX(0);

    bunny.anims.play('turn');
    hopping.play();
  }

  if (cursors.up.isDown && bunny.body.touching.down) {
    bunny.setVelocityY(-330);
  }
  //End level 1




};
//End Level 2

//Level 2
function preload2() {
  this.load.image('background2', 'asset/level2.jpg');
  this.load.image('ground', 'asset/platform2.png');
  this.load.image('fruit', 'asset/logo1.png');
  this.load.image('hunter', 'asset/bird.png');
  this.load.spritesheet('brownbunny',
    'asset/bunny-hop-spritesheet.png',
    { frameWidth: 48, frameHeight: 32 }
  );
  this.load.audio('hop', 'sound/hop.wav');
  this.load.audio('eat', 'sound/crunch.ogg');
  this.load.audio('cry', 'sound/cry.wav');
};
function create2() {

  this.add.image(500, 400, 'background2');
  opentune.pause();
  platforms = this.physics.add.staticGroup();

  platforms.create(490, 825, 'ground').setScale(4).refreshBody();
  platforms.create(500, 400, 'ground');
  platforms.create(250, 600, 'ground');
  platforms.create(815, 200, 'ground');
  platforms.create(1000, 350, 'ground');
  platforms.create(700, 650, 'ground');
  hopping = this.sound.add('hop');
  eat = this.sound.add('eat');
  bunny = this.physics.add.sprite(250, 600, 'brownbunny');
  birdcry = this.sound.add('cry');

  bunny.setBounce(0.2);
  bunny.setCollideWorldBounds(true);
  let leveltext2 = this.add.text(500, 50, ['LEVEL 2'],
    {
      fontFamily: '"Press Start 2P",cursive',
      fontSize: '55px',
      color: '#fff',
      align: 'center',
      strokeThickness: 2
    }
  );
  leveltext2.setOrigin(0.5, 0.5);

  //Bunny movement
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'brownbunny', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.collider(bunny, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  banana = this.physics.add.group({
    key: 'fruit',
    repeat: 9,
    setXY: { x: 25, y: 0, stepX: 105 }
  });

  banana.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });
  this.physics.add.collider(banana, platforms);

  this.physics.add.overlap(bunny, banana, collectFruit, null, this);

  scoreText = this.add.text(750, 16, 'score: 0', { fontSize: '38px', fill: '#000', strokeThickness: 5 });

  bird = this.physics.add.group();

  this.physics.add.collider(bird, platforms);

  this.physics.add.collider(bunny, bird, hitBunny, null, this);

  function hitBunny(bunny, bird) {
    this.physics.pause();
    //console.log('game over');
    this.scene.start('scene4');
    gamesound.pause();
  }


  function collectFruit(bunny, star) {
    star.disableBody(true, true);
    eat.play({
      volume: 2,
      loop: false,
    })
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (banana.countActive(true) === 0) {
      //  A new batch of stars to collect
      banana.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      var x = (bunny.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var birds = bird.create(x, 16, 'hunter');
      birds.setBounce(1);
      birds.setCollideWorldBounds(true);
      birds.setVelocity(Phaser.Math.Between(-200, 200), 20);
      birds.allowGravity = false;
      birdcry.play({
        volume: 1,
        loop: false
      })

    }
    if (score === 1000) {
      this.scene.start('scene7');
    }
  }
};
function update2() {
  if (cursors.left.isDown) {
    bunny.setVelocityX(-160);

    bunny.anims.play('left', true);
    hopping.play();
  }
  else if (cursors.right.isDown) {
    bunny.setVelocityX(160);

    bunny.anims.play('right', true);
    hopping.play();
  }
  else {
    bunny.setVelocityX(0);

    bunny.anims.play('turn');
    hopping.play();
  }

  if (cursors.up.isDown && bunny.body.touching.down) {
    bunny.setVelocityY(-330);
  }
}
//End level 2

//Start Level 3
function preload3() {
  this.load.image('background3', 'asset/level3.jpg');
  this.load.image('snowground', 'asset/snow-platform.png');
  this.load.image('melon', 'asset/watermelon.png');
  this.load.image('fox', 'asset/fox-redo.png');
  this.load.spritesheet('brownbunny',
    'asset/bunny-hop-spritesheet.png',
    { frameWidth: 48, frameHeight: 32 }
  );
  this.load.audio('hop', 'sound/hop.wav');
  this.load.audio('eat', 'sound/crunch.ogg');
  this.load.audio('howl', 'sound/howl.wav');
}
function create3() {
  this.add.image(500, 400, 'background3');
  opentune.pause();
  platforms = this.physics.add.staticGroup();

  platforms.create(75, 785, 'snowground');
  platforms.create(175, 785, 'snowground');
  platforms.create(275, 785, 'snowground');
  platforms.create(375, 785, 'snowground');
  platforms.create(475, 785, 'snowground');
  platforms.create(575, 785, 'snowground');
  platforms.create(675, 785, 'snowground');
  platforms.create(775, 785, 'snowground');
  platforms.create(875, 785, 'snowground');
  platforms.create(975, 785, 'snowground');
  platforms.create(500, 400, 'snowground');
  platforms.create(220, 600, 'snowground');
  platforms.create(90, 200, 'snowground');
  platforms.create(1000, 350, 'snowground');
  platforms.create(700, 600, 'snowground');
  hopping = this.sound.add('hop');
  eat = this.sound.add('eat');
  bunny = this.physics.add.sprite(250, 600, 'brownbunny');
  wolfHowl = this.sound.add('howl');

  bunny.setBounce(0.2);
  bunny.setCollideWorldBounds(true);
  let leveltext3 = this.add.text(500, 50, ['LEVEL 3'],
    {
      fontFamily: '"Press Start 2P",cursive',
      fontSize: '55px',
      color: '#fff',
      align: 'center',
      strokeThickness: 3
    }
  );
  leveltext1.setOrigin(0.5, 0.5);
  //Bunny movement
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'brownbunny', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.collider(bunny, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  watermelon = this.physics.add.group({
    key: 'melon',
    repeat: 9,
    setXY: { x: 25, y: 0, stepX: 105 }
  });

  watermelon.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });
  this.physics.add.collider(watermelon, platforms);

  this.physics.add.overlap(bunny, watermelon, collectFruit, null, this);

  scoreText = this.add.text(750, 16, 'score: 0', { fontSize: '38px', fill: '#000', strokeThickness: 5 });

  wolf = this.physics.add.group();

  this.physics.add.collider(wolf, platforms);

  this.physics.add.collider(bunny, wolf, hitBunny, null, this);

  function hitBunny(bunny, wolf) {
    this.physics.pause();
    //console.log('game over');
    this.scene.start('scene4');
    gamesound.pause();
  }


  function collectFruit(bunny, star) {
    star.disableBody(true, true);
    eat.play({
      volume: 2,
      loop: false,
    })
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (watermelon.countActive(true) === 0) {
      //  A new batch of stars to collect
      watermelon.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      var x = (bunny.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var wolfs = wolf.create(x, 400, 'fox');
      wolfs.setBounce(1);
      wolfs.setCollideWorldBounds(true);
      wolfs.setVelocity(Phaser.Math.Between(-200, 200), 20);
      wolfs.allowGravity = true;
      wolfHowl.play({
        volume: 1,
        loop: false
      })

    }
    if (score === 1500) {
      this.scene.start('scene8');
    }
  }
}
function update3() {
  if (cursors.left.isDown) {
    bunny.setVelocityX(-160);

    bunny.anims.play('left', true);
    hopping.play();
  }
  else if (cursors.right.isDown) {
    bunny.setVelocityX(160);

    bunny.anims.play('right', true);
    hopping.play();
  }
  else {
    bunny.setVelocityX(0);

    bunny.anims.play('turn');
    hopping.play();
  }

  if (cursors.up.isDown && bunny.body.touching.down) {
    bunny.setVelocityY(-330);
  }
}
//End Level 3

//Level 4
function preload4() {
  this.load.image('background4', 'asset/level4.jpg');
  this.load.image('darkplatform', 'asset/dark-platform.png');
  this.load.image('melon', 'asset/watermelon.png');
  this.load.image('fox', 'asset/fox-redo.png');
  this.load.spritesheet('brownbunny',
    'asset/bunny-hop-spritesheet.png',
    { frameWidth: 48, frameHeight: 32 }
  );
  this.load.audio('hop', 'sound/hop.wav');
  this.load.audio('eat', 'sound/crunch.ogg');
  this.load.audio('howl', 'sound/howl.wav');
}
function create4() {
  this.add.image(500, 400, 'background4');
  opentune.pause();
  platforms = this.physics.add.staticGroup();

  platforms.create(490, 825, 'darkplatform').setScale(4).refreshBody();
  platforms.create(500, 400, 'darkplatform');
  platforms.create(220, 600, 'darkplatform');
  platforms.create(90, 200, 'darkplatform');
  platforms.create(1000, 350, 'darkplatform');
  hopping = this.sound.add('hop');
  eat = this.sound.add('eat');
  bunny = this.physics.add.sprite(250, 600, 'brownbunny');
  wolfHowl = this.sound.add('howl');

  bunny.setBounce(0.2);
  bunny.setCollideWorldBounds(true);
  let leveltext4 = this.add.text(500, 50, ['LEVEL 4'],
    {
      fontFamily: '"Press Start 2P",cursive',
      fontSize: '55px',
      color: '#fff',
      align: 'center',
      strokeThickness: 2
    }
  );
  leveltext4.setOrigin(0.5, 0.5);
  //Bunny movement
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'brownbunny', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.collider(bunny, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  watermelon = this.physics.add.group({
    key: 'melon',
    repeat: 7,
    setXY: { x: 25, y: 0, stepX: 125 }
  });

  watermelon.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });
  this.physics.add.collider(watermelon, platforms);

  this.physics.add.overlap(bunny, watermelon, collectFruit, null, this);

  scoreText = this.add.text(750, 16, 'score: 0', { fontSize: '38px', fill: '#000', strokeThickness: 5 });

  wolf = this.physics.add.group();

  this.physics.add.collider(wolf, platforms);

  this.physics.add.collider(bunny, wolf, hitBunny, null, this);

  function hitBunny(bunny, wolf) {
    this.physics.pause();
    //console.log('game over');
    this.scene.start('scene4');
    gamesound.pause();
  }


  function collectFruit(bunny, star) {
    star.disableBody(true, true);
    eat.play({
      volume: 2,
      loop: false,
    })
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (watermelon.countActive(true) === 0) {
      //  A new batch of stars to collect
      watermelon.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      var x = (bunny.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var wolfs = wolf.create(x, 400, 'fox');
      wolfs.setBounce(1);
      wolfs.setCollideWorldBounds(true);
      wolfs.setVelocity(Phaser.Math.Between(-200, 200), 20);
      wolfs.allowGravity = true;
      wolfHowl.play({
        volume: 1,
        loop: false
      })

    }
    if (score === 2000) {
      this.scene.start('scene9');
    }
  }
}
function update4() {
  if (cursors.left.isDown) {
    bunny.setVelocityX(-160);

    bunny.anims.play('left', true);
    hopping.play();
  }
  else if (cursors.right.isDown) {
    bunny.setVelocityX(160);

    bunny.anims.play('right', true);
    hopping.play();
  }
  else {
    bunny.setVelocityX(0);

    bunny.anims.play('turn');
    hopping.play();
  }

  if (cursors.up.isDown && bunny.body.touching.down) {
    bunny.setVelocityY(-330);
  }
}
//End level 4

//Start 5 - Final Level
function preload5() {
  this.load.image('background5', 'asset/level5.jpg');
  this.load.image('darkplatform', 'asset/dark-platform.png');
  this.load.image('carrot', 'asset/carrot.png');
  this.load.image('hunter', 'asset/bird.png');
  this.load.spritesheet('brownbunny',
    'asset/bunny-hop-spritesheet.png',
    { frameWidth: 48, frameHeight: 32 }
  );
  this.load.audio('hop', 'sound/hop.wav');
  this.load.audio('eat', 'sound/crunch.ogg');
  this.load.audio('cry', 'sound/cry.wav');
  this.load.audio('music', 'sound/gameplay.mp3');


};
function create5() {

  this.add.image(500, 400, 'background5');

  platforms = this.physics.add.staticGroup();

  platforms.create(490, 825, 'darkplatform').setScale(4).refreshBody();
  platforms.create(200, 350, 'darkplatform');
  platforms.create(500, 500, 'darkplatform');
  platforms.create(750, 700, 'darkplatform');
  platforms.create(1030, 350, 'darkplatform');

  hopping = this.sound.add('hop');
  eat = this.sound.add('eat');
  bunny = this.physics.add.sprite(250, 600, 'brownbunny');
  birdcry = this.sound.add('cry');

  bunny.setBounce(0.2);
  bunny.setCollideWorldBounds(true);
  let leveltext5 = this.add.text(500, 50, ['LEVEL 5'],
    {
      fontFamily: '"Press Start 2P",cursive',
      fontSize: '55px',
      color: '#fff',
      align: 'center',
      strokeThickness: 2
    }
  );
  leveltext5.setOrigin(0.5, 0.5);
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{ key: 'brownbunny', frame: 4 }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('brownbunny', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.physics.add.collider(bunny, platforms);

  cursors = this.input.keyboard.createCursorKeys();

  carrot = this.physics.add.group({
    key: 'carrot',
    repeat: 13,
    setXY: { x: 17, y: 0, stepX: 70 }
  });

  carrot.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });
  this.physics.add.collider(carrot, platforms);

  this.physics.add.overlap(bunny, carrot, collectFruit, null, this);

  scoreText = this.add.text(750, 16, 'score: 0', { fontSize: '38px', fill: '#000', strokeThickness: 5 });

  bird = this.physics.add.group();

  this.physics.add.collider(bird, platforms);

  this.physics.add.collider(bunny, bird, hitBunny, null, this);


  function hitBunny(bunny, bird) {
    this.physics.pause();
    //console.log('game over');
    this.scene.start('scene4');
    gamesound.pause();
  }

  function collectFruit(bunny, star) {
    star.disableBody(true, true);
    eat.play({
      volume: 2,
      loop: false,
    })
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (carrot.countActive(true) === 0) {
      //  A new batch of stars to collect
      carrot.children.iterate(function (child) {

        child.enableBody(true, child.x, 0, true, true);

      });

      var x = (bunny.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

      var birds = bird.create(x, 16, 'hunter');
      birds.setBounce(1);
      birds.setCollideWorldBounds(true);
      birds.setVelocity(Phaser.Math.Between(-200, 200), 20);
      birds.allowGravity = false;
      birdcry.play({
        volume: 1,
        loop: false
      });


    }
    if (score === 2500) {
      this.scene.start('scene3');
      gamesound.pause();
    }
  }
};
function update5() {
  if (cursors.left.isDown) {
    bunny.setVelocityX(-160);

    bunny.anims.play('left', true);
    hopping.play();
  }
  else if (cursors.right.isDown) {
    bunny.setVelocityX(160);

    bunny.anims.play('right', true);
    hopping.play();
  }
  else {
    bunny.setVelocityX(0);

    bunny.anims.play('turn');
    hopping.play();
  }

  if (cursors.up.isDown && bunny.body.touching.down) {
    bunny.setVelocityY(-330);
  }
}
//End Level 5 -- Try to win the game please.


//Winner Scene
function preend() {
  this.load.image('winner', 'asset/Winner-Scene.jpg');
  this.load.audio('win', 'sound/winner.wav');
};
function createend() {
  this.add.image(500, 400, 'winner');
  winnersound = this.sound.add('win');
  winnersound.play({
    volume: 1,
    loop: false
  })


  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};
function sceneTransition(that) {
  that.scene.start('scene1');
};

function updateend() {
  if (spacebar.isDown) {
    sceneTransition(this);
  }
}

//Game over Scene
function preover() {
  this.load.image('over', 'asset/gameover.jpg');
  this.load.audio('lost', 'sound/sadlost.wav');
};
function createover() {
  lostsound = this.sound.add('lost');
  lostsound.play({
    volume: 1,
    loop: false
  })
  this.add.image(500, 400, 'over');
  console.log('game scene');
  spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
};
function updateover() {
  if (spacebar.isDown) {
    sceneTransition(this);
  }
};