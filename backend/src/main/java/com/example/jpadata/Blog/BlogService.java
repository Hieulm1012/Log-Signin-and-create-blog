package com.example.jpadata.Blog;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.jpadata.Customer.CustomerRepository;
import com.example.jpadata.module.*;

@Service
public class BlogService {
    private final BlogRepository blogRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public BlogService(BlogRepository blogRepository, CustomerRepository customerRepository){
        this.blogRepository = blogRepository;
        this.customerRepository = customerRepository;
    }

    public ResponseEntity<ReponseObject> getAllBlogOfACustomer(Long customerId) {
        Customer customer = customerRepository.findCustomerById(customerId).get();
        List<Blog> blogs = blogRepository.findAllBlogByid(customer).get();
        if (blogs.size() != 0){
            return ResponseEntity.status(HttpStatus.FOUND).body(
                new ReponseObject("Found", "found " + blogs.size() + " blogs of user id: " + customerId, blogs)
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
            new ReponseObject("Not Found", "Not found blogs of user id: " + customerId, blogs)
        );
    }

    public ResponseEntity<ReponseObject> addNewBlog(BlogForm blogForm, Long customerId) throws Exception{
        if (blogForm.getBlogValue().equals("") && blogForm.getTitle().equals("")){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                new ReponseObject("Not acceptable", "title and description is null", "")
        );
        }
        Customer customer = customerRepository.findCustomerById(customerId).get();
        Blog blog = new Blog(blogForm.getTitle(), blogForm.getBlogValue(), customer);
        blogRepository.save(blog);
        return ResponseEntity.status(HttpStatus.OK).body(
            new ReponseObject("OK", "Add a new blog success", blog)
        );
    }

    public ResponseEntity<ReponseObject> deleteBlog(Long customerId, Long blogId) {
        if (blogRepository.existsById(blogId)){
            blogRepository.deleteById(blogId);
            return ResponseEntity.status(HttpStatus.OK).body(
                new ReponseObject("OK", "delete a blog succses", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ReponseObject("Not found", "Not found blog with id " + blogId, "")
        );
    }
}
