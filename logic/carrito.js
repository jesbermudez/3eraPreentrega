let label = document.getElementById("label");
let carritoCompras = document.getElementById("carrito-compras");

let carrito = JSON.parse(localStorage.getItem("data")) || [];

let calcular = () => {
    let carritoImg = document.getElementById("cantidad-carrito");
    carritoImg.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calcular();

let generarCarritoItems = () => {
    if (carrito.length !== 0) {
        return carritoCompras.innerHTML = carrito.map((x)=> {
            console.log(x);
            let {iden, item} = x;
            let search = tiendaItems.find((x) => x.id === iden) || [];
            let {img, precio, nombre} = search;
            return `
            <div class = carrito-item>
            <img width=200px src="${img}" alt="">
            </div>`
        }).join("");
    }
    else {
        carritoCompras.innerHTML = ``
        label.innerHTML = `<h2> El carrito esta vacio </h2>
        <a href = "index.html">
        <button class = "boton-inicio"> volver al inicio </button>
         </a>`
    }
};

generarCarritoItems(); 