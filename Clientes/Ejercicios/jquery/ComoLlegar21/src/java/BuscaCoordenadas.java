// Java Document

 

//import com.google.gson.Gson;

//import com.google.gson.JsonSyntaxException;

//import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

 

//import org.codehaus.jackson.map.ObjectMapper;
 
public class BuscaCoordenadas extends HttpServlet {
 
    private static final long serialVersionUID = 1L;
 
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{
       
         //0......
        String consulta="";
        String municipio = request.getParameter("municipio");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
       
        
        JSONObject obj = new JSONObject();
        
        if (municipio!=null)
        {
            consulta ="Select latitud,longitud from poblacion "
                    + " where poblacion ='"+municipio+"' order by poblacion";
            
        
        try {
            ResultSet datos=conectaBD(consulta);
            int i=0;
            
            if(datos.next()) {
                obj.put("latitud",datos.getFloat("latitud"));
                obj.put("longitud",datos.getFloat("longitud")); 
              
            }
            else
                obj.put("error","No se ha encontrado el pueblo="+ municipio);
                
        }catch (JSONException ex) {
            Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);    
            
            
           
        }   catch (IllegalAccessException ex) {
                Logger.getLogger(BuscaCoordenadas.class.getName()).log(Level.SEVERE, null, ex);
            } catch (SQLException ex) {
                Logger.getLogger(BuscaCoordenadas.class.getName()).log(Level.SEVERE, null, ex);
            }
        }//if..........................
        //Gson gson = new Gson();
        response.setContentType("application/json");
        //response.getWriter().print(gson.toJson(obj));
        response.getWriter().print(obj.toString());
        }//doPost
    
    //----------
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{
        doPost(request,response);
    
    }
    //----------
        
    
protected ResultSet conectaBD(String consulta) throws InstantiationException, IllegalAccessException, SQLException
{
    Connection conn = null;
    Statement stmt = null;
    String sqlStr="";
    ResultSet rset;
   try {
            //Paso 1: Cargar el driver JDBC.
            Class.forName("com.mysql.jdbc.Driver").newInstance();
   
    // Paso 2: Conectarse a la Base de Datos utilizando la clase Connection
    String userName="clientes";
    String password="clientes";
    //URL de la base de datos(equipo, puerto, base de datos)
    String url="jdbc:mysql://localhost/poblacion";
    conn = DriverManager.getConnection(url, "clientes", "clientes");
    // Paso 3: Crear sentencias SQL, utilizando objetos de tipo Statement
    stmt = conn.createStatement();
    
    return  rset = stmt.executeQuery(consulta);
    
    } catch (ClassNotFoundException ex){
        ex.getMessage();
        ex.printStackTrace();
    }
        return null;
    
}//-------------        

        
    
}