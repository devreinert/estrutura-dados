function torreHanoi(n, origem, auxiliar, destino) {

    if (n === 1) {
        console.log(`Mover disco 1 de ${origem} para ${destino}`);
        return;
    }

    torreHanoi(n - 1, origem, destino, auxiliar);

    console.log(`Mover disco ${n} de ${origem} para ${destino}`);

    torreHanoi(n - 1, auxiliar, origem, destino);
}

torreHanoi(3, "A", "B", "C");