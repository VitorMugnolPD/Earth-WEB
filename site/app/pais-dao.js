class PaisesDao{

    constructor(db) { 
        this._db = new db.Request(); 
    }

    nomePorCod(codPais ,callback) {   // select para nome do pais de acordo com seu código
        var cod = codPais;
        this._db.query("SELECT nomePais FROM Paises WHERE codPais="+cod+"", function(err, recordset){
        if(err != null) 
            console.log("Erro: " + err); 
            callback(err, recordset); 
        }) 
    }

    capitalPorCod(codPais ,callback) {   // select para capital do pais de acordo com seu código
        var cod = codPais;
        this._db.query("SELECT capitalPais FROM Paises WHERE codPais="+cod+"", function(err, recordset) { 
            if(err != null)
                console.log("Erro: " + err); 
            callback(err, recordset); 
        }) 
    }

}
module.exports = PaisesDao;