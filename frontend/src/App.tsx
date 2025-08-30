import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Button, Box } from '@mui/material';
import Header from './components/common/Header';
import CardGallery from './components/gallery/CardGallery';
import QuadraticFunction from './components/interactive/QuadraticFormula';
import LinearFunction from './components/interactive/LinearFunction';
import Inequalities from './components/interactive/Inequalities';
import ExponentialLogarithmic from './components/interactive/ExponentialLogarithmic';
import DomainRange from './components/interactive/DomainRange';

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
    },
    secondary: {
      main: '#FF9800',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const [currentView, setCurrentView] = useState<'gallery' | 'quadratic-formula' | 'linear-function' | 'inequalities' | 'exponential-logarithmic' | 'domain-range'>('gallery');
  const [selectedCardId, setSelectedCardId] = useState<string>('');

  const handleCardClick = (cardId: string) => {
    if (cardId === 'math-quadratic-function-complete-001') {
      setSelectedCardId(cardId);
      setCurrentView('quadratic-formula');
    } else if (cardId === 'math-linear-function-001') {
      setSelectedCardId(cardId);
      setCurrentView('linear-function');
    } else if (cardId === 'math-inequalities-001') {
      setSelectedCardId(cardId);
      setCurrentView('inequalities');
    } else if (cardId === 'math-exponential-logarithmic-001') {
      setSelectedCardId(cardId);
      setCurrentView('exponential-logarithmic');
    } else if (cardId === 'math-domain-range-001') {
      setSelectedCardId(cardId);
      setCurrentView('domain-range');
    }
  };

  const handleBackToGallery = () => {
    setCurrentView('gallery');
    setSelectedCardId('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {currentView === 'gallery' ? (
            <CardGallery onCardClick={handleCardClick} />
          ) : (
            <Box>
              <Button 
                variant="outlined" 
                onClick={handleBackToGallery}
                sx={{ mb: 3 }}
              >
                ← Back to Gallery
              </Button>
              {currentView === 'quadratic-formula' && (
                <QuadraticFunction cardId={selectedCardId} />
              )}
              {currentView === 'linear-function' && (
                <LinearFunction cardId={selectedCardId} />
              )}
              {currentView === 'inequalities' && (
                <Inequalities cardId={selectedCardId} />
              )}
              {currentView === 'exponential-logarithmic' && (
                <ExponentialLogarithmic cardId={selectedCardId} />
              )}
              {currentView === 'domain-range' && (
                <DomainRange cardId={selectedCardId} />
              )}
            </Box>
          )}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
