package com.whut.bean;

public class Employee {
    private Integer employeeid;

    private String useraccount;

    private String password;

    private String realname;

    private Integer age;

    private Integer power;

    private String idcard;

    private String phone;

    private String photourl;

    private Salary salary;

    @Override
    public String toString() {
        return "Employee{" +
                "employeeid=" + employeeid +
                ", useraccount='" + useraccount + '\'' +
                ", password='" + password + '\'' +
                ", realname='" + realname + '\'' +
                ", age=" + age +
                ", power=" + power +
                ", idcard='" + idcard + '\'' +
                ", phone='" + phone + '\'' +
                ", photourl='" + photourl + '\'' +
                ", salary=" + salary +
                '}';
    }

    public Salary getSalary() {
        return salary;
    }

    public void setSalary(Salary salary) {
        this.salary = salary;
    }

    public Integer getEmployeeid() {
        return employeeid;
    }

    public void setEmployeeid(Integer employeeid) {
        this.employeeid = employeeid;
    }

    public String getUseraccount() {
        return useraccount;
    }

    public void setUseraccount(String useraccount) {
        this.useraccount = useraccount == null ? null : useraccount.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getPower() {
        return power;
    }

    public void setPower(Integer power) {
        this.power = power;
    }

    public String getIdcard() {
        return idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard == null ? null : idcard.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getPhotourl() {
        return photourl;
    }

    public void setPhotourl(String photourl) {
        this.photourl = photourl == null ? null : photourl.trim();
    }
}