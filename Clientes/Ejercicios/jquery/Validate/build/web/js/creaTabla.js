//--------------------------------------------------------------------------------
// JavaScript Document
//---------------------------------------------------

$(function ($){
   
    $.fn.resalta = function (opt){
      var options = $.extend({},$.fn.resalta.defaultOptions,opt);
      
      return this.css({color:options.texto,
                        backgroundColor:options.fondo})
        
    };
    
    $.fn.resalta.defaultOptions ={
        texto:"red",
        fondo:"yellow"
    }
    
    
    
    $.fn.cargaTabla=function(objetoFiltrar,datosTabla){
      
        $(this).empty();
      
        var $tabla=$("<table></table>").attr({id:datosTabla.id});
       
        var $titulo=$("<caption></caption>").append(datosTabla.titulo);//TITULO
        
        $tabla.append($titulo);
    
        var ncabecera=0;
        var $cabeceras=$("<tr></tr>");
        var nombres=Object.keys(objetoFiltrar[Object.keys(objetoFiltrar)[0]]);
        $.each(nombres,function(i,nombreColumnas){
            var $celda=$("<th></th>");
            var $checkbox=$("<input>").attr({type:"checkbox",checked:true});
            $celda.append($checkbox);
            $celda.append(nombreColumnas);
            $cabeceras.append($celda);
            ncabecera++;
        });
        
        var $cabeceraTabla=$("<thead></thead>");
        $cabeceraTabla.append($("<tr>").append($("<td>").append($("<input>").attr({type:"text",id:"myInput"}).css("display","block").css("width","40%").css("margin","auto")).attr("colspan",ncabecera)));
        $cabeceraTabla.append($cabeceras);
        
        var $cuerpoTabla=$("<tbody></tbody>");
        
        $.each(objetoFiltrar,function(i,objetoFiltrar){
            var $fila=$("<tr></tr>");
                        
            $.each(objetoFiltrar,function(clave,valor){
                var $celda=$("<td></td>").text(valor);
                $fila.append($celda);
            });
            $cuerpoTabla.append($fila);
        });
        
        
        $tabla.append($cabeceraTabla);
        $tabla.append($cuerpoTabla);
        $(this).append($tabla);


        //FILTRO
        $("#myInput").keyup(function(){
            var value = $(this).val().toLowerCase();	
            var filasTabla=[];
            $id=datosTabla.id
            var $checkboxSeleccionados=$("input[type='checkbox']:checked");
            $checkboxSeleccionados.parent().each(function(index,element){
                $columa=element.cellIndex+1;
                $("#"+$id+" tbody tr td:nth-child("+$columa+")").filter(function(i) {
                    if($(this).text().toLowerCase().indexOf(value) > -1){
                        filasTabla.push(i+1);
                    }
                });		
            }); 

            $("#"+$id+" tbody tr").hide();
            for(let i=0;i<filasTabla.length;i++){
                $("#"+$id+" tbody tr:nth-child("+filasTabla[i]+")").show();
            }
        });  
        //ORDENA
        
        $("#"+datosTabla.id+" thead tr th").click(function(event){
            
  var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
 
 var th   = event.target;
 var n    = th.cellIndex;
 var table= th.parentElement.parentElement.parentElement;
 
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /*------------------
  
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = $(table).find("tbody").find("tr");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 0; i < (rows.length-1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
         
          break;
        }
      } 
      else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
         
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        
        switching = true;
      }
    }
  }
});
        
    }
    
});




		function creaBoton(datos)
		{
			var boton = document.createElement("button");
			
			var ntexto = document.createTextNode("eliminar");
							
				boton.appendChild(ntexto);
							
				boton.addEventListener('clic', 
						function(){borraFila(datos);},
								false);
				return boton;
		}
//--------------------------------------------------------------------------------
		function borraFila(datos){
			delete datos[boton.parentNode.parentNode.cells[0]];
			this.parentNode.parentNode.remove();	
		}
//--------------------------------------------------------------------------------

//------------- Tabla  -----------------------------------------------------------
	function creaTabla(param, datos){
		

	// Crear <table> y sus dos atributos
	var tabla = document.createElement('table');
	tabla.setAttribute('id', 'otraTabla');
	tabla.setAttribute('border', 1);
	tabla.setAttribute('summary', 'Descripción de la tabla y su contenido');

	// Crear <caption> y añadirlo a la <table>
	var caption = document.createElement('caption');
	var titulo = document.createTextNode(param.titulo);
	caption.appendChild(titulo);
	tabla.appendChild(caption);

	// Crear sección <thead>
	var thead = document.createElement('thead');
	tabla.appendChild(thead);

	// Añadir una fila a la sección <thead>
	thead.insertRow(0);

	var filas=Object.keys(datos);
	var columnas= Object.keys(datos[filas[0]]);

	// Añadir las columnas de la fila de <thead>    
		
	// columna extra...........................................	
	 cabecera = document.createElement('th');
	 thead.rows[0].appendChild(cabecera);	

	for(col of columnas){
	 var cabecera = document.createElement('th');
	 cabecera.innerHTML = col;
	 thead.rows[0].appendChild(cabecera);   
	   
	}    
		

	// La sección <tfoot> se crearía de forma similar a <thead>

	// Crear sección <tbody>
	var tbody = document.createElement('tbody');
	tabla.appendChild(tbody);

	// Añadir una fila a la sección <tbody>
	// Recorrer las filas del objeto-----------------------------
		
		var f=0;var c=0;
		for(fila of filas){
			tbody.insertRow(f);
			// columna oculta con la clave de la fila....
				tbody.rows[f].insertCell(c);
				tbody.rows[f].cells[c].innerHTML = fila;
			c=1;
			for(col of columnas){
				tbody.rows[f].insertCell(c);
				tbody.rows[f].cells[c].innerHTML = datos[fila][col];
				c++;
				
			}
			 if(param.borrar){
				tbody.rows[f].insertCell(c);
				 tbody.rows[f].cells[c].appendChild(creaBoton(datos));
			}
			f++;c=0;
		}
		// borrar...........
	   
		document.getElementById(param.donde).appendChild(tabla);
  
}
//---------------------------------------------------------------------------------

//--------------------------------------------------------------------------------		