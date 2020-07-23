package com.whut.controller;

import com.whut.bean.Room;
import com.whut.service.RoomService;
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
@RequestMapping(value = "/room")
public class RoomController {
    @Resource
    RoomService roomService;

    @RequestMapping("/getRooms.do")
    public Map getRooms(@RequestParam int pageNum, @RequestParam int pageSize){
        List<Room> roomByState = roomService.getAllRoom(pageNum,pageSize);
        StateSignal signal = new StateSignal();
        if(roomByState!=null){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
            signal.put("List",roomByState);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }



    @RequestMapping("/addRoom.do")
    public Map addRoom(@RequestBody Room room){
        StateSignal signal = new StateSignal();
        int state = roomService.insertRoomSelective(room);
        if(state==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("/deleteRoom.do")
    public Map deleteRoom(@RequestParam Integer roomid){
        StateSignal signal = new StateSignal();
        int state = roomService.deleteByPrimaryKey(roomid);
        if(state == 1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

    @RequestMapping("/updateRoom.do")
    public Map updateRoom(@RequestBody Room room){
        StateSignal signal = new StateSignal();
        int state = roomService.updateByPrimaryKeySelective(room);
        if(state == 1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }
    @RequestMapping("/updateRoomState.do")
    public Map updateRoomState(@RequestParam int roomid , @RequestParam int state){
        StateSignal signal = new StateSignal();
        int state2 = roomService.updateRoomState(roomid,state);
        if(state2 == 1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return  signal.getResult();
    }

}
