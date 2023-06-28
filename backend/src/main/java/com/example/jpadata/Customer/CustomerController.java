package com.example.jpadata.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.jpadata.module.Customer;
import com.example.jpadata.module.ReponseObject;


@RestController
@RequestMapping(path = "api/v1/demoApp")
@CrossOrigin("http://localhost:3000/")
public class CustomerController {
    
    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService){
        this.customerService = customerService; 
    }

    @GetMapping
    public ResponseEntity<ReponseObject> getCustomer(){
        return customerService.getCustomer();
    }

    @PostMapping("/signIn")
    public ResponseEntity<ReponseObject> addNewCustomer(@RequestBody Customer customer){
        return customerService.addNewCustomer(customer);
    }

    @PostMapping("/logIn")
    public ResponseEntity<ReponseObject> getOneCustomer(@RequestBody LoginForm loginForm){
        return customerService.getOneCustomer(loginForm);
    }

    // @DeleteMapping("/deleteCustomer/{customerId}")
    // public ResponseEntity<ReponseObject> deleteCustomer(@PathVariable Long customerId){
    //     return customerService.deleteCustomerById(customerId);
    // }
}
