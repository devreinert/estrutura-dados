class TabelaHashLinear {
    constructor(tamanho = 10) {
        this.tabela = new Array(tamanho).fill(null);
        this.tamanho = tamanho;
        this.quantidade = 0;
    }

    hash(chave) {
        let soma = 0;

        for (let i = 0; i < chave.length; i++) {
            soma += chave.charCodeAt(i);
        }

        return soma % this.tamanho;
    }

    inserir(chave, valor) {
        if (this.quantidade >= this.tamanho) {
            console.log("Tabela cheia!");
            return;
        }

        let indice = this.hash(chave);

        // probing linear
        while (this.tabela[indice] !== null && this.tabela[indice].chave !== chave) {
            indice = (indice + 1) % this.tamanho;
        }

        if (this.tabela[indice] === null) {
            this.quantidade++;
        }

        this.tabela[indice] = { chave, valor };
    }

    buscar(chave) {
        let indice = this.hash(chave);
        let inicio = indice;

        while (this.tabela[indice] !== null) {
            if (this.tabela[indice].chave === chave) {
                return this.tabela[indice].valor;
            }

            indice = (indice + 1) % this.tamanho;

            if (indice === inicio) break;
        }

        return null;
    }

    remover(chave) {
        let indice = this.hash(chave);
        let inicio = indice;

        while (this.tabela[indice] !== null) {
            if (this.tabela[indice].chave === chave) {
                this.tabela[indice] = null;
                this.quantidade--;
                return true;
            }

            indice = (indice + 1) % this.tamanho;

            if (indice === inicio) break;
        }

        return false;
    }

    mostrar() {
        console.log(this.tabela);
    }
}

const tabela = new TabelaHashLinear(5);

tabela.inserir("ana", 1);
tabela.inserir("bia", 2);
tabela.inserir("carlos", 3);
tabela.inserir("daniel", 4);
tabela.inserir("edu", 5);

tabela.mostrar();

console.log("Buscar ana:", tabela.buscar("ana"));