import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Dictionary;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/clients")
public final class ClientsServlet extends HttpServlet {

  private Hashtable<String, Object> clients;

  @Override
  public void init() {
    clients = new Hashtable<String, Object>();

    Hashtable<String, Object> dict = new Hashtable<String Object>(); 

    dict["clientId"] = "client001";
    dict["monthlyIncome"] = "7000.00";

     Hashtable<String, String> pastExpenses = new Hashtable<String, String>(); 
     pastExpenses["jan"] = "1430.55";
     pastExpenses["feb"] = "3400.54";
     pastExpenses["mar"] = "6543.67";
     pastExpenses["apr"] = "7000.89";
     pastExpenses["may"] = "2000.00";
     pastExpenses["jun"] = "4565.77";
     pastExpenses["jul"] = "5647.45";
     pastExpenses["aug"] = "1457.34";
     pastExpenses["sep"] = "5409.5";
     pastExpenses["oct"] = "1111.54";
     pastExpenses["nov"] = "4506.56";
     pastExpenses["dec"] = "8943.67";

     dict["pastExpenses"] = pastExpenses;

     Hashtable<String, String> debt = new Hashtable<String, String>(); 
     debt["jan"] = "2000.00";
     debt["feb"] = "123.55";
     debt["mar"] = "90.87";
     debt["apr"] = "55.01";
     debt["may"] = "12.00";
     debt["jun"] = "324.87";
     debt["jul"] = "4000.00";
     debt["aug"] = "40.77";
     debt["sep"] = "0.00";
     debt["oct"] = "0.00";
     debt["nov"] = "0.00";
     debt["dec"] = "0.00";

     dict["debt"] = debt;

     clients["client001"] = dict;
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String quote = quotes.get((int) (Math.random() * quotes.size()));

    response.setContentType("text/html;");
    PrintWriter printWriter = response.getWriter();

    Hashtable<String, Object> dict = self.clients["client001"];

    printWriter.println("Client id:" + dict["clientId"]);
    printWriter.println("Monthly income:" + dict["monthlyIncome"]);
    printWriter.println("Past expenses:" + dict["pastExpenses"]);
    printWriter.println("Dept:" + dict["debt"]);
  }
}