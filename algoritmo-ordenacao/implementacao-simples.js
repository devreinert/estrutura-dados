function selectionSort(arr) {
    let comparacoes = 0;
    let trocas = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {
            comparacoes++;
            if (arr[j] < arr[min]) {
                min = j;
            }
        }

        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
            trocas++;
        }
    }

    return { array: arr, comparacoes, trocas };
}

// Teste com 10 números
let lista = [64, 25, 12, 22, 11, 90, 34, 50, 5, 77];

let resultado = selectionSort(lista);

console.log("Ordenado:", resultado.array);
console.log("Comparações:", resultado.comparacoes);
console.log("Trocas:", resultado.trocas);