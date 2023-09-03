import { buscarLocalStorage, catalogoProdutos, salvarLocalStorage } from './utilidades';

const idsProdutoCarrinhoComQuantidade = buscarLocalStorage('carrinho') ?? {};

function handleCart() {
    const meuCarrinho = document.querySelector('#meu-carrinho');
    if (meuCarrinho.classList.contains('right-0')) {
        meuCarrinho.classList.remove('right-0');
        meuCarrinho.classList.add('right-[-384px]');
    } else {
        meuCarrinho.classList.remove('right-[-384px]');
        meuCarrinho.classList.add('right-0');
    }
}

function removerDoCarrinho(idProduto) {
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosNoCarrinho();
}

function incrementarQtdProduto(idProduto) {
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQtd(idProduto);
}

function decrementarQtdProduto(idProduto) {
    if (idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQtd(idProduto);
}

function atualizarInformacaoQtd(idProduto) {
    document.querySelector(`#qtd-${idProduto}`).innerText =
        idsProdutoCarrinhoComQuantidade[idProduto];
}

export function desenharProdutoNoCarrinho(idProduto) {
    const product = catalogoProdutos.find(p => p.id === idProduto);
    const produtosCarrinho = document.querySelector('#produtos-carrinho');

    const li = document.createElement('li');

    const liClassList = [
        'flex',
        'justify-between',
        'h-24',
        'py-1',
        'gap-3',
        'items-center',
        'w-full',
        'bg-slate-200',
        'text-slate-950',
        'rounded-lg',
        'relative'
    ];

    li.classList.add(...liClassList);

    li.innerHTML = `
        <button id="remover-produto-${
            product.id
        }"><i class="fa-solid fa-circle-xmark text-red-700 absolute top-2 right-2"></i></button>
        <img src="./src/assets/img/${product.imagem}" class="h-20 w-14" alt=${product.imagem}>
        <div class="px-1">
            <p class="text-sm w-40">${product.nome}</p>
            <p class="text-sm italic">${product.marca}</p>
            <p class="text-sm">$ <span id="preco-produto-${product.id}">${product.preco}</span></p>
        </div>
        <div class="flex self-end gap-2 m-1 border-2 border-slate-300 rounded-lg">
            <button id="decrementar-produto-${
                product.id
            }" class="border-r-2 border-slate-300 text-xs w-6 hover:bg-slate-400 duration-200 rounded-s-md">-</button>
            <p id="qtd-${product.id}" class="text-sm font-bold">${
        idsProdutoCarrinhoComQuantidade[product.id]
    }</p>
            <button id="incrementar-produto-${
                product.id
            }" class="border-l-2 border-slate-300 text-xs w-6 hover:bg-slate-400 duration-200 rounded-e-md">+</button>
        </div>
    `;

    produtosCarrinho.appendChild(li);

    document
        .querySelector(`#remover-produto-${product.id}`)
        .addEventListener('click', () => removerDoCarrinho(product.id));

    document
        .querySelector(`#incrementar-produto-${product.id}`)
        .addEventListener('click', () => incrementarQtdProduto(product.id));

    document
        .querySelector(`#decrementar-produto-${product.id}`)
        .addEventListener('click', () => decrementarQtdProduto(product.id));
}

export function adicionarAoCarrinho(idproduto) {
    if (idproduto in idsProdutoCarrinhoComQuantidade) {
        incrementarQtdProduto(idproduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idproduto] = 1;
    salvarLocalStorage('carrinho', idsProdutoCarrinhoComQuantidade);
    desenharProdutoNoCarrinho(idproduto);
    atualizarPrecoCarrinho();
}

export function renderizarProdutosNoCarrinho() {
    const produtosCarrinho = document.querySelector('#produtos-carrinho');
    produtosCarrinho.innerHTML = '';

    for (const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoNoCarrinho(idProduto);
    }
}

export function initCart() {
    const buttonOpenCart = document.querySelector('#abrir-carrinho');
    buttonOpenCart.addEventListener('click', handleCart);
    const buttonCloseCart = document.querySelector('#fechar-carrinho');
    buttonCloseCart.addEventListener('click', handleCart);
}

export function atualizarPrecoCarrinho() {
    const precoTotal = document.querySelector('#total-carrinho');
    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade) {
        precoTotalCarrinho +=
            catalogoProdutos.find(p => p.id === idProdutoNoCarrinho).preco *
            idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }
    precoTotal.innerText = precoTotalCarrinho;
}
