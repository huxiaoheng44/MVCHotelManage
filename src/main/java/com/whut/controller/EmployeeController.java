package com.whut.controller;

import com.whut.bean.Employee;
import com.whut.service.EmployeeService;
import com.whut.until.State;
import com.whut.until.StateSignal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
    @Resource
    EmployeeService employeeService;

    @RequestMapping("/getEmployees.do")
    public Map selectEmployee(@RequestParam int pageNum, @RequestParam int pageSize) {
        List<Employee> employees = employeeService.getAllEmployeeAndSalary(pageNum,pageSize);
        StateSignal signal = new StateSignal();
        if(employees!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",employees);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("/login.do")
    public Map login(@RequestParam String useraccount, @RequestParam String password, HttpSession session){
        StateSignal signal = new StateSignal();
        Employee employee = employeeService.login(useraccount, password);

        if(employee!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("employee",employee);

        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("getSelfInfo.do")
    public Map getSelfInfo(@RequestParam Integer employeeid){
        StateSignal signal = new StateSignal();
        Employee employee = employeeService.selectByPrimaryKeyAndSalary(employeeid);
        if(employee!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("employee",employee);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("updateSelfInfo.do")
    public Map updateSelfInfo(@RequestBody Employee employee){
        StateSignal signal = new StateSignal();
        int state = employeeService.updateByPrimaryKeySelective(employee);
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("employee",employee);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("addEmployee.do")
    public Map addEmployee(@RequestBody Employee employee){
        StateSignal signal = new StateSignal();
        int state = employeeService.insertSelective(employee);
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("employee",employee);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("deleteEmployee.do")
    public Map deleteEmployee(@RequestParam Integer employeeid){
        StateSignal signal = new StateSignal();
        int state = employeeService.deleteByPrimaryKey(employeeid);
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

}
