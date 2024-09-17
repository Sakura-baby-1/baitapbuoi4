import React, { useState, useMemo } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Đảm bảo đường dẫn chính xác
import { DANH_MUC, MON_AN } from '../data/dummy-data'; // Dữ liệu danh mục món ăn và món ăn

function ManHinhDanhMuc({ navigation }) {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  // Tìm kiếm món ăn dựa trên từ khóa
  const filteredMonAn = useMemo(() => {
    return MON_AN.filter(monAn =>
      monAn.tieuDe.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Lọc danh mục dựa trên các món ăn tìm được
  const filteredDanhMuc = useMemo(() => {
    const matchingDanhMucIds = filteredMonAn.map(monAn => monAn.danhMucIds).flat();
    const uniqueDanhMucIds = [...new Set(matchingDanhMucIds)];
    return DANH_MUC.filter(danhMuc => uniqueDanhMucIds.includes(danhMuc.id));
  }, [filteredMonAn]);

  // Hàm render món ăn
  const renderMonAn = ({ item }) => (
    <View style={styles.monAnContainer}>
      <Image source={item.hinhAnhUrl} style={styles.monAnHinhAnh} />
      <Text style={[styles.monAnTieuDe, isDarkMode ? styles.darkTieuDe : styles.lightTieuDe]}>
        {item.tieuDe}
      </Text>
    </View>
  );

  // Hàm render danh mục
  const renderDanhMuc = ({ item }) => (
    <TouchableOpacity
      style={[styles.mucDanhMuc, isDarkMode ? styles.darkMucDanhMuc : styles.lightMucDanhMuc]}
      onPress={() => {
        navigation.navigate('ChiTietMonAn', { idDanhMuc: item.id });
      }}
      activeOpacity={0.7} // Thay đổi độ mờ khi nhấn
    >
      <View style={styles.noiDungDanhMuc}>
        <Image source={item.hinhAnhUrl} style={styles.hinhAnh} />
        <View style={[styles.hopChuaText, isDarkMode ? styles.darkHopChuaText : styles.lightHopChuaText]}>
          <Text style={[styles.tieuDe, isDarkMode ? styles.darkTieuDe : styles.lightTieuDe]}>
            {item.tieuDe}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.screen, isDarkMode ? styles.darkScreen : styles.lightScreen]}>
      {/* Thêm thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, isDarkMode ? styles.darkSearchInput : styles.lightSearchInput]}
          placeholder="Tìm kiếm món ăn..."
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      {/* Hiển thị món ăn tìm được */}
      {searchQuery.length > 0 && filteredMonAn.length > 0 && (
        <>
          <Text style={[styles.resultTitle, isDarkMode ? styles.darkResultTitle : styles.lightResultTitle]}>
            Kết quả tìm kiếm món ăn:
          </Text>
          <FlatList
            data={filteredMonAn}
            renderItem={renderMonAn}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.monAnList}
          />
        </>
      )}

      {/* Hiển thị danh mục tìm được */}
      {filteredDanhMuc.length > 0 && (
        <>
          <Text style={[styles.resultTitle, isDarkMode ? styles.darkResultTitle : styles.lightResultTitle]}>
            Danh mục liên quan:
          </Text>
          <FlatList
            data={filteredDanhMuc}
            renderItem={renderDanhMuc}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.flatListContainer}
          />
        </>
      )}

      {/* Hiển thị thông báo nếu không có kết quả tìm kiếm */}
      {searchQuery.length > 0 && filteredMonAn.length === 0 && filteredDanhMuc.length === 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={[styles.noResultsText, isDarkMode ? styles.darkNoResultsText : styles.lightNoResultsText]}>
            Không có kết quả nào.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 10,
  },
  lightScreen: {
    backgroundColor: '#e0f7fa', // Màu nền sáng của màn hình
  },
  darkScreen: {
    backgroundColor: '#333', // Màu nền tối của màn hình
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
  monAnContainer: {
    alignItems: 'center',
    margin: 5,
  },
  monAnHinhAnh: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  monAnTieuDe: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mucDanhMuc: {
    flex: 1,
    margin: 10,
    height: 150, // Tăng chiều cao để phù hợp với hình ảnh
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5, // Đổ bóng cho danh mục
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  lightMucDanhMuc: {
    backgroundColor: '#fff', // Màu nền của danh mục sáng
  },
  darkMucDanhMuc: {
    backgroundColor: '#444', // Màu nền tối của danh mục
  },
  noiDungDanhMuc: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
  },
  hinhAnh: {
    width: '100%',
    height: '70%', // Tùy chỉnh tỷ lệ hình ảnh
    borderRadius: 15,
  },
  hopChuaText: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15, // Đặt bo tròn cho nền văn bản
    position: 'absolute', // Đặt văn bản trên hình ảnh
    bottom: 0,
    width: '100%',
  },
  lightHopChuaText: {
    backgroundColor: '#f8f8f8', // Màu nền của văn bản sáng
  },
  darkHopChuaText: {
    backgroundColor: '#333', // Màu nền của văn bản tối
  },
  tieuDe: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lightTieuDe: {
    color: '#000', // Màu chữ sáng
  },
  darkTieuDe: {
    color: '#fff', // Màu chữ tối
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  lightResultTitle: {
    color: '#000',
  },
  darkResultTitle: {
    color: '#fff',
  },
  monAnList: {
    marginVertical: 10,
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
    color: '#000',
  },
  darkNoResultsText: {
    color: '#fff',
  },
});

export default ManHinhDanhMuc;
