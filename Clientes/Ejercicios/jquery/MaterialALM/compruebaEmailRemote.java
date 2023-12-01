/*import java.io.StringWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;*/

import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.transform.Result;
import org.json.JSONObject;


/**@WebServlet(
		name= "ConsultaUsuario",
		urlPatterns={"/consulta"})  Servlet 3.0 ***/
public class compruebaEmailRemote extends HttpServlet {
// El metodo doGet() se ejecuta una vez por cada peticion HTTP GET.
//HttpServletRequest request;
private String userName;
private String password;
private String url;
private String driver;
String nombre="";

//atributos para el filtro
private Integer contador=1;
private ServletContext context;


    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {
        
    PrintWriter out = response.getWriter();
    String mail="";
    boolean acceso=false;
        try {
           
           
          
            mail =request.getParameter("Email");
           // mail=request.getParameter("Email");           
            acceso=compruebaUsuario(mail);
            
        
          
          out.println(acceso);
 
         //----------------------------------------------------------**/
         out.flush();
           
        
      } catch (Exception ex) {
            out.println(ex);
        }
  
}
public void doPost (HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
doGet(request, response);  // Redirecciona la petici�n POST al m�todo doGet()
}


//--------------
public boolean compruebaUsuario(String correo){//, String nombre){
    try {    
        Connection conn = null;
        Statement stmt = null;
        String sqlStr="";
        userName="peliculas";
	password="peliculas";
        url="jdbc:mysql://localhost/peliculas";
	driver="com.mysql.jdbc.Driver";
        
        try {
            //Paso 1: Cargar el driver JDBC.
            Class.forName(driver).newInstance();
        } catch (InstantiationException ex) {
            Logger.getLogger(controlAcceso.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } catch (IllegalAccessException ex) {
            Logger.getLogger(controlAcceso.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(controlAcceso.class.getName()).log(Level.SEVERE, null, ex);
            return false;
        }
        
        // Paso 2: Conectarse a la Base de Datos utilizando la clase Connection
        conn = DriverManager.getConnection(url, userName, password);
        
        // Paso 3: Crear sentencias SQL, utilizando objetos de tipo Statement
        stmt = conn.createStatement();
        
        sqlStr ="select * from usuarios where email ='"+ correo+"'";

        // Paso 5: Ejecutar las sentencias SQL a traves de los objetos Statement
        ResultSet rset = stmt.executeQuery(sqlStr);
        
        if ( rset.next()){
              return false;
        }
        else return true;
        
    } catch (SQLException ex) {
        Logger.getLogger(controlAcceso.class.getName()).log(Level.SEVERE, null, ex);
        return false;
    }
   
}

}
