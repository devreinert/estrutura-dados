class NoDuplo {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
        this.anterior = null;
    }
}

class ListaDupla {
    constructor() {
        this.cabeca = null;
        this.cauda = null; // agora temos controle do último nó
    }

    // Inserir no início
    inserirNoInicio(valor) {
        const novoNo = new NoDuplo(valor);

        if (this.cabeca === null) {
            this.cabeca = novoNo;
            this.cauda = novoNo;
        } else {
            novoNo.proximo = this.cabeca; // novo nó vira a cabeça
            this.cabeca.anterior = novoNo; // a antiga cabeça vira o segundo nó e aponta tbm para trás
            this.cabeca = novoNo; // atualiza o novo nó da lista para cabeça 
        }
    }

    // Remover do final
    removerDoFinal() {
        if (this.cauda === null) { // se cauda estiver vazia erro ao excluir
            throw new Error("Lista vazia");
        }

        if (this.cabeca === this.cauda) { //se o nó for unico
            this.cabeca = null;
            this.cauda = null;
        } else {
            this.cauda = this.cauda.anterior; //o ultimo nó vai para o penultimo
            this.cauda.proximo = null; //ultimo nó é excluido
        }
    }

    // ✅ Percorrer nos dois sentidos
    percorrer() {
        let atual = this.cabeca;
        console.log("➡ Percorrendo do início para o final:");
        while (atual !== null) {
            console.log(atual.valor);
            atual = atual.proximo;
        }

        atual = this.cauda;
        console.log("⬅ Percorrendo do final para o início:");
        while (atual !== null) {
            console.log(atual.valor);
            atual = atual.anterior;
        }
    }
}


// 🔹 Testando

const lista = new ListaDupla();

lista.inserirNoInicio(1);
lista.inserirNoInicio(2);
lista.inserirNoInicio(3);

lista.percorrer();

lista.removerDoFinal();

console.log("Após remover do final:");
lista.percorrer();