import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ManHinhDanhMuc from '../screens/CategoriesScreen';
import ChiTietMonAn from '../screens/ChiTietMonAn';
import ManHinhYeuThich from '../screens/Yeuthich';
import ManHinhCaiDat from '../screens/caidat';
import { FavoriteProvider } from '../context/FavoriteContext';

// Stack Navigator cho các món ăn
const MealsStack = createStackNavigator();

const MealsStackNavigator = () => (
  <MealsStack.Navigator initialRouteName="CategoriesScreen">
    <MealsStack.Screen
      name="CategoriesScreen"
      component={ManHinhDanhMuc}
      options={{ title: 'Danh Mục Món Ăn' }}
    />
    <MealsStack.Screen
      name="ChiTietMonAn"
      component={ChiTietMonAn}
      options={{ title: 'Chi Tiết Món Ăn' }}
    />
  </MealsStack.Navigator>
);

// Hàm lấy biểu tượng cho tab
const getTabIcon = (route, color, size) => {
  const icons = {
    Categories: 'list-outline',
    Favorites: 'heart-outline',
    Settings: 'settings-outline',
  };
  return <Ionicons name={icons[route.name] || 'home-outline'} size={size} color={color} />;
};

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => getTabIcon(route, color, size),
  })}>
    <Tab.Screen name="Categories" component={MealsStackNavigator} options={{ title: 'Danh Mục' }} />
    <Tab.Screen name="Favorites" component={ManHinhYeuThich} options={{ title: 'Yêu Thích' }} />
    <Tab.Screen name="Settings" component={ManHinhCaiDat} options={{ title: 'Cài Đặt' }} />
  </Tab.Navigator>
);

// Drawer Navigator
const Drawer = createDrawerNavigator();

const MealsNavigator = () => (
  <FavoriteProvider>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={BottomTabNavigator} options={{ title: 'Trang Chủ' }} />
      <Drawer.Screen name="Favorites" component={ManHinhYeuThich} options={{ title: 'Món Ăn Yêu Thích' }} />
      <Drawer.Screen name="Settings" component={ManHinhCaiDat} options={{ title: 'Cài Đặt' }} />
    </Drawer.Navigator>
  </FavoriteProvider>
);

export default MealsNavigator;
