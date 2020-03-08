package com.google.sps.data;

public final class Client {

  private final long id;
  private final String title;
  private final String income;

  public Client(long id, String title, String income) {
    this.id = id;
    this.title = title;
    this.income = income;
  }
}