// 🔢 Gerar lista aleatória
function gerarLista(tamanho) {
    return Array.from({ length: tamanho }, () =>
        Math.floor(Math.random() * 1000)
    );
}

//////////////////////////////////////////////////////
// 🔷 MERGE SORT
//////////////////////////////////////////////////////

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const meio = Math.floor(arr.length / 2);
    const esquerda = mergeSort(arr.slice(0, meio));
    const direita = mergeSort(arr.slice(meio));

    return merge(esquerda, direita);
}

function merge(esq, dir) {
    let resultado = [];
    let i = 0, j = 0;

    while (i < esq.length && j < dir.length) {
        if (esq[i] < dir[j]) {
            resultado.push(esq[i++]);
        } else {
            resultado.push(dir[j++]);
        }
    }

    return resultado.concat(esq.slice(i)).concat(dir.slice(j));
}

//////////////////////////////////////////////////////
// 🔶 QUICK SORT (pivô simples)
//////////////////////////////////////////////////////

function quickSort(arr) {
    if (arr.length <= 1) return arr;

    let pivo = arr[arr.length - 1];
    let menores = [];
    let maiores = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivo) menores.push(arr[i]);
        else maiores.push(arr[i]);
    }

    return [...quickSort(menores), pivo, ...quickSort(maiores)];
}

//////////////////////////////////////////////////////
// 🔶 QUICK SORT (mediana de 3)
//////////////////////////////////////////////////////

function medianaDeTres(arr) {
    let inicio = arr[0];
    let meio = arr[Math.floor(arr.length / 2)];
    let fim = arr[arr.length - 1];

    let trio = [inicio, meio, fim].sort((a, b) => a - b);
    return trio[1]; // valor mediano
}

function quickSortMediana(arr) {
    if (arr.length <= 1) return arr;

    let pivo = medianaDeTres(arr);

    let menores = [];
    let iguais = [];
    let maiores = [];

    for (let num of arr) {
        if (num < pivo) menores.push(num);
        else if (num > pivo) maiores.push(num);
        else iguais.push(num);
    }

    return [
        ...quickSortMediana(menores),
        ...iguais,
        ...quickSortMediana(maiores)
    ];
}

//////////////////////////////////////////////////////
// 🧪 TESTE COM 50 ELEMENTOS
//////////////////////////////////////////////////////

let lista = gerarLista(50);

console.log("Lista original:", lista);

// 🔷 Merge Sort
let inicio = performance.now();
let mergeResultado = mergeSort([...lista]);
let tempoMerge = performance.now() - inicio;

// 🔶 Quick Sort normal
inicio = performance.now();
let quickResultado = quickSort([...lista]);
let tempoQuick = performance.now() - inicio;

// 🔶 Quick Sort mediana
inicio = performance.now();
let quickMedResultado = quickSortMediana([...lista]);
let tempoQuickMed = performance.now() - inicio;

// 📊 Resultados
console.log("\n===== RESULTADOS =====");

console.log("Merge Sort tempo:", tempoMerge.toFixed(4), "ms");
console.log("Quick Sort tempo:", tempoQuick.toFixed(4), "ms");
console.log("Quick Mediana tempo:", tempoQuickMed.toFixed(4), "ms");

console.log("\nOrdenado (Merge):", mergeResultado);
console.log("Ordenado (Quick):", quickResultado);
console.log("Ordenado (Quick Mediana):", quickMedResultado);