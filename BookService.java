package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.modal.Book;
import com.example.demo.repository.BookRepository;

@Service
public class BookService {

  private final BookRepository repo;

  public BookService(BookRepository repo) {
    this.repo = repo;
  }

  public List<Book> findAll() { 
    List<Book> booksList = repo.findAll(); 
    return booksList;
  }

  public Book findById(Long id) { return repo.findById(id).orElse(null); }

  public Book create(Book b) {
    return repo.save(b);
  }

  public Book update(Long id, Book updated) {
    return repo.findById(id).map(existing -> {
      existing.setTitle(updated.getTitle());
      existing.setAuthor(updated.getAuthor());
      existing.setPrice(updated.getPrice());
      existing.setPublicationYear(updated.getPublicationYear());
      return repo.save(existing);
    }).orElse(null);
  }

  public boolean deleteById(long id) {
    if (repo.existsById(id)) {
      repo.deleteById(id);
      return true;
    }
    return false;
  }

  public void deleteAll() {
    repo.deleteAll();
  }
}