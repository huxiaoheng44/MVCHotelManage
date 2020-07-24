package com.whut.controller;


import com.whut.bean.Customer;
import com.whut.service.CustomerService;
import com.whut.until.GsonUtil;
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

    @RequestMapping(value="/getCustomers.do",produces = "text/html;charset=UTF-8")
    public String getCustomers(@RequestParam int pageNum, @RequestParam int pageSize) {
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
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="/updateCustomer.do",produces = "text/html;charset=UTF-8")
    public String updateCustomer(@RequestParam String idcard,@RequestParam String householdname,@RequestParam String phone){
        Customer customer = new Customer();
        customer.setIdcard(idcard);
        customer.setHouseholdname(householdname);
        customer.setPhone(phone);
        int state = customerService.updateByPrimaryKeySelective(customer);
        StateSignal signal = new StateSignal();
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
