class Pilha {
    constructor(){
        this.itens = [];
    }

    empilhar(valor){
        this.itens.push(valor);
    }

    desempilhar(){
        return this.itens.pop();
    }

    estaVazia(){
        return this.itens.length === 0;
    }

    estaCheia(){
        return false;
    }
}

function verificarParenteses(expressao) {
    const pilha = new Pilha();

    for (let i = 0; i < expressao.length; i++) {

        if (expressao[i] === "(") {
            pilha.empilhar("(");
        }

        if (expressao[i] === ")") {
            if (pilha.estaVazia()) {
                return false;
            }
            pilha.desempilhar();
        }
    }

    return pilha.estaVazia();
}

console.log(verificarParenteses("((1+2)*(3/4))")); // true
console.log(verificarParenteses("((1+2)*(3/4)"));  // false
console.log(verificarParenteses("(1+2))"));        // false

const lista = new Pilha();

lista.empilhar(1);
lista.empilhar(2);
lista.empilhar(3);
console.log(lista.itens);
lista.desempilhar();
console.log(lista.itens);