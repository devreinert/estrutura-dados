function gerarLista(tamanho) {
    return Array.from({ length: tamanho }, () => Math.floor(Math.random() * 10000));
}

// ---------------- MERGE SORT ----------------
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
        if (esq[i] <= dir[j]) {
            resultado.push(esq[i++]);
        } else {
            resultado.push(dir[j++]);
        }
    }

    return resultado.concat(esq.slice(i)).concat(dir.slice(j));
}

// ---------------- QUICK SORT ----------------
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const pivo = arr[Math.floor(arr.length / 2)];
    const menores = arr.filter(x => x < pivo);
    const iguais = arr.filter(x => x === pivo);
    const maiores = arr.filter(x => x > pivo);

    return [...quickSort(menores), ...iguais, ...quickSort(maiores)];
}

// ---------------- HEAP SORT ----------------
function heapSort(arr) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }

    return arr;
}

function heapify(arr, n, i) {
    let maior = i;
    let esq = 2 * i + 1;
    let dir = 2 * i + 2;

    if (esq < n && arr[esq] > arr[maior]) maior = esq;
    if (dir < n && arr[dir] > arr[maior]) maior = dir;

    if (maior !== i) {
        [arr[i], arr[maior]] = [arr[maior], arr[i]];
        heapify(arr, n, maior);
    }
}

// ---------------- TESTE ----------------
function testar(tamanho) {
    console.log(`\nLista com ${tamanho} elementos`);

    const lista = gerarLista(tamanho);

    let copia;

    copia = [...lista];
    console.time("Merge Sort");
    mergeSort(copia);
    console.timeEnd("Merge Sort");

    copia = [...lista];
    console.time("Quick Sort");
    quickSort(copia);
    console.timeEnd("Quick Sort");

    copia = [...lista];
    console.time("Heap Sort");
    heapSort(copia);
    console.timeEnd("Heap Sort");
}

// Executar testes
testar(100);
testar(1000);
testar(10000);