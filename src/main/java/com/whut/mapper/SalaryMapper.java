package com.whut.mapper;


import com.whut.bean.Salary;

public interface SalaryMapper {
    int deleteByPrimaryKey(Integer employeeid);

    int insert(Salary record);

    int insertSelective(Salary record);

    Salary selectByPrimaryKey(Integer employeeid);

    int updateByPrimaryKeySelective(Salary record);

    int updateByPrimaryKey(Salary record);
}