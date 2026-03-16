class Fila {
    constructor() {
        this.itens = [];
    }

    empilhar(valor){
        this.itens.push(valor);
    }

    excluir(){
        if(this.itens.length === 0){
            return null;
        }

        return this.itens.shift();
    }

}

const lista = new Fila();

lista.empilhar(1);
lista.empilhar(2);
lista.empilhar(3);
console.log(lista.itens);
lista.excluir()
console.log(lista.itens);