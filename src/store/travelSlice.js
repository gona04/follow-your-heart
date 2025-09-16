import { createSlice } from '@reduxjs/toolkit';

// Complete travel preferences data
const travelData = {
  "Beach Paradise": {
    continents: ["Oceania", "Asia", "Europe", "North America", "Africa"],
    places: {
      "Oceania": [
        { name: "Australia", description: "World-class beaches along the Gold Coast and pristine coastlines" },
        { name: "Tahiti", description: "Crystal clear lagoons and overwater bungalows in French Polynesia" },
        { name: "French Polynesia", description: "Turquoise waters and white sand beaches" },
        { name: "Bora Bora", description: "Iconic overwater villas and stunning coral reefs" }
      ],
      "Asia": [
        { name: "Maldives", description: "Private island resorts with crystal-clear waters" },
        { name: "Thailand", description: "Beautiful beaches in Phuket and Koh Phi Phi" },
        { name: "Railay", description: "Dramatic limestone cliffs and secluded beaches" }
      ],
      "Europe": [
        { name: "Portugal", description: "Golden beaches along the Algarve coast" },
        { name: "Spain", description: "Mediterranean coastlines and Costa del Sol" }
      ],
      "North America": [
        { name: "Puerto Rico", description: "Caribbean beaches with rich culture" }
      ],
      "Africa": [
        { name: "Seychelles", description: "Pristine beaches with unique granite formations" }
      ]
    }
  },
  "Cultural Festivals": {
    continents: ["South America", "North America", "Oceania", "Asia"],
    places: {
      "South America": [
        { name: "Brazil", description: "Carnival celebrations and vibrant street festivals" }
      ],
      "North America": [
        { name: "Mexico", description: "Day of the Dead and traditional celebrations" },
        { name: "United States of America", description: "New Orleans Mardi Gras and cultural events" }
      ],
      "Oceania": [
        { name: "Papua New Guinea", description: "Traditional tribal festivals and ceremonies" }
      ],
      "Asia": [
        { name: "India", description: "Holi, Diwali, and countless regional festivals" },
        { name: "Mongolia", description: "Naadam festival with traditional sports" }
      ]
    }
  },
  "History": {
    continents: ["Europe", "Asia", "South America", "North America"],
    places: {
      "Europe": [
        { name: "Ireland", description: "Brú na Bóinne - ancient Neolithic monuments" },
        { name: "Belgium", description: "Flanders Fields - WWI historical sites" },
        { name: "Italy", description: "Pompeii - preserved ancient Roman city" }
      ],
      "Asia": [
        { name: "Turkey", description: "Gallipoli - significant WWI battleground" },
        { name: "Iran", description: "Persepolis - ancient Persian empire ruins" },
        { name: "Jordan", description: "Petra - ancient Nabataean city carved in stone" }
      ],
      "South America": [
        { name: "Peru", description: "Machu Picchu - ancient Inca citadel" }
      ],
      "North America": [
        { name: "Guatemala", description: "Tikal - ancient Maya civilization ruins" }
      ]
    }
  },
  "Food & Drink": {
    continents: ["Europe", "Asia"],
    places: {
      "Europe": [
        { name: "Czech Republic", description: "World-famous beer culture and traditional cuisine" },
        { name: "France", description: "Champagne region and world-class gastronomy" },
        { name: "Denmark", description: "Copenhagen's innovative Nordic cuisine" },
        { name: "Spain", description: "San Sebastián - Michelin-starred Basque cuisine" },
        { name: "Scotland", description: "Whisky distilleries and traditional fare" }
      ],
      "Asia": [
        { name: "Japan", description: "Sushi, ramen, and incredible food culture" },
        { name: "Malaysia", description: "Diverse street food and culinary traditions" },
        { name: "Turkey", description: "Rich Ottoman cuisine and coffee culture" },
        { name: "Vietnam", description: "Pho, banh mi, and vibrant street food scene" }
      ]
    }
  },
  "Adventure": {
    continents: ["North America", "Africa", "Europe", "Oceania"],
    places: {
      "North America": [
        { name: "Belize", description: "Blue Hole diving and jungle adventures" },
        { name: "Costa Rica", description: "Zip-lining, volcanos, and wildlife" }
      ],
      "Africa": [
        { name: "Egypt", description: "Red Sea diving and desert expeditions" },
        { name: "Botswana", description: "Chobe National Park safari adventures" }
      ],
      "Europe": [
        { name: "Italy", description: "Dolomites mountain climbing and hiking" },
        { name: "Switzerland", description: "Alpine adventures and extreme sports" },
        { name: "Slovenia", description: "Cave exploring and outdoor activities" },
        { name: "Andorra", description: "Pyrenees mountain adventures" }
      ],
      "Oceania": [
        { name: "New Zealand", description: "Bungee jumping and extreme sports capital" }
      ]
    }
  },
  "Natural Wonders": {
    continents: ["Asia", "North America", "Oceania", "South America", "Africa", "Europe"],
    places: {
      "Asia": [
        { name: "Turkey", description: "Cappadocia - unique rock formations and hot air balloons" },
        { name: "Israel", description: "Dead Sea - lowest point on Earth" },
        { name: "Russia", description: "Lake Baikal - world's deepest freshwater lake" },
        { name: "Nepal", description: "Mt Everest - world's highest peak" }
      ],
      "North America": [
        { name: "United States of America", description: "Grand Canyon - one of the world's natural wonders" }
      ],
      "Oceania": [
        { name: "Australia", description: "Great Barrier Reef - world's largest coral reef system" }
      ],
      "South America": [
        { name: "Argentina", description: "Iguazú Falls - spectacular waterfalls" },
        { name: "Venezuela", description: "Angel Falls - world's highest waterfall" }
      ],
      "Africa": [
        { name: "Tanzania", description: "Ngorongoro Crater - natural wildlife sanctuary" }
      ],
      "Europe": [
        { name: "Iceland", description: "Geysers, glaciers, and Northern Lights" }
      ]
    }
  }
};

const initialState = {
  selectedCategory: '',
  categories: Object.keys(travelData),
  travelData: travelData,
  availableContinents: [],
  hoveredContinent: '',
  selectedContinent: '',
  availablePlaces: [],
  isLoading: false
};

const travelSlice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      const category = action.payload;
      state.selectedCategory = category;
      
      if (category && state.travelData[category]) {
        state.availableContinents = state.travelData[category].continents;
      } else {
        state.availableContinents = [];
      }
      
      // Reset other selections when category changes
      state.selectedContinent = '';
      state.availablePlaces = [];
    },
    
    setHoveredContinent: (state, action) => {
      state.hoveredContinent = action.payload;
    },
    
    setSelectedContinent: (state, action) => {
      const continent = action.payload;
      state.selectedContinent = continent;
      
      if (state.selectedCategory && continent && state.travelData[state.selectedCategory]?.places[continent]) {
        state.availablePlaces = state.travelData[state.selectedCategory].places[continent];
      } else {
        state.availablePlaces = [];
      }
    },
    
    resetTravelState: (state) => {
      state.selectedCategory = '';
      state.availableContinents = [];
      state.hoveredContinent = '';
      state.selectedContinent = '';
      state.availablePlaces = [];
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const {
  setSelectedCategory,
  setHoveredContinent,
  setSelectedContinent,
  resetTravelState,
  setLoading
} = travelSlice.actions;

export default travelSlice.reducer;
