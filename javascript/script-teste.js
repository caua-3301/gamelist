//elementos HTML
let nome = document.querySelector("#nome");
let descricao = document.querySelector("#descricao");
let favorito = document.querySelector("#favorito");
let btn_salvar = document.querySelector("#salvar");
let lista = document.querySelector("#lista");

//Verificar no localStorage se o item "banco" existe, caso não, é criado
if (localStorage.getItem("banco") === null){
    let gameList = [];
    localStorage.setItem("banco", JSON.stringify(gameList));
}

//Pegando os valores armazenados em "banco"
function getBanco() {
    let banco = localStorage.getItem("banco");
    return JSON.parse(banco);
}

//localStorage.removeItem("banco")

//Adicionado as informações do jogo no item "banco"
function addGameToData(infoGame) {
    let gameInfo = infoGame
    let prov = getBanco()
    prov = [...prov, gameInfo]
    
    localStorage.setItem("banco", JSON.stringify(prov));
}

//Pegando os dados e jogando no array que vai para o "banco"
function creatObject(id, nome, descricao, favorito) {
    let auxArray = {id: id, nome: nome, descricao: descricao, favorito: favorito}
    addGameToData(auxArray)
}

//Verificando se o item "banco" está vazio
function emptyBanco() {
    if (getBanco().length === 0){
        return true;
    }
    return false;
}

//Criando um novo id com base no ultimo id da lista, adicionando mais um no valor máximo dela
function newId() {
    if (emptyBanco()){
        return 0;
    }

    const keysBanco = Object.keys(getBanco());
    return Number(keysBanco[keysBanco.length - 1]) + 1;
    
}

//Carregando os dados existente que estão no LocalStorage
function loadList() {
    if (emptyBanco){
        for (let games of getBanco()){
            let item = document.createElement("div");
            let marcado = games.favorito? `<p>favorito</p>`:  `<p></p>`;

            //html do item que vai ser salvo na lista
            item.innerHTML = 
            `
            <h1>${games.nome}</h1>
            <p>${games.descricao}</p>
    
            `
            + marcado
            +`<button id='ide'>Deletar</button>`
            +`<button>${games.id}</button>`;

            lista.appendChild(item);
        }
    }
}

loadList()

//Salvando elementos
function salvar() {
    let item = document.createElement("div");
    let id = newId()
    let marcado = favorito.checked? `<p>favorito</p>`:  `<p></p>`;

        //html do item que vai ser salvo na lista
        item.innerHTML = 
        `
        <h1>${nome.value}</h1>
        <p>${descricao.value}</p>
    
        `
        + marcado
        +`<button id='ide'>Deletar</button>`
        +`<button>${id}</button>`;
        lista.appendChild(item);

    creatObject( id, nome.value, descricao.value, favorito.checked)
}

btn_salvar.addEventListener("click", salvar)