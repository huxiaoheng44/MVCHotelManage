package com.whut.mapper;



import com.whut.bean.Room;
import com.whut.bean.Roomtype;

import java.util.List;

public interface RoomMapper {
    int deleteByPrimaryKey(Integer roomid);

    int insert(Room record);

    List<Room> getAllRoom();

    int insertRoomSelective(Room record);

    int insertRoomtypeselective(Roomtype roomtype);

    Room selectByPrimaryKey(Integer roomid);

    int updateByPrimaryKeySelective(Room record);

    int updateAndTypeByPrimaryKeySelective(Room record);

    int updateAndTypeByPrimaryKey(Room record);
}