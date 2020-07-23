package com.whut.service;


import com.whut.bean.Customer;

import java.util.List;

public interface CustomerService {
    int deleteByPrimaryKey(String idcard);

    int insert(Customer record);

    int insertSelective(Customer record);

    Customer selectByPrimaryKey(String idcard);
    List<Customer> getAllCustomer(int pageNum,int pageSize);

    int updateByPrimaryKeySelective(Customer record);

    int updateByPrimaryKey(Customer record);
}
