import {
    catalogoProdutos,
    buscarLocalStorage,
    salvarLocalStorage,
    removeDoLocalStorage
} from './src/assets/js/utilidades';

export function desenharProdutosCarrinho(idProduto, qtdProduto) {
    const product = catalogoProdutos.find(p => p.id === idProduto);
    const produtosCarrinhoCheckout = document.querySelector('#produtos-carrinho-checkout');

    const li = document.createElement('li');

    const liClassList = [
        'flex',
        'justify-start',
        'h-24',
        'p-2',
        'gap-3',
        'items-center',
        'w-full',
        'bg-slate-300',
        'text-slate-950',
        'rounded-lg',
        'relative'
    ];

    li.classList.add(...liClassList);

    li.innerHTML = `
        <img src="./src/assets/img/${product.imagem}" class="h-20 w-14" alt=${product.imagem}>
        <div class="w-full">
            <p class="text-sm font-semibold w-40">${product.nome}</p>
            <p class="text-xs italic">${product.marca}</p>
            <p class="text-sm font-semibold text-green-600">$ <span id="preco-produto-${product.id}">${product.preco}</span></p>
        </div>
        <div class="self-end text-end mr-2 w-full">
            <span id="qtd-${product.id}" class="border-2 border-slate-200 px-2 rounded-lg text-sm font-bold">${qtdProduto}</span>
        </div>
    `;

    produtosCarrinhoCheckout.appendChild(li);
}

function atualizarValorCheckout(idsProdutosComQuantidade) {
    const totalCheckout = document.querySelector('#total-carrinho-checkout');
    totalCheckout.innerHTML = '';
    let totalCarrinhoCheckout = 0;
    for (const idProdutoNoCarrinho in idsProdutosComQuantidade) {
        totalCarrinhoCheckout +=
            catalogoProdutos.find(p => p.id === idProdutoNoCarrinho).preco *
            idsProdutosComQuantidade[idProdutoNoCarrinho];
    }
    totalCheckout.innerHTML = totalCarrinhoCheckout;
}

function desenharProdutosCarrinhoCheckout() {
    const idsProdutosComQuantidade = buscarLocalStorage('carrinho');
    for (const idProduto in idsProdutosComQuantidade) {
        desenharProdutosCarrinho(idProduto, idsProdutosComQuantidade[idProduto]);
    }
    atualizarValorCheckout(idsProdutosComQuantidade);
}

function finalizarCompra(e) {
    e.preventDefault();
    const idsProdutosComQuantidade = buscarLocalStorage('carrinho');
    const historicoCompras = buscarLocalStorage('historicoCompras') ?? [];
    if (Object.keys(idsProdutosComQuantidade).length === 0) return;

    const data = new Date();
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    const dataAtual = data.getTime(); //`${dia}-${mes}-${ano}`;
    const pedido = {
        data: dataAtual,
        pedido: idsProdutosComQuantidade
    };

    const historicoAtualizado = [pedido, ...historicoCompras];
    salvarLocalStorage('historicoCompras', historicoAtualizado);
    removeDoLocalStorage('carrinho');
    window.location.href = window.location.origin + '/pedidos.html';
}

function initCheckout() {
    desenharProdutosCarrinhoCheckout();
}

document.addEventListener('submit', e => finalizarCompra(e));

initCheckout();
