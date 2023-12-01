/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function enviarPeticion(metodo,url,asincrono,procesaRespuesta,procesaError,datos){

  var xhttp = new XMLHttpRequest();
   
    xhttp.onreadystatechange = function() {
     if (this.readyState == 4 )
       if(this.status == 200) 
         procesaRespuesta(this.response);

       else procesaError(this.statusText);
   };
  
    if(metodo=="GET"){
      xhttp.open(metodo, url+"?"+datos,asincrono);
      xhttp.send(); 
    }else{
     xhttp.open(metodo, url,asincrono);
     xhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
     xhttp.send(datos);   
    }
    
}

 var idMiTabla=0;
   
   function cargarTabla(tituloTabla,LugarAniadirTabla,borrar,objetoACargar,columnasOcultar){
             
      var tablaACargar=document.createElement("table");
      
      //***************CAPTION/TITULO DE LA TABLA*****************//
      var caption=document.createElement("caption");
      caption.append(tituloTabla);
      tablaACargar.appendChild(caption);
      //****************FIN CAPTION/TITULO DE LA TABLA*****************//
 
      var contadorFilasID=0;//LE ASIGNARE A CADA FILA UNA ID QUE COMIENZE DESDE 0
                 
      var columnasAOcultar=0;
      //*****************NOMBRE DE LAS COLUMNAS*******************//
      var fila=document.createElement("tr");
      var nombres=Object.keys(objetoACargar[Object.keys(objetoACargar)[0]]);
      for(nombreColumnas of nombres){
         var celda=document.createElement("th");
         celda.append(nombreColumnas);
         celda.setAttribute("class",columnasAOcultar);
         columnasAOcultar++;
         fila.appendChild(celda);
      }
      
      columnasAOcultar=0;
        
      if(borrar){//SI ME HAS PUESTO BORRAR A TRUE TE A?ADO UNA COLUMNA CON TITULO DE 'FILA A BORRAR'
          var celda=document.createElement("th");
          celda.append("Fila A Borrar");
          fila.appendChild(celda);
      }
        
      tablaACargar.appendChild(fila);
      //*****************FIN NOMBRE DE LAS COLUMNAS*******************//
      var idBoton=0;
      //*****************CUERPO DE LA TABLA***************************//
      var nombreColumnasTabla=Object.keys(objetoACargar);
      for(columnas of nombreColumnasTabla){
            
           var filasCuerpoTabla=document.createElement("tr");
           var clavesObj=Object.keys(objetoACargar[columnas]);
            
           for(nombres of clavesObj){
               var celdaCuerpoTabla=document.createElement("td");
               celdaCuerpoTabla.append(objetoACargar[columnas][nombres]);
               celdaCuerpoTabla.setAttribute("class",columnasAOcultar);
               columnasAOcultar++;
               filasCuerpoTabla.appendChild(celdaCuerpoTabla);
            }
            
            columnasAOcultar=0;
                
            if(borrar){//SI ME HAS PUESTO BORRAR A TRUE, TE A?ADO UN BOTON EN LA CELDA DE ESA FILA
               var celda=document.createElement("th");
               var button=document.createElement("button");
               button.append("BORRAR FILA");
               button.setAttribute("value",Object.keys(objetoACargar)[idBoton]);
               idBoton++;     
               button.onclick=borrarFila;//LE A?ADO UNA FUNCION QUE ME BORRA LA FILA DE ESA TABLA Y
               //TAMBIEN ME LO QUITA DEL OBJETO
                             
               celda.appendChild(button);
               filasCuerpoTabla.appendChild(celda);
            }
            
            filasCuerpoTabla.setAttribute("id",contadorFilasID);//CADA FILA TENDRA SU CORRESPONDIENTE ID
            tablaACargar.appendChild(filasCuerpoTabla);
            contadorFilasID++;
        }
        //********************FIN CUERPO DE LA TABLA***************************//
      
        tablaACargar.setAttribute("id","tablaCreada"+idMiTabla);
      
        
      
        var sitioAniadirTabla=document.getElementById(LugarAniadirTabla);
      
        //SI DETECTA QUE YA EXISTE OTRA TABLA DONDE LA VAS A PONER TE ELIMINO LA TABLA ANTERIOR
        if(sitioAniadirTabla.childElementCount>0){
           
           var tablasEliminar=sitioAniadirTabla.children;
          
           var arrayTablasEliminar=[];
          
           for(let i=0;i<tablasEliminar.length;i++){
               arrayTablasEliminar[arrayTablasEliminar.length]=tablasEliminar[i];
           }
           
           for(let i=0;i<arrayTablasEliminar.length;i++){
               sitioAniadirTabla.removeChild(arrayTablasEliminar[i]);
           }
          
           
        }
        
        idMiTabla++;
        

        //**************************PROCESO PARA OCULTAR LAS COLUMNAS*********************//
            if(columnasOcultar!=null){
                var filas=tablaACargar.children;
                for(let k=0;k<columnasOcultar.length;k++){
                    for(let i=0;i<filas.length;i++){
                        if(i!=0){//EL I=0 ES CAPTION
                            var celdas=filas[i].children;//CELDAS
                            for(let j=0;j<celdas.length;j++){
                                  if(columnasOcultar[k]==parseInt(celdas[j].className)){
                                      celdas[j].style.display="none";
                                  }
                            }
                        }
                    }
                }
           }
       //**************************PROCESO PARA OCULTAR LAS COLUMNAS*********************//
      
        
        sitioAniadirTabla.appendChild(tablaACargar);
   }
   
   
