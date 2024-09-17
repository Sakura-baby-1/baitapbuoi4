import React, { useContext } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { MON_AN } from '../data/dummy-data'; // Ensure the path is correct
import { useTheme } from '../context/ThemeContext'; // Ensure the path is correct

const MealsOverviewScreen = ({ route }) => {
  const { danhMucId } = route.params;
  const { isDarkMode } = useTheme(); // Get dark mode value from context

  // Filter meals based on category ID
  const filteredMeals = MON_AN.filter(meal =>
    meal.danhMucIds.includes(danhMucId)
  );

  // Render each meal item
  const renderItem = ({ item }) => (
    <View style={[styles.itemContainer, isDarkMode ? styles.darkItemContainer : styles.lightItemContainer]}>
      <Image source={item.hinhAnhUrl} style={styles.image} />
      <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>
        {item.tieuDe}
      </Text>
      <Text style={[styles.description, isDarkMode ? styles.darkDescription : styles.lightDescription]}>
        {item.moTa}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <FlatList
        data={filteredMeals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  lightContainer: {
    backgroundColor: '#f0f0f0',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  itemContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    alignItems: 'center',
    padding: 10,
  },
  lightItemContainer: {
    backgroundColor: '#fff',
  },
  darkItemContainer: {
    backgroundColor: '#444',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  lightTitle: {
    color: '#000',
  },
  darkTitle: {
    color: '#fff',
  },
  description: {
    fontSize: 14,
  },
  lightDescription: {
    color: '#666',
  },
  darkDescription: {
    color: '#ddd',
  },
  flatListContent: {
    paddingBottom: 20, // Add padding to the bottom of the FlatList
  },
});

export default MealsOverviewScreen;
