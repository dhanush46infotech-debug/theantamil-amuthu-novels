import Header from './components/Header';
import BackgroundVowels from './components/BackgroundVowels';
import NeonBannerCarousel from './components/NeonBannerCarousel';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import './App.scss';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="app min-h-screen bg-dark-bg">
          <BackgroundVowels />
          <Header />
          <main className="main-content pt-8">
            <NeonBannerCarousel />
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
