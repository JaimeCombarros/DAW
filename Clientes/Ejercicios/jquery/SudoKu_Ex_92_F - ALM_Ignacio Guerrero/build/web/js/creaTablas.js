function creaBoton(){
	var botones =document.getElementsByTagName("button");
	if(botones)
	{
		var boton = document.createElement("button");
		var clic = document.createAttribute("onclick");
		var alter = document.createAttribute("title");
		var ntexto = document.createTextNode("Borrar");

		alter.nodeValue="Eliminar artículo";
		boton.setAttributeNode(alter);

		boton.appendChild(ntexto);

                clic.nodeValue="borraFila(this);";
		boton.setAttributeNode(clic);
		return boton;
	}
	else return botones[0].cloneNode(true);
}

//---------------------------------------------------

function tabla(titulo,id,donde,datos,borrar,subtotal){
    // Crear <table> y sus dos atributos

            var tabla = document.createElement('table');
            tabla.setAttribute('id', id);
            tabla.setAttribute('border', 1);
            tabla.setAttribute('summary', 'Descripción de la tabla y su contenido');

    // Crear <caption> y añadirlo a la <table>
            var caption = document.createElement('caption');
            var titulo = document.createTextNode(titulo);
            caption.appendChild(titulo);
            tabla.appendChild(caption);

    // Crear sección <thead>
            var thead = document.createElement('thead');
            tabla.appendChild(thead);
            // Añadir una fila a la sección <thead>
                    thead.insertRow(0);
            // Añadir las tres columnas de la fila de <thead>
                    var cabecera;

                    var nfilas	 	= Object.keys(datos).length;

                    var clavesLinea = Object.keys(datos["0"]);

                    var ncolumnas	= clavesLinea.length - 1;	

                    for (i=0; i<ncolumnas ; i++)
                    {
                            cabecera = document.createElement('th');
                            cabecera.innerHTML = clavesLinea[i];
                            thead.rows[0].appendChild(cabecera);
                    }

            // Insertamos la columna Subtotal...............

                    if(subtotal){
                            cabecera = document.createElement('th');
                            cabecera.innerHTML = "Subtotal";
                            thead.rows[0].appendChild(cabecera);
                    }


    // Crear sección <tbody>
            var tbody = document.createElement('tbody');
            tabla.appendChild(tbody);

            var suma=0;
            for (var i=0; i<nfilas ; i++){
                    var j;
                    tbody.insertRow(i);
                    tbody.rows[i].style.color = datos[i][clavesLinea[ncolumnas]];
                    for (j=0; j<ncolumnas ; j++)
                            {
                                    tbody.rows[i].id=i;
                                    tbody.rows[i].insertCell(j);
                                    tbody.rows[i].cells[j].innerHTML = datos[i][clavesLinea[j]];

                            }
                    
                    // Comprobamos si la tabla debe llevar un subtotal
                    
                    if(subtotal){
                            tbody.rows[i].insertCell(ncolumnas);
                            tbody.rows[i].cells[ncolumnas].innerHTML =
                                (parseFloat(tbody.rows[i].cells[1].innerHTML)
                                *parseInt(tbody.rows[i].cells[2].innerHTML)).toFixed(2);
                            suma+=parseFloat(tbody.rows[i].cells[ncolumnas].textContent);
                    }
                    
                    // Comprobamos si la tabla debe llevar el boton borrar
                    
                    if(borrar){
                            tbody.rows[i].insertCell(ncolumnas + 1);
                            tbody.rows[i].cells[ncolumnas + 1].appendChild(creaBoton());
                    }	

            }

     // Crear sección <tfoot>
            if(subtotal){
                    var tfoot = document.createElement('thead');
                    tabla.appendChild(tfoot);
                    // Añadir una fila a la sección <thead>
                    tfoot.insertRow(0);
                    // Añadir las dos columnas de la fila de <thead>
                    var cabecera = document.createElement('th');
                    cabecera.setAttribute('colspan', thead.rows[0].cells.length-1);
                    cabecera.innerHTML = 'Total:...';
                    tfoot.rows[0].appendChild(cabecera);

                    cabecera = document.createElement('td');
                    cabecera.innerHTML =Math.round(suma)+ ' €';
                    tfoot.rows[0].appendChild(cabecera);
             }
    // Insertamos la tabla
    var donde= document.getElementById(donde);

    if (donde.childNodes.length>0){
            donde.replaceChild(tabla,donde.childNodes[0]);
    }
    else{	
            donde.appendChild(tabla);
    }	
}	