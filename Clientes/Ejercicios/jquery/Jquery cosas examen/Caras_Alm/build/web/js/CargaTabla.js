
(function($){
        
    $.fn.cargaTabla=function(objetoCargar,datosTabla,datosColumnas){
      
        var $div=$("<div></div>");
        
        //***********************PROCESO PARA AÑADIR EL FILTRADO***************//
           var $input=$("<input></input>").attr({type:"text",id:"input"+datosTabla.id});
           
           var $tablaInput=$("<table></table>");
           var $fila=$("<tr></tr>");
           
           var celdaLabel=$("<td></td>").append($("<label></label>").append("ALT+F OCULTAR"));
           var celdaInput=$("<td></td>").append($input);
           
           $fila.append(celdaLabel);
           $fila.append(celdaInput);
           
           $tablaInput.append($fila);
            
           $div.append($tablaInput);
        //***********************FIN PROCESO PARA AÑADIR EL FILTRO************//
      
        $(this).empty();//LIMPIAMOS EL SITIO DONDE VAYAMOS A PONER LA TABLE
      
        var $tabla=$("<table></table>").attr({id:datosTabla.id});
       
        var $titulo=$("<caption></caption>").append(datosTabla.titulo);//TITULO
        
        $tabla.append($titulo);
              
        //*************************CABECERAS DE LA TABLA**********************//
        var $cabeceraTabla=$("<thead></thead>");
        var $filaCabecera=$("<tr></tr>");
        
        var nombres=Object.keys(objetoCargar[Object.keys(objetoCargar)[0]]);
        
        $.each(nombres,function(i,nombreColumnas){
            var $celda=$("<th></th>");
            var $checkbox=$("<input>").attr({type:"checkbox",checked:true});
            $celda.append($checkbox);
            $celda.append(nombreColumnas);
            $filaCabecera.append($celda);
        });
        
         $cabeceraTabla.append($filaCabecera);
         $tabla.append($cabeceraTabla);
        
       //************************FIN CABECERAS DE LA TABLA******************//
       
       //******************CUERPO DE LA TABLA******************************//
        var $cuerpoTabla=$("<tbody></tbody>");
        
        $.each(objetoCargar,function(i,objeto){
            var $fila=$("<tr></tr>");
                        
            $.each(objeto,function(clave,valor){
                    if(valor.toString()!="[object Object]"){
                        var $celda=$("<td></td>").text(valor);
                        $fila.append($celda);
                    }else{
                        
                       var $celda=$("<td></td>");
                       var objeto="";
                       
                       $.each(valor,function(clave,valor){
                           objeto+=clave+":"+valor+";";
                       });
                       
                       objeto=objeto.substring(0,objeto.length-1);
                       $celda.append(objeto);
                       $fila.append($celda);
                    }
            });
            
            $cuerpoTabla.append($fila);
        });
        $tabla.append($cuerpoTabla);
       //******************FIN CUERPO DE LA TABLA******************************//
       
       $($div).append($tabla);
       $(this).append($div);//ANIADO LA TABLA SOBRE EL ID AL QUE APLICASTE EL METODO.
        
        
       //*********************PROCESO PARA OCULTAR COLUMNAS********************//     
         var nombreColumnasOcultar=Object.values(datosColumnas.columnasOcultar);
        
         $.each(nombreColumnasOcultar,function(i,nombreColumnasOcultar){
            var columnaOcultar=$("#"+datosTabla.id+" th:contains("+nombreColumnasOcultar+")")[0].cellIndex+1;
            $("#"+datosTabla.id+" th:nth-child("+columnaOcultar+")").css({display:"none"});
            $("#"+datosTabla.id+" td:nth-child("+columnaOcultar+")").css({display:"none"});
         });
            
       //*********************FIN PROCESO PARA OCULTAR COLUMNAS********************//
        
       //**************************PROCESO PAR FILTRAR COLUMNAS*****************************//
       $("input:radio,input:checkbox").change(function(){
	    $("#"+$input.attr("id")).trigger("keyup");//PROVOCO EL EVENTO DE TECLADO.
        });
        
        var filas=[];//ALMACENO EL INDICE DE FILAS QUE SERAN MOSTRADAS.
        
        $("#"+$input.attr("id")).keyup(function(){
			
            filas=[];

            $("#"+datosTabla.id+" tr td").css("color","black");

            var $valorInput=$(this).val().toLowerCase();

            var $checkboxSeleccionados=$("input[type='checkbox']:checked");//PILLO LOS CHECKBOX QUE ME HAS SELECCIONADO.

            if($checkboxSeleccionados.length>0){

                $checkboxSeleccionados.parent().each(function(i,elemento){//ITERO LAS CELDAS DE LOS CHECKBOX QUE ME HAS PULSADO
                var $columna=elemento.cellIndex+1;//SACO LAS COLUMNAS(QUE SON UN CONJUNTO DE CELDAS) QUE ME HAS PRESIONADO GRACIAS AL METODO CELLINDEX

                        $("#"+datosTabla.id+" tbody tr td:nth-child("+$columna+")").filter(function(i){
                        /*ITERO LA COLUMNA, YA QUE EN ESTE CASO ME SERA NECESARIO SABER EL INDICE DE FILA PARA OCULTARTELA   
                        MOSTRARTELA SEGUN SE CUMPLA EL FILTRO, EL NUMERO DE FILAS Y CELDAS COINCIDE, ES POR ESO QUE LO ITERO.*/
                                if($(this).text().toLowerCase().indexOf($valorInput) > -1){/*SI CUMPLE EL FILTRO Y EL INDICE DE LA FILA NO SE ENCUENTRA EN EL ARRAY ME LO QUEDO.*/
                                        if(!filas.includes(i+1)){
                                                filas.push(i+1);
                                        }
                                }
                        });
                });


               
                $("#"+datosTabla.id+" tr td").css("color","black");

                $("#"+datosTabla.id+" tbody tr").hide();//OCULTO TODAS LAS FILAS INICIALMENTE


                for(let i=0;i<filas.length;i++){//MUESTRO LAS QUE CUMPLIERON EL FILTRO
                    $("#"+datosTabla.id+" tbody tr:nth-child("+(filas[i])+")").show();
                } 
               

            }

        });
        //**************************FIN PROCESO PAR FILTRAR COLUMNAS*****************************//
        
        
        //***************************ORDENAR COLUMNAS********************************************//
        $("#"+datosTabla.id+" thead tr th").click(function(event){
            var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

            var th = event.target;
            var n = th.cellIndex;
            var table = th.parentElement.parentElement.parentElement;

            switching = true;

            dir = "asc";
             
             /* Make a loop that will continue until
             no switching has been done: */
            while (switching) {
                // Start by saying: no switching is done:
                switching = false;
                rows = table.rows;
                /* Loop through all table rows (except the
                 first, which contains table headers): */
                for (i = 1; i < (rows.length - 1); i++) {
                    // Start by saying there should be no switching:
                    shouldSwitch = false;
                    /* Get the two elements you want to compare,
                     one from current row and one from the next: */
                    x = rows[i].getElementsByTagName("TD")[n];
                    y = rows[i + 1].getElementsByTagName("TD")[n];
                    /* Check if the two rows should switch place,
                     based on the direction, asc or desc: */
                    if (dir == "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            // If so, mark as a switch and break the loop:
                            shouldSwitch = true;

                            break;
                        }
                    } else if (dir == "desc") {
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
                    switchcount++;
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
    };
    //***************************FIN ORDENAR COLUMNAS********************************************//
           
}(jQuery));

