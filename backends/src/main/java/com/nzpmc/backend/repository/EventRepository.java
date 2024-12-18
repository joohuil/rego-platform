package com.nzpmc.backend.repository;

import com.nzpmc.backend.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {
    Event findByNameAndDate(String name, Date date);
}
