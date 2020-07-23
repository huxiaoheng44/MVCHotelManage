package com.whut.service.impl;

import com.github.pagehelper.PageHelper;
import com.whut.mapper.CustomerMapper;
import com.whut.bean.Customer;
import com.whut.service.CustomerService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Resource
    CustomerMapper customerMapper;

    @Override
    public int deleteByPrimaryKey(String idcard) {
        return 0;
    }

    @Override
    public int insert(Customer record) {
        return 0;
    }

    @Override
    public int insertSelective(Customer record) {
        return customerMapper.insertSelective(record);
    }

    @Override
    public Customer selectByPrimaryKey(String idcard) {
        return customerMapper.selectByPrimaryKey(idcard);
    }

    @Override
    public List<Customer> getAllCustomer(int pageNum,int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Customer> customers = customerMapper.getAllCustomer();
        return customers;
    }

    @Override
    public int updateByPrimaryKeySelective(Customer record) {
        return customerMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(Customer record) {
        return 0;
    }
}
