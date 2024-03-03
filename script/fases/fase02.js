
var plataformas
var player
var teclado
var placar
var doves
var pontuacao = 0

class Fase02 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase02' });
    }

    preload() {
        //carrega as imagens e sprites que serão usadas no game
        this.load.image('bg', '../assets/fundo.png')
        this.load.image('grama', '../assets/grama.png')
        this.load.image('gramaG', '../assets/gramaG.svg')
        this.load.spritesheet('boneco', '../assets/bonequinho.png', { frameWidth: 500, frameHeight: 500 });
        this.load.spritesheet('jmp', '../assets/pulo.png', { frameWidth: 500, frameHeight: 500 });
        this.load.image('dove', '../assets/dove.png')
    }

    create() {
        pontuacao = 0 // zera a pontuação
        teclado = this.input.keyboard.createCursorKeys(); // agrega a variável um gerenciador de inputs do teclado;

        this.add.image(300, 300, 'bg'); // add o fundo dessa cena

        // define a física das plataformas e add elas no mapa
        plataformas = this.physics.add.staticGroup();
        plataformas.create(400, 150, 'grama')
        plataformas.create(100, 250, 'grama')
        plataformas.create(300, 350, 'grama')
        plataformas.create(100, 450, 'grama')
        plataformas.create(500, 450, 'grama')
        plataformas.create(300, 570, 'gramaG')

        player = this.physics.add.sprite(50, 500, 'boneco').setScale(0.15) // add física ao player 
        player.setBounce(0.2); // defini o fator de ressalto
        player.setCollideWorldBounds(true) // para ele somente ficar no mapa 
        this.physics.add.collider(player, plataformas); // add colisão entre o player e plataformas
        player.setSize(240, 460)// altera o hitbox do player

        player.anims.play('idle', true); // inicia a animação do player parado

        placar = this.add.text(445, 30, 'Doves:0/15', { fontSize: '20px', fill: '#00000' }) // add o placar na tela

        // add física aos doves e add eles no mapa
        doves = this.physics.add.group();
        doves.create(50, 420, 'dove')
        doves.create(90, 420, 'dove')
        doves.create(130, 420, 'dove')
        doves.create(460, 420, 'dove')
        doves.create(500, 420, 'dove')
        doves.create(540, 420, 'dove')
        doves.create(580, 420, 'dove')
        doves.create(250, 300, 'dove')
        doves.create(350, 300, 'dove')
        doves.create(40, 200, 'dove')
        doves.create(80, 200, 'dove')
        doves.create(120, 200, 'dove')
        doves.create(160, 200, 'dove')
        doves.create(360, 100, 'dove')
        doves.create(420, 100, 'dove')

        // define o hitbox e o tamanho do dove
        doves.children.iterate((doves) => {
            doves.body.setSize(30, 20, true);
            doves.setScale(0.8)
        });

        this.physics.add.collider(doves, plataformas); // add colisão entre o dove e as plataformas

        // contador de pontos
        this.physics.add.overlap(player, doves.getChildren(), (player, doves) => {
            doves.disableBody(true, true); // Desativa a física e esconde o dove
            pontuacao += 1; // Incrementa a pontuação
            placar.setText('Doves:' + pontuacao + '/15'); // Atualiza o texto do placar
        });


        // animação do player
        this.anims.create({
            key: 'andar',
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('boneco', { start: 0, end: 2 }),
            repeat: -1
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('boneco', { start: 4, end: 5 }),
            frameRate: 1,
            repeat: -1
        });

        this.initialTime2 = 15; // Tempo inicial em segundos do timer
        this.timeLeft2 = this.initialTime2; // define a variável do tempo restante

        // Exibindo o tempo restante na tela
        this.timerText = this.add.text(16, 16, 'Tempo: ' + this.timeLeft2, { fontSize: '20px', fill: '#00000' });

        //temporizador
        this.timer = this.time.addEvent({
            delay: 1000, // Chama a função a cada 1 segundo
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

    }
    //método qual att o timer
    updateTimer() {
        // Atualiza o tempo restante
        this.timeLeft2--;

        // Atualiza o texto na tela
        this.timerText.setText('Tempo: ' + this.timeLeft2);

        // Verifica se o tempo acabou
        if (this.timeLeft2 === 0) {
            // Chama a função para mudar de cena
            this.scene.stop();
            this.scene.start('gameOver')
        }
    }
    update() {

        // configurações das ações de cada tecla de movimentação
        if (teclado.left.isDown) {
            player.setVelocityX(-200);
            player.setFlip(false, false)
            player.anims.play('andar', true);
        }
        else if (teclado.right.isDown) {
            player.setVelocityX(200);
            player.setFlip(true, false)
            player.anims.play('andar', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('idle', true);
        }

        if (teclado.up.isDown && player.body.touching.down) {
            player.anims.play('idle');
            player.setVelocityY(-400);
        }

        // verifica se todos os doves foram coletados para o player ganhar
        if (pontuacao === 15) {
            this.scene.stop()
            this.scene.start('telaWinner')
        }


    }

}