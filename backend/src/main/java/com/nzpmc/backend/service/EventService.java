package com.nzpmc.backend.service;

import com.nzpmc.backend.model.Event;
import com.nzpmc.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    public Event getEvent(Event event) {
        return eventRepository.findByNameAndDate(event.getName(), event.getDate());
    }

    public Event createEvent(Event event) {
        eventRepository.save(event);
        return event;
    }

}
