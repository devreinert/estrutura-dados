function heapSortEstavel(arr) {
    // adiciona índice original
    let lista = arr.map((valor, indice) => ({ valor, indice }));

    let n = lista.length;

    // construir heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(lista, n, i);
    }

    // ordenar
    for (let i = n - 1; i > 0; i--) {
        [lista[0], lista[i]] = [lista[i], lista[0]];
        heapify(lista, i, 0);
    }

    // retorna apenas os valores
    return lista.map(item => item.valor);
}

function heapify(arr, n, i) {
    let maior = i;
    let esq = 2 * i + 1;
    let dir = 2 * i + 2;

    if (esq < n && comparar(arr[esq], arr[maior]) > 0) {
        maior = esq;
    }

    if (dir < n && comparar(arr[dir], arr[maior]) > 0) {
        maior = dir;
    }

    if (maior !== i) {
        [arr[i], arr[maior]] = [arr[maior], arr[i]];
        heapify(arr, n, maior);
    }
}

// comparação estável
function comparar(a, b) {
    if (a.valor !== b.valor) {
        return a.valor - b.valor;
    }
    return a.indice - b.indice; // mantém ordem original
}