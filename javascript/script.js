
//elementos HTML
let nome = document.querySelector("#nome");
let descricao = document.querySelector("#descricao");
let favorito = document.querySelector("#favorito");
let btn_salvar = document.querySelector("#salvar");
let lista = document.querySelector("#lista")

if (localStorage.getItem("banco")===null) {
    let array = []
    localStorage.setItem("banco", JSON.stringify(array));
}

function GetBanco () {
    let banco = localStorage.getItem("banco");
    return JSON.parse(banco);
}

function SetBanco(array) {
    localStorage.setItem("banco",JSON.stringify(array));
}

function EmptyBanco() {
    if (GetBanco().lenght === 0) {
        return true
    }
    else {return false}
}


//retorna um novo id diferente dos outros
function newId () {
    if (EmptyBanco()) {
        return 1
    }

    else {
        //pegando uma lista com todos os id
        let list = GetBanco().map((item)=>{return item.id})
        //pegando o maior id
        let maior_id = Math.max(...list)
        return maior_id+1
    }
}


//carregar o dados existentes
function LoadList(){
    if (!EmptyBanco()) {
        let k = 0;
        let banco = GetBanco()
        for (k=0; k< banco.length; k++) {
            let item = document.createElement("div");

            let marcado = banco[k].favorito? `<p>favorito</p>`:  `<p></p>`;

            item.innerHTML = 
            `
                <h1>${banco[k].nome}</h1>
                <p>${banco[k].descricao}</p>
            
            `
            + marcado
            +`<button>${banco[k].id}</button>`;
            lista.appendChild(item);
            }
    }
}
//SetBanco([{id: 1, nome: "gta", descricao:"muito bom", favorito:true}])
LoadList()

function pushJogo(id, nome, descricao, favorito) {
    let jogo = { id: id, nome:nome , descricao:descricao , favorito: favorito }
    let list = GetBanco()
    list = [...list, jogo]
    SetBanco(list)
}






function Salvar() {
    let item = document.createElement("div");
    let id = newId()
    let fvrt =  favorito.checked
    marcado = fvrt? `<p>favorito</p>`:  `<p></p>`;

    //html do item que vai ser salvo na lista
    item.innerHTML = 
    `
        <h1>${nome.value}</h1>
        <p>${descricao.value}</p>
    
    `
    + marcado
    +`<button>${id}</button>`;


    lista.appendChild(item);

    pushJogo( id, nome.value, descricao.value, favorito.checked)
}

btn_salvar.addEventListener("click", Salvar);

