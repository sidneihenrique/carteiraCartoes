// Cartao.js
export default class Cartao {
    constructor(id, numero, titular, validade, cvc, bandeira) {
      this.id = id;
      this.numero = numero;
      this.titular = titular
      this.validade = validade;
      this.cvc = cvc;
      this.bandeira = bandeira;
    }
  
    validarNumero() {
      return this.numero.length >= 13 && this.numero.length <= 16;
    }
  
    validarValidade() {
      const dataAtual = new Date();
      const inputValidade = this.validade;
      const partes = inputValidade.split('/');
      
      if (partes.length !== 2) {
          // Verificar se a entrada não possui o formato MM/AA
          return false;
      }
      
      const mes = parseInt(partes[0], 10);
      const ano = parseInt('20' + partes[1], 10); // Acrescentar '20' ao ano
      
      if (isNaN(mes) || isNaN(ano)) {
          // Verificar se as partes não são números válidos
          return false;
      }
      
      // A data do cartão é o primeiro dia do mês informado
      const dataCartao = new Date(ano, mes - 1, 1);
      
      return dataCartao > dataAtual;
  }
  
  
    validarCVC() {
      return /^\d{3}$/.test(this.cvc);
    }
  
    validarBandeira(bandeirasDisponiveis) {
      return bandeirasDisponiveis.includes(this.bandeira);
    }
  }
  

  