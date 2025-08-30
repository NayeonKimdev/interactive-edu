import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Paper } from '@mui/material';
import { PlayArrow as PlayIcon, School as SchoolIcon } from '@mui/icons-material';

interface LearningCard {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  difficulty: string;
  description?: string;
  tags?: string[];
  learningObjectives?: string[];
  estimatedTime?: number;
  prerequisites?: string[];
}

interface CardGalleryProps {
  onCardClick: (cardId: string) => void;
}

const CardGallery: React.FC<CardGalleryProps> = ({ onCardClick }) => {
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    console.log('Cards state updated:', cards);
  }, [cards]);

  const fetchCards = async () => {
    try {
      console.log('Fetching cards from backend...');
      const response = await fetch('http://localhost:5000/api/cards');
      const data = await response.json();
      console.log('Backend response:', data);
      setCards(data.cards || []);
    } catch (error) {
      console.error('Failed to load cards:', error);
      console.log('Using fallback data instead');
      
      // 폴백 데이터
      const fallbackCards = [
        {
          id: 'math-quadratic-function-complete-001',
          title: 'Quadratic Function (이차함수)',
          category: 'math',
          subcategory: 'algebra',
          difficulty: 'intermediate',
          description: 'Comprehensive learning experience for quadratic functions f(x) = ax² + bx + c. Learn about graphs, zeros, y-intercepts, vertex, vertex form transformation, and discriminant analysis with interactive visualization.'
        },
        {
          id: 'math-inequalities-001',
          title: '부등식의 이해와 해결',
          category: 'math',
          subcategory: 'algebra',
          difficulty: 'intermediate',
          description: '일차 부등식과 이차 부등식을 해결하고, 수직선상 범위와 사분면에서의 영역을 시각화하는 학습 카드입니다.'
        },
        {
          id: 'math-exponential-logarithmic-001',
          title: '지수함수와 로그함수',
          category: 'math',
          subcategory: 'calculus',
          difficulty: 'intermediate',
          description: '지수함수와 로그함수의 성질을 이해하고, 관련 방정식을 해결하는 학습 카드입니다. 두 함수의 역함수 관계를 파악하여 수학적 사고력을 향상시킬 수 있습니다.'
        }
      ];
      
      setCards(fallbackCards);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (cardId: string) => {
    console.log('Card clicked:', cardId);
    onCardClick(cardId);
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="400px"
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: 3,
          p: 4
        }}
      >
        <Typography variant="h6" sx={{ color: '#666' }}>
          ✨ Loading amazing learning cards...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      borderRadius: 3
    }}>
      {/* Header Section */}
      <Paper 
        elevation={4} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 4,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          🎯 Learning Card Gallery
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 300 }}>
          Experience concepts through interactive learning cards
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
          총 {cards.length}개의 학습 카드가 있습니다
        </Typography>
      </Paper>
      
      {/* Cards Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 4 
      }}>
        {cards.map((card) => (
          <Box key={card.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
                border: '2px solid #e3f2fd',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transform: 'translateY(-8px)',
                  borderColor: '#1976d2'
                }
              }}
              onClick={() => handleCardClick(card.id)}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box display="flex" alignItems="center" mb={3}>
                  <Box sx={{ 
                    p: 1.5, 
                    bgcolor: '#e3f2fd', 
                    borderRadius: 2,
                    mr: 2,
                    border: '2px solid #bbdefb'
                  }}>
                    <SchoolIcon sx={{ color: '#1976d2', fontSize: 28 }} />
                  </Box>
                  <Typography variant="h5" component="h2" sx={{ 
                    fontWeight: 'bold',
                    color: '#1976d2',
                    lineHeight: 1.2
                  }}>
                    {card.title}
                  </Typography>
                </Box>
                
                <Typography variant="body1" color="text.secondary" sx={{ 
                  mb: 3, 
                  lineHeight: 1.6,
                  color: '#555'
                }}>
                  {card.description || 'No detailed description available.'}
                </Typography>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" sx={{ 
                    color: '#1976d2',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}>
                    {card.category} / {card.subcategory}
                  </Typography>
                  <Box sx={{ 
                    px: 2, 
                    py: 1, 
                    bgcolor: '#e8f5e8', 
                    color: '#2e7d32',
                    borderRadius: 2,
                    border: '2px solid #c8e6c9',
                    fontWeight: 'bold',
                    fontSize: '0.8rem'
                  }}>
                    {card.difficulty}
                  </Box>
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button 
                  fullWidth
                  variant="contained" 
                  startIcon={<PlayIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(card.id);
                  }}
                  sx={{ 
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  🚀 Start Learning
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CardGallery;
