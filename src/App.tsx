// App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import JoinUsPage from './pages/JoinUsPage';
import SignInPage from './pages/SignInPage';
import AboutUsPage from './pages/AboutUsPage';
import BestSpotsPage from './pages/BestSpotsPage';
import ReviewsPage from './pages/ReviewsPage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import VerifyPage from './pages/VerifyPage';
import VerifyNoticePage from "./pages/VerifyNoticePage";
import AiMikePage from './pages/AiMikePage';
import GoToEmailPage from "./pages/GoToEmailPage";


import { citySpots, cities } from './data/citySpots';

interface RunningSpot {
  id: number;
  name: string;
  distance: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  terrain: string;
  rating: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  image: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState('New York');
  const [selectedCity, setSelectedCity] = useState('Amsterdam');
  const [errorMessage, setErrorMessage] = useState("");
  const [errorTriggered, setErrorTriggered] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ping`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => console.log("Respuesta del backend:", data))
      .catch(err => console.error("Error al conectar:", err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setUserLocation('New York'),
        () => console.log('Location access denied')
      );
    }
  }, []);

  const currentSpots = citySpots[selectedCity] || citySpots['New York'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleProtectedNavigation = (path: string, navigate: Function) => {
    const token = localStorage.getItem("token");
    if (token) {
      setErrorTriggered(true);
      setErrorMessage(`Your session is already active|${Date.now()}`);
    } else {
      setErrorTriggered(false);
      setErrorMessage("");
      navigate(path);
    }
  };

  const HomeWrapper = () => {
    const navigate = useNavigate();
    return (
      <HomePage
        setCurrentPage={() => {}}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        errorMessage={errorMessage}
        errorTriggered={errorTriggered}
        resetErrorTrigger={() => setErrorTriggered(false)}
        onJoinUsClick={() => handleProtectedNavigation("/joinus", navigate)}
        onSignInClick={() => handleProtectedNavigation("/signin", navigate)}
      />
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeWrapper />} />
        <Route path="/ai-mike" element={<AiMikePage />} />
        <Route path="/verify-notice" element={<VerifyNoticePage />} />
        <Route path="/verify/success" element={<VerifyNoticePage type="success" />} />
        <Route path="/verify/error" element={<VerifyNoticePage type="error" />} />
        <Route path="/reviews" element={<ReviewsPage setCurrentPage={() => {}} />} />
        <Route path="/events" element={<EventsPage setCurrentPage={() => {}} />} />
        <Route path="/joinus" element={<JoinUsPage setCurrentPage={() => {}} />} />
        <Route path="/signin" element={<SignInPage setCurrentPage={() => {}} />} />
        <Route path="/about" element={<AboutUsPage setCurrentPage={() => {}} />} />
        <Route path="/goto-email" element={<GoToEmailPage />} />
        <Route path="/best-spots" element={
          <BestSpotsPage
            setCurrentPage={() => {}}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
            currentSpots={currentSpots}
            getDifficultyColor={getDifficultyColor}
          />
        } />
        <Route path="/verify/:token" element={<VerifyPage onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
}

export default App;
