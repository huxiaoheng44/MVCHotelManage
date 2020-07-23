package com.whut.service.impl;

import com.github.pagehelper.PageHelper;
import com.whut.bean.*;
import com.whut.mapper.*;
import com.whut.service.OrderService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    @Resource
    OrderMapper orderMapper;

    @Resource
    RoomMapper roomMapper;

    @Resource
    EmployeeMapper employeeMapper;

    @Resource
    CustomerMapper customerMapper;

    @Resource
    SalaryMapper salaryMapper;

    @Override
    public int deleteByPrimaryKey(Integer orderid) {
        return orderMapper.deleteByPrimaryKey(orderid);
    }

    @Override
    public int insert(Order record) {
        return 0;
    }

    @Override
    public int insertSelective(Order record) {
        return 0;
    }

    @Override
    public Order selectByPrimaryKey(Integer orderid) {
        return null;
    }

    @Override
    public List<Order> getAllOrder(int pageNum, int pageSize) {
        PageHelper.startPage(pageNum,pageSize);
        List<Order> orders = orderMapper.getAllOrder();
        return orders;
    }

    @Override
    public int updateByPrimaryKeySelective(Order record) {
        return 0;
    }

    @Override
    public int updateByPrimaryKey(Order record) {
        return 0;
    }

    @Override
    public double getIncome() {
//        Double d=0.0;
//        orderMapper.getIncome(d);
//        return d;
        return orderMapper.getIncome();
    }

    @Override
    public double getOutcome() {
//        Double d=0.0;
//        orderMapper.getOutcome(d);
//        return d;
        return orderMapper.getOutcome();
    }

    @Override
    public int checkIn(Order order) {
        System.out.println(order);
        Room room = roomMapper.selectByPrimaryKey(order.getRoomid());
        room.setState(1);
        roomMapper.updateByPrimaryKeySelective(room);
        order.setMoney(((order.getEndtime().getTime()-order.getStarttime().getTime())*1.0/ (24 * 60 * 60 * 1000))*room.getRoomtype().getMoney());
        orderMapper.insertSelective(order);
        Employee employee = employeeMapper.selectByPrimaryKeyAndSalary(order.getEmployeeid1());
        System.out.println(employee);
        String idcard = order.getCustomer().getIdcard();
        Customer customer = customerMapper.selectByPrimaryKey(idcard);
        Customer customer1;
        if(customer==null){
            customer1 = order.getCustomer();
            customerMapper.insertSelective(customer1);
        }
        customer1 = customerMapper.selectByPrimaryKey(order.getIdcard());
        customer1.setCost(customer1.getCost()+order.getMoney());
        if(customer1.getCost()<500){
            customer1.setLevel(0);
        }else if(customer1.getCost()<1000){
            customer1.setLevel(1);
        }else if(customer1.getCost()<2000){
            customer1.setLevel(2);
        }else if(customer1.getCost()<5000){
            customer1.setLevel(3);
        }else if(customer1.getCost()<10000){
            customer1.setLevel(4);
        }else if(customer1.getCost()<20000){
            customer1.setLevel(5);
        }else{
            customer1.setLevel((int)(customer1.getCost()/4000));
        }
        customerMapper.updateByPrimaryKeySelective(customer1);
        Salary salary = employee.getSalary();
        salary.setBonus(salary.getBonus()+5);
        return salaryMapper.updateByPrimaryKeySelective(salary);

    }

    @Override
    public int checkOut(int roomid) {

        Room room = roomMapper.selectByPrimaryKey(roomid);
        System.out.println(room);
        room.setState(2);
        return roomMapper.updateByPrimaryKeySelective(room);

    }

    @Override
    public int cleanRoom(int roomid, int employeeid) {
        Room room = roomMapper.selectByPrimaryKey(roomid);
        Order order = orderMapper.selectOrderByRoomid(roomid);
        order.setEmployeeid2(employeeid);
        room.setState(0);
        roomMapper.updateByPrimaryKeySelective(room);
        Employee employee = employeeMapper.selectByPrimaryKeyAndSalary(employeeid);
        Salary salary = employee.getSalary();
        salary.setBonus(salary.getBonus()+10);
        salaryMapper.updateByPrimaryKeySelective(salary);
        return orderMapper.updateByPrimaryKeySelective(order);
    }
}
