package com.whut.service.impl;

import com.github.pagehelper.PageHelper;
import com.whut.bean.Room;
import com.whut.bean.Roomtype;
import com.whut.mapper.RoomMapper;
import com.whut.service.RoomService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    @Resource
    RoomMapper roomMapper;

    public List<Room> getAllRoom(int pageNum, int pageSize){
        PageHelper.startPage(pageNum,pageSize);
        List<Room> rooms =  roomMapper.getAllRoom();
        return rooms;
    }


    public int insert(Room record){
        return 0;
    }

    public int insertRoomSelective(Room record){
        return roomMapper.insertRoomSelective(record);
    }

    public int insertRoomtypeselective(Roomtype roomtype){
        return 0;
    }


    public Room selectByPrimaryKey(Integer roomid){
        return roomMapper.selectByPrimaryKey(roomid);
    }

    public int updateByPrimaryKeySelective(Room record){
        return roomMapper.updateByPrimaryKeySelective(record);
    }

    public int updateByPrimaryKey(Room record){
        return 0;
    }

    @Override
    public int updateRoomState(int roomid, int state) {
        Room room =  roomMapper.selectByPrimaryKey(roomid);
        room.setState(state);
        return roomMapper.updateByPrimaryKeySelective(room);
    }


    public int deleteByPrimaryKey(Integer roomid){
        return roomMapper.deleteByPrimaryKey(roomid);
    }
}
