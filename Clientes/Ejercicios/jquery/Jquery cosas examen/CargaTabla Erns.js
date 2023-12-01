$(function () {
    
    $.fn.cargaTabla=function(objetoCargar,datosTabla,nombreObj,datosColumna){
      
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
        
        if(datosTabla.borrar){//SI ME HAS PUESTO QUE SE PUEDEN BORRAR TE CREARE UNA COLUMNA PARA BORRAR LAS FILAS DONDE CLICKES
            var $celda=$("<th></th>").text("Fila a Borrar");
            $filaCabecera.append($celda);
        }
        
        $cabeceraTabla.append($filaCabecera);
        $tabla.append($cabeceraTabla);
        
       //************************FIN CABECERAS DE LA TABLA******************//
       
       
       
       //*******************PROCESO ARREGLO OBJETO EN CASO QUE TENGA REPETIDO**************************// 
            if(datosColumna.columnaClave!=null || datosColumna.columnaClave!=undefined){
                
                var columnasSumar=Object.values(datosColumna.columnasSumar);/*EN CASO DE QUE UN OBJETO SE REPITA
                                                                              TE VOY A SUMAR LAS COLUMNAS QUE TU ME INDIQUES*/
                var clavesMiObj=Object.keys(objetoCargar);
                var valoresMiObj=Object.values(objetoCargar);

                var comprobarRepetidos=[];
                var clavesObjeto=[];

                for(let i=0;i<valoresMiObj.length;i++){
                    
                    if(!comprobarRepetidos.includes(valoresMiObj[i][datosColumna.columnaClave])){  

                        comprobarRepetidos.push(valoresMiObj[i][datosColumna.columnaClave]);
                        clavesObjeto.push(clavesMiObj[i]);//ME QUEDO TAMBIEN CON LA CLAVE DEL OBJETO NO REPETIDO

                    }else{//EL OBJETO YA ESTA AÑADIDO

                        var numerosSumar=0;

                        for(let j=0;j<comprobarRepetidos.length;j++){
                            if(comprobarRepetidos[j]==valoresMiObj[i][datosColumna.columnaClave]){//COMPARARE MIS OBJETOS REPETIDOS PARA SUMAR LAS COLUMNAS QUE SEAN NUMERICAS
                                 var clvMiObjAnterior=Object.keys(valoresMiObj[j]);
                                 
                                 $.each(clvMiObjAnterior,function(iteracion,elemento){
                                     if(elemento!=datosColumna.columnaClave){
                                         if(columnasSumar.includes(elemento)){
                                           numerosSumar=valoresMiObj[j][elemento]+valoresMiObj[i][elemento];
                                           valoresMiObj[j][elemento]=numerosSumar;
                                           numerosSumar=0;
                                         }
                                     }
                                 });
                                 
                                 delete objetoCargar[clavesMiObj[i]];
                            }
                        } 
                    }
                }  
            }
        //****************FIN PROCESO ARREGLO OBJETO EN CASO QUE TENGA REPETIDO**************************//
       
       
       //************************CUERPO DE LA TABLA**************************//
        var $cuerpoTabla=$("<tbody></tbody>");
        
        var idBoton=0;
        
        $.each(objetoCargar,function(i,objeto){
            var $fila=$("<tr></tr>");
                        
            $.each(objeto,function(clave,valor){
                var $celda;
                
                if(typeof(valor)=="number"){
                   $celda=$("<td></td>").text(valor).attr("class","ponerInput");
                }else{
                   $celda=$("<td></td>").text(valor);
                }
                
                $fila.append($celda);
            });
            
            if(datosTabla.borrar){//EMPIEZO A CREAR LA COLUMNA PARA BORRAR FILAS.
                var $celda=$("<td></td>");
                var $button=$("<button></button>").text("Borrar Fila").attr({class:"borrar",value:Object.keys(objetoCargar)[idBoton]});
                $celda.append($button);
                $fila.append($celda);
                idBoton++;     
            }
            
            $cuerpoTabla.append($fila);
        });
        
        
        //****************************PARA PONER INPUT CON EL NUMERO QUE CONTIENE CELDA**************************//
            $(document).on("dblclick","#"+datosTabla.id+" tbody tr td[class='ponerInput']",function(){          
                var $numero=parseFloat($(this).text());
                var $input=$("<input></input>").attr({type:"number"}).val($numero);//CREO EL INPUT CON ESE VALOR QUE TU PINCHES.
                
                $(this).empty();//LIMPIAMOS LA CELDA.
                
                $(this).append($input);
                $(this).attr("class","inputPuesto"); 

            });
        //****************************FIN PARA PONER INPUT CON EL NUMERO QUE CONTIENE CELDA**************************//
        
         $tabla.attr("data",JSON.stringify(objetoCargar));
        
        $(document).on("keyup","td[class='inputPuesto']",function(){
            
            if(event.key=="Enter"){
                
                var $numeroCelda;
                
                if($(this).children().length==0){
                   $numeroCelda=parseFloat($(this).text());
                }else{
                   $numeroCelda=parseFloat($(this).children().val());//PILLO EL VALUE DEL INPUT.
                }
                 
                if($(this).find("input").length==1){
                    $(this).empty();//ELIMINAMOS EL INPUT.
                }
                
                $(this).text($numeroCelda);

                var indiceColumna=this.cellIndex+1;

                var $valorModificar=$($(this.closest("tr")).find("button")).val();//PILLO LA CLAVE DEL OBJETO A MODIFICAR LO QUE ME PUSISTE EN LA CELDA.
                var $claveColumnaAReemplazarValor=$("#"+$(this.closest("table")).attr("id")+" thead tr th:nth-child("+indiceColumna+")").text();

                var $tabla=$(this.closest("table"));

                var objetoModificar=JSON.parse($(this.closest("table")).attr("data"));

                objetoModificar[$valorModificar][$claveColumnaAReemplazarValor]=$numeroCelda;//MODIFICAMOS EL OBJETO.

                //****************ACTUALIZACIONES DEL OBJETO******************//
                 window[nombreObj.nombreObjeto]=objetoModificar;//ACTUALIZO EL OBJETO DE LA APLICACION
                 $tabla.attr("data",JSON.stringify(objetoModificar));//ACTUALIZO EL DATA(OBJETO) DE LA TABLA CON EL CAMBIO QUE SE HIZO DEL INPUT
                //****************ACTUALIZACIONES DEL OBJETO******************//

                //****************ACTUALIZACION DEL PIE DE LA TABLA************//
                 sumarColumnas(datosColumna,$filaCabecera,$cuerpoTabla,$tabla);
                //****************ACTUALIZACION DEL PIE DE LA TABLA************//              


                    
                $(this).attr("class","ponerInput");//VUELVO A HACER QUE EN ESA CELDA PUEDA APARECER UN INPUT           



                $(this).unbind();
                
            }
        });
        
        
       
        
        //****************************PROCESO PARA BORRAR********************************//
        $(document).on("click","#"+datosTabla.id+" tbody tr td button[class='borrar']",function(){            
             
          
                var $claveObjetoBorrarFila=$(this).val();//PILLO LA CLAVE PARA BORRAR ESA FILA DEL OBJETO.

                $(this).parent().parent().remove();//ELIMINACION DE LA FILA.

                var objetoActualizar=JSON.parse($("#"+datosTabla.id).attr("data"));

                delete objetoActualizar[$claveObjetoBorrarFila];//ACTUALIZO EL OBJETO BORRANDO ESA FILA

                window[nombreObj.nombreObjeto]=objetoActualizar;

                $("#"+datosTabla.id).attr("data",JSON.stringify(objetoActualizar));

                idBoton--;

                if($("#"+datosTabla.id+" tbody tr").length>=1){

                   //***************************PROCESO PONER PIE TABLA********************************//
                     sumarColumnas(datosColumna,$filaCabecera,$cuerpoTabla,$tabla);
                   //**************************PROCESO PONER PIE TABLA********************************//

               }else{//BORRARE LA TABLA ENTERITA.
                   $("#"+datosTabla.id).parent().remove();
               }
            
            
        });
        //****************************FIN PROCESO PARA BORRAR********************************//
        
                
        $tabla.append($cuerpoTabla);
       //******************FIN CUERPO DE LA TABLA******************************//
       
       
       //***************************PROCESO PONER PIE TABLA********************************//
            sumarColumnas(datosColumna,$filaCabecera,$cuerpoTabla,$tabla);
       //**************************PROCESO PONER PIE TABLA********************************//
        
       
       
       $($div).append($tabla);
       $(this).append($div);//ANIADO LA TABLA SOBRE EL ID AL QUE APLICASTE EL METODO.
        
        
        
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
            var table =$("#"+datosTabla.id+" tbody")[0];

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
                for (i = 0; i < (rows.length-1); i++) {
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


    function  sumarColumnas(datosColumna,$filaCabecera,$cuerpoTabla,$tabla){
        
        if(datosColumna.columnassumar!=undefined || datosColumna.columnasumar!=null){

           //if($tabla!=undefined){
             $("#"+$tabla.attr("id")+" tfoot").remove();//SI EL PIE DE LA TABLA YA EXISTIA LO ELIMINO Y VUELVO A CREAR UNO NUEVO.
         
           
            var columnaSumar=Object.values(datosColumna.columnassumar);//PILLO LAS COLUMNAS QUE DEBEN DE SUMARSE.

            var $sumaDeColumnas=0;

            var columnasSumada={};

            var indiceColumnasQueDebenSumarse=[];

            $.each(columnaSumar,function(iteracion,nombresColumnas){
                 var $indiceColumnasSumar=$($filaCabecera).find("th:contains("+nombresColumnas+")")[0].cellIndex;
                 //$indiceColumnasSumar+=1;
                 indiceColumnasQueDebenSumarse.push($indiceColumnasSumar);

                var $filas=$cuerpoTabla.children();
                 $.each($filas,function(i,fila){
                     var $celda=$(fila).children().filter("td:nth-child("+($indiceColumnasSumar+1)+")");
                     $sumaDeColumnas+=parseFloat($celda.text());
                 });
                 columnasSumada[$indiceColumnasSumar]=$sumaDeColumnas;
                 $sumaDeColumnas=0;
            });


            var $pieTabla=$("<tfoot></tfoot>");
            var $filaPietabla=$("<tr></tr>");

            var $totalColumnasTabla=$filaCabecera.children().length;

            for(let i=0;i<$totalColumnasTabla;i++){
                  var $celda=$("<td></td>");
                  $.each(indiceColumnasQueDebenSumarse,function(iteracion,columna){
                        if(i==columna){
                           $celda.text(columnasSumada[i]);  
                        }
                  });
                  $filaPietabla.append($celda);
            }

            $pieTabla.append($filaPietabla);
            $tabla.append($pieTabla);
        }
    }


});