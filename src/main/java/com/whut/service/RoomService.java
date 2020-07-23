package com.whut.service;



import com.whut.bean.Room;
import com.whut.bean.Roomtype;

import java.util.List;

public interface RoomService {
    int deleteByPrimaryKey(Integer roomid);

    int insert(Room record);

    List<Room> getAllRoom(int pageNum, int pageSize);

    int insertRoomSelective(Room record);

    int insertRoomtypeselective(Roomtype roomtype);

    Room selectByPrimaryKey(Integer roomid);

    int updateByPrimaryKeySelective(Room record);

    int updateByPrimaryKey(Room record);

    int updateRoomState(int roomid, int state);

}