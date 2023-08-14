// App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import FavoritesPage from './components/FavoritesPage';

function App() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const addToFavorites = (packageName: string, reason: string) => {
    if (!favorites.some((f) => f.packageName === packageName)) {
      const newFavorite = { packageName, reason };
      setFavorites([...favorites, newFavorite]);
    }
  };
  const editFavorites = (favorite: Favorite) => {
    const newFavorites = favorites.map(object => {
      if (object.packageName === favorite.packageName) {
          object.reason = favorite.reason;
      }
      return favorite
    })
    setFavorites([...newFavorites]);
  }

  const removeFromFavorites = (packageName: string) => {
    setFavorites(favorites.filter((f) => f.packageName !== packageName));
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route
            path="/"

            Component={(props: any) => (
              <HomePage
                {...props}
                addToFavorites={addToFavorites}
              />
            )}
          />
          <Route
            path="/favorites"

            Component={(props: any) => (
              <FavoritesPage
                {...props}
                favorites={favorites}
                editFavorites={editFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

interface Favorite {
  packageName: string;
  reason: string;
}
