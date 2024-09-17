import React, { useState, useContext, useMemo, useLayoutEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TextInput } from 'react-native';
import { MON_AN } from '../data/dummy-data';
import { FavoriteContext } from '../context/FavoriteContext';
import { useTheme } from '../context/ThemeContext'; // Ensure the path is correct
import Icon from 'react-native-vector-icons/Ionicons'; // Or another icon library

function ChiTietMonAn({ route, navigation }) {
  const { idDanhMuc } = route.params;
  const { addFavorite, isFavorite, removeFavorite } = useContext(FavoriteContext);
  const { isDarkMode } = useTheme(); // Get dark mode value from context
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on category and search query
  const filteredData = useMemo(() => {
    return MON_AN.filter((mon) =>
      mon.danhMucIds.includes(idDanhMuc) &&
      mon.tieuDe.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [idDanhMuc, searchQuery]);

  // Handle favorite item
  const handleFavorite = (monAn) => {
    if (isFavorite(monAn.id)) {
      removeFavorite(monAn.id);
    } else {
      addFavorite(monAn);
    }
  };

  // Set header icon based on the first item in filteredData
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon.Button
          name={filteredData.length > 0 && isFavorite(filteredData[0]?.id) ? 'heart' : 'heart-outline'}
          size={25}
          color="red"
          backgroundColor="transparent"
          onPress={() => {
            if (filteredData.length > 0) {
              handleFavorite(filteredData[0]);
            }
          }}
        />
      ),
    });
  }, [navigation, filteredData, isFavorite]);

  // Render each item
  const renderMonAn = ({ item }) => (
    <View style={[styles.monAn, isDarkMode ? styles.darkMonAn : styles.lightMonAn]}>
      <Image source={item.hinhAnhUrl} style={styles.hinhAnh} />
      <View style={styles.infoContainer}>
        <Text style={[styles.tieuDe, isDarkMode ? styles.darkTieuDe : styles.lightTieuDe]}>
          {item.tieuDe}
        </Text>
        <Text style={[styles.moTa, isDarkMode ? styles.darkMoTa : styles.lightMoTa]}>
          {item.moTa}
        </Text>
        <Icon
          name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
          size={24}
          color="red"
          onPress={() => handleFavorite(item)}
          style={styles.icon}
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDarkMode ? styles.darkSearchInput : styles.lightSearchInput]}
          placeholder="Tìm kiếm món ăn..."
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      {/* List of items */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMonAn}
        />
      ) : (
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsText, isDarkMode ? styles.darkNoResultsText : styles.lightNoResultsText]}>
            Không có món ăn nào phù hợp với tìm kiếm của bạn.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  lightContainer: {
    backgroundColor: '#e0f7fa',
  },
  darkContainer: {
    backgroundColor: '#333',
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
  monAn: {
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
    backgroundColor: '#fff',
  },
  darkMonAn: {
    backgroundColor: '#444',
  },
  hinhAnh: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  tieuDe: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lightTieuDe: {
    color: '#000',
  },
  darkTieuDe: {
    color: '#fff',
  },
  moTa: {
    fontSize: 14,
  },
  lightMoTa: {
    color: '#555',
  },
  darkMoTa: {
    color: '#ddd',
  },
  icon: {
    marginTop: 10,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
  },
  lightNoResultsText: {
    color: '#555',
  },
  darkNoResultsText: {
    color: '#aaa',
  },
});

export default ChiTietMonAn;
