package com.whut.service;


import com.whut.bean.Employee;

import java.util.List;

public interface EmployeeService {

    int deleteByPrimaryKey(Integer employeeid);

    int insert(Employee record);

    int insertSelective(Employee record);

    List<Employee> getAllEmployeeAndSalary(int pageNum, int pageSize);

    Employee login(String username, String password);

    Employee selectByPrimaryKey(Integer employeeid);
    Employee selectByPrimaryKeyAndSalary(Integer employeeid);


    int updateByPrimaryKeySelective(Employee record);

    int updateByPrimaryKey(Employee record);


}
