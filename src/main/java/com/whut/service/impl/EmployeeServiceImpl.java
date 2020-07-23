package com.whut.service.impl;

import com.github.pagehelper.PageHelper;
import com.whut.mapper.EmployeeMapper;
import com.whut.mapper.SalaryMapper;
import com.whut.bean.Employee;
import com.whut.bean.Salary;
import com.whut.service.EmployeeService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Resource
    EmployeeMapper employeeMapper;

    @Resource
    SalaryMapper salaryMapper;

    @Override
    public int deleteByPrimaryKey(Integer employeeid) {
        return employeeMapper.deleteByPrimaryKey(employeeid);
    }

    @Override
    public int insert(Employee record) {
        return 0;
    }

    @Override
    public int insertSelective(Employee record) {
        Salary salary = new Salary();
        salary.setBonus(0.0);
        if(record.getPower()==0){
            salary.setIncome(6000.0);
        }else if(record.getPower()==1){
            salary.setIncome(10000.0);
        }if(record.getPower()==2){
            salary.setIncome(6000.0);
        }if(record.getPower()==3){
            salary.setIncome(6000.0);
        }
        int employeeid = employeeMapper.insertSelective(record);
        salary.setEmployeeid(record.getEmployeeid());
        record.setSalary(salary);
        return salaryMapper.insertSelective(salary);
    }

    @Override
    public List<Employee> getAllEmployeeAndSalary(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Employee> employees =  employeeMapper.getAllEmployeeAndSalary();
        return employees;
    }

    @Override
    public Employee login(String username, String password) {
        Employee employee = employeeMapper.selectByAccount(username);
        if(employee!=null&&employee.getPassword().equals(password)){
            return employee;
        }else{
            return null;
        }
    }

    @Override
    public Employee selectByPrimaryKey(Integer employeeid) {
        System.out.println(employeeMapper.selectByPrimaryKey(employeeid).getEmployeeid().toString());
        return employeeMapper.selectByPrimaryKey(employeeid);
    }

    @Override
    public Employee selectByPrimaryKeyAndSalary(Integer employeeid){
        return employeeMapper.selectByPrimaryKeyAndSalary(employeeid);
    }


    @Override
    public int updateByPrimaryKeySelective(Employee record) {
        return employeeMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(Employee record) {
        return 0;
    }
}
