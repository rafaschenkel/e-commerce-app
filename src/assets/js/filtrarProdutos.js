const containerProdutos = document.querySelector('#container-produtos');

function exibirTodos() {
    const todosProdutos = Array.from(containerProdutos.querySelectorAll('.hidden'));
    for (const produto of todosProdutos) produto.classList.remove('hidden');
}

function esconderProdutosMasc() {
    exibirTodos();
    const produtosMasculinos = Array.from(containerProdutos.querySelectorAll('.masculino'));
    for (const produto of produtosMasculinos) produto.classList.add('hidden');
}

function esconderProdutosFeminino() {
    exibirTodos();
    const produtosFeminino = Array.from(containerProdutos.querySelectorAll('.feminino'));
    for (const produto of produtosFeminino) produto.classList.add('hidden');
}

export function inicializarFiltros() {
    document.querySelector('#input-todos').addEventListener('click', exibirTodos);
    document.querySelector('#input-feminino').addEventListener('click', esconderProdutosMasc);
    document.querySelector('#input-masculino').addEventListener('click', esconderProdutosFeminino);
}
