import {
    buscarLocalStorage,
    catalogoProdutos,
    removeDoLocalStorage
} from './src/assets/js/utilidades';

function buscarCompras() {
    const compras = buscarLocalStorage('historicoCompras');
    return compras;
}

function desenharProdutosCarrinho(idProduto, qtdProduto, idLista) {
    const product = catalogoProdutos.find(p => p.id === idProduto);
    const minhasCompras = document.querySelector(`#list-${idLista}`);

    const li = document.createElement('li');

    const liClassList = [
        'flex',
        'justify-start',
        'h-32',
        'py-2',
        'px-1',
        'gap-3',
        'items-center',
        'w-full',
        'bg-slate-300',
        'text-slate-950',
        'rounded-lg',
        'relative',
        'w-[320px]',
        'border-2',
        'border-slate-400'
    ];

    li.classList.add(...liClassList);

    li.innerHTML = `
        <img src="./src/assets/img/${product.imagem}" class="h-26 w-20" alt=${product.imagem}>
        <div class="w-full">
            <p class="text-md font-semibold w-40">${product.nome}</p>
            <p class="text-sm italic">${product.marca}</p>
            <p class="text-md font-semibold text-green-600">$ <span id="preco-produto-${product.id}">${product.preco}</span></p>
        </div>
        <div class="self-end text-end mr-2 w-full">
            <span id="qtd-${product.id}" class="border-2 border-slate-200 px-2 rounded-lg text-sm font-bold">${qtdProduto}</span>
        </div>
    `;

    minhasCompras.appendChild(li);
}

function formataData(data) {
    const dataFormatada = data.toLocaleString('pt-BR', {
        timezone: 'UTC',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    return dataFormatada;
}

function criaLista(data, dataFormatada) {
    const ul = document.createElement('ul');
    ul.innerHTML = `<p class="text-sm font-bold text-slate-700">Data da compra: ${dataFormatada}</p>`;
    const ulClassList = [
        'flex',
        'flex-col',
        'gap-3',
        'p-3',
        'border-2',
        'border-slate-50',
        'rounded-lg',
        'shadow-lg',
        'shadow-slate-600',
        'bg-slate-200'
    ];
    ul.classList.add(...ulClassList);
    ul.setAttribute('id', `list-${data}`);
    return ul;
}

function desenharCompras() {
    const pedidos = buscarCompras();

    if (pedidos === null) return;

    for (let { data, pedido: listaPedidos } of pedidos) {
        const date = new Date(data);
        const dataFormatada = formataData(date);
        const ul = criaLista(data, dataFormatada);

        document.querySelector(`#minhas-compras`).appendChild(ul);

        for (const pedido in listaPedidos) {
            desenharProdutosCarrinho(pedido, listaPedidos[pedido], data);
        }
    }
}

function removerHistorico() {
    removeDoLocalStorage('historicoCompras');
    window.location.reload();
}

function initPedidos() {
    const buttonRemoverHistorico = document.querySelector('#limpar-historico');
    buttonRemoverHistorico.addEventListener('click', removerHistorico);
    desenharCompras();
}

initPedidos();
