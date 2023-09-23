let nome = document.querySelector("#nome");
let descricao = document.querySelector("#descricao");
let radiosim = document.querySelector("#radiosim");
let radionao = document.querySelector("#radionao");
let lista = document.querySelector("#lista");
let banco = JSON.parse(localStorage.getItem("banco"));

//Verificando se o localStorage possui o item "banco", caso não possua, ele cria
if (banco === null) {
    let array = [];
    localStorage.setItem("banco", JSON.stringify(array));
    banco = JSON.parse(localStorage.getItem("banco"));
}

//A partir dessa funcao anonima a funcoes LoadList  pode criar elemento html de forma mais facil
let elementoHTML = (id, nome, descricao, favorito) => {
    return `
            <li class="item-jogo ${favorito ? 'item-jogo-fav' : 'item-jogo'}" ">
                <img src="./img/joystick.png" alt="Imagem de um joystick" id="joy-image">

                <div id="info-game">
                    <p id="saida-nome-jogo">${nome}</p>
                    
 
                    <p id="saida-descricao">${descricao}</p>
                </div>

                <div id="container-icons">
                    <span class="material-symbols-outlined trash" onclick="removeJogo(${id})">
                        delete
                    </span>
                    <span class="material-symbols-outlined star ${favorito ? 'star-fav' : 'star'}" onclick="setFavorito(${id})"  >
                        star
                    </span>
                </div>
            </li>
            `;

}

//Carregar o dados existentes
function LoadList() {
    
    lista.innerHTML = "";

    for (let game of banco) {

        let item = elementoHTML(game.id, game.nome, game.descricao, game.favorito);

        console.log(typeof(game.nome))

        if (game.favorito) { //item lista
            lista.innerHTML = item + lista.innerHTML;
        }
        else {                //lista  + item
            lista.innerHTML = lista.innerHTML + item;
        }
    }
    if (lista.innerHTML == "") {
        lista.innerHTML = "A lista está vazia!";
    }
}


//Função que removwe um jogo
function removeJogo(id) {
    let jogo = banco.filter(item => (item.id === id))[0];
    let index = banco.indexOf(jogo);
    banco.splice(index, 1);
    localStorage.setItem("banco", JSON.stringify(banco));
    LoadList();
}

//Adicionando a classe favorito ao jogo
function setFavorito(id) {
    let jogo = banco.filter(item => (item.id === id))[0];
    let index = banco.indexOf(jogo);
    jogo.favorito ? jogo.favorito = false : jogo.favorito = true;
    banco[index] = jogo;
    localStorage.setItem("banco", JSON.stringify(banco));
    LoadList();
}

//Salvando o jogo e sua descrição
function Salvar() {

    let id = banco.length === 0 ? 1 : banco[banco.length - 1].id + 1;

    let favorito = radiosim.checked; //true ou false

    banco = [...banco, { id: id, nome: nome.value, descricao: descricao.value, favorito: favorito }];
    localStorage.setItem("banco", JSON.stringify(banco));

    LoadList();

}

//Ativando evento que salva o jogo
let form = document.querySelector("#form");
form.addEventListener("submit", () => Salvar())

window.onload = () => nome.focus()

LoadList();
