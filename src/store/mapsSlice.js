import { createSlice } from '@reduxjs/toolkit';

// Complete travel preferences data structure
const travelPreferences = {
  "Beach Paradise": {
    "list_of_places": [
      "Australia", "Maldives", "Portugal", "Puerto Rico", "Seychelles", 
      "Spain", "Tahiti", "French Polynesia", "Bora Bora", "Thailand", "Railay"
    ],
    "list_of_continents": ["Oceania", "Asia", "Europe", "North America", "Africa"]
  },
  "Cultural Festivals": {
    "list_of_places": [
      "Brazil", "Mexico", "Papua New Guinea", "India", "Mongolia", 
      "New Orleans", "United States of America"
    ],
    "list_of_continents": ["South America", "North America", "Oceania", "Asia"]
  },
  "History": {
    "list_of_places": [
      "Brú na Bóinne", "Ireland", "Flanders Fields", "Belgium", "Gallipoli", 
      "Turkey", "Machu Picchu", "Peru", "Persepolis", "Iran", "Petra", 
      "Jordan", "Pompeii", "Italy", "Tikal", "Guatemala"
    ],
    "list_of_continents": ["Europe", "Asia", "South America", "North America"]
  },
  "Food & Drink": {
    "list_of_places": [
      "Czech Republic", "Champagne", "France", "Copenhagen", "Denmark", 
      "Japan", "Malaysia", "San Sebastián", "Spain", "Turkey", "Vietnam", "Scotland"
    ],
    "list_of_continents": ["Europe", "Asia"]
  },
  "Adventure": {
    "list_of_places": [
      "Blue Hole", "Belize", "Red Sea", "Egypt", "Dolomites", "Italy", 
      "New Zealand", "Switzerland", "Slovenia", "Chobe National Park", 
      "Botswana", "Andorra", "Costa Rica"
    ],
    "list_of_continents": ["North America", "Africa", "Europe", "Oceania"]
  },
  "Natural Wonders": {
    "list_of_places": [
      "Cappadocia", "Turkey", "Dead Sea", "Israel", "Palestinian Territories", 
      "Grand Canyon", "United States of America", "Great Barrier Reef", "Australia", 
      "Queensland", "Iguazú Falls", "Argentina", "Lake Baikal", "Russia", 
      "Mt Everest", "Nepal", "Tibet", "Ngorongoro Crater", "Tanzania", "Iceland", 
      "Salto Ángel", "Angel Falls", "Auyantepui", "Venezuela"
    ],
    "list_of_continents": ["Asia", "North America", "Oceania", "South America", "Africa", "Europe"]
  },
  "Man-Made Wonders": {
    "list_of_places": [
      "Acropolis", "Greece", "Stonehenge", "England", "Pyramids of Giza", "Egypt", 
      "Taj Mahal", "India", "Great Wall", "China", "Eiffel Tower", "France", 
      "La Sagrada Família", "Spain", "Barcelona", "Temples of Angkor", "Cambodia"
    ],
    "list_of_continents": ["Europe", "Africa", "Asia"]
  }
};

// Continent to places mapping for filtering
const continentPlacesMapping = {
  "Africa": {
    "Beach Paradise": ["Seychelles"],
    "Cultural Festivals": [],
    "History": [],
    "Food & Drink": [],
    "Adventure": ["Egypt", "Botswana"],
    "Natural Wonders": ["Tanzania"],
    "Man-Made Wonders": ["Egypt"]
  },
  "Asia": {
    "Beach Paradise": ["Maldives", "Thailand", "Railay"],
    "Cultural Festivals": ["India", "Mongolia"],
    "History": ["Turkey", "Iran", "Jordan"],
    "Food & Drink": ["Japan", "Malaysia", "Turkey", "Vietnam"],
    "Adventure": [],
    "Natural Wonders": ["Turkey", "Israel", "Palestinian Territories", "Russia", "Nepal", "Tibet"],
    "Man-Made Wonders": ["India", "China", "Cambodia"]
  },
  "Europe": {
    "Beach Paradise": ["Portugal", "Spain"],
    "Cultural Festivals": [],
    "History": ["Ireland", "Belgium", "Italy"],
    "Food & Drink": ["Czech Republic", "France", "Denmark", "Spain", "Scotland"],
    "Adventure": ["Italy", "Switzerland", "Slovenia", "Andorra"],
    "Natural Wonders": ["Iceland"],
    "Man-Made Wonders": ["Greece", "England", "France", "Spain"]
  },
  "North America": {
    "Beach Paradise": ["Puerto Rico"],
    "Cultural Festivals": ["Mexico", "United States of America"],
    "History": ["Guatemala"],
    "Food & Drink": [],
    "Adventure": ["Belize", "Costa Rica"],
    "Natural Wonders": ["United States of America"],
    "Man-Made Wonders": []
  },
  "South America": {
    "Beach Paradise": [],
    "Cultural Festivals": ["Brazil"],
    "History": ["Peru"],
    "Food & Drink": [],
    "Adventure": [],
    "Natural Wonders": ["Argentina", "Venezuela"],
    "Man-Made Wonders": []
  },
  "Oceania": {
    "Beach Paradise": ["Australia", "Tahiti", "French Polynesia", "Bora Bora"],
    "Cultural Festivals": ["Papua New Guinea"],
    "History": [],
    "Food & Drink": [],
    "Adventure": ["New Zealand"],
    "Natural Wonders": ["Australia", "Queensland"],
    "Man-Made Wonders": []
  }
};

const initialState = {
  selectedInterest: '',
  interests: Object.keys(travelPreferences),
  preferences: travelPreferences,
  continentPlacesMapping: continentPlacesMapping,
  hoveredContinent: '',
  selectedContinent: '',
  availableContinents: [],
  availablePlaces: []
};

const mapsSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    setSelectedInterest: (state, action) => {
      state.selectedInterest = action.payload;
      // Update available continents based on selected interest
      if (action.payload && state.preferences[action.payload]) {
        state.availableContinents = state.preferences[action.payload].list_of_continents;
      } else {
        state.availableContinents = [];
      }
    },
    setHoveredContinent: (state, action) => {
      state.hoveredContinent = action.payload;
    },
    setSelectedContinent: (state, action) => {
      state.selectedContinent = action.payload;
      // Update available places based on selected interest and continent
      if (state.selectedInterest && action.payload) {
        state.availablePlaces = state.continentPlacesMapping[action.payload]?.[state.selectedInterest] || [];
      } else {
        state.availablePlaces = [];
      }
    },
    resetMapsState: (state) => {
      state.selectedInterest = '';
      state.hoveredContinent = '';
      state.selectedContinent = '';
      state.availableContinents = [];
      state.availablePlaces = [];
    }
  }
});

export const { 
  setSelectedInterest, 
  setHoveredContinent, 
  setSelectedContinent, 
  resetMapsState 
} = mapsSlice.actions;

export default mapsSlice.reducer;
