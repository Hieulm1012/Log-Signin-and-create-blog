package com.example.jpadata.Blog;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.jpadata.module.Blog;
import com.example.jpadata.module.Customer;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long>{
    @Query("Select s From Blog s Where s.customer = ?1")
    Optional<List<Blog>> findAllBlogByid(Customer customerId);
}
