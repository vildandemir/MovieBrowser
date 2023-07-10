import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CustomGenres from "./genres/CustomGenres";

const Main = () => {
  return (
    <LinearGradient colors={["#43364a", "#202d3a"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.genre}>
          <Text style={styles.genreTitle}>Action</Text>
          <ScrollView style={styles.moviesContainer} horizontal>
            <CustomGenres componentName="action" />
          </ScrollView>
        </View>
        <View style={styles.genre}>
          <Text style={styles.genreTitle}>Drama</Text>
          <ScrollView style={styles.moviesContainer} horizontal>
            <CustomGenres componentName="drama" />
          </ScrollView>
        </View>
        <View style={styles.genre}>
          <Text style={styles.genreTitle}>Comedy</Text>
          <ScrollView style={styles.moviesContainer} horizontal>
            <CustomGenres componentName="comedy" />
          </ScrollView>
        </View>
        <View style={styles.genre}>
          <Text style={styles.genreTitle}>Adventure</Text>
          <ScrollView style={styles.moviesContainer} horizontal>
            <CustomGenres componentName="adventure" />
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "column",
  },
  genre: {
    marginBottom: 20,
  },
  genreTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#F4EFEE",
    paddingLeft: 10,
  },
  moviesContainer: {
    flexDirection: "row",
    overflow: "scroll",
  },
});

export default Main;
