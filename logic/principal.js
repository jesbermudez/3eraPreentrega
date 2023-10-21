let tienda = document.getElementById('tienda');

let carrito = JSON.parse(localStorage.getItem("data")) || [];


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
                    <span id=${id} class="cantidad">${
                        search.item === undefined ? "----" : search.item
                      }</span>
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

    actualizar(itemSelecionado);
    localStorage.setItem("data", JSON.stringify(carrito));
};

let quitar = (id) => {

    let itemSelecionado = id;
    let buscar = carrito.find((x) => x.id === itemSelecionado);

    if (buscar === undefined) return;
    if (buscar.item === 0) return;
    else {
        buscar.item -= 1;
    }
    actualizar(itemSelecionado);
    carrito = carrito.filter((x)=> x.item !== 0 )
    localStorage.setItem("data", JSON.stringify(carrito));
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

calcular();


