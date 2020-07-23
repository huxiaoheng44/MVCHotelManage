package com.whut.controller;


import com.whut.bean.Customer;
import com.whut.service.CustomerService;
import com.whut.until.State;
import com.whut.until.StateSignal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/customer")
public class CustomerController {
    @Resource
    CustomerService customerService;

    @RequestMapping("/getCustomers.do")
    public Map getCustomers(@RequestParam int pageNum, @RequestParam int pageSize) {
        List<Customer> customerList = customerService.getAllCustomer(pageNum,pageSize);
        StateSignal signal = new StateSignal();
        if(customerList!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",customerList);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("/updateCustomer.do")
    public Map updateCustomer(@RequestBody Customer customer){
        int state = customerService.updateByPrimaryKeySelective(customer);
        StateSignal signal = new StateSignal();
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
