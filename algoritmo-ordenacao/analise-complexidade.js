// 🔵 BUBBLE SORT (com otimização)
function bubbleSort(arr) {
    let comparacoes = 0;
    let trocas = 0;

    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let trocou = false;

        for (let j = 0; j < n - i - 1; j++) {
            comparacoes++;

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                trocas++;
                trocou = true;
            }
        }

        if (!trocou) break; // otimização
    }

    return { array: arr, comparacoes, trocas };
}


// 🟡 SELECTION SORT
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


// 🔶 INSERTION SORT
function insertionSort(arr) {
    let comparacoes = 0;
    let trocas = 0;

    for (let i = 1; i < arr.length; i++) {
        let chave = arr[i];
        let j = i - 1;

        while (j >= 0) {
            comparacoes++;

            if (arr[j] > chave) {
                arr[j + 1] = arr[j];
                trocas++;
                j--;
            } else {
                break;
            }
        }

        arr[j + 1] = chave;
    }

    return { array: arr, comparacoes, trocas };
}


// 🔢 GERAR LISTA ALEATÓRIA
function gerarLista(tamanho) {
    let lista = [];
    for (let i = 0; i < tamanho; i++) {
        lista.push(Math.floor(Math.random() * 1000));
    }
    return lista;
}


// 🧪 TESTE COM 10 ELEMENTOS
console.log("===== TESTE COM 10 ELEMENTOS =====");

let lista10 = gerarLista(10);

console.log("Lista original:", lista10);

console.log("\nBubble Sort:");
console.log(bubbleSort([...lista10]));

console.log("\nSelection Sort:");
console.log(selectionSort([...lista10]));

console.log("\nInsertion Sort:");
console.log(insertionSort([...lista10]));


// 🧪 TESTE COM 100 ELEMENTOS
console.log("\n===== TESTE COM 100 ELEMENTOS =====");

let lista100 = gerarLista(100);

console.log("\nBubble Sort:");
console.log(bubbleSort([...lista100]));

console.log("\nSelection Sort:");
console.log(selectionSort([...lista100]));

console.log("\nInsertion Sort:");
console.log(insertionSort([...lista100]));