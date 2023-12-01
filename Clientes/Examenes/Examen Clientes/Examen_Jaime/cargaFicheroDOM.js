// JavaScript Document
//-----------------------------------
	function cargaFichero(input,provincias) {
		
		var files = input.files;
	  if (files) {
		
			var file=files[0];
			var reader = new FileReader();
			reader.onload = function (e) {
		
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(e.target.result,"text/xml");
				
			metodoCargaXml(xmlDoc);
						
			}
			//reader.readAsDataURL(file);
			reader.readAsText(file);
		
  		}//if	
	}
		

//----------------------------------------------------------------------------------------
//-----------------------------------------
function descargaArchivo() {
// Obtener la instancia del objeto XMLHttpRequest
	if(window.XMLHttpRequest) {
		peticion_http = new XMLHttpRequest();
	}
		else if(window.ActiveXObject) {
		peticion_http = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// Preparar la funcion de respuesta
		peticion_http.onreadystatechange = muestraContenido;
	// Realizar peticion HTTP
		peticion_http.open('GET', 'http://localhost/provinciasypoblaciones.xml', true);
		peticion_http.send(null);
	
		function muestraContenido() {
			if(peticion_http.readyState == 4) {
				if(peticion_http.status == 200) {
					alert(peticion_http.responseXML);
			}
		}
	}
}
//-----------------------------------