// CarteiraCartoes.js
export default class CarteiraCartoes {
    constructor() {
      this.cartoes = [];
    }
  
    adicionarCartao(cartao) {
      this.cartoes.push(cartao);
    }
  
    verificarCartaoNaoDuplicado(cartao) {
      return !this.cartoes.some((c) => c.numero === cartao.numero);
    }
  
    excluirCartao(numeroCartao) {
      this.cartoes = this.cartoes.filter((c) => c.numero !== numeroCartao);
    }
  
    editarCartao(numeroCartao, validade, cvc) {
      const cartaoExistente = this.cartoes.find((c) => c.numero === numeroCartao);
      if (cartaoExistente) {
        cartaoExistente.validade = validade;
        cartaoExistente.cvc = cvc;
      }
    }
  }
  
  