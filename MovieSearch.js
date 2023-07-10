import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MovieSearch = ({ searchText, genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, [searchText, genre]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      let page = 1;
      let allMovies = [];

      do {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(
            genre ? `${searchText} ${genre}` : searchText
          )}&type=movie&apikey=348a22ae&page=${page}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          const newMovies = data.Search.filter(
            (movie) => movie.Type === "movie"
          );
          allMovies = [...allMovies, ...newMovies];
        } else {
          console.log("API request error:", data.Error);
          break;
        }

        page++;
      } while (page <= 10 && allMovies.length < 100);

      const filteredMovies = allMovies.slice(0, 20);
      setMovies(filteredMovies);
      setLoading(false);
    } catch (error) {
      console.log("API request error:", error);
      setLoading(false);
    }
  };

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Image source={{ uri: item.Poster }} style={styles.poster} />
      <Text style={styles.title}>{item.Title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <LinearGradient
          colors={["#43364a", "#202d3a"]}
          style={styles.container}
        >
          <ScrollView horizontal>
            {movies.map((movie) => (
              <View key={movie.imdbID} style={styles.movieItem}>
                <Image source={{ uri: movie.Poster }} style={styles.poster} />
                <Text style={styles.title}>{movie.Title}</Text>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  movieItem: {
    flex: 1,
    margin: 5,
    paddingTop: 10,
    alignItems: "center",
  },

  poster: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
  title: {
    marginTop: 5,
    textAlign: "center",
    color: "white",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});

export default MovieSearch;
