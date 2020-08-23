
//ARRAY
var productos = [
    {
        id: 1,
        nombre: 'leche',
        precioUnitario: 56,
        cantidad: 50
    },
    {
        id: 2,
        nombre: 'pan',
        precioUnitario: 120,
        cantidad: 10
    },
    {
        id: 3,
        nombre: 'manteca',
        precioUnitario: 115,
        cantidad: 40
    },
    {
        id: 4,
        nombre: 'fideos',
        precioUnitario: 70,
        cantidad: 5
    },
    {
        id: 5,
        nombre: 'huevos',
        precioUnitario: 80,
        cantidad: 30
    },
    {
        id: 6,
        nombre: 'arroz',
        precioUnitario: 120,
        cantidad: 10
    },
    {
        id: 7,
        nombre: 'shampoo',
        precioUnitario: 150,
        cantidad: 20
    },
    {
        id: 8,
        nombre: 'dentifrico',
        precioUnitario: 90,
        cantidad: 6
    },
    {
        id: 9,
        nombre: 'banana',
        precioUnitario: 110,
        cantidad: 15
    },
    {
        id: 10,
        nombre: 'peras',
        precioUnitario: 120,
        cantidad: 50
    },

];


//Vector auxiliar
var compraProducto = [];

//Recorro todo el vector productos
productos.forEach(item => {
    crearTabla(item);
});



//Funcion para cacular el total comprado

var h2 = document.querySelector('h2');

function totalPagar(){
    var total = 0;

    compraProducto.forEach(item => {
        var parcial = item.precioUnitario * item.cantidad;
    
        total = total + parcial;
    });

    h2.innerHTML = "El total a pagar es " + total;

}




//Funcion para crear la tabla de los productos disponibles 

function crearTabla(producto){

    //NOMBRE
    var tdNombre = document.createElement('td');
    var txtNombre = document.createTextNode(producto.nombre);
    tdNombre.appendChild(txtNombre);


    //PRECIOUNITARIO
    var tdPrecio = document.createElement('td');
    var txtPrecio = document.createTextNode(producto.precioUnitario);
    tdPrecio.appendChild(txtPrecio);


    //CANTIDAD
    var tdCantidad = document.createElement('td');
    var txtCantidad = document.createTextNode(producto.cantidad);
    tdCantidad.appendChild(txtCantidad);
    

    //INPUT
    var tdInput = document.createElement('td');
    var inputCantidad = document.createElement('input');
    inputCantidad.setAttribute('type', 'text');
    inputCantidad.setAttribute('placeHolder', 'cantidad a comprar');
    tdInput.appendChild(inputCantidad);


    //BOTON COMPRAR
    var tdBoton = document.createElement('td');
    var btnComprar = document.createElement('button');
    var btnText = document.createTextNode('Comprar');
    btnComprar.appendChild(btnText);
    btnComprar.classList.add('btn-primary');
    btnComprar.setAttribute('id', producto.id);
    btnComprar.addEventListener("click", agregarCarrito);
    tdBoton.appendChild(btnComprar);



    //CREO EL TR
    var tr = document.createElement('tr');
    
    tr.classList.add('text-center');
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdInput);
    tr.appendChild(tdBoton);


    //AGREGO EL TR A LA TABLA PRODUCTOS
    var tbody = document.getElementById('tabla_productos');
    tbody.appendChild(tr);

};






//Funcion para crear la tabla de los productos comprados

function crearTablaCompra(producto){

    //NOMBRE
    var tdNombre = document.createElement('td');
    var txtNombre = document.createTextNode(producto.nombre);
    tdNombre.appendChild(txtNombre);
    

    //PRECIO
    var tdPrecio = document.createElement('td');
    var txtPrecio = document.createTextNode(producto.precioUnitario);
    tdPrecio.appendChild(txtPrecio);     
    

    //CANTIDAD
    var tdCantidad = document.createElement('td');
    var txtCantidad = document.createTextNode(producto.cantidad);
    tdCantidad.appendChild(txtCantidad);
    

    //PRECIO TOTAL
    var tdPrecioTotal = document.createElement('td');
    var txtPrecioTotal = document.createTextNode(producto.precioUnitario * producto.cantidad);
    tdPrecioTotal.appendChild(txtPrecioTotal);
    
    
    //BOTON BORRAR
    var tdBotonBorrar = document.createElement('td');
    var btnBorrar = document.createElement('button');
    var btnText = document.createTextNode('Borrar');
    btnBorrar.appendChild(btnText);
    btnBorrar.classList.add('btn-primary');
    btnBorrar.addEventListener("click", borrarCarrito);
    //btnBorrar.setAttribute('id', producto.id);
    btnBorrar.setAttribute(productos.id + "Borrar", borrarCarrito);
    tdBotonBorrar.appendChild(btnBorrar);

    


    //CREO EL TR
    var tr = document.createElement('tr');
    
    tr.classList.add('text-center');
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdPrecioTotal);
    tr.appendChild(tdBotonBorrar);


    //AGREGO EL TR A LA TABLA DE COMPRA
    var tbody = document.getElementById('tabla_compra');
    tbody.appendChild(tr);

};



//Funcion para agregar un producto al carrito

var mensaje = document.getElementById('mensaje');

function agregarCarrito(e){

    var input = e.target.parentNode.previousSibling.firstChild;

    var cantidadAComprar = input.value;

    if (cantidadAComprar == ''){
        mensaje.innerHTML = "ingresar monto a comprar";
        return;
    }


    //obtengo el id del button
    var idButton = e.target.id;

    var productosYaComprados = compraProducto.findIndex(item => item.id == idButton);

    if(productosYaComprados != -1){
        mensaje.innerHTML = "Ya seleccionó este producto";
        return;
    }

    var index = productos.findIndex(item => item.id == idButton);

    var producto = productos[index];

  
    var id = producto.id;
    var nombre = producto.nombre;
    var cantidad = producto.cantidad;
    var precio = producto.precioUnitario;


    if (cantidadAComprar > cantidad){
        mensaje.innerHTML = "No hay más stock de ese producto";
        return;
    }


    //Actualizo stock
    var cantidadStock = e.target.parentNode.previousSibling.previousSibling.firstChild;
    var stock = cantidad - cantidadAComprar;
    cantidadStock.textContent = stock;

    productos[index].cantidad = stock;




    //Creo un vector con la informacion del producto comprado

    var productoTablaCompra =
    {
        id: id,
        nombre: nombre,
        precioUnitario: precio,
        cantidad: cantidadAComprar,
    };

    //Se agregan los productos a la tabla de compras hechas

    compraProducto.push(productoTablaCompra);

    crearTablaCompra(productoTablaCompra);

}



                                                                                                                                                                                                                                                                                                                                                                                           
//Funcion para borrar producto del carrito

function borrarCarrito (e) {
    productoCarrito = e.target.parentNode.parentNode;
    
    productoCarrito.parentNode.removeChild(productoCarrito);
}

