import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleHomePress = () => {
    navigation.navigate("Home");
  };

  const handleSidebarPress = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleActionPress = () => {
    setIsSidebarOpen(false);
    navigation.navigate("Action");
  };

  const handleComedyPress = () => {
    setIsSidebarOpen(false);
    navigation.navigate("Comedy");
  };

  const handleAdventurePress = () => {
    setIsSidebarOpen(false);
    navigation.navigate("Adventure");
  };
  const handleDramaPress = () => {
    setIsSidebarOpen(false);
    navigation.navigate("Drama");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleHomePress}>
        <Ionicons name="home-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={handleSidebarPress}
      >
        <Ionicons name="menu-outline" size={24} color="black" />
      </TouchableOpacity>
      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={handleActionPress}>
            <Text style={styles.sidebarItem}>Action</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComedyPress}>
            <Text style={styles.sidebarItem}>Comedy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAdventurePress}>
            <Text style={styles.sidebarItem}>Adventure</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDramaPress}>
            <Text style={styles.sidebarItem}>Drama</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "#F4EFEE",
  },
  iconContainer: {
    padding: 5,
  },
  sidebar: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  sidebarItem: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Header;
