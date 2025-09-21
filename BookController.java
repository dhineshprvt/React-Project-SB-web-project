package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modal.Book;
import com.example.demo.service.BookService;

@RestController
@CrossOrigin(origins ="http://localhost:5173/")
@RequestMapping("/api")
public class BookController {

  private final BookService bookService;

  public BookController(BookService bookService) {
    this.bookService = bookService;
  }

  @GetMapping("/books")
  public ResponseEntity<List<Book>> getAllBooks() {
    try {
      List<Book> books = new ArrayList<>();
      
      books.addAll(bookService.findAll());
      
      if (books.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      return new ResponseEntity<>(books, HttpStatus.OK);

    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @GetMapping("/books/{id}")
  public ResponseEntity<Book> getBookById(@PathVariable("id") long id) {
    try {
      Book book = bookService.findById(id);
      return (book == null) ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
                            : new ResponseEntity<>(book, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/books")
  public ResponseEntity<Book> createBook(@RequestBody Book book) {
    try {
      Book saved = bookService.create(book);
      return new ResponseEntity<>(saved, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/books/{id}")
  public ResponseEntity<Book> updateBook(@PathVariable("id") long id, @RequestBody Book book) {
    try {
      Book saved = bookService.update(id, book);
      return (saved == null) ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
                             : new ResponseEntity<>(saved, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/books/{id}")
  public ResponseEntity<HttpStatus> deleteBook(@PathVariable("id") long id) {
    try {
      boolean existed = bookService.deleteById(id);
      return existed ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                     : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/books")
  public ResponseEntity<HttpStatus> deleteAllBooks() {
    try {
      bookService.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}