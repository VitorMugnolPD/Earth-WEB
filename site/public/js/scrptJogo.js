var pont = 0;  // pontuação
var vidas = 3;  // vidas do jogador
var paisAtual = "";  // nome do pais atual
var id;  // id do pais atual
var modo;   // modo sendo jogado no momento
var a;
var b;
var c;
var d;

$().ready(function () {
    $("#login").hide();         // esconder partes não necessárias no momento
    $("#botoes").hide();
    $("#imagem").hide();
    $("#txtBandeira").hide();
    $("#txtCapital").hide();
    $("#capital").hide();
    $("#enviarLogin").click(function(){  // ao clicar no botão login
        if(document.getElementById("nomeL").value != "" || document.getElementById("senhaL").value != "")   // se nenhuma das caixas de textos estiverem vazias
        {
            var nome = document.getElementById("nomeL").value;
            var senha = document.getElementById("senhaL").value;
            var funcionou = false;
            $.getJSON("http://localhost:3000/listarjogadores", function(result){  // listar todos os jogadores
                $.each(result, function(i, campo){  // para cada resultado
                    if(campo.nomeJogador == nome)  // se o nome for igual
                    {
                        if(campo.senhaJogador == senha)  // se a senha for igual
                        {
                            funcionou = true;
                            $.post("http://localhost:3000/alterarpontuacao/", {nomeJogador: nome, senhaJogador: senha, pontuacaoMaxima: pont}, function(){  // alterar pontuação no banco de dados
                                alert("Pontuação alterada!"); 
                                window.location.href = "http://localhost:3000";  // mudar a localização do usuário
                            });
                        }
                    }
                });
            });
            if(funcionou == false)
                alert("Preencha os campos corretamente");
            document.getElementById("nomeL").value = "";  // limpar a caixa de texto de nome
            document.getElementById("senhaL").value = "";  // limpar a caixa de texto de senha
        }
        else
            alert("Preencha os campos");
    });
    Jogar();
    $("button").click(function(){  // ao clicar em algun dos botões
        $("#imagem").hide();
        $("#capital").hide();
        if(this.innerHTML != paisAtual)  // se for diferente da resposta
        {
            vidas--;  // diminui o número de vidas
            switch(vidas)  // dependendo do número de vidas no momento
            {
                case 2:  // se for 2
                    $("#coracao1").attr("src","/img/coracaoVazio.png");  // trocar a imagem de um coração cheio para um coração vazio
                    break;
                case 1:  // se for 1
                    $("#coracao2").attr("src","/img/coracaoVazio.png");
                    break;
                case 0:  // se for 0
                    $("#coracao3").attr("src","/img/coracaoVazio.png");
                    break;
            }
        }
        else
        {
            pont++;  // aumentar a pontuação
            document.getElementById("pontuacao").innerHTML = "Pontuação: " + pont;  // mudar o texto de pontuação
        }
        if(vidas == 0) // se as vidas chegarem a zero
        {
            alert("Você perdeu!\n\nSua pontuação foi " + pont);
            Login();
        }
        else
        {
            Jogar();
        }
    })
})

function ModoDeBandeiras() {  // modo de jogo de bandeiras
    $("#txtCapital").hide();
    $("#txtBandeira").show();  // mostar o que é necessário
    $("#imagem").show();
    $("#botoes").show();
    NomeBotoes();
}

function ModoDeCapitais() {  // modo de jogo de capitais
    $("#txtBandeira").hide();
    $("#txtCapital").show();  // mostar o que é necessário
    $("#botoes").show();
    var cap = "";  // capital do pais
    $.getJSON("http://localhost:3000/capitalporcod/" + id, function (result) {  // buscar a capital
        cap = result[0].capitalPais;
        $("#capital").show();  // mostar a capital
        document.getElementById('capital').innerHTML = cap;  // preencher o texto
    });
    NomeBotoes();
}

function Jogar(){
    $("#txtBandeira").hide();
    $("#txtCapital").hide();
    id = Math.floor(Math.random() * 100);  // id aleatório
    $.getJSON("http://localhost:3000/paisporcod/" + id, function (result) {  // buscar um pais
        paisAtual = result[0].nomePais;
        $("#imagem").attr("src", "../img/bandeiras/" + paisAtual + ".jpg");
    });
    modo = Math.floor(Math.random() * 2);  // modo aleatório
    switch(modo)  // de acordo com o modo
    {
        case 0: ModoDeBandeiras(); break;
        case 1: ModoDeCapitais(); break;
    }
}

function NomeBotoes(){
    a = "";  // variáveis auxiliares
    b = "";
    c = "";
    d = "";
    nmr = Math.floor(Math.random() * 4);  // número aleatório para ser o botão que receberá o país correto
    var w = Math.floor(Math.random() * 100);  // id aleatório
    $.getJSON("http://localhost:3000/paisporcod/" + w, function(result)  // buscar país
    {
        if(nmr == 0)  // se o número for zero
            a = paisAtual;  // país correto
        else
            a = result[0].nomePais;  // nome do país sorteado
        document.getElementById("botao1").innerHTML = a;  // preecher o texto com o país
    });
    var x = Math.floor(Math.random() * 100);
    $.getJSON("http://localhost:3000/paisporcod/" + x, function(result){
        if(nmr == 1)
            b = paisAtual;  // país correto
        else
            b = result[0].nomePais;  // nome do país sorteado
        document.getElementById("botao2").innerHTML = b;  // preecher o texto com o país
    });
    var y = Math.floor(Math.random() * 100);
    $.getJSON("http://localhost:3000/paisporcod/" + y, function(result){
        if(nmr == 2)
            c = paisAtual;  // país correto
        else
            c = result[0].nomePais;  // nome do país sorteado
        document.getElementById("botao3").innerHTML = c;  // preecher o texto com o país
    });
    var z = Math.floor(Math.random() * 100);
    $.getJSON("http://localhost:3000/paisporcod/" + z, function(result){
        if(nmr == 3)
            d = paisAtual;  // país correto
        else
            d = result[0].nomePais;  // nome do país sorteado
        document.getElementById("botao4").innerHTML = d;  // preecher o texto com o país
    });
    
}

function Login(){  // esconder e mostrar o necessário
    $("#botoes").hide();
    $("#imagem").hide();
    $("#txtBandeira").hide();
    $("#txtCapital").hide();
    $("#capital").hide();
    $("#login").show();
}