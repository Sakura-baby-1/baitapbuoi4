import React, { useContext, useState, useMemo } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TextInput } from 'react-native';
import { FavoriteContext } from '../context/FavoriteContext';
import { useTheme } from '../context/ThemeContext'; // Ensure the path is correct

const ManHinhYeuThich = () => {
  const { favoriteMeals } = useContext(FavoriteContext);
  const { isDarkMode } = useTheme(); // Get dark mode value from context
  const [searchQuery, setSearchQuery] = useState('');

  // Filter favorite meals based on search query
  const filteredFavoriteMeals = useMemo(() => {
    return favoriteMeals.filter(meal =>
      meal.tieuDe.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, favoriteMeals]);

  // Render each favorite meal
  const renderMonAn = ({ item }) => (
    <View style={[styles.monAnContainer, isDarkMode ? styles.darkMonAn : styles.lightMonAn]}>
      <Image source={item.hinhAnhUrl} style={styles.monAnImage} />
      <View style={styles.infoContainer}>
        <Text style={[styles.monAnTitle, isDarkMode ? styles.darkTitle : styles.lightTitle]}>
          {item.tieuDe}
        </Text>
        <Text style={[styles.monAnDescription, isDarkMode ? styles.darkDescription : styles.lightDescription]}>
          {item.moTa}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDarkMode ? styles.darkSearchInput : styles.lightSearchInput]}
          placeholder="Tìm kiếm món ăn..."
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      {filteredFavoriteMeals.length > 0 ? (
        <FlatList
          data={filteredFavoriteMeals}
          keyExtractor={(item) => item.id.toString()} // Ensure each key is unique
          renderItem={renderMonAn}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsText, isDarkMode ? styles.darkNoResultsText : styles.lightNoResultsText]}>
            Không có món ăn yêu thích nào.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  lightContainer: {
    backgroundColor: '#e0f2f1', // Light background color
  },
  darkContainer: {
    backgroundColor: '#333', // Dark background color
  },
  searchContainer: {
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  lightSearchInput: {
    backgroundColor: '#fff',
  },
  darkSearchInput: {
    backgroundColor: '#555',
    color: '#fff',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  monAnContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  lightMonAn: {
    backgroundColor: '#ffffff', // Light item background
  },
  darkMonAn: {
    backgroundColor: '#444', // Dark item background
  },
  monAnImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  monAnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lightTitle: {
    color: '#000', // Light title color
  },
  darkTitle: {
    color: '#fff', // Dark title color
  },
  monAnDescription: {
    fontSize: 14,
  },
  lightDescription: {
    color: '#555', // Light description color
  },
  darkDescription: {
    color: '#ddd', // Dark description color
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightNoResultsText: {
    color: '#555', // Light no results text color
  },
  darkNoResultsText: {
    color: '#aaa', // Dark no results text color
  },
});

export default ManHinhYeuThich;
