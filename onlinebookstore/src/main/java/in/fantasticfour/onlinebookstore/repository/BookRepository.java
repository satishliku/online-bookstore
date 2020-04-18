package in.fantasticfour.onlinebookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.fantasticfour.onlinebookstore.entity.Book;



public interface BookRepository extends JpaRepository<Book,Long> {

}
