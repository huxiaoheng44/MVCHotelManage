package com.whut.controller;

import com.whut.bean.Employee;
import com.whut.service.EmployeeService;
import com.whut.until.FileUtil;
import com.whut.until.State;
import com.whut.until.StateSignal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(value = "/upFile")
public class FileController {
    @Autowired
    EmployeeService employeeService;

    @RequestMapping("/upFilePhoto.do")
    public Map upFilePhoto(@RequestParam MultipartFile file, @RequestParam int employeeid){
        String fileName = UUID.randomUUID().toString()+file.getOriginalFilename();

        String filePath = ".\\src\\main\\resources\\static\\File\\";
        String RealfilePath = "File\\"+fileName;
        Employee employee = new Employee();
        employee.setEmployeeid(employeeid);
        employee.setPhotourl(RealfilePath);
        int state = employeeService.updateByPrimaryKeySelective(employee);
        boolean photo = state>0?true:false;
        boolean b = false;
        try {
           b = FileUtil.uploadFile(file.getBytes(), filePath, fileName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        StateSignal signal = new StateSignal();
        if(b&&photo){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return signal.getResult();
    }


}
