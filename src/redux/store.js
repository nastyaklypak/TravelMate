import { configureStore } from '@reduxjs/toolkit';
import trips from './tripsSlice';
import favorites from './favoritesSlice';
export default configureStore({ reducer: { trips, favorites } });
