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
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

 
@WebServlet("/BuscaPoblaciones") 
public class BuscaPoblaciones extends HttpServlet {
 
    private static final long serialVersionUID = 1L;
    private String userName;
    private String password;
    private String url;
    private String driver;  
 
    /***************************************************
     * URL: /jsonservlet
     * doPost(): receives JSON data, parse it, map it and send back as JSON
     * @throws javax.servlet.ServletException
     ****************************************************/
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException{
       
         //0......
        String provincia = request.getParameter("provincia");
        String municipio = request.getParameter("municipio");
        String consulta,id,name;
               
        
        JSONObject obj = new JSONObject();
        
        if (municipio!=null)
        {
            consulta ="Select idpoblacion, poblacion, latitud,longitud from poblacion "
                    + " where poblacion like '"+municipio+"%' order by poblacion";
            
            id="idpoblacion";name="poblacion";
            try {
                obj.put("tipo","municipio");
            } catch (JSONException ex) {
                Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        else{
            
        
        if (provincia==null) 
            provincia="provincia";
        
        if(provincia.equals("provincia"))
          {
             consulta ="Select idprovincia,provincia from provincia order by provincia";
             
             id="idprovincia";name="provincia";
             try {
                obj.put("tipo","provincia");
            } catch (JSONException ex) {
                Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);
            }
             
          }else{
            int prov =Integer.parseInt(provincia);
            consulta ="Select idpoblacion,poblacion, latitud,longitud from poblacion "
                    + " where idprovincia ='"+prov+"' order by poblacion";
            
            id="idpoblacion";name="poblacion";
            try {
                obj.put("tipo","localidad");
            } catch (JSONException ex) {
                Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);
            }
            
            }
        }
        
        //JSONObject obj = new JSONObject();
        try {
            ResultSet datos=conectaBD(consulta);
            int i=0;
            
         //   while( datos.next() && i<100 ) {
            while( datos.next() ) {
                // obj.put(datos.getString("provincia"),datos.getInt("idprovincia"));
                //obj.put(datos.getString("idprovincia"),datos.getString("provincia"));                    
                obj.put(datos.getString(id),datos.getString(name)); 
               /* obj.put("latitud",datos.getFloat("latitud"));
                obj.put("longitud",datos.getFloat("longitud")); */
            //    i++;
            }
        }catch (JSONException ex) {
            Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(BuscaPoblaciones.class.getName()).log(Level.SEVERE, null, ex);
        }
        //Gson gson = new Gson();
        response.setContentType("application/json");
        //response.getWriter().print(gson.toJson(obj));
        response.getWriter().print(obj.toString());
        }//doPost
    
    //----------
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
            Class.forName(driver).newInstance();
   
    // Paso 2: Conectarse a la Base de Datos utilizando la clase Connection
    
    //URL de la base de datos(equipo, puerto, base de datos)
   // String url="jdbc:mysql://localhost/pedidoscd";
    conn = DriverManager.getConnection(url, userName,password);
    // Paso 3: Crear sentencias SQL, utilizando objetos de tipo Statement
    stmt = conn.createStatement();
    
    return  rset = stmt.executeQuery(consulta);
    
    } catch (ClassNotFoundException ex){
        ex.getMessage();
        ex.printStackTrace();
    }
        return null;
    
}//-------------      
//-------------------------------------------------
@Override
    public void init(ServletConfig config) throws ServletException{
        super.init(config);
                 
        //2.-
        ServletContext contex = config.getServletContext();
        
        url= contex.getInitParameter("URLBDM");
             
        driver=contex.getInitParameter("DriverM");
        
        userName=contex.getInitParameter("Usuario");
        password=contex.getInitParameter("password");
    }

        
    
}