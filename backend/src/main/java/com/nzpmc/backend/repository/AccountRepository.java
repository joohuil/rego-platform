package com.nzpmc.backend.repository;

import com.nzpmc.backend.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends MongoRepository<Account, String> {
    Account findByEmailAndPassword(String email, String password);
}
