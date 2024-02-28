var config = {
    type: Phaser.AUTO, // define o tipo de renderização
    width: 1200, // largura da tela do game
    height: 600, // altura da tela do game
    // ?? não sei exlpicar
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700},
            debug: true
        }
    },

    //defini as funções executadas no game
    scene: [incial, game, final]
}


var game = new Phaser.Game(config);