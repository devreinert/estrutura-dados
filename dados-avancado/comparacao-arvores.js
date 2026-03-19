/*
Comparação: Árvore B vs Árvore AVL
 1. Árvore AVL

É uma árvore binária balanceada

Cada nó tem no máximo 2 filhos

Mantém equilíbrio com rotações

 Complexidade

Busca: O(log n)

Inserção: O(log n)
(mas pode precisar de rotações → custo extra)

 2. Árvore B

Cada nó pode ter vários filhos (muitos!)

Muito usada em disco / banco de dados

Altura da árvore é bem menor

 Complexidade

Busca: O(log n)

Inserção: O(log n)
(com splits, mas menos frequentes que rotações da AVL)
*/
