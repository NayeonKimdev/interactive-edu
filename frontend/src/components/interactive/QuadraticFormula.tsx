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
import { ExpandMore as ExpandMoreIcon, Functions as FunctionsIcon } from '@mui/icons-material';
import QuadraticGraph from './QuadraticGraph';

// MathJax global type declaration
declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>;
    };
  }
}

interface QuadraticFunctionProps {
  cardId: string;
}

interface FunctionProperties {
  standardForm: string;
  vertexForm: string;
  factoredForm: string;
  discriminant: number;
  zeros: string[];
  zerosInfo: string;
  yIntercept: number;
  vertex: [number, number];
  extremumType: string;
  extremumValue: number;
}

const QuadraticFunction: React.FC<QuadraticFunctionProps> = ({ cardId }) => {
  const [coefficients, setCoefficients] = useState({
    a: 1,
    b: -4,
    c: 3
  });

  const [properties, setProperties] = useState<FunctionProperties>({
    standardForm: '',
    vertexForm: '',
    factoredForm: '',
    discriminant: 0,
    zeros: [],
    zerosInfo: '',
    yIntercept: 0,
    vertex: [0, 0],
    extremumType: '',
    extremumValue: 0
  });

  // Calculate all quadratic function properties
  const calculateProperties = (a: number, b: number, c: number) => {
    if (a === 0) {
      setProperties({
        standardForm: 'f(x) = bx + c (Linear function)',
        vertexForm: 'Not applicable',
        factoredForm: 'Not applicable',
        discriminant: 0,
        zeros: [],
        zerosInfo: 'Not a quadratic function',
        yIntercept: c,
        vertex: [0, 0],
        extremumType: 'Not applicable',
        extremumValue: 0
      });
      return;
    }

    // Standard form
    const standardForm = `f(x) = ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c}`;

    // Vertex form calculation
    const h = -b / (2 * a);
    const k = a * h * h + b * h + c;
    const vertexForm = `f(x) = ${a}(x ${h >= 0 ? '-' : '+'}${Math.abs(h)})² ${k >= 0 ? '+' : ''}${k}`;

    // Discriminant
    const discriminant = b * b - 4 * a * c;

    // Zeros calculation
    let zeros: string[] = [];
    let zerosInfo = '';
    let factoredForm = '';

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      zeros = [x1.toFixed(4), x2.toFixed(4)];
      zerosInfo = `2 distinct real roots: x = ${x1.toFixed(4)}, x = ${x2.toFixed(4)}`;
      factoredForm = `f(x) = ${a}(x ${x1 >= 0 ? '-' : '+'}${Math.abs(x1)})(x ${x2 >= 0 ? '-' : '+'}${Math.abs(x2)})`;
    } else if (discriminant === 0) {
      const x1 = -b / (2 * a);
      zeros = [x1.toFixed(4)];
      zerosInfo = `1 repeated root: x = ${x1.toFixed(4)}`;
      factoredForm = `f(x) = ${a}(x ${x1 >= 0 ? '-' : '+'}${Math.abs(x1)})²`;
    } else {
      const realPart = (-b / (2 * a)).toFixed(4);
      const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
      zeros = [`${realPart} + ${imagPart}i`, `${realPart} - ${imagPart}i`];
      zerosInfo = 'No real roots (complex roots)';
      factoredForm = 'Complex roots - no real factored form';
    }

    // Y-intercept
    const yIntercept = c;

    // Vertex
    const vertexX = h;
    const vertexY = k;
    const vertex: [number, number] = [vertexX, vertexY];

    // Extremum
    const extremumType = a > 0 ? 'Minimum' : 'Maximum';
    const extremumValue = k;

    setProperties({
      standardForm,
      vertexForm,
      factoredForm,
      discriminant,
      zeros,
      zerosInfo,
      yIntercept,
      vertex,
      extremumType,
      extremumValue
    });
  };

  // Real-time calculation when coefficients change
  useEffect(() => {
    calculateProperties(coefficients.a, coefficients.b, coefficients.c);
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

  const handleCoefficientChange = (coeff: 'a' | 'b' | 'c', value: number) => {
    setCoefficients(prev => ({
      ...prev,
      [coeff]: value
    }));
  };

  const handleTextFieldChange = (coeff: 'a' | 'b' | 'c', value: string) => {
    const numValue = parseFloat(value) || 0;
    handleCoefficientChange(coeff, numValue);
  };

  const getDiscriminantColor = (discriminant: number) => {
    if (discriminant > 0) return 'success';
    if (discriminant === 0) return 'warning';
    return 'error';
  };

  const resetCoefficients = () => {
    setCoefficients({ a: 1, b: -4, c: 3 });
  };

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
            📊 Quadratic Function (이차함수)
          </Typography>
          
          <Typography variant="h6" sx={{ 
            opacity: 0.95, 
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '0.3px'
          }}>
            Comprehensive learning experience for quadratic functions f(x) = ax² + bx + c
          </Typography>
        </Paper>

        {/* Graph Section */}
        <Box sx={{ mb: 4 }}>
          <QuadraticGraph a={coefficients.a} b={coefficients.b} c={coefficients.c} />
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
                  <FunctionsIcon sx={{ mr: 2, color: '#1976d2', fontSize: 28 }} />
                  <Typography variant="h5" sx={{ 
                    color: '#1976d2', 
                    fontWeight: 700,
                    textAlign: 'center',
                    letterSpacing: '0.5px'
                  }}>
                    🎛️ Adjust Coefficients
                  </Typography>
                </Box>

                {/* Coefficient a */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 700, 
                    color: '#1976d2',
                    mb: 2,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Coefficient a
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <TextField
                      type="number"
                      value={coefficients.a}
                      onChange={(e) => handleTextFieldChange('a', e.target.value)}
                      size="small"
                      sx={{ 
                        width: '100px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#1976d2',
                            borderWidth: 2,
                          },
                          '&:hover fieldset': {
                            borderColor: '#1565c0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#1976d2',
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
                      color: '#1976d2',
                      minWidth: '60px'
                    }}>
                      {coefficients.a}
                    </Typography>
                  </Box>
                  
                  <Slider
                    value={coefficients.a}
                    onChange={(_, value) => handleCoefficientChange('a', value as number)}
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
                        backgroundColor: '#1976d2',
                        width: 20,
                        height: 20,
                        boxShadow: '0 4px 8px rgba(25, 118, 210, 0.3)',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#1976d2',
                        height: 6,
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#e3f2fd',
                        height: 6,
                      }
                    }}
                  />
                </Box>

                {/* Coefficient b */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 700, 
                    color: '#ff9800',
                    mb: 2,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Coefficient b
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

                {/* Coefficient c */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ 
                    fontWeight: 700, 
                    color: '#4caf50',
                    mb: 2,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Coefficient c
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <TextField
                      type="number"
                      value={coefficients.c}
                      onChange={(e) => handleTextFieldChange('c', e.target.value)}
                      size="small"
                      sx={{ 
                        width: '100px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#4caf50',
                            borderWidth: 2,
                          },
                          '&:hover fieldset': {
                            borderColor: '#388e3c',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4caf50',
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
                      color: '#4caf50',
                      minWidth: '60px'
                    }}>
                      {coefficients.c}
                    </Typography>
                  </Box>
                  
                  <Slider
                    value={coefficients.c}
                    onChange={(_, value) => handleCoefficientChange('c', value as number)}
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
                        backgroundColor: '#4caf50',
                        width: 20,
                        height: 20,
                        boxShadow: '0 4px 8px rgba(76, 175, 80, 0.3)',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#4caf50',
                        height: 6,
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#e8f5e8',
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

            {/* Zeros Card - Moved to left column */}
            <Card elevation={6} sx={{ 
              borderRadius: 4,
              background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
              border: '3px solid #4caf50',
              boxShadow: '0 8px 32px rgba(76, 175, 80, 0.15)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 3,
                  justifyContent: 'center'
                }}>
                  <Typography variant="h5" sx={{ 
                    color: '#4caf50', 
                    fontWeight: 700,
                    textAlign: 'center',
                    letterSpacing: '0.5px'
                  }}>
                    🎯 Zeros (Roots)
                  </Typography>
                </Box>
                
                <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#e8f5e8', border: '2px solid #4caf50' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#4caf50', mb: 2 }}>
                    {properties.zerosInfo}
                  </Typography>
                  {properties.zeros.length > 0 && (
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                        Solutions:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {properties.zeros.map((zero, index) => (
                          <Chip 
                            key={index}
                            label={`x = ${zero}`}
                            variant="filled"
                            sx={{ 
                              mb: 1,
                              fontWeight: 700,
                              fontSize: '1rem',
                              backgroundColor: '#4caf50',
                              color: 'white',
                              justifyContent: 'flex-start',
                              '& .MuiChip-label': {
                                textAlign: 'left'
                              }
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
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
                  <FunctionsIcon sx={{ mr: 2, color: '#1976d2', fontSize: 28 }} />
                  <Typography variant="h5" sx={{ 
                    color: '#1976d2', 
                    fontWeight: 700,
                    textAlign: 'center',
                    letterSpacing: '0.5px'
                  }}>
                    📈 Function Properties & Formulas
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
                        Quadratic Formula
                      </Typography>
                      <MathJax>
                        {`\\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)`}
                      </MathJax>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#ff9800', mb: 1 }}>
                        Discriminant
                      </Typography>
                      <MathJax>
                        {`\\(D = b^2 - 4ac\\)`}
                      </MathJax>
                    </Box>
                    <Box sx={{ flex: 1, textAlign: 'center', p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#4caf50', mb: 1 }}>
                        Y-intercept
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#4caf50' }}>
                        f(0) = c
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* Function Forms - Vertical Layout */}
                <Accordion defaultExpanded sx={{ mb: 3 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2' }}>
                      📝 Function Forms
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f5f5f5', border: '2px solid #ff9800' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#ff9800', mb: 1 }}>
                          Vertex Form:
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontFamily: 'monospace', 
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          wordBreak: 'break-word'
                        }}>
                          {properties.vertexForm}
                        </Typography>
                      </Box>
                      <Box sx={{ p: 2, borderRadius: 2, bgcolor: '#f5f5f5', border: '2px solid #4caf50' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#4caf50', mb: 1 }}>
                          Factored Form:
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          fontFamily: 'monospace', 
                          fontWeight: 600,
                          fontSize: '1.1rem',
                          wordBreak: 'break-word'
                        }}>
                          {properties.factoredForm}
                        </Typography>
                      </Box>
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
                          Discriminant:
                        </Typography>
                        <Chip 
                          label={`D = ${properties.discriminant.toFixed(4)}`}
                          color={getDiscriminantColor(properties.discriminant)}
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
                          Vertex:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                          ({properties.vertex[0].toFixed(4)}, {properties.vertex[1].toFixed(4)})
                        </Typography>
                      </Box>
                      <Box sx={{ flex: '1 1 200px', p: 2, borderRadius: 2, bgcolor: '#e1f5fe', border: '2px solid #00bcd4' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#00bcd4', mb: 1 }}>
                          Extremum:
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#00bcd4' }}>
                          {properties.extremumType}: {properties.extremumValue.toFixed(4)}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </MathJaxContext>
  );
};

export default QuadraticFunction;
