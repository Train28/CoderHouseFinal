

//Peticion al api de platzi
fetch('https://api.escuelajs.co/api/v1/products')
    .then(response => response.json())
    .then(data => {

        let totalCompra = 0;
        let CarroCompraArreglo = [];

        let shopitems = document.querySelector('.shop-items');
        let totalElement = document.querySelector(".cart-total-title");
        let purchase = document.querySelector('.btn-purchase');

        //Limitando la cantidad de productos a 10
        let productos = data.slice(10, 20);

        productos.forEach(element => {
            // Con += me ahorro crear otro elemento
            shopitems.innerHTML += `
            <div class="shop-item" id="${element.id}">
                <span class="shop-item-title">${element.title}</span>
                <img class="shop-item-image" src=${element.images[0]}>
                <div class="shop-item-details">
                    <span  class="shop-item-price">s/.${element.price}</span>
                    <button class="btn btn-primary shop-item-button" type="button" id="${element.id}">Añadir al carro</button>
                </div>
            </div>
            
            `


        });

        //Cogemos todos los botones creados
        let botonAnadir = document.querySelectorAll(".shop-item-button");

        //
        let cartContainer = document.querySelector(".cart-items");

        //Convertimos a arreglo para usar el metodo foreach
        botonAnadir = [...botonAnadir];
        //Evento para usar todos los botones
        botonAnadir.forEach(btn => {
            btn.addEventListener('click', event => {
                console.log("SE HA DADO CLICK");

                //Buscar id del producto 

                let actualID = event.target.id;
                console.log(actualID);

                //usamos el ID para enconntrar el objeto
                let actualProduct = productos.find(item => item.id == actualID);
                if (actualProduct.quantity === undefined) {
                    // Le asignanos un atributo de cantidad y lo inicializamos con cero

                    actualProduct.quantity = 1;
                }

                
               
                let added = false;
                CarroCompraArreglo.forEach(element => {
                    if (actualID == element.id) {
                        added = true;
                    }
                });

                //
                if (added) {
                    actualProduct.quantity++;
                } else {
                    CarroCompraArreglo.push(actualProduct);
                }

                

                drawItems();


                //Actualizar el valor del total
                getTotal();
                //Remover items
                removeitems();

            });
        });


        purchase.addEventListener('click',()=>{

            if (CarroCompraArreglo.length === 0) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Aun no hay ningun producto en el carrito',
                    showConfirmButton: false,
                    timer: 1500
                  }) ;
                
            }else{
               Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Compra Finalizada',
                showConfirmButton: false,
                timer: 1500
              }) ;

              cartContainer.innerHTML = "";
              CarroCompraArreglo = [];

            totalElement.innerText = `s/. 0`; 
            }
            
            
        });


        function drawItems() {
            cartContainer.innerHTML = "";

                CarroCompraArreglo.forEach(item => {
                    cartContainer.innerHTML += ` 
                <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src=${item.images[0]} width="100" height="100">
                    <span class="cart-item-title">${item.title}</span>
                </div>
                <span class="cart-price cart-column">s/.${item.price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="${item.quantity}">
                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
                </div>`;
                });
                removeitems();
        }

        function getTotal() {
            let sumaTotal;
            let totalCompra = CarroCompraArreglo.reduce((sum, item) => {
                sumaTotal = sum + item.quantity * item.price
                return sumaTotal;
            }, 0);

            totalElement.innerText = `s/.${totalCompra}`;

        }

        function removeitems() {
            let removeBtn = document.querySelectorAll(".btn-danger" );

            removeBtn = [...removeBtn];
            removeBtn.forEach(btn => {
                btn.addEventListener('click', event=>{
                    //Buscar Titulo del libro
                   let actualProductStock = event.target.parentElement.parentElement.childNodes[1].innerText; 
                    //Buscarf el objeto con ese titulo
                    let actualProductObejct = CarroCompraArreglo.find(item=>item.title === actualProductStock);
                    //remover el objeto del carrro
                    CarroCompraArreglo = CarroCompraArreglo.filter(item => item !=actualProductObejct);
                    console.log(CarroCompraArreglo);
                    drawItems();
                    getTotal();
                
                });
                
            });
        }






    });


/*
data.forEach(element => {
    console.log(e);
});
//console.log(productos);*/