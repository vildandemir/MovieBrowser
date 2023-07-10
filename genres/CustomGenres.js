import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const CustomGenres = ({ componentName }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${componentName}&type=movie&apikey=348a22ae`
      );
      const data = await response.json();

      if (data.Response === "True") {
        const newMovies = data.Search.filter((movie) => movie.Type === "movie");
        setMovies(newMovies);
      } else {
        console.log("API request error:", data.Error);
      }
    } catch (error) {
      console.log("API request error:", error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setModalVisible(false);
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => handleMovieClick(item)}
    >
      <Image source={{ uri: item.Poster }} style={styles.poster} />
      <Text style={styles.title}>{item.Title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.imdbID}
          numColumns={1}
          horizontal
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={closeModal}
        transparent={true}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={closeModal}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            {selectedMovie && (
              <View>
                <Image
                  source={{ uri: selectedMovie.Poster }}
                  style={styles.modalPoster}
                />
                <Text style={styles.modalTitle}>{selectedMovie.Title}</Text>
                <Text style={styles.modalYear}>Year: {selectedMovie.Year}</Text>
                <Text style={styles.modalType}>Type: {selectedMovie.Type}</Text>
                <Text style={styles.modalImdbID}>
                  IMDB ID: {selectedMovie.imdbID}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  movieItem: {
    marginRight: 10,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  poster: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
  title: {
    marginTop: 5,
    maxWidth: 150,
    textAlign: "center",
    color: "#F4EFEE",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#F4EFEE",
    padding: 40,
    borderRadius: 5,
  },
  modalPoster: {
    width: 200,
    height: 300,
    marginBottom: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    width: 350,
    color: "#483B38",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalYear: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: "#483B38",
  },
  modalType: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: "#483B38",
  },
  modalImdbID: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
    color: "#483B38",
  },
});

export default CustomGenres;
