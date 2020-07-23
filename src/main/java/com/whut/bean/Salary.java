package com.whut.bean;

public class Salary {
    private Integer employeeid;

    private Double income;

    private Double bonus;

    @Override
    public String toString() {
        return "Salary{" +
                "employeeid=" + employeeid +
                ", income=" + income +
                ", bonus=" + bonus +
                '}';
    }

    public Integer getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(Integer employeeid) {
        this.employeeid = employeeid;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getBonus() {
        return bonus;
    }

    public void setBonus(Double bonus) {
        this.bonus = bonus;
    }
}