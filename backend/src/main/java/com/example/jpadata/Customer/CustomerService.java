package com.example.jpadata.Customer;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.jpadata.Blog.BlogRepository;
import com.example.jpadata.module.*;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository, BlogRepository blogRepository){
        this.customerRepository = customerRepository;
    }

    public ResponseEntity<ReponseObject> getCustomer() {
                List<Customer> listCustomer = customerRepository.findAll();
        if (listCustomer.size() != 0){
            return ResponseEntity.status(HttpStatus.FOUND).body(
                new ReponseObject("Found", "Found " + listCustomer.size() + " customer", listCustomer)
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
            new ReponseObject("Not Found", "Not found any customer", listCustomer)
        );
        
    }

    public ResponseEntity<ReponseObject> addNewCustomer(Customer customer) {
        if (customerRepository.findCustomerByEmail(customer.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                new ReponseObject("NOT_ACCEPTABLE", "already have this email", "")
            );
        }
        customerRepository.save(customer);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(
                new ReponseObject("ACCEPTABLE", "Add new account success", customer)
        );
        
    }

    public ResponseEntity<ReponseObject> getOneCustomer(LoginForm loginForm) {
        if(loginForm.getEmail() == "" || loginForm.getPassword() == ""){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                new ReponseObject("input null", "not found input email and password", "")
            );
        };
        Optional<Customer> customer = customerRepository.findCustomerByEmail(loginForm.getEmail());
        if (!customer.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ReponseObject("Not found", "Not found user with email " + loginForm.getEmail(), "")
            );
        }else if(!customer.get().getPassword().equals(loginForm.getPassword())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                new ReponseObject("Not acceptable", "Wrong password of user with email " + customer.get().getEmail(), List.of(customer.get().getPassword(), loginForm.getPassword()))
            );
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(
                new ReponseObject("OK", "Login user with email " + customer.get().getName(), customer.get())
            );
    }
}
