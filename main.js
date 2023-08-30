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
            <li id="produto-${produto.id}" class="w-52 rounded-lg bg-zinc-100 drop-shadow-lg">
                <img class="rounded-ss-lg rounded-se-lg" src="./src/assets/img/${produto.imagem}" alt=${produto.imagem} />
                <div class="p-2 flex flex-col items-start justify-between h-36">
                    <div class="flex flex-col items-start">
                        <p class="font-bold">${produto.nome}</p>
                        <p class="italic">${produto.marca}</p>
                    </div>
                    <div class="flex justify-between w-full">
                        <p class="text-lg font-semibold mb-1">$${produto.preco}</p>
                        <button class="bg-blue-600 text-zinc-50 px-2 rounded-lg transition ease-in-out delay-150 bg-blue-500 hover:bg-blue-950 duration-300">Adicionar<i class="fa-solid fa-cart-shopping ml-2"></i></button>
                    </div>
                </div>
            </li>
        `;
        })
        .join('');

    return listaProdutos;
};

const listaProdutos = listarProdutos();

document.getElementById('container-produtos').innerHTML += listaProdutos;
