package com.whut.bean;

public class Customer {
    private String idcard;

    private String householdname;

    private String phone;

    private Integer level;

    private Double cost;

    @Override
    public String toString() {
        return "Customer{" +
                "idcard='" + idcard + '\'' +
                ", householdname='" + householdname + '\'' +
                ", phone='" + phone + '\'' +
                ", level=" + level +
                ", cost=" + cost +
                '}';
    }

    public String getIdcard() {
        return idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard == null ? null : idcard.trim();
    }

    public String getHouseholdname() {
        return householdname;
    }

    public void setHouseholdname(String householdname) {
        this.householdname = householdname == null ? null : householdname.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }
}