package com.example.jpadata.Customer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.jpadata.module.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
    @Query("Select c From Customer c Where c.email = ?1")
    Optional<Customer> findCustomerByEmail(String email);

    @Query("Select s From Customer s Where s.id = ?1")
    Optional<Customer> findCustomerById(Long id);
}
