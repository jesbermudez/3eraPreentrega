let tienda = document.getElementById('tienda');

let carrito = JSON.parse(localStorage.getItem("data")) || [];

let tiendaItems = [{
    id: '001',
    nombre: 'camisa Bonsai',
    precio: 50,
    descripcion: 'descripcion generica 1',
    img: '../assets/camisa-bonsai2.png'
},
{
    id: '002',
    nombre: 'camisa enligthed',
    precio: 30,
    descripcion: 'decripcion generica 2',
    img: "../assets/unnamed.enligthed.png"
},
{
    id: '003',
    nombre: 'camisa policia',
    precio: 80,
    descripcion: 'descripcion generica 3',
    img: "../assets/policia.jpg"
},
{
    id: '004',
    nombre: 'camisa angel',
    precio: 100,
    descripcion: 'decripcion generica 4',
    img: "../assets/angelcamisa.jpg"
}
]

let generarTienda = () => {
    return (tienda.innerHTML = tiendaItems.map((x) => {
        let { id, nombre, precio, descripcion, img } = x;
        let search = carrito.find((y) => y.id === id) || [];
        return `<div id = producto-id-${id} class="item">
        <img src=${img} alt="" width="220" height="294">
        <div class="detalles">
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            <div class="cantidad-precio"> 
                <h2>$${precio}</h2>
                <div class="botones">
                    <svg onclick = "quitar(${id})" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12L18 12" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <span id=${id} class="cantidad">----</span>
                    <svg onclick = "agregar(${id})" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </div>
            </div>
        </div>
    </div>`
    })
    .join(""));
};

generarTienda();

let agregar = (id) => {

    let itemSelecionado = id;
    let buscar = carrito.find((x) => x.id === itemSelecionado);

    if (buscar === undefined) {
        carrito.push({
            id: itemSelecionado,
            item: 1,
        });
    } else {
        buscar.item += 1;
    }
localStorage.setItem("data", JSON.stringify(carrito));

    actualizar(itemSelecionado);
};

let quitar = (id) => {

    let itemSelecionado = id;
    let buscar = carrito.find((x) => x.id === itemSelecionado);

    if (buscar.item === 0) return;
    else {
        buscar.item -= 1;
    }
    localStorage.setItem("data", JSON.stringify(carrito));

    actualizar(itemSelecionado);
};

let actualizar = (id) => {
    let buscar = carrito.find((x) => x.id === id);
    let signoMas = document.getElementsByTagName("span");
    signoMas.innerHTML = buscar.item;

    calcular();
};

let calcular = () => {
    let carritoImg = document.getElementById("cantidad-carrito");
    carritoImg.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};


