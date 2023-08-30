const catalogoProdutos = [
    {
        id: 1,
        marca: 'Zara',
        nome: 'Camisa Larga com Bolsos',
        preco: 70,
        imagem: 'product-1.jpg',
        feminino: false
    },
    {
        id: 2,
        marca: 'Zara',
        nome: 'Casaco Reto com Lã',
        preco: 85,
        imagem: 'product-2.jpg',
        feminino: true
    },
    {
        id: 3,
        marca: 'Zara',
        nome: 'Jaqueta com Efeito Camurça',
        preco: 60,
        imagem: 'product-3.jpg',
        feminino: false
    },
    {
        id: 4,
        marca: 'Zara',
        nome: 'Sobretudo em Mescla de Lã',
        preco: 160,
        imagem: 'product-4.jpg',
        feminino: false
    },
    {
        id: 5,
        marca: 'Zara',
        nome: 'Camisa Larga Acolchoada de Veludo Cotelê',
        preco: 110,
        imagem: 'product-5.jpg',
        feminino: false
    },
    {
        id: 6,
        marca: 'Zara',
        nome: 'Casaco de Lã com Botões',
        preco: 170,
        imagem: 'product-6.jpg',
        feminino: true
    },
    {
        id: 7,
        marca: 'Zara',
        nome: 'Casaco com Botões',
        preco: 75,
        imagem: 'product-7.jpg',
        feminino: true
    },
    {
        id: 8,
        marca: 'Zara',
        nome: 'Colete Comprido com Cinto',
        preco: 88,
        imagem: 'product-8.jpg',
        feminino: true
    }
];

const listarProdutos = () => {
    const listaProdutos = catalogoProdutos
        .map(produto => {
            return `
            <li id="produto-${produto.id}" class="produto">
                <img src="./src/assets/img/${produto.imagem}" alt=${produto.imagem} />
                <div class="produtoDesc">
                    <div class="produtoInfo">
                        <p class="produtoNome">${produto.nome}</p>
                        <p class="produtoMarca">${produto.marca}</p>
                        <p class="produtoPreco">$${produto.preco}</p>
                    </div>
                    <button class="buttonAdd">Adicionar</button>
                </div>
            </li>
        `;
        })
        .join('');

    return listaProdutos;
};

const listaProdutos = listarProdutos();

document.getElementById('container-produtos').innerHTML += listaProdutos;
