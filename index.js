import CarteiraCartoes from "./CarteiraCartoes.js";
import Cartao from "./Cartao.js";

const add = document.querySelector("#add");

const cardNumber = document.querySelector("#card-number");
const cardHolder = document.querySelector("#name-text");
const cardExpiration = document.querySelector("#valid-thru-text");
const cardCVV = document.querySelector("#cvv-text");

const cardNumberText = document.querySelector(".number-vl");
const cardHolderText = document.querySelector(".name-vl");
const cardExpirationText = document.querySelector(".expiration-vl");
const cardCVVText = document.querySelector(".cvv-vl");

let modal = document.querySelector('.modal');



var carteira = new CarteiraCartoes();
var id = 0;

cardNumber.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardNumberText.innerText = "1234 5678 9101 1121";
    } 
    else {
        const valuesOfInput = e.target.value.replaceAll(" ", "");

        if (e.target.value.length > 14) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
            cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
        } else if (e.target.value.length > 9) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
            cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
        } else if (e.target.value.length > 4) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
            cardNumberText.innerHTML = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
        } else {
            cardNumberText.innerHTML = valuesOfInput
        }
    }
})

cardHolder.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardHolderText.innerHTML = "NOAH JACOB";
    } else {
        cardHolderText.innerHTML = e.target.value.toUpperCase();
    }
})

cardExpiration.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardExpirationText.innerHTML = "02/40";
    } else {
        const valuesOfInput = e.target.value.replace("/", "");

        if (e.target.value.length > 2) {
            e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
            cardExpirationText.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        } else {
            cardExpirationText.innerHTML = valuesOfInput;
        }
    }
})

cardCVV.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardCVVText.innerHTML = "123";
    } else {
        cardCVVText.innerHTML = e.target.value;
    }
})

function preencherFormEditarCartao(id, numeroCartao, titular, validadeCartao, cvcCartao){
    let cartaoId = id
    document.querySelector('#card-number').value = numeroCartao
    document.querySelector('#name-text').value = titular.toUpperCase()
    document.querySelector('#valid-thru-text').value = validadeCartao
    document.querySelector('#cvv-text').value = cvcCartao

    add.setAttribute("id", "editar");
    add.id = "editar"

    let editar = document.querySelector("#editar");
    editar.innerHTML = "EDIT";

    let cartao;

    editar.addEventListener("click", (e)=>{

        carteira.cartoes.forEach((c)=>{
            if(c.id === cartaoId){
                cartao = c
                console.log("encontrou o cartao")
            }
        })

        cartao.numero = document.querySelector('#card-number').value
        cartao.titular = document.querySelector('#name-text').value
        cartao.validade = document.querySelector('#valid-thru-text').value
        cartao.cvc = document.querySelector('#cvv-text').value

        document.querySelector(`tr[id="${cartao.id}"] td:first-child`).innerHTML = cartao.id;
        document.querySelector(`tr[id="${cartao.id}"] td:nth-child(2)`).innerHTML = cartao.numero;
        

        editar.setAttribute("id", "add");
        editar.id = "add";
        let add = document.querySelector("#add")
        add.innerHTML = "ADD";



    })


}

function addClickHandler(e){
    e.preventDefault();
    
    
    let numeroCartao = document.querySelector('#card-number').value.replace(/\s/g, '')
    let titular = document.querySelector('#name-text').value
    let validade = document.querySelector('#valid-thru-text').value
    let cvc = document.querySelector('#cvv-text').value

    let novoCartao = new Cartao(id, numeroCartao, titular, validade, cvc)

    if(novoCartao.validarNumero()){
        if(novoCartao.validarValidade()){
            if(novoCartao.validarCVC()){
                if(carteira.verificarCartaoNaoDuplicado(novoCartao)){
                    carteira.adicionarCartao(novoCartao);
                    id ++
                    
                    // Selecione a tabela
                    const tabela = document.querySelector('table');

                    // Crie uma nova linha
                    const novaLinha = document.createElement('tr');
                    novaLinha.setAttribute("id", id);

                    // Crie as células para ID e número do cartão
                    const idCell = document.createElement('td');
                    const numeroCell = document.createElement('td');
                    idCell.textContent = id;
                    numeroCell.textContent = numeroCartao;

                    // Crie as células para "Editar" e "Excluir"
                    const editarCell = document.createElement('td');
                    const excluirCell = document.createElement('td');
                    const editarLink = document.createElement('a');
                    const excluirLink = document.createElement('a');
                    editarLink.href = '#';
                    excluirLink.href = '#';
                    editarLink.textContent = 'Editar';
                    excluirLink.textContent = 'Excluir';

                    // Adicione os eventos aos links "Editar" e "Excluir"
                    editarLink.addEventListener('click', () => {
                        preencherFormEditarCartao(novoCartao.id, novoCartao.numero, novoCartao.titular, novoCartao.validade, novoCartao.cvc);
                    });
                    excluirLink.addEventListener('click', () => {
                        carteira.excluirCartao(novoCartao.numero);
                        // Remove a linha da tabela
                        tabela.removeChild(novaLinha);
                        modal.style.display = 'flex';
                        modal.querySelector('p').innerHTML = "Cartão removido da carteira!";
                    });

                    // Adicione as células e links à linha
                    editarCell.appendChild(editarLink);
                    excluirCell.appendChild(excluirLink);
                    novaLinha.appendChild(idCell);
                    novaLinha.appendChild(numeroCell);
                    novaLinha.appendChild(editarCell);
                    novaLinha.appendChild(excluirCell);

                    // Adicione a nova linha à tabela
                    tabela.appendChild(novaLinha);

                    document.querySelector('#card-number').value = "";
                    document.querySelector('#name-text').value = "";
                    document.querySelector('#valid-thru-text').value = "";
                    document.querySelector('#cvv-text').value =  "";

                    modal.style.display = 'flex';
                    modal.querySelector('p').innerHTML = "Cartão adicionado com sucesso!";
                }
                else{
                    modal.style.display = 'flex';
                    modal.querySelector('p').innerHTML = "Cartão já está na sua carteira!";
                }
            }
            else{
                modal.style.display = 'flex';
                modal.querySelector('p').innerHTML = "CVC do cartão inválido!";
                let cvc = document.querySelector('#cvv-text').value
            }
        }
        else{
            modal.style.display = 'flex';
            modal.querySelector('p').innerHTML = "Validade do cartão inválida!";
            document.querySelector('#valid-thru-text').value = ""
        }
    }

    else{
        modal.style.display = 'flex';
        modal.querySelector('p').innerHTML = "Número do cartão inválido!";
        document.querySelector('#card-number').value
    }


    // add.removeEventListener("click", addClickHandler)
    
}

add.addEventListener("click", addClickHandler);
