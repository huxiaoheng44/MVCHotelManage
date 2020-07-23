package com.whut.bean;

import java.util.Date;

public class Order {
    private Integer orderid;

    private String idcard;

    private Date starttime;

    private Date endtime;

    private Double money;

    private Integer roomid;

    private Integer employeeid1;

    private Integer employeeid2;

    private Customer customer;

    private Room room;

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Integer getOrderid() {
        return orderid;
    }

    public void setOrderid(Integer orderid) {
        this.orderid = orderid;
    }

    public String getIdcard() {
        return idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard == null ? null : idcard.trim();
    }

    public Date getStarttime() {
        return starttime;
    }

    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }

    public Date getEndtime() {
        return endtime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    public Double getMoney() {
        return money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public Integer getRoomid() {
        return roomid;
    }

    public void setRoomid(Integer roomid) {
        this.roomid = roomid;
    }

    public Integer getEmployeeid1() {
        return employeeid1;
    }

    public void setEmployeeid1(Integer employeeid1) {
        this.employeeid1 = employeeid1;
    }

    public Integer getEmployeeid2() {
        return employeeid2;
    }

    public void setEmployeeid2(Integer employeeid2) {
        this.employeeid2 = employeeid2;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderid=" + orderid +
                ", idcard='" + idcard + '\'' +
                ", starttime=" + starttime +
                ", endtime=" + endtime +
                ", money=" + money +
                ", roomid=" + roomid +
                ", employeeid1=" + employeeid1 +
                ", employeeid2=" + employeeid2 +
                ", customer=" + customer +
                ", room=" + room +
                '}';
    }
}