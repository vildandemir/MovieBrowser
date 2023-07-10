import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import CustomGenres from "./CustomGenres";
import MovieSearch from "../MovieSearch";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Action = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const handleSearchButton = () => {
    setSearchText("");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 5,
            paddingHorizontal: 10,
            color: "grey",
          }}
          placeholder="Please enter a movie name..."
          placeholderTextColor="grey"
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
        <Ionicons
          name="search-outline"
          size={24}
          color="#fff"
          style={{ backgroundColor: "black", padding: 5, borderRadius: 5 }}
          onPress={handleSearchButton}
        />
      </View>
      <LinearGradient colors={["#43364a", "#202d3a"]} style={styles.container}>
        {searchText ? (
          <MovieSearch searchText={searchText} genre="action" />
        ) : (
          <CustomGenres componentName="action" />
        )}
      </LinearGradient>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingTop: 50,
  },
};

export default Action;
