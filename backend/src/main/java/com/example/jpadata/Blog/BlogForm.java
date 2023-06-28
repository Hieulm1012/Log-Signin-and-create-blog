package com.example.jpadata.Blog;

import java.time.LocalDate;

public class BlogForm {
    private String value;
    private LocalDate blogDate;
    private Long idCustomer;
    private String title;
    public BlogForm() {
    }
    public BlogForm(String value, String title) {
        this.title = title;
        this.value = value;     
    }    
    
    public String getBlogValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
    public String getValue() {
        return value;
    }
    public LocalDate getBlogDate() {
        return LocalDate.now();
    }
    public void setBlogDate(LocalDate blogDate) {
        this.blogDate = blogDate;
    }
    public Long getIdCustomer() {
        return idCustomer;
    }
    public void setIdCustomer(Long idCustomer) {
        this.idCustomer = idCustomer;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    
    
}
