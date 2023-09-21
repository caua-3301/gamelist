//elementos HTML
let nome = document.querySelector("#nome");
let descricao = document.querySelector("#descricao");
let favorito = document.querySelector("#favorito");
let btn_salvar = document.querySelector("#salvar");
let lista = document.querySelector("#lista");

//Verificar no localStorage se o item "banco" existe, caso não, é criado
if (localStorage.getItem("banco") === null) {
    let gameList = [];
    localStorage.setItem("banco", JSON.stringify(gameList));
}

//Pegando os valores armazenados em "banco"
function getBanco() {
    let banco = localStorage.getItem("banco");
    return JSON.parse(banco);
}

console.log(getBanco())

//Adicionado as informações do jogo no item "banco"
function addGameToData(infoGame) {
    let gameInfo = infoGame
    let prov = getBanco()
    prov = [...prov, gameInfo]

    localStorage.setItem("banco", JSON.stringify(prov));
}

//localStorage.removeItem("banco")

//Pegando os dados e jogando no array que vai para o "banco"
function creatObject(id, nome, descricao, favorito) {
    let auxArray = { id: id, nome: nome, descricao: descricao, favorito: favorito }
    addGameToData(auxArray)
}

//Verificando se o item "banco" está vazio
function emptyBanco() {
    if (getBanco().length === 0) {
        return true;
    }
    return false;
}

//Criando um novo id com base no ultimo id da lista, adicionando mais um no valor máximo dela
function newId() {
    if (emptyBanco()) {
        return 0;
    }

    const keysBanco = Object.keys(getBanco());
    return Number(keysBanco[keysBanco.length - 1]) + 1;

}

//Carregando os dados existente que estão no LocalStorage
function loadList() {
    if (emptyBanco) {
        for (let games of getBanco()) {
            if (games !== 0) {
                let item = document.createElement("div");
                let marcado = games.favorito ? `<p>favorito</p>` : `<p></p>`;

                //html do item que vai ser salvo na lista
                item.innerHTML =
                    `
                <h1>${games.nome}</h1>
                <p>${games.descricao}</p>
        
                `
                    + marcado
                    + `<button id='id-delete'>Deletar</button>`
                    + `<button>${games.id}</button>`;

                lista.appendChild(item);
            }
        }
    }
}

loadList()

//Salvando elementos
function salvar() {
    let id = newId()
    creatObject(id, nome.value, descricao.value, favorito.checked)
    exibirItens()
}


function exibirItens() {
    lista.innerHTML = ' '
    for (let itens of getBanco()) {
        if (itens !== 0) {
            let item = document.createElement("div");
            let marcado = itens.favorito ? `<p>favorito</p>` : `<p></p>`;

            //html do item que vai ser salvo na lista
            item.innerHTML =
                `
            <h1>${itens.nome}</h1>
            <p>${itens.descricao}</p>
        
            `
                + marcado
                + `<button id='id-delete'>Deletar</button>`
                + `<button>${itens.id}</button>`;
            lista.appendChild(item);
        }
    }
}


// let deleteBotom = document.querySelectorAll("#id-delete")

// for (let control = 0; control < getBanco().length; control++) {

//     deleteBotom[control].addEventListener("click", () => {
//         let prov = getBanco()

//         selectId = function () {
//             let id = prov[control].id
//             return id
//         }

//         const newProv = prov.filter(item => item.id !== selectId());
//         console.log(newProv)
//         localStorage.setItem("banco", JSON.stringify(newProv));


//         exibirItens()


//         //prov[control] = 0
//         //Criando nova lista sem o elemento, e, posteriormente, o adiconando

//         //Outra forme de deletar, acredito que a ques está sendo usada seja melhor


//     })
//     deleteBotom = document.querySelectorAll("#id-delete")
// }



btn_salvar.addEventListener("click", salvar)