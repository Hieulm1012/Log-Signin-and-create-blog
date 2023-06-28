package com.example.jpadata.Blog;

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

import com.example.jpadata.module.ReponseObject;

@RestController
@RequestMapping("api/v1/Blog")
@CrossOrigin("http://localhost:3000/")
public class BlogController {

    private BlogService blogService;

    @Autowired
    public BlogController(BlogService blogService){
        this.blogService = blogService;
    }

    @GetMapping
    public String welcome(){
        return ("this is where u create blog");
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<ReponseObject> getAllBlogOfACustomer(@PathVariable Long customerId){
        return blogService.getAllBlogOfACustomer(customerId);
    }

    @PostMapping("/{customerId}/newblog")
    public ResponseEntity<ReponseObject> addNewBlog(@RequestBody BlogForm blogForm, @PathVariable Long customerId) throws Exception{
        return blogService.addNewBlog(blogForm, customerId);
    }

    @DeleteMapping("/{customerId}/deleteblog/{blogId}")
    public ResponseEntity<ReponseObject> deleteBlogById(@PathVariable Long customerId, @PathVariable Long blogId){
        return blogService.deleteBlog(customerId, blogId);
        
    }
}
