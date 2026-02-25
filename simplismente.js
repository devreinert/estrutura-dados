//Implemente uma lista simplesmente encadeada com as seguintes operações: 
//inserir no início, inserir no final e remover de uma posição específica. 
//Modifique o código anterior para permitir a busca de um elemento por valor.

class No {
    constructor(valor) { //chamado quando crio um novo nó
        this.valor = valor; 
        this.proximo = null;

    }
}

class Lista {
    constructor() {
        this.cabeca = null; // setando que o primeiro nó antes de ganhar um valor é nulo
    }

    adicionar(valor) {
        const novoNo = new No(valor); // criando novo nó
        if (this.cabeca === null) { //se a lista nao foi inicializada ainda
            this.cabeca = novoNo;   //cabeça com o valor nulo recebe novo nó com algum valor setado
        } else { //lista ja foi inicializada
            let atual = this.cabeca; //variavel atual vai para o inicio da fila (cabeça)
            while (atual.proximo !== null) { //vou percorrer a lista, até chegar no ultimo valor
                atual = atual.proximo; // enquanto nao acha um valor onde o prox seja nulo, vai percorrer
            }
            atual.proximo = novoNo; //cria um novo nó (o ultimo da fila)
        }
    }

    get(posicao) { //pegando um nó 
        if (posicao > -1) { //validação para que a posição seja 0 ou +
            let atual = this.cabeca; //variavel atual vai para o inicio da fila (cabeça)
            let i = 0;
            while (atual !== null && i < posicao) {//vou percorrer a lista até chegar na posição desejada
                atual = atual.proximo; //passa do nó em que está para o proximo
                i++; //guarda a posição em que vc está
            }

            return atual !== null ? atual.valor : undefined; //se encontrou o nó retorna, se não undefined
        } else {
            return "erro";
        }
    }

    deletar(posicao) {
        if (this.cabeca === null || posicao < 0) { //validando se o item que quero deletar existe
            throw new RangeError(`Sem item na posição ${posicao}`);
        }

        if (posicao === 0) { //se quiser deletar a cabeça
            this.cabeca = this.cabeca.proximo; //a atual cabeça passa a ser o proximo nó (posição 1)
            return true;
        }

        let atual = this.cabeca; //variavel atual vai para o inicio da fila (cabeça)
        let anterior = null; //variavel anterior esta nulo pois nao tem valor antes do primeiro nó
        let i = 0; //contador
        while (atual !== null && i < posicao) { //validação atuual tem que ter valor e o indice vai até a posição que quero deletar
            //atual → 1
            //anterior → null
            //i = 0
            anterior = atual;
            atual = atual.proximo;
            i++;
            //anterior → 1
            //atual → 2
            //i = 1   
        }

        if (atual !== null) { //se atual tiver valor
            anterior.proximo = atual.proximo; //nó anterio pula o nó atual e se liga ao proximo nó, excluindo automaticamente o nó atual
            return true;
        }

        throw new RangeError(`Sem item na posição ${posicao}`); //erro

    }

    valores() {
        let atual = this.cabeca; //variavel atual vai para o inicio da fila (cabeça)
        let valores = []; //crio um array para armazenar os nós
        while (atual !== null) { //enquanto nó tiver valor
            valores.push(atual.valor); //armazena valor no array
            atual = atual.proximo; //passa para o proximo
        }
        return valores;
    }
}


const lista = new Lista();
    lista.adicionar(1); // adicionando novo nó
    lista.adicionar(2); // adicionando novo nó
    lista.adicionar(3); // adicionando novo nó
    console.log(lista.valores()); // imprimindo nós
    lista.deletar(1); // deletando nó
    lista.adicionar(4); // adicionando novo nó
    console.log(lista.valores()); // imprimindo nós
    console.log(lista.get(2)); // pegando um nó em especifico
