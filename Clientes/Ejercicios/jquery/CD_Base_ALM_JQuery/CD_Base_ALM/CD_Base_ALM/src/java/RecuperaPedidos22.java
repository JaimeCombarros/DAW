
import java.io.*;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.*;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import org.json.JSONException;
import org.json.JSONObject;

@WebServlet("/RecuperaC")
public class RecuperaPedidos22 extends HttpServlet {

private String userName="root";
private String password="root";
private String url="jdbc:mysql://localhost:3306/cd";
private String driver="com.mysql.jdbc.Driver";

//DataSource pool;

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException {
        
      doPost(request,  response);
    
}
   
    Connection     conn  = null;
    Statement      stmt  = null;
    String         sqlStr= null;
            
    //----------------------------------------

@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        
    response.setContentType("application/json");
    PrintWriter out=response.getWriter();

        String pedido;
        pedido=request.getParameter("pedido");

        ResultSet      rs    = null;
        JSONObject     salida= null;
        
        try {
       
           //Paso 1: Cargar el driver JDBC.
           Class.forName(driver).newInstance();

        // Paso 2: Conectarse a la Base de Datos utilizando la clase Connection
           conn = DriverManager.getConnection(url, userName, password);
                      
        // Paso 3: Crear sentencias SQL, utilizando objetos de tipo Statement
            stmt = conn.createStatement();
        
            salida = new JSONObject();
            
            int cpedido =Integer.parseInt(request.getParameter("cpedido"));
            String nif  = request.getParameter("cliente");
            
          //Todos los clientes con pedidos.............
          if (nif.equals("todos")){
               ejecutaConsulta("select distinct nif,nombre from clientes", stmt, salida);
               
          } else if(nif.equals("todosPedidos")){
              ejecutaConsulta("select DISTINCT CONCAT(nombre, ' ', apellidos) nombre, nif from pedidos, clientes WHERE cliente = nif", stmt, salida);
          }
            
          // Un pedido concreto 
          else if(cpedido!=0){
             
            rs=stmt.executeQuery("select * from detallepedidos where "
                                     + "pedido='"+cpedido+"'");
           
           int i=0;
            while(rs.next()){
               
             String t = rs.getString("titulo");
             String a = rs.getString("autor");
             float p = rs.getFloat("precio");
             int c = rs.getInt("cantidad");
             
             LineaCd linea = new LineaCd(t,a,p,c,"#000000");
             
             String jsonStr = new com.google.gson.Gson().toJson(linea);  


             JSONObject arrayObj = new JSONObject(jsonStr);
            
             salida.put( Integer.toString(i), jsonStr);
             i++;
             }
          }
          else{// todos los pedidos del cliente...........
              
               rs=stmt.executeQuery("select * from pedidos where "
                                     + "cliente='"+nif+"'");
           
            while(rs.next()){
                
             
             Integer c = rs.getInt("codigo");
             String f = rs.getString("fecha");
             String cli = rs.getString("cliente");
            

             JSONObject arrayObj = new JSONObject();

             arrayObj.put("codigo",c);
             arrayObj.put("fecha",f);
             arrayObj.put("cliente",cli);
            

             //out.print(arrayObj);
             salida.put( c.toString(), arrayObj);
           
             } 
          
          }  
        out.print(salida.toString());
       
        /*rs.close ();
        stmt.close ();*/
      
        }catch (Exception exc){ 
            out.println("<html><head><title>Resultado de la consulta</title></head><body>");
            out.println("<p> se ha producido un error = " + exc+"</p>");
            out.println("<p> StrSql = " + sqlStr+"</p>");
            out.println("<p> Error  completo= " + exc+"</p>");
            out.println("</body></html>");
        }finally{
            /*out.close();
            try{
                if(conn!=null) conn.close(); // Devuelve la conexion al pool
                
            } catch (SQLException ex) {
                Logger.getLogger(GuardaPedidosCD89.class.getName()).log(Level.SEVERE, null, ex);
            }*/
        }
        
    }
    //--------------------------------------------------
    public void init(ServletConfig config) throws ServletException{
        super.init(config);
        ServletContext contexto=config.getServletContext();
        
        url=contexto.getInitParameter("url");
               
        driver=contexto.getInitParameter("driver");
        
        userName=contexto.getInitParameter("userName");
        
        password=contexto.getInitParameter("password");
    }
     
    public void ejecutaConsulta(String consulta, Statement stmt, JSONObject salida){
        try {
            ResultSet rs = null;
            rs=stmt.executeQuery(consulta);

            JSONObject arrayObj = new JSONObject();

            while(rs.next()){

                arrayObj.put('"'+rs.getString("nif")+'"',rs.getString("nombre"));

            }
            
            salida.put("clientes",arrayObj);
            
        } catch (SQLException ex) {
            Logger.getLogger(RecuperaPedidos22.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JSONException ex) {
            Logger.getLogger(RecuperaPedidos22.class.getName()).log(Level.SEVERE, null, ex);
        }
            
    }//Método de ejecuta consulta...........
    
}// Servlet.....


