package com.whut.controller;

import com.whut.bean.Room;
import com.whut.service.RoomService;
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
@RequestMapping(value = "/room")
public class RoomController {
    @Resource
    RoomService roomService;

    @RequestMapping(value="/getRooms.do",produces = "text/html;charset=UTF-8")
    public String getRooms(@RequestParam int pageNum, @RequestParam int pageSize){
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
        return GsonUtil.toJson(signal.getResult());
    }



    @RequestMapping(value="/addRoom.do",produces = "text/html;charset=UTF-8")
    public String addRoom(@RequestParam String roomname,@RequestParam Integer type,@RequestParam Integer state){
        StateSignal signal = new StateSignal();
        Room room = new Room();
        room.setRoomname(roomname);
        room.setType(type);
        room.setState(state);
        int state2 = roomService.insertRoomSelective(room);
        if(state2==1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="/deleteRoom.do",produces = "text/html;charset=UTF-8")
    public String deleteRoom(@RequestParam Integer roomid){
        StateSignal signal = new StateSignal();
        int state = roomService.deleteByPrimaryKey(roomid);
        if(state == 1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

    @RequestMapping(value="/updateRoom.do",produces = "text/html;charset=UTF-8")
    public String updateRoom(@RequestParam String roomname,@RequestParam Integer type,@RequestParam Integer state){
        StateSignal signal = new StateSignal();
        Room room = new Room();
        room.setRoomname(roomname);
        room.setType(type);
        room.setState(state);
        int state2 = roomService.updateByPrimaryKeySelective(room);
        if(state2 == 1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }
    @RequestMapping(value="/updateRoomState.do",produces = "text/html;charset=UTF-8")
    public String updateRoomState(@RequestParam int roomid , @RequestParam int state){
        StateSignal signal = new StateSignal();
        int state2 = roomService.updateRoomState(roomid,state);
        if(state2 == 1){
            signal.put(State.SuccessCode);
            signal.put(State.SuccessMessage);
        }else {
            signal.put(State.ErrorCode);
            signal.put(State.ErrorMessage);
        }
        return GsonUtil.toJson(signal.getResult());
    }

}
