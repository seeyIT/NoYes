package com.seeyit.skillshot;


public class Job {

    private String _title;
    private String _company;
    private String _place;
    private String _date;
    private int _type;
    private String _details;

    public Job(String title, String company, String place, String date, int type, String details) {
        _title = title;
        _company = company;
        _place = place;
        _date = date;
        _type = type;
        _details = details;
    }

    public String getTitle() {
        return _title;
    }

    public String getCompany() {
        return _company;
    }

    public String getPlace() {
        return _place;
    }

    public String getDate() {
        return _date;
    }

    public int getType() {
        return _type;
    }

    public String getDetiles() {
        return _details;
    }
}
