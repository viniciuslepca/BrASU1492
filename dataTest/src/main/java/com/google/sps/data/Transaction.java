package com.google.sps.data;

public final class Transaction {

  private final long id;
  private final String date;
  private final String amount; 
  private final String description;
  private final String numParcels;
  private final String client;

  public Transaction(long id, String date, String amount, String description, String numParcels, String client) {
    this.id = id;
    this.date = date;
    this.amount = amount;
    this.description = description;
    this.numParcels = numParcels;
    this.client = client;
  }
}