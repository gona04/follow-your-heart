import React, { Suspense } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import StartPage from './pages/start-page/start-page.component'
import Maps from './pages/maps/maps.component'

// Lazy load components for better initial performance
const HomePage = React.lazy(() => import('./pages/home-page/home-page.component'))
const BrainstormingDreamTravel = React.lazy(() => import('./pages/brainstorming-dream-travel/brainstorming-dream-travel.component'))

// Loading component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px' 
  }}>
    <div className="loading-skeleton" style={{ 
      width: '200px', 
      height: '20px', 
      borderRadius: '4px' 
    }}></div>
  </div>
)

function App() {
  return (
    <>      
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path='/maps' element={<Maps/>}/>
          <Route path="/brainstorming-dream-travel" element={<BrainstormingDreamTravel />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
