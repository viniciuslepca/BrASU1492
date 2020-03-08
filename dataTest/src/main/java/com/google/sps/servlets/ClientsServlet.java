package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Client;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/clients")
public class ClientsServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Task");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<Client> clients = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
        log("here");
    
        long id = entity.getKey().getId();
        String title = (String) entity.getProperty("title");
        String income = (String) entity.getProperty("income");

        log(title);
        log(income);
        Client newClient = new Client(id, title, income);
        clients.add(newClient);
    }

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(clients));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String title = request.getParameter("title");
    String income = request.getParameter("income");

    Entity clientEntity = new Entity("Task");
    clientEntity.setProperty("title", title);
    clientEntity.setProperty("income", income);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(clientEntity);

    response.sendRedirect("/index.html");
  }
}
