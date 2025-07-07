package dev.karesse.movies.repository;

import dev.karesse.movies.model.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovieRepository extends MongoRepository<Movie, ObjectId> {

    Optional<Movie> findMovieByImdbId(String imdbId);

    List<Movie> findByTitleContainingIgnoreCase(String title);

    Optional<Movie> findByTitle(String title);

    Optional<Movie> findByTitleIgnoreCase(String title);
}