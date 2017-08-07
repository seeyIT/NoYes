package com.seeyit.musicplaylistapp;

/**
 * Created by User on 2017-08-02.
 */

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by Student on 2017-06-08.
 */

public class Session {

    private SharedPreferences _prefs;
    private SharedPreferences.Editor _editor;
    private Context _context;

    private static final String PREFER_NAME = "PREFERENCES";
    private static final int PRIVATE_MODE = 0;


    public Session(Context context) {
        _context = context;
        _prefs = context.getSharedPreferences(PREFER_NAME, PRIVATE_MODE);
        _editor = _prefs.edit();
        _editor.apply();

    }

    public void putString(String key, String value) {
        _editor.putString(key, value);
        _editor.commit();
    }

    public void putInt(String key, int value) {
        _editor.putInt(key, value);
        _editor.commit();
    }

    public void putLong(String key, long value) {
        _editor.putLong(key, value);
        _editor.commit();
    }

    public void putFloat(String key, float value) {
        _editor.putFloat(key, value);
        _editor.commit();
    }

    public void putBoolean(String key, boolean value) {
        _editor.putBoolean(key, value);
        _editor.commit();
    }

    public String getString(String key) {
        String value = _prefs.getString(key, "");
        return value;
    }

    public int getInt(String key) {
        int value = _prefs.getInt(key, 0);
        return value;
    }

    public float getFloat(String key) {
        float value = _prefs.getFloat(key, 0f);
        return value;
    }

    public long getLong(String key) {
        long value = _prefs.getLong(key, 0);
        return value;
    }

    public boolean getBoolean(String key) {
        boolean value = _prefs.getBoolean(key, false);
        return value;
    }
}