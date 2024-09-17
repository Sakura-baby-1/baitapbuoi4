import React, { createContext, useState } from 'react';

// Tạo context yêu thích
export const FavoriteContext = createContext();

// Tạo provider cho context
export const FavoriteProvider = ({ children }) => {
  // State lưu danh sách món ăn yêu thích
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  // Thêm món ăn vào danh sách yêu thích
  const addFavorite = (meal) => {
    setFavoriteMeals((prevFavorites) => [...prevFavorites, meal]);
  };

  // Xóa món ăn khỏi danh sách yêu thích
  const removeFavorite = (id) => {
    setFavoriteMeals((prevFavorites) =>
      prevFavorites.filter((meal) => meal.id !== id)
    );
  };

  // Kiểm tra món ăn có nằm trong danh sách yêu thích không
  const isFavorite = (id) => favoriteMeals.some((meal) => meal.id === id);

  // Cung cấp context cho các component con
  return (
    <FavoriteContext.Provider value={{ 
      favoriteMeals, 
      addFavorite, 
      removeFavorite, 
      isFavorite 
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};
