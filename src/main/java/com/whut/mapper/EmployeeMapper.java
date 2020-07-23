package com.whut.mapper;


import com.whut.bean.Employee;

import java.util.List;

public interface EmployeeMapper {
    int deleteByPrimaryKey(Integer employeeid);

    int insert(Employee record);

    int insertSelective(Employee record);

    List<Employee> getAllEmployeeAndSalary();

    Employee selectByAccount(String useraccount);

    Employee selectByPrimaryKey(Integer employeeid);
    Employee selectByPrimaryKeyAndSalary(Integer employeeid);

    int updateByPrimaryKeySelective(Employee record);

    int updateByPrimaryKey(Employee record);
}