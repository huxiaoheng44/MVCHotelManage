package com.whut.until;

import com.google.gson.Gson;

public class GsonUtil {
    public static Gson gson = new Gson();

    public static String toJson(Object src){
        return gson.toJson(src);
    }
}
