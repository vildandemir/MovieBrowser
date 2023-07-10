import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import Header from "./Header";
import Main from "./Main";
import MovieSearch from "./MovieSearch";
import Action from "./genres/Action";
import Comedy from "./genres/Comedy";
import Adventure from "./genres/Adveture";
import Drama from "./genres/Drama";

const Stack = createNativeStackNavigator();

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = () => {
    if (searchText.trim().length < 3) {
      setShowSearchResults(false);
    } else {
      setShowSearchResults(true);
    }
  };

  const handleSearchButton = () => {
    handleSearch();
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setShowSearchResults(false);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => <Header /> }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MovieSearch" component={MovieSearchScreen} />
        <Stack.Screen name="Action" component={Action} />
        <Stack.Screen name="Comedy" component={Comedy} />
        <Stack.Screen name="Adventure" component={Adventure} />
        <Stack.Screen name="Drama" component={Drama} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchError, setSearchError] = useState(false); //

  const handleSearchButton = () => {
    if (searchText.trim().length < 3) {
      setSearchError(true);
    } else {
      setSearchError(false);
      navigation.navigate("MovieSearch", { searchText });
    }
  };

  return (
    <View>
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
          onChangeText={setSearchText}
          onSubmitEditing={() => handleSearchButton()}
        />
        <Ionicons
          name="search-outline"
          size={24}
          color="#fff"
          style={{ backgroundColor: "black", padding: 5, borderRadius: 5 }}
          onPress={handleSearchButton}
        />
      </View>
      <Main />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MovieSearchScreen = ({ route }) => {
  const { searchText } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <MovieSearch searchText={searchText} />
    </View>
  );
};

export default App;
