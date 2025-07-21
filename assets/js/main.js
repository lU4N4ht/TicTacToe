// Seleciona todas as caixas do tabuleiro
const caixas = document.querySelectorAll(".caixa");

// Controla se é a vez do jogador que começou
let vezAtiva = true;

// Identificadores dos dois personagens
const Mustang = "Mustang";
const Tequila = "Tequila";

// Armazena o jogador que iniciou a partida
let jogadorAtual = null;

// Combinações possíveis de vitória
const combinacoesVitoria = [
    [0, 1, 2], // linha superior
    [3, 4, 5], // linha do meio
    [6, 7, 8], // linha inferior
    [0, 4, 8], // diagonal principal
    [2, 4, 6], // diagonal secundária
    [0, 3, 6], // coluna esquerda
    [1, 4, 7], // coluna central
    [2, 5, 8]  // coluna direita
];

// Botão para escolher o Mustang como primeiro jogador
const botaoMustang = document.querySelector(".botao-primeiro-jogador");

// Botão para escolher o Tequila como primeiro jogador
const botaoTequila = document.querySelector(".botao-segundo-jogador");

// Container da tela de seleção de personagem
const caixaSelecao = document.getElementById("caixa-selecao");

// Áudio do miado do Mustang
const somMiadoMustang = document.getElementById("miado-mustang");

// Áudio do miado do Tequila
const somMiadoTequila = document.getElementById("miado-tequila");

// Container do popup final do jogo (vitória ou empate)
const popup = document.getElementById("popup");

// Texto dentro do popup
const mensagemPopup = document.getElementById("mensagem-popup");

// Botão de reiniciar no popup
const botaoReiniciar = document.getElementById("botao-reiniciar");

// Evento ao clicar no botão do Mustang
botaoMustang.addEventListener("click", () => {
    somMiadoMustang.currentTime = 0;
    somMiadoMustang.play();
    jogadorAtual = Mustang;
    vezAtiva = true;
    caixaSelecao.style.display = "none";
    atualizarSlider(jogadorAtual);
});

// Evento ao clicar no botão do Tequila
botaoTequila.addEventListener("click", () => {
    somMiadoTequila.currentTime = 0;
    somMiadoTequila.play();
    jogadorAtual = Tequila;
    vezAtiva = true;
    caixaSelecao.style.display = "none";
    atualizarSlider(jogadorAtual);
});

// Evento para detectar cliques em uma casa vazia
document.addEventListener("click", (evento) => {
    if (evento.target.matches(".caixa") && evento.target.childNodes.length === 0) {
        jogar(evento.target.id);
    }
});

// Função para realizar uma jogada
function jogar(id) {
    if (!jogadorAtual) return;

    const caixa = document.getElementById(id);

    // Define o jogador da vez alternando entre Mustang e Tequila
    const jogadorDaVez = vezAtiva
        ? jogadorAtual
        : jogadorAtual === Mustang
            ? Tequila
            : Mustang;

    // Cria a imagem do personagem que jogou
    const imagem = document.createElement("img");
    imagem.src = jogadorDaVez === Mustang
        ? "assets/img/player1_doodle.png"
        : "assets/img/player2_doodle.png";
    imagem.alt = jogadorDaVez;
    imagem.classList.add("gatos-doodle");

    // Insere a imagem na casa
    caixa.appendChild(imagem);

    // Marca a casa com a classe do jogador
    caixa.classList.add(jogadorDaVez);

    // Verifica se houve vencedor ou empate
    checarVencedor(jogadorDaVez);
}

// Função que verifica se houve vitória
function checarVencedor(jogador) {
    const ganhou = combinacoesVitoria.some((combinacao) => {
        return combinacao.every((indice) => {
            return caixas[indice].classList.contains(jogador);
        });
    });

    if (ganhou) {
        finalizarJogo(jogador);
    } else if (checarEmpate()) {
        finalizarJogo();
    } else {
        vezAtiva = !vezAtiva;

        // Atualiza o slider com o jogador da vez
        atualizarSlider(
            vezAtiva
                ? jogadorAtual
                : jogadorAtual === Mustang
                    ? Tequila
                    : Mustang
        );
    }
}

// Função que verifica se houve empate (9 caixas preenchidas sem nenhuma opção de vitória)
function checarEmpate() {
    let contadorMustang = 0;
    let contadorTequila = 0;

    for (let i in caixas) {
        if (!isNaN(i)) {
            if (caixas[i].classList.contains(Mustang)) contadorMustang++;
            if (caixas[i].classList.contains(Tequila)) contadorTequila++;
        }
    }

    return contadorMustang + contadorTequila === 9;
}

// Função que finaliza o jogo, mostra o popup e pausa a música
function finalizarJogo(vencedor = null) {
    if (vencedor) {
        mensagemPopup.textContent = `${vencedor} venceu o jogo!`;
    } else {
        mensagemPopup.textContent = "Empate!";
    }

    popup.classList.remove("hidden");
    const musicaFundo = document.getElementById("musica-fundo");
    musicaFundo.pause();
    musicaFundo.currentTime = 0;
}

// Evento ao clicar no botão de reiniciar no popup
botaoReiniciar.addEventListener("click", () => {
    reiniciarJogo();
    popup.classList.add("hidden");
});

// Função que reinicia o jogo e limpa o tabuleiro
function reiniciarJogo() {
    caixas.forEach((caixa) => {
        caixa.innerHTML = "";
        caixa.classList.remove(Mustang, Tequila);
    });

    vezAtiva = true;
    jogadorAtual = null;
    caixaSelecao.style.display = "flex";
}

// Música de fundo do jogo
const musicaFundo = document.getElementById("musica-fundo");

// Eventos dos botões para iniciar música de fundo
botaoMustang.addEventListener("click", () => {
    somMiadoMustang.currentTime = 0;
    somMiadoMustang.play();
    musicaFundo.volume = 0.4;
    musicaFundo.play();
    jogadorAtual = Mustang;
    vezAtiva = true;
    caixaSelecao.style.display = "none";
    atualizarSlider(jogadorAtual);
});

botaoTequila.addEventListener("click", () => {
    somMiadoTequila.currentTime = 0;
    somMiadoTequila.play();
    musicaFundo.volume = 0.4;
    musicaFundo.play();
    jogadorAtual = Tequila;
    vezAtiva = true;
    caixaSelecao.style.display = "none";
    atualizarSlider(jogadorAtual);
});

function atualizarSlider(jogadorDaVez) {
    const controleSlider = document.querySelector(".controle-slider");

    if (jogadorDaVez === Mustang) {
        controleSlider.style.transform = "translateX(0%)";
    } else if (jogadorDaVez === Tequila) {
        controleSlider.style.transform = "translateX(100%)";
    }
}
