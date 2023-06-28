package com.example.jpadata.module;

import java.time.LocalDate;
import java.time.Period;
import java.util.Set;

import jakarta.persistence.*;


@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @SequenceGenerator(
        name = "Customer_sequence",
        sequenceName = "customer_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "customer_sequence"
    )
    @Column(name = "customerId")
    private Long customerId;

    @Column(name = "name")
    private String name;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "dob")
    private LocalDate dob;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Blog> blogs;

    @Transient
    private Integer old;

    public Customer() {
    }

    public Customer(String name, String password, String email, LocalDate dob) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.dob = dob;
    }

    public Long getId() {
        return customerId;
    }


    public void setId(Long customerId) {
        this.customerId = customerId;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public LocalDate getDob() {
        return dob;
    }


    public void setDob(LocalDate dob) {
        this.dob = dob;
    }


    public Integer getOld() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }


    @Override
    public String toString() {
        return "Customer [id=" + customerId + ", name=" + name + ", password=" + password + ", email=" + email + ", dob=" + dob
                + ", old=" + old + "]";
    }
    
}
