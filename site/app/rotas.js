var JogadorDao = require('../app/jogador-dao');
var PaisDao = require('../app/pais-dao');
var conexao = require('../config/custom-mssql');
var path = require('path');

module.exports = (app) => {

	app.get('/paisporcod/:cod', function (request, response) {  // rota para buscar pais
        const pais = new PaisDao(conexao);  // objeto de pais dao
        var codigo = request.params.cod;  // parâmetro do código
        pais.nomePorCod(codigo, function(erro, resultados){  // função para buscar nome pelo código
            response.json(resultados.recordset);
        });
    });
    
    app.get('/capitalporcod/:cod', function (request, response) {  // rota para buscar capital
        const pais = new PaisDao(conexao);  // objeto de pais dao
        var codigo = request.params.cod;  // parâmetro do código
        pais.capitalPorCod(codigo, function(erro, resultados){  // função para buscarcapital pelo código
            response.json(resultados.recordset);
        });
    });

    app.post('/adicionarjogador', function(request, res){  // rota para adicionar jogador
        const jogador = new JogadorDao(conexao);  // objeto de jogador dao
        var n = request.body.nomeJogador;     // parametros
        var s = request.body.senhaJogador;
        var p = request.body.pontuacaoMaxima;
        console.log(n);
        console.log(s);
        console.log(p);
        jogador.adiciona(n, s, p, function(erro){  // função para adicionar nos jogadores
            if(erro){
                console.log("Erro na inclusão de jogador");
            }
        });
    });

    app.post('/alterarpontuacao', function(request, res){  // rota para alterar a pontuação de um jogador
        const jogador = new JogadorDao(conexao);  // objeto de jogador dao
        var n = request.body.nomeJogador;     // parâmetros
        var s = request.body.senhaJogador;
        var p = request.body.pontuacaoMaxima;
        jogador.alterapont(n, s, p, function(erro){  // função para alterar a pontuação
            if(erro){
                console.log("Erro ao alterar a pontuação");
            }
        });
        res.send("teste");
    });

    app.get('/listarjogadores', function(request, response){
        const jogador = new JogadorDao(conexao);
        jogador.listar(function(erro, resultados){
            response.json(resultados.recordset);
        })
    })
    
    app.get('/', function(req, res){  // devolver página principal
        res.sendFile('JogoPaises-Tela Inicial.html', {root: path.join(__dirname, '../')});
    });

    app.get('/Jogo', function(req, res){  // devolver página de jogo
        res.sendFile('JogoPaises-Jogo.html', {root: path.join(__dirname, '../')});
    })
}