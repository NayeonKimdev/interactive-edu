import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Paper,
  Chip,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { 
  ExpandMore as ExpandMoreIcon, 
   
  Calculate as CalculateIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';
import LinearGraph from './LinearGraph';

// MathJax global type declaration
declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>;
    };
  }
}

interface LinearFunctionProps {
  cardId: string;
}

interface FunctionProperties {
  standardForm: string;
  slope: number;
  yIntercept: number;
  xIntercept: number | null;
  xInterceptDesc: string;
  slopeDesc: string;
  slopeType: string;
  specialCases: string[];
  domain: string;
  range: string;
}

const LinearFunction: React.FC<LinearFunctionProps> = ({ cardId }) => {
  const [coefficients, setCoefficients] = useState({
    m: 2,
    b: 3
  });

  const [properties, setProperties] = useState<FunctionProperties>({
    standardForm: '',
    slope: 0,
    yIntercept: 0,
    xIntercept: null,
    xInterceptDesc: '',
    slopeDesc: '',
    slopeType: '',
    specialCases: [],
    domain: '',
    range: ''
  });

  // Calculate all linear function properties
  const calculateProperties = (m: number, b: number) => {
    // Standard form
    const standardForm = `f(x) = ${m}x ${b >= 0 ? '+' : ''}${b}`;

    // Slope analysis
    let slopeDesc = '';
    let slopeType = '';
    if (m > 0) {
      slopeDesc = 'Positive slope (increasing function)';
      slopeType = 'increasing';
    } else if (m < 0) {
      slopeDesc = 'Negative slope (decreasing function)';
      slopeType = 'decreasing';
    } else {
      slopeDesc = 'Zero slope (constant function)';
      slopeType = 'constant';
    }

    // X-intercept calculation
    let xIntercept: number | null = null;
    let xInterceptDesc = '';
    if (m !== 0) {
      xIntercept = -b / m;
      xInterceptDesc = `x = ${xIntercept.toFixed(4)}`;
    } else {
      xInterceptDesc = 'No x-intercept (horizontal line)';
    }

    // Special cases
    const specialCases: string[] = [];
    if (m === 0) {
      specialCases.push('Constant function (horizontal line)');
    }
    if (m === 1 && b === 0) {
      specialCases.push('Identity function (y = x)');
    }
    if (m === -1 && b === 0) {
      specialCases.push('Negative identity function (y = -x)');
    }
    if (b === 0) {
      specialCases.push('Direct proportion (passes through origin)');
    }

    setProperties({
      standardForm,
      slope: m,
      yIntercept: b,
      xIntercept,
      xInterceptDesc,
      slopeDesc,
      slopeType,
      specialCases,
      domain: '(-∞, ∞)',
      range: '(-∞, ∞)'
    });
  };

  // Real-time calculation when coefficients change
  useEffect(() => {
    calculateProperties(coefficients.m, coefficients.b);
  }, [coefficients]);

  // Force MathJax re-render when coefficients change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.MathJax) {
        window.MathJax.typesetPromise && window.MathJax.typesetPromise();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [coefficients]);

  const handleCoefficientChange = (coeff: 'm' | 'b', value: number) => {
    setCoefficients(prev => ({
      ...prev,
      [coeff]: value
    }));
  };

  const handleTextFieldChange = (coeff: 'm' | 'b', value: string) => {
    const numValue = parseFloat(value) || 0;
    handleCoefficientChange(coeff, numValue);
  };

  const getSlopeIcon = (slope: number) => {
    if (slope > 0) return <TrendingUpIcon sx={{ color: '#27ae60' }} />;
    if (slope < 0) return <TrendingDownIcon sx={{ color: '#e74c3c' }} />;
    return <RemoveIcon sx={{ color: '#f39c12' }} />;
  };

  const getSlopeColor = (slope: number) => {
    if (slope > 0) return '#27ae60';
    if (slope < 0) return '#e74c3c';
    return '#f39c12';
  };

  const resetCoefficients = () => {
    setCoefficients({ m: 2, b: 3 });
  };

  const presetExamples = [
    { m: 1, b: 0, name: 'Identity Function', desc: 'y = x' },
    { m: -1, b: 0, name: 'Negative Identity', desc: 'y = -x' },
    { m: 0, b: 4, name: 'Constant Function', desc: 'y = 4' },
    { m: 2, b: 0, name: 'Direct Proportion', desc: 'y = 2x' },
    { m: 0.5, b: -2, name: 'Gentle Slope', desc: 'y = 0.5x - 2' },
    { m: -3, b: 5, name: 'Steep Negative', desc: 'y = -3x + 5' }
  ];

  return (
    <MathJaxContext config={{
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true,
        packages: ['base', 'ams', 'noerrors', 'noundefined']
      },
      options: {
        enableMenu: false,
        menuOptions: {
          settings: {
            texHints: true,
            semantics: false,
            zoom: 'NoZoom',
            zoomScale: 1
          }
        }
      }
    }}>
      <Box sx={{ 
        p: 3, 
        maxWidth: 1400, 
        mx: 'auto',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh'
      }}>
        {/* Header Section */}
        <Paper 
          elevation={6} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textAlign: 'center',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ 
            fontWeight: 800, 
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            letterSpacing: '0.5px'
          }}>
            📊 Linear Function (일차함수)
          </Typography>
          
          <Typography variant="h6" sx={{ 
            opacity: 0.95, 
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.3px'
          }}>
            Comprehensive learning experience for linear functions f(x) = mx + b
          </Typography>
        </Paper>

        {/* Graph Section */}
        <Box sx={{ mb: 4 }}>
          <LinearGraph m={coefficients.m} b={coefficients.b} />
        </Box>

        {/* Main Content Layout */}
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
          {/* Left Column - Interactive Controls */}
          <Box sx={{ flex: { xs: '1', lg: '0 0 400px' } }}>
            <Card elevation={6} sx={{ 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
              border: '3px solid #e3f2fd',
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)',
              mb: 3
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  justifyContent: 'center'
                }}>
                  <CalculateIcon sx={{ mr: 2, color: '#1976d2', fontSize: 28 }} />
                  <Typography variant="h5" sx={{ 
                    color: '#1976d2', 
                    fontWeight: 700,
                    textAlign: 'center',
                    letterSpacing: '0.5px'
                  }}>
                    🎛️ Adjust Coefficients
                  </Typography>
                </Box>

                {/* Coefficient m (slope) */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    {getSlopeIcon(coefficients.m)}
                    <Typography variant="h6" sx={{ 
                      fontWeight: 700, 
                      color: getSlopeColor(coefficients.m),
                      ml: 1,
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Slope (m)
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <TextField
                      type="number"
                      value={coefficients.m}
                      onChange={(e) => handleTextFieldChange('m', e.target.value)}
                      size="small"
                      sx={{ 
                        width: '100px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: getSlopeColor(coefficients.m),
                            borderWidth: 2,
                          },
                          '&:hover fieldset': {
                            borderColor: getSlopeColor(coefficients.m),
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: getSlopeColor(coefficients.m),
                          },
                        },
                      }}
                      variant="outlined"
                      inputProps={{ 
                        step: 0.1,
                        min: -5,
                        max: 5
                      }}
                    />
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: getSlopeColor(coefficients.m),
                      minWidth: '60px'
                    }}>
                      {coefficients.m}
                    </Typography>
                  </Box>
                  
                  <Slider
                    value={coefficients.m}
                    onChange={(_, value) => handleCoefficientChange('m', value as number)}
                    min={-5}
                    max={5}
                    step={0.1}
                    marks={[
                      { value: -5, label: '-5' },
                      { value: 0, label: '0' },
                      { value: 5, label: '5' }
                    ]}
                    sx={{
                      '& .MuiSlider-thumb': {
                        backgroundColor: getSlopeColor(coefficients.m),
                        width: 20,
                        height: 20,
                        boxShadow: `0 4px 8px ${getSlopeColor(coefficients.m)}40`,
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: getSlopeColor(coefficients.m),
                        height: 6,
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#e3f2fd',
                        height: 6,
                      }
                    }}
                  />
                </Box>

                {/* Coefficient b (y-intercept) */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 700, 
                    color: '#ff9800',
                    mb: 2,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Y-intercept (b)
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <TextField
                      type="number"
                      value={coefficients.b}
                      onChange={(e) => handleTextFieldChange('b', e.target.value)}
                      size="small"
                      sx={{ 
                        width: '100px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#ff9800',
                            borderWidth: 2,
                          },
                          '&:hover fieldset': {
                            borderColor: '#f57c00',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#ff9800',
                          },
                        },
                      }}
                      variant="outlined"
                      inputProps={{ 
                        step: 0.1,
                        min: -10,
                        max: 10
                      }}
                    />
                    <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: '#ff9800',
                      minWidth: '60px'
                    }}>
                      {coefficients.b}
                    </Typography>
                  </Box>
                  
                  <Slider
                    value={coefficients.b}
                    onChange={(_, value) => handleCoefficientChange('b', value as number)}
                    min={-10}
                    max={10}
                    step={0.1}
                    marks={[
                      { value: -10, label: '-10' },
                      { value: 0, label: '0' },
                      { value: 10, label: '10' }
                    ]}
                    sx={{
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#ff9800',
                        width: 20,
                        height: 20,
                        boxShadow: '0 4px 8px rgba(255, 152, 0, 0.3)',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#ff9800',
                        height: 6,
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#fff3e0',
                        height: 6,
                      }
                    }}
                  />
                </Box>

                <Button 
                  variant="contained" 
                  onClick={resetCoefficients}
                  fullWidth
                  sx={{ 
                    mt: 3,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)',
                    boxShadow: '0 4px 15px rgba(255, 107, 157, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e55a8c 0%, #b03a5a 100%)',
                      boxShadow: '0 6px 20px rgba(255, 107, 157, 0.6)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  🔄 Reset to Default
                </Button>
              </CardContent>
            </Card>

            {/* Preset Examples */}
            <Card elevation={6} sx={{ 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
              border: '3px solid #4caf50',
              boxShadow: '0 8px 32px rgba(76, 175, 80, 0.15)',
              mb: 3
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ 
                  color: '#4caf50', 
                  fontWeight: 700,
                  textAlign: 'center',
                  mb: 3,
                  letterSpacing: '0.5px'
                }}>
                  🎯 Preset Examples
                </Typography>
                
                                 <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                   {presetExamples.map((example, index) => (
                     <Box key={index}>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => setCoefficients({ m: example.m, b: example.b })}
                        sx={{
                          py: 1.5,
                          borderColor: '#4caf50',
                          color: '#4caf50',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#388e3c',
                            backgroundColor: '#4caf5010',
                            transform: 'translateY(-1px)'
                          }
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {example.name}
                          </Typography>
                          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                            {example.desc}
                          </Typography>
                                                 </Box>
                       </Button>
                     </Box>
                   ))}
                 </Box>
              </CardContent>
            </Card>

            {/* Intercepts Card */}
            <Card elevation={6} sx={{ 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
              border: '3px solid #9c27b0',
              boxShadow: '0 8px 32px rgba(156, 39, 176, 0.15)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ 
                  color: '#9c27b0', 
                  fontWeight: 700,
                  textAlign: 'center',
                  mb: 3,
                  letterSpacing: '0.5px'
                }}>
                  🎯 Intercepts
                </Typography>
                
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f3e5f5', border: '2px solid #9c27b0' }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#9c27b0', mb: 1 }}>
                      Y-intercept:
                    </Typography>
                    <Chip 
                      label={`(0, ${properties.yIntercept})`}
                      variant="filled"
                      sx={{ 
                        fontWeight: 700,
                        fontSize: '1rem',
                        backgroundColor: '#9c27b0',
                        color: 'white'
                      }}
                    />
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#9c27b0', mb: 1 }}>
                      X-intercept:
                    </Typography>
                    <Chip 
                      label={properties.xInterceptDesc}
                      variant="filled"
                      sx={{ 
                        fontWeight: 700,
                        fontSize: '1rem',
                        backgroundColor: '#9c27b0',
                        color: 'white'
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Function Properties */}
          <Box sx={{ flex: 1 }}>
            <Card elevation={6} sx={{ 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
              border: '3px solid #e3f2fd',
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 4,
                  justifyContent: 'center'
                }}>
                  <CalculateIcon sx={{ mr: 2, color: '#1976d2', fontSize: 28 }} />
                  <Typography variant="h5" sx={{ 
                    color: '#1976d2', 
                    fontWeight: 700,
                    textAlign: 'center',
                    letterSpacing: '0.5px'
                  }}>
                    📈 Function Properties & Analysis
                  </Typography>
                </Box>

                {/* Key Formulas Section */}
                <Paper elevation={3} sx={{ 
                  p: 3, 
                  mb: 3, 
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)',
                  border: '2px solid #bbdefb'
                }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    color: '#1976d2',
                    mb: 2,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    🔑 Key Formulas
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                        Linear Function
                      </Typography>
                      <MathJax>
                        {`\\(f(x) = mx + b\\)`}
                      </MathJax>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ff9800', mb: 1 }}>
                        X-intercept
                      </Typography>
                      <MathJax>
                        {`\\(x = -\\frac{b}{m}\\)`}
                      </MathJax>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#4caf50', mb: 1 }}>
                        Y-intercept
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#4caf50' }}>
                        f(0) = b
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Function Forms */}
                <Accordion defaultExpanded sx={{ mb: 3 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                      📝 Function Forms
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f5f5f5', border: '2px solid #1976d2' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
                        Standard Form:
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        fontFamily: 'monospace', 
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        wordBreak: 'break-word'
                      }}>
                        {properties.standardForm}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                {/* Key Properties */}
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800' }}>
                      🔍 Key Properties
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' }, flexWrap: 'wrap' }}>
                      <Box sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: '#fff3e0', border: '2px solid #ff9800' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#ff9800', mb: 1 }}>
                          Slope:
                        </Typography>
                        <Chip 
                          label={`m = ${properties.slope} (${properties.slopeType})`}
                          color={properties.slope > 0 ? 'success' : properties.slope < 0 ? 'error' : 'warning'}
                          sx={{ fontWeight: 700, fontSize: '1rem' }}
                        />
                      </Box>
                      <Box sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: '#e8f5e8', border: '2px solid #4caf50' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#4caf50', mb: 1 }}>
                          Y-intercept:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#4caf50' }}>
                          (0, {properties.yIntercept})
                        </Typography>
                      </Box>
                      <Box sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: '#f3e5f5', border: '2px solid #9c27b0' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#9c27b0', mb: 1 }}>
                          X-intercept:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                          {properties.xInterceptDesc}
                        </Typography>
                      </Box>
                      <Box sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: '#e1f5fe', border: '2px solid #00bcd4' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#00bcd4', mb: 1 }}>
                          Domain & Range:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#00bcd4' }}>
                          (-∞, ∞) for both
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                {/* Special Cases */}
                {properties.specialCases.length > 0 && (
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#e91e63' }}>
                        ⭐ Special Cases
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#fce4ec', border: '2px solid #e91e63' }}>
                        {properties.specialCases.map((specialCase, index) => (
                          <Chip 
                            key={index}
                            label={specialCase}
                            variant="filled"
                            sx={{ 
                              m: 0.5,
                              fontWeight: 700,
                              fontSize: '1rem',
                              backgroundColor: '#e91e63',
                              color: 'white'
                            }}
                          />
                        ))}
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </MathJaxContext>
  );
};

export default LinearFunction;
