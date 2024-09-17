import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext'; // Đảm bảo đường dẫn chính xác
import { useLanguage } from '../context/LanguageContext'; // Đảm bảo đường dẫn chính xác

function ManHinhCaiDat() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

  const showPrivacyPolicy = () => {
    Alert.alert(
      "Chính Sách Quyền Riêng Tư",
      "Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Dưới đây là các thông tin quan trọng về cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu cá nhân của bạn:\n\n" +
      "1. **Thu Thập Dữ Liệu:** Chúng tôi thu thập thông tin cá nhân mà bạn cung cấp khi sử dụng ứng dụng, bao gồm tên, email và thông tin liên hệ khác.\n\n" +
      "2. **Sử Dụng Dữ Liệu:** Dữ liệu của bạn được sử dụng để cải thiện trải nghiệm của bạn trên ứng dụng, gửi thông báo quan trọng và cung cấp hỗ trợ khách hàng.\n\n" +
      "3. **Bảo Vệ Dữ Liệu:** Chúng tôi áp dụng các biện pháp bảo mật hợp lý để bảo vệ dữ liệu cá nhân của bạn khỏi truy cập trái phép và lạm dụng.\n\n" +
      "4. **Chia Sẻ Dữ Liệu:** Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba mà không có sự đồng ý của bạn, trừ khi yêu cầu của pháp luật hoặc quy định liên quan.\n\n" +

      [
        { text: "Đóng", style: "cancel" }
      ]
    );
  };
  
  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Đăng xuất", onPress: () => { /* Xử lý đăng xuất */ } }
      ]
    );
  };

  return (
    <View style={[styles.screen, isDarkMode ? styles.darkBackground : styles.lightBackground]}>
      <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>
        Cài Đặt
      </Text>

      <View style={[styles.option, isDarkMode ? styles.darkOption : styles.lightOption]}>
        <View style={styles.optionContent}>
          <Icon name="notifications-outline" size={24} color={isDarkMode ? '#fff' : '#333'} style={styles.icon} />
          <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>Thông báo</Text>
        </View>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      <View style={[styles.option, isDarkMode ? styles.darkOption : styles.lightOption]}>
        <View style={styles.optionContent}>
          <Icon name="moon-outline" size={24} color={isDarkMode ? '#fff' : '#333'} style={styles.icon} />
          <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>Chế độ tối</Text>
        </View>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <View style={[styles.option, isDarkMode ? styles.darkOption : styles.lightOption]}>
        <View style={styles.optionContent}>
          <Icon name="language-outline" size={24} color={isDarkMode ? '#fff' : '#333'} style={styles.icon} />
          <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>Ngôn ngữ</Text>
        </View>
        <TouchableOpacity onPress={toggleLanguage}>
          <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>{language}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.option, isDarkMode ? styles.darkOption : styles.lightOption]}>
        <View style={styles.optionContent}>
          <Icon name="shield-outline" size={24} color={isDarkMode ? '#fff' : '#333'} style={styles.icon} />
          <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>Chính sách quyền riêng tư</Text>
        </View>
        <TouchableOpacity onPress={showPrivacyPolicy}>
          <Text style={[styles.optionText, isDarkMode ? styles.darkText : styles.lightText]}>Xem</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.logoutButton, isDarkMode ? styles.darkButton : styles.lightButton]} onPress={handleLogout}>
        <Text style={[styles.logoutText, isDarkMode ? styles.darkButtonText : styles.lightButtonText]}>Đăng xuất</Text>
      </TouchableOpacity>

      <Text style={[styles.footerText, isDarkMode ? styles.darkFooterText : styles.lightFooterText]}>
        Cài đặt khác sẽ sớm được bổ sung...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  lightBackground: {
    backgroundColor: '#e0f7fa',
  },
  darkBackground: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  lightTitle: {
    color: '#00796b',
  },
  darkTitle: {
    color: '#fff',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  lightOption: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  darkOption: {
    backgroundColor: '#444',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 18,
  },
  lightText: {
    color: '#555555',
  },
  darkText: {
    color: '#fff',
  },
  footerText: {
    marginTop: 40,
    fontSize: 16,
    textAlign: 'center',
  },
  lightFooterText: {
    color: '#00796b',
  },
  darkFooterText: {
    color: '#ddd',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  lightButton: {
    backgroundColor: '#ff7043',
  },
  darkButton: {
    backgroundColor: '#d32f2f',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightButtonText: {
    color: '#fff',
  },
  darkButtonText: {
    color: '#fff',
  },
});

export default ManHinhCaiDat;
