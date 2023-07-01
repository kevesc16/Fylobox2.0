const agregar = document.querySelector('.addCarro');
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


document.addEventListener('click', botonClick);



const comprarButton = document.querySelector('.comprarButton')
comprarButton.addEventListener('click', comprarClicked)

const tablaCarrito = document.querySelector('.barraCarrito');

function botonClick(event) {
    const button = event.target;
    const item = button.closest('.item-card');

    if (item) {
        const tituloElement = item.querySelector('.item-Titulo');
        const precioElement = item.querySelector('.item-Precio');
        const imagenElement = item.querySelector('.item-Imagen');

        if (tituloElement && precioElement && imagenElement) {
            const titulo = tituloElement.textContent;
            const precio = precioElement.textContent;
            const imagen = imagenElement.src;

            agregarItemCarrito(titulo, precio, imagen);
        }
    }
}

function agregarItemCarrito(titulo, precio, imagen){

    const elementTilttle = tablaCarrito.getElementsByClassName('shoppingCartItemTitle')

    for(let i = 0; i< elementTilttle.length; i++){
        if(elementTilttle[i].innerText === titulo){
            let cantidadPeliculas = elementTilttle[i].parentElement.parentElement.parentElement.querySelector('.cantidadPeliculas');
            cantidadPeliculas.value++;
            actualizarTotal();
            return;
        }
    }
    const filaCarrito = document.createElement('div');
    const carritoContenido = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${imagen} class="shopping-cart-image imgSu">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${titulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 carritoPrecio">${precio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input cantidadPeliculas" type="number"
                    value="1">
                <button class="btn btn-danger eliminarProducto" type="button">X</button>
            </div>
        </div>
    </div>`;

    filaCarrito.innerHTML = carritoContenido;
    tablaCarrito.append(filaCarrito);

    filaCarrito.querySelector('.eliminarProducto').addEventListener('click', eliminacionProducto)

    filaCarrito.querySelector('.cantidadPeliculas').addEventListener('change', cantidadCambio)
    actualizarTotal();

    // Guardar datos en el localStorage
    const item = {
        titulo: titulo,
        precio: precio,
        imagen: imagen
    };

    carrito.push(item);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarTotal(){
    let totalP = 0;
    const total = document.querySelector('.totalPagar');
    const itemCarrito = document.querySelectorAll('.shoppingCartItem');

    itemCarrito.forEach(barraCarrito =>{
        const precioElemento = barraCarrito.querySelector('.carritoPrecio');
        const precioB = Number(precioElemento.textContent.replace('CLP',''));

        const cantidadElemento = barraCarrito.querySelector('.cantidadPeliculas');
        const cantidad = Number(cantidadElemento.value);

        totalP = totalP + precioB * cantidad;
    });
    total.innerHTML=`${totalP}$`
    botonDesactivado(totalP);
}
function eliminacionProducto(event){
    const botonClickeado = event.target
    botonClickeado.closest('.shoppingCartItem').remove();

    const indiceAEliminar = 0; // Índice del elemento a eliminar

    if (indiceAEliminar >= 0 && indiceAEliminar < carrito.length) {
        carrito.splice(indiceAEliminar, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("Pelicula eliminado correctamente");
    } else {
        alert("El índice está fuera de rango");
    }
    actualizarTotal();
}

function cantidadCambio(event){
    const cambioElemento = event.target
    if(cambioElemento.value <= 0){
        cambioElemento.value = 1;
    }
    actualizarTotal();
}

function comprarClicked(event){
    tablaCarrito.innerHTML = '';
    localStorage.removeItem('carrito');
    actualizarTotal();
    alert('Su pedido ha sido realizado');
}

let botones = document.getElementsByClassName('comprarButton');
botones[0].disabled = true;

function botonDesactivado(totalP){
    let botones = document.getElementsByClassName('comprarButton');
    if(totalP === 0){
        botones[0].disabled = true;
    }else{
        botones[0].disabled = false;
    }


}

function showLocal(){
    for(let i = 0; i< carrito.length; i++){
        const array = carrito[i];
        const titulo = array.titulo;
        const precio = array.precio;
        const imagen = array.imagen;

        const filaCarrito = document.createElement('div');
        const carritoContenido = `
        <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <img src=${imagen} class="shopping-cart-image">
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${titulo}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                    <p class="item-price mb-0 carritoPrecio">${precio}</p>
                </div>
            </div>
            <div class="col-4">
                <div
                    class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                    <input class="shopping-cart-quantity-input cantidadPeliculas" type="number"
                        value="1">
                    <button class="btn btn-danger eliminarProducto" type="button">X</button>
                </div>
            </div>
        </div>`;

        filaCarrito.innerHTML = carritoContenido;
        tablaCarrito.append(filaCarrito);

        filaCarrito.querySelector('.eliminarProducto').addEventListener('click', eliminacionProducto)
        filaCarrito.querySelector('.cantidadPeliculas').addEventListener('change', cantidadCambio)
        actualizarTotal();
    }

}
showLocal();