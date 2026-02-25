//○ Crie um vetor que armazene 10 números inteiros e desenvolva uma função 
//para buscar um número específico no vetor. 

//○ Implemente uma função para remover um elemento do vetor em uma 
//posição específica. 

const vet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function buscaNumero(vetor, indice){
    if(indice > 0 && indice < vetor.length){
        return `O indice ${indice} é o número ${vetor[indice]}`;
    }
    
}

function deletaNumero(vetor, indice){
  if(indice > 0 && indice < vetor.length){
    vetor.splice(indice, 1); //indice que sera removido do vetor
    return vetor;
  }

  return "Posição inválida";
}

console.log(buscaNumero(vet, 3));
console.log(deletaNumero(vet, 2));
