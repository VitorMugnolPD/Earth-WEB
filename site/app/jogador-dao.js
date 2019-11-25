class JogadorDao{

    constructor(db) { 
        this._db = new db.Request(); 
    }

    adiciona(nomeJogador, senhaJogador, pontuacaoMaxima,callback) {    // insert para jogador
        var nome = nomeJogador; 
        var senha = senhaJogador; 
        var pont = pontuacaoMaxima; 
        this._db.query("INSERT INTO Jogador (nomeJogador, senhaJogador, pontuacaoMaxima) VALUES ('"+nome+"','"+senha+"',"+pont+")", 
        (err) => { 
            console.log("Erro inserção de jogador: " + err); 
            callback(err); 
        }) 
    }

    alterapont(nomeJogador, senhaJogador, pontuacaoMaxima,callback) {   // update de pontuação de jogador
        var nome = nomeJogador; 
        var senha = senhaJogador; 
        var pont = pontuacaoMaxima;  
        this._db.query("UPDATE Jogador SET pontuacaoMaxima='"+pont+"' WHERE nomeJogador='"+nome+"' AND senhaJogador='"+senha+"'", 
        (err) => { 
            console.log("Erro na alteração de jogador: " + err); 
            callback(err); 
        }) 
    }

    listar(callback){
        this._db.query("SELECT * FROM Jogador", function(err, recordset){
            if(err != null)
                console.log("Erro: " + err);
            callback(err, recordset);
        })
    }
}
module.exports = JogadorDao;