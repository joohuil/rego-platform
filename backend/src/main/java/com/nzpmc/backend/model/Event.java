package com.nzpmc.backend.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("event")
public class Event {
    private String name;
    private String description;
    private Date date;

    public Event(String name, Date date, String description) {
        this.name = name;
        this.description = description;
        this.date = date;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
