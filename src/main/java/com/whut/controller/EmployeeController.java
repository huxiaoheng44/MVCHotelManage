package com.whut.controller;


import com.google.gson.Gson;
import com.whut.bean.Employee;
import com.whut.service.EmployeeService;
import com.whut.until.GsonUtil;
import com.whut.until.State;
import com.whut.until.StateSignal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/employee")
public class EmployeeController {
    @Resource
    EmployeeService employeeService;
    private static Gson gson = new Gson();

    @RequestMapping(value="/getEmployees.do",produces = "text/html;charset=UTF-8")
    public String selectEmployee(@RequestParam int pageNum, @RequestParam int pageSize) {
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
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="/login.do",produces = "text/html;charset=UTF-8")
    public String login(@RequestParam String useraccount, @RequestParam String password, HttpSession session){
        StateSignal signal = new StateSignal();
        Employee employee = employeeService.login(useraccount, password);
        System.out.println(useraccount+":"+password);
        if(employee!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("employee",employee);

        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="getSelfInfo.do",produces = "text/html;charset=UTF-8")
    public String getSelfInfo(@RequestParam Integer employeeid){
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
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="updateSelfInfo.do",produces = "text/html;charset=UTF-8")
    public String updateSelfInfo(@RequestBody Employee employee){
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
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="addEmployee.do",produces = "text/html;charset=UTF-8")
    public String addEmployee(@RequestBody Employee employee){
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
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="deleteEmployee.do",produces = "text/html;charset=UTF-8")
    public String deleteEmployee(@RequestParam Integer employeeid){
        StateSignal signal = new StateSignal();
        int state = employeeService.deleteByPrimaryKey(employeeid);
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

}