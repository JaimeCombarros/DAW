/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var listaCds;
var tiempo;


 onmessage=function(ev){
    listaCds=JSON.parse(ev.data);
 }

 function ofertasAMostrar(){
       
  if(listaCds!=undefined){
    var tiempo=listaCds.tiempo;
    var listaCd=listaCds.cd;
    var claveCD=Object.keys(listaCd);
    var minimo=claveCD[0];
    var maximo=claveCD[claveCD.length-1];

    var claveCDGenerada=generaAleatorio(minimo,maximo);
    
    postMessage(listaCd[claveCDGenerada].Titulo+" "+claveCDGenerada+"%");
  }
      
   setTimeout("ofertasAMostrar()",tiempo*1000);
}
 

 ofertasAMostrar();

function generaAleatorio(minimo,maximo){
    var aleatorio = Math.floor((Math.random() * maximo) + minimo);
    return aleatorio;
} 
