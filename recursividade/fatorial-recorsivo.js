function fatorial(n) {

    // caso base
    if (n === 0 || n === 1) {
        return 1;
    }

    // chamada recursiva
    return n * fatorial(n - 1);
}

// teste
let numero = 5;
console.log("Fatorial de", numero, "é:", fatorial(numero));