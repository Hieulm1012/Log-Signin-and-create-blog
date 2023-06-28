package com.example.jpadata.module;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.sym.Name;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "blog")
public class Blog {
    @Id
    @SequenceGenerator(
        name = "blog_sequence",
        sequenceName = "blog_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "blog_sequence"
    )
    @Column(name = "blogId")
    private Long id;

    @Column(name = "value")
    private String value;

    @Column(name = "blogDate")
    private LocalDateTime bLocalDate;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, optional =false)
    @JoinColumn(name = "customer_id", nullable = false, referencedColumnName = "customerId")
    private Customer customer;

    public Blog() {
    }
    public Blog(String title, String value, Customer customer) {
        this.title = title;
        this.value = value;
        this.bLocalDate = LocalDateTime.now();
        this.customer = customer;
    }
    public Long getId() {
        return id;
    }
    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
    public String getbLocalDate() {
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");  
        return bLocalDate.format(format);
    }
    public void setbLocalDate(LocalDateTime bLocalDate) {
        this.bLocalDate = bLocalDate;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public Customer getCustomer() {
        return customer;
    }
    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    

    
}
