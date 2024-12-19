package com.nzpmc.backend.controller;

import com.nzpmc.backend.model.Event;
import com.nzpmc.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("api/events")
public class EventController {
    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<Object> getEvents() {
        List<Event> events = eventService.getEvents();
        return ResponseEntity.ok(events);
    }

    @PostMapping
    public ResponseEntity<Object> createEvent(@RequestBody Event event) {
        if (event.getName() == null || event.getDate() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name and date are required."));
        }
        Event existingEvent = eventService.getEvent(event);
        if (existingEvent != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    Map.of("error", "This event already exists. Please create a new event.")
            );
        }
        Event savedEvent = eventService.createEvent(event);
        return ResponseEntity.status(201).body(savedEvent);
    }
}
