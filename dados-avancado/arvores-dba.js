/*

A árvore B é utilizada em bancos de dados como estrutura de índice, onde cada nó representa um bloco de armazenamento 
contendo múltiplas chaves e ponteiros. Isso permite reduzir drasticamente a altura da árvore e, consequentemente, o 
número de acessos ao disco. Em um cenário com milhões de registros, a busca pode ser realizada com apenas 2 a 4 acessos
ao disco, tornando a operação extremamente eficiente em comparação com a varredura sequencial. Além disso, inserções 
são realizadas de forma eficiente por meio de divisões (splits), garantindo bom desempenho e escalabilidade.
*/ 