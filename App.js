import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MealsNavigator from './navigation/MealsNavigator'; // Đảm bảo rằng bạn đã thiết lập MealsNavigator
import { ThemeProvider } from './context/ThemeContext'; // Đảm bảo tên và đường dẫn đúng
import { FavoriteProvider } from './context/FavoriteContext'; // Đảm bảo rằng bạn đã thiết lập FavoriteContext
import { LanguageProvider } from './context/LanguageContext'; // Đảm bảo đường dẫn chính xác

export default function App() {
  return (
    <ThemeProvider>
      <FavoriteProvider>
        <LanguageProvider>
          <NavigationContainer>
            <MealsNavigator />
          </NavigationContainer>
        </LanguageProvider>
      </FavoriteProvider>
    </ThemeProvider>
  );
}
