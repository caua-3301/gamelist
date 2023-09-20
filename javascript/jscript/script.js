let nome = document.querySelector("#nome");
let descricao = document.querySelector("#descricao");
let radiosim = document.querySelector("#radiosim");
let radionao = document.querySelector("#radionao");
let lista = document.querySelector("#lista");

let banco = JSON.parse(localStorage.getItem("banco")); 

if (banco === null) {
    let array = [];
    localStorage.setItem("banco", JSON.stringify(array));
    banco  = JSON.parse(localStorage.getItem("banco"));
}

//a partir dessa funcao anonima a funcoes LoadList  pode criar elemento html de forma mais facil
let elementoHTML = (id, nome, descricao, favorito)=>{
    return `
            <div class="item">
                <hr>
                <img src="" alt="joystick">
                <h1>${nome}</h1>
                <p>${descricao}</p>
                <p class="${favorito?'favorito':'naofavorito'}" onclick="setFavorito(${id})">${favorito? 'favorito':'nao favorito'}</p>
                <button onclick="removeJogo(${id})">deletar</button>
            </div>
            `;
}

//carregar o dados existentes
function LoadList(){

    lista.innerHTML = "";

    for (let game of banco) {

        let item = elementoHTML(game.id, game.nome, game.descricao, game.favorito);
    
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


function removeJogo(id) {
    let jogo = banco.filter(item=>(item.id === id))[0];
    let index = banco.indexOf(jogo);
    banco.splice(index, 1);
    localStorage.setItem("banco",JSON.stringify(banco));
    LoadList();
}

function setFavorito (id) {
    let jogo = banco.filter(item=>(item.id === id))[0];
    let index = banco.indexOf(jogo);
    jogo.favorito? jogo.favorito = false : jogo.favorito = true;
    banco[index] = jogo;
    localStorage.setItem("banco", JSON.stringify(banco));
    LoadList();
}


function Salvar() {

    let id = banco.length === 0 ? 1 : banco[banco.length-1].id + 1;
    

    let favorito = radiosim.checked; //true ou false

    banco = [...banco, { id: id, nome:nome.value , descricao:descricao.value , favorito: favorito}];
    localStorage.setItem("banco",JSON.stringify(banco));

    LoadList();

    //Zerar campos
    nome.value = "";
    descricao.value = "";
    radiosim.checked = false;
    radionao.checked = true;
    nome.focus()
}

let form = document.querySelector("#form");
form.addEventListener("submit", ()=>Salvar())


LoadList();
