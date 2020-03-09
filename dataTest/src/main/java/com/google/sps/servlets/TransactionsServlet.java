package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.Transaction;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/transactions")
public class TransactionsServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query("Transaction");

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);

        List<Transaction> transactions = new ArrayList<>();
        for (Entity entity : results.asIterable()) {
            long id = entity.getKey().getId();
            String date = (String) entity.getProperty("date");
            String amount = (String) entity.getProperty("amount");
            String description = (String) entity.getProperty("description");
            String numParcels = (String) entity.getProperty("numParcels");
            String client = (String) entity.getProperty("client");
            Transaction newTransaction = new Transaction(id, date, amount, description, numParcels, client);
            transactions.add(newTransaction);
        }

        Gson gson = new Gson();

        response.setContentType("application/json;");
        response.getWriter().println(gson.toJson(transactions));
    }

    public List<Transaction> getTransactionsOfClient(String client) {
        Query query = new Query("Transaction");
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        PreparedQuery results = datastore.prepare(query);
        List<Transaction> transactions = new ArrayList<>();

        for (Entity entity : results.asIterable()) {
            String curClient = (String) entity.getProperty("client");
            if(curClient.equals(client)) {
                Transaction newTransaction = new Transaction(id, date, amount, description, numParcels, client);
                transactions.add(newTransaction);
            }
        }
        return transactions;
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String date = request.getParameter("date");
        String amount = request.getParameter("amount");
        String description = request.getParameter("descript");
        String numParcels = request.getParameter("parcels");
        String user = request.getParameter("client");

        Entity transactionEntity = new Entity("Transaction");
        transactionEntity.setProperty("date", date);
        transactionEntity.setProperty("amount", amount);
        transactionEntity.setProperty("description", description);
        transactionEntity.setProperty("numParcels", numParcels);
        transactionEntity.setProperty("client", user);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        datastore.put(transactionEntity);

        response.sendRedirect("/transaction.html");
    }
}
