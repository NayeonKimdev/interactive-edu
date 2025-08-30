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
  AccordionDetails,
  Tabs,
  Tab
} from '@mui/material';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { 
  ExpandMore as ExpandMoreIcon, 
  Calculate as CalculateIcon,
  Functions as FunctionsIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Remove as RemoveIcon,
  Science as ScienceIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import ExponentialLogarithmicGraph from './ExponentialLogarithmicGraph';

// MathJax global type declaration
declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: () => Promise<void>;
    };
  }
}

interface ExponentialLogarithmicProps {
  cardId: string;
}

interface ExponentialProperties {
  function: string;
  base: number;
  coefficient: number;
  exponentShift: number;
  verticalShift: number;
  domain: string;
  range: string;
  functionType: string;
  yIntercept: number;
  xIntercept: number | null;
  yInterceptDesc: string;
  xInterceptDesc: string;
  specialCases: string[];
}

interface LogarithmicProperties {
  function: string;
  base: number;
  coefficient: number;
  argumentShift: number;
  verticalShift: number;
  domain: string;
  range: string;
  functionType: string;
  yIntercept: number | null;
  xIntercept: number | null;
  yInterceptDesc: string;
  xInterceptDesc: string;
  specialCases: string[];
}

interface EquationSolution {
  equation: string;
  solutions: number[];
  solutionCount: number;
  message?: string;
}

const ExponentialLogarithmic: React.FC<ExponentialLogarithmicProps> = ({ cardId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [exponentialParams, setExponentialParams] = useState({
    a: 2,
    b: 1,
    c: 0,
    d: 0
  });

  const [logarithmicParams, setLogarithmicParams] = useState({
    a: 2,
    b: 1,
    c: 0,
    d: 0
  });

  const [exponentialProperties, setExponentialProperties] = useState<ExponentialProperties>({
    function: '',
    base: 0,
    coefficient: 0,
    exponentShift: 0,
    verticalShift: 0,
    domain: '',
    range: '',
    functionType: '',
    yIntercept: 0,
    xIntercept: null,
    yInterceptDesc: '',
    xInterceptDesc: '',
    specialCases: []
  });

  const [logarithmicProperties, setLogarithmicProperties] = useState<LogarithmicProperties>({
    function: '',
    base: 0,
    coefficient: 0,
    argumentShift: 0,
    verticalShift: 0,
    domain: '',
    range: '',
    functionType: '',
    yIntercept: null,
    xIntercept: null,
    yInterceptDesc: '',
    xInterceptDesc: '',
    specialCases: []
  });

  const [equationParams, setEquationParams] = useState({
    a: 1,
    b: 2,
    c: 0,
    target: 8
  });

  const [equationSolution, setEquationSolution] = useState<EquationSolution>({
    equation: '',
    solutions: [],
    solutionCount: 0
  });

  // Calculate exponential function properties
  const calculateExponentialProperties = (a: number, b: number, c: number, d: number) => {
    const domain = "(-∞, ∞)";
    let rangeDesc = "";
    let functionType = "";

    if (b > 0) {
      if (a > 1) {
        rangeDesc = `(${d}, ∞)`;
        functionType = "exponential growth";
      } else if (0 < a && a < 1) {
        rangeDesc = `(${d}, ∞)`;
        functionType = "exponential decay";
      } else {
        rangeDesc = `(${d}, ∞)`;
        functionType = "constant";
      }
    } else {
      if (a > 1) {
        rangeDesc = `(-∞, ${d})`;
        functionType = "exponential decay (negative)";
      } else if (0 < a && a < 1) {
        rangeDesc = `(-∞, ${d})`;
        functionType = "exponential growth (negative)";
      } else {
        rangeDesc = `(-∞, ${d})`;
        functionType = "constant";
      }
    }

    const yIntercept = b * Math.pow(a, c) + d;
    
    let xIntercept: number | null = null;
    let xInterceptDesc = "No x-intercept";
    
    if (b !== 0 && a > 0) {
      try {
        const rightSide = -d / b;
        if (rightSide > 0) {
          xIntercept = Math.log(rightSide) / Math.log(a) - c;
          if (!isNaN(xIntercept) && !isFinite(xIntercept)) {
            xInterceptDesc = `x = ${xIntercept.toFixed(4)}`;
          }
        }
      } catch {
        xInterceptDesc = "No x-intercept";
      }
    }

    const specialCases = [];
    if (a === 1) {
      specialCases.push("Constant function");
    } else if (Math.abs(a - Math.E) < 0.001) {
      specialCases.push("Natural exponential function");
    } else if (b === 1 && c === 0 && d === 0) {
      specialCases.push("Basic exponential function");
    }

    setExponentialProperties({
      function: `f(x) = ${b} × ${a}^(x+${c}) + ${d}`,
      base: a,
      coefficient: b,
      exponentShift: c,
      verticalShift: d,
      domain,
      range: rangeDesc,
      functionType,
      yIntercept,
      xIntercept,
      yInterceptDesc: `y = ${yIntercept.toFixed(4)}`,
      xInterceptDesc,
      specialCases
    });
  };

  // Calculate logarithmic function properties
  const calculateLogarithmicProperties = (a: number, b: number, c: number, d: number) => {
    const domain = c < 0 ? `(${-c}, ∞)` : `[${-c}, ∞)`;
    const range = "(-∞, ∞)";
    let functionType = "";

    if (b > 0) {
      if (a > 1) {
        functionType = "logarithmic growth";
      } else if (0 < a && a < 1) {
        functionType = "logarithmic decay";
      } else {
        functionType = "constant";
      }
    } else {
      if (a > 1) {
        functionType = "logarithmic decay (negative)";
      } else if (0 < a && a < 1) {
        functionType = "logarithmic growth (negative)";
      } else {
        functionType = "constant";
      }
    }

    let yIntercept: number | null = null;
    let yInterceptDesc = "No y-intercept (outside domain)";
    
    if (0 + c > 0) {
      yIntercept = b * Math.log(0 + c) / Math.log(a) + d;
      yInterceptDesc = `y = ${yIntercept.toFixed(4)}`;
    }

    let xIntercept: number | null = null;
    let xInterceptDesc = "No x-intercept";
    
    if (b !== 0 && a > 0) {
      try {
        const exponent = -d / b;
        xIntercept = Math.pow(a, exponent) - c;
        if (xIntercept > -c && !isNaN(xIntercept) && !isFinite(xIntercept)) {
          xInterceptDesc = `x = ${xIntercept.toFixed(4)}`;
        }
      } catch {
        xInterceptDesc = "No x-intercept";
      }
    }

    const specialCases = [];
    if (Math.abs(a - Math.E) < 0.001) {
      specialCases.push("Natural logarithm");
    } else if (a === 10) {
      specialCases.push("Common logarithm");
    } else if (b === 1 && c === 0 && d === 0) {
      specialCases.push("Basic logarithmic function");
    }

    setLogarithmicProperties({
      function: `f(x) = ${b} × log_${a}(x+${c}) + ${d}`,
      base: a,
      coefficient: b,
      argumentShift: c,
      verticalShift: d,
      domain,
      range,
      functionType,
      yIntercept,
      xIntercept,
      yInterceptDesc,
      xInterceptDesc,
      specialCases
    });
  };

  // Solve exponential equation
  const solveExponentialEquation = (a: number, b: number, c: number, target: number) => {
    if (a === 0) {
      setEquationSolution({
        equation: `${a} × ${b}^x + ${c} = ${target}`,
        solutions: [],
        solutionCount: 0,
        message: 'No solution (a = 0)'
      });
      return;
    }

    if (b <= 0) {
      setEquationSolution({
        equation: `${a} × ${b}^x + ${c} = ${target}`,
        solutions: [],
        solutionCount: 0,
        message: 'No solution (invalid base)'
      });
      return;
    }

    const rightSide = (target - c) / a;
    
    if (rightSide <= 0) {
      setEquationSolution({
        equation: `${a} × ${b}^x + ${c} = ${target}`,
        solutions: [],
        solutionCount: 0,
        message: 'No real solution (right side ≤ 0)'
      });
      return;
    }

    const solution = Math.log(rightSide) / Math.log(b);
    
    if (!isNaN(solution) && !isFinite(solution)) {
      setEquationSolution({
        equation: `${a} × ${b}^x + ${c} = ${target}`,
        solutions: [solution],
        solutionCount: 1
      });
    } else {
      setEquationSolution({
        equation: `${a} × ${b}^x + ${c} = ${target}`,
        solutions: [],
        solutionCount: 0,
        message: 'No real solution'
      });
    }
  };

  // Solve logarithmic equation
  const solveLogarithmicEquation = (a: number, b: number, c: number, target: number) => {
    if (a === 0) {
      setEquationSolution({
        equation: `${a} × log_${b}(x) + ${c} = ${target}`,
        solutions: [],
        solutionCount: 0,
        message: 'No solution (a = 0)'
      });
      return;
    }

    if (b <= 0 || b === 1) {
      setEquationSolution({
        equation: `${a} × log_${b}(x) + ${c} = ${target}`,
        solutions: [],
        solutionCount: 0,
        message: 'No solution (invalid base)'
      });
      return;
    }

    const exponent = (target - c) / a;
    const solution = Math.pow(b, exponent);
    
    if (solution > 0 && !isNaN(solution) && !isFinite(solution)) {
      setEquationSolution({
        equation: `${a} × log_${b}(x) + ${c} = ${target}`,
        solutions: [solution],
        solutionCount: 1
      });
    } else {
      setEquationSolution({
        equation: `${a} × log_${b}(x) + ${c} = ${target}`,
        solutions: [],
        solutionCount: 0,
        message: 'No real solution'
      });
    }
  };

  useEffect(() => {
    calculateExponentialProperties(
      exponentialParams.a,
      exponentialParams.b,
      exponentialParams.c,
      exponentialParams.d
    );
  }, [exponentialParams]);

  useEffect(() => {
    calculateLogarithmicProperties(
      logarithmicParams.a,
      logarithmicParams.b,
      logarithmicParams.c,
      logarithmicParams.d
    );
  }, [logarithmicParams]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleExponentialParamChange = (param: string, value: number) => {
    setExponentialParams(prev => ({ ...prev, [param]: value }));
  };

  const handleLogarithmicParamChange = (param: string, value: number) => {
    setLogarithmicParams(prev => ({ ...prev, [param]: value }));
  };

  const handleEquationParamChange = (param: string, value: number) => {
    setEquationParams(prev => ({ ...prev, [param]: value }));
  };

  const handleSolveEquation = () => {
    if (activeTab === 0) {
      solveExponentialEquation(
        equationParams.a,
        equationParams.b,
        equationParams.c,
        equationParams.target
      );
    } else {
      solveLogarithmicEquation(
        equationParams.a,
        equationParams.b,
        equationParams.c,
        equationParams.target
      );
    }
  };

  return (
    <MathJaxContext>
      <Box sx={{ width: '100%', maxWidth: 1400, margin: '0 auto', p: 3 }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ 
          mb: 4, 
          fontWeight: 700, 
          color: '#1976d2',
          textShadow: '2px 2px 4px rgba(25, 118, 210, 0.1)',
          letterSpacing: '1px'
        }}>
          📊 지수함수와 로그함수
        </Typography>

        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          centered 
          sx={{ 
            mb: 4,
            '& .MuiTab-root': {
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              minHeight: 60,
              '&.Mui-selected': {
                color: '#1976d2',
                fontWeight: 700,
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1976d2',
              height: 4,
              borderRadius: 2
            }
          }}
        >
          <Tab 
            icon={<ScienceIcon />} 
            label="지수함수" 
            iconPosition="start"
          />
          <Tab 
            icon={<LogoutIcon />} 
            label="로그함수" 
            iconPosition="start"
          />
          <Tab 
            icon={<FunctionsIcon />} 
            label="방정식 해결" 
            iconPosition="start"
          />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            {/* Left Column - Controls */}
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
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
                      <ScienceIcon sx={{ mr: 2, color: '#1976d2', fontSize: 28 }} />
                      <Typography variant="h5" sx={{ 
                        color: '#1976d2', 
                        fontWeight: 700,
                        textAlign: 'center',
                        letterSpacing: '0.5px'
                      }}>
                        🎛️ 지수함수 매개변수 조정
                      </Typography>
                    </Box>

                    {/* Parameter Controls */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {/* Base (a) */}
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ 
                          fontWeight: 700, 
                          color: '#1976d2',
                          mb: 2,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          밑수 (a)
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <TextField
                            type="number"
                            value={exponentialParams.a}
                            onChange={(e) => handleExponentialParamChange('a', parseFloat(e.target.value) || 0)}
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
                              min: 0.1,
                              max: 5
                            }}
                          />
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600, 
                            color: '#1976d2',
                            minWidth: '60px'
                          }}>
                            {exponentialParams.a.toFixed(2)}
                          </Typography>
                        </Box>
                        
                        <Slider
                          value={exponentialParams.a}
                          onChange={(_, value) => handleExponentialParamChange('a', value as number)}
                          min={0.1}
                          max={5}
                          step={0.1}
                          marks={[
                            { value: 0.5, label: '0.5' },
                            { value: 1, label: '1' },
                            { value: 2, label: '2' },
                            { value: Math.E, label: 'e' }
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
                      {/* Coefficient (b) */}
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ 
                          fontWeight: 700, 
                          color: '#ff9800',
                          mb: 2,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          계수 (b)
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <TextField
                            type="number"
                            value={exponentialParams.b}
                            onChange={(e) => handleExponentialParamChange('b', parseFloat(e.target.value) || 0)}
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
                              min: -3,
                              max: 3
                            }}
                          />
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600, 
                            color: '#ff9800',
                            minWidth: '60px'
                          }}>
                            {exponentialParams.b.toFixed(1)}
                          </Typography>
                        </Box>
                        
                        <Slider
                          value={exponentialParams.b}
                          onChange={(_, value) => handleExponentialParamChange('b', value as number)}
                          min={-3}
                          max={3}
                          step={0.1}
                          marks={[
                            { value: -2, label: '-2' },
                            { value: -1, label: '-1' },
                            { value: 0, label: '0' },
                            { value: 1, label: '1' },
                            { value: 2, label: '2' }
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
                                        {/* Exponent Shift (c) */}
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ 
                          fontWeight: 700, 
                          color: '#4caf50',
                          mb: 2,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          지수 이동 (c)
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <TextField
                            type="number"
                            value={exponentialParams.c}
                            onChange={(e) => handleExponentialParamChange('c', parseFloat(e.target.value) || 0)}
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
                              min: -3,
                              max: 3
                            }}
                          />
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600, 
                            color: '#4caf50',
                            minWidth: '60px'
                          }}>
                            {exponentialParams.c.toFixed(1)}
                          </Typography>
                        </Box>
                        
                        <Slider
                          value={exponentialParams.c}
                          onChange={(_, value) => handleExponentialParamChange('c', value as number)}
                          min={-3}
                          max={3}
                          step={0.1}
                          marks={[
                            { value: -2, label: '-2' },
                            { value: 0, label: '0' },
                            { value: 2, label: '2' }
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

                      {/* Vertical Shift (d) */}
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" gutterBottom sx={{ 
                          fontWeight: 700, 
                          color: '#9c27b0',
                          mb: 2,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          y축 이동 (d)
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <TextField
                            type="number"
                            value={exponentialParams.d}
                            onChange={(e) => handleExponentialParamChange('d', parseFloat(e.target.value) || 0)}
                            size="small"
                            sx={{ 
                              width: '100px',
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: '#9c27b0',
                                  borderWidth: 2,
                                },
                                '&:hover fieldset': {
                                  borderColor: '#7b1fa2',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#9c27b0',
                                },
                              },
                            }}
                            variant="outlined"
                            inputProps={{ 
                              step: 0.1,
                              min: -3,
                              max: 3
                            }}
                          />
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600, 
                            color: '#9c27b0',
                            minWidth: '60px'
                          }}>
                            {exponentialParams.d.toFixed(1)}
                          </Typography>
                        </Box>
                        
                        <Slider
                          value={exponentialParams.d}
                          onChange={(_, value) => handleExponentialParamChange('d', value as number)}
                          min={-3}
                          max={3}
                          step={0.1}
                          marks={[
                            { value: -2, label: '-2' },
                            { value: 0, label: '0' },
                            { value: 2, label: '2' }
                          ]}
                          sx={{
                            '& .MuiSlider-thumb': {
                              backgroundColor: '#9c27b0',
                              width: 20,
                              height: 20,
                              boxShadow: '0 4px 8px rgba(156, 39, 176, 0.3)',
                            },
                            '& .MuiSlider-track': {
                              backgroundColor: '#9c27b0',
                              height: 6,
                            },
                            '& .MuiSlider-rail': {
                              backgroundColor: '#f3e5f5',
                              height: 6,
                            }
                          }}
                        />
                      </Box>
                                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Right Column - Graph and Properties */}
              <Box sx={{ flex: 1 }}>
                {/* Graph */}
                <ExponentialLogarithmicGraph 
                  functionType="exponential"
                  a={exponentialParams.a}
                  b={exponentialParams.b}
                  c={exponentialParams.c}
                  d={exponentialParams.d}
                />

                {/* Function Properties */}
                <Card elevation={6} sx={{ 
                  mt: 3,
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
                        📊 지수함수 성질
                      </Typography>
                    </Box>

                    {/* Function Formula */}
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
                        🔑 함수 공식
                      </Typography>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <MathJax>
                          {`\\(f(x) = ${exponentialParams.b} \\times ${exponentialParams.a}^{x+${exponentialParams.c}} + ${exponentialParams.d}\\)`}
                        </MathJax>
                      </Box>
                    </Paper>

                    {/* Properties Grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <Box>
                        <Paper sx={{ p: 3, bgcolor: '#f5f5f5', border: '2px solid #1976d2', borderRadius: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
                            📈 기본 성질
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>함수 유형:</strong> {exponentialProperties.functionType}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>도메인:</strong> {exponentialProperties.domain}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>치역:</strong> {exponentialProperties.range}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>y절편:</strong> {exponentialProperties.yInterceptDesc}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>x절편:</strong> {exponentialProperties.xInterceptDesc}
                          </Typography>
                        </Paper>
                      </Box>
                      <Box>
                        <Paper sx={{ p: 3, bgcolor: '#f5f5f5', border: '2px solid #ff9800', borderRadius: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800', mb: 2 }}>
                            ⭐ 특별한 경우
                          </Typography>
                          {exponentialProperties.specialCases.length > 0 ? (
                            exponentialProperties.specialCases.map((specialCase, index) => (
                              <Chip
                                key={index}
                                label={specialCase}
                                color="primary"
                                size="small"
                                sx={{ mr: 1, mb: 1 }}
                              />
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              특별한 경우 없음
                            </Typography>
                          )}
                        </Paper>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            {/* Left Column - Controls */}
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
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
                      <LogoutIcon sx={{ mr: 2, color: '#1976d2', fontSize: 28 }} />
                      <Typography variant="h5" sx={{ 
                        color: '#1976d2', 
                        fontWeight: 700,
                        textAlign: 'center',
                        letterSpacing: '0.5px'
                      }}>
                        🎛️ 로그함수 매개변수 조정
                      </Typography>
                    </Box>

                    {/* Parameter Controls */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box>
                    <Typography gutterBottom>밑수 (a)</Typography>
                    <Slider
                      value={logarithmicParams.a}
                      onChange={(_, value) => handleLogarithmicParamChange('a', value as number)}
                      min={0.1}
                      max={5}
                      step={0.1}
                      marks={[
                        { value: 0.5, label: '0.5' },
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: Math.E, label: 'e' },
                        { value: 10, label: '10' }
                      ]}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {logarithmicParams.a.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography gutterBottom>계수 (b)</Typography>
                    <Slider
                      value={logarithmicParams.b}
                      onChange={(_, value) => handleLogarithmicParamChange('b', value as number)}
                      min={-3}
                      max={3}
                      step={0.1}
                      marks={[
                        { value: -2, label: '-2' },
                        { value: -1, label: '-1' },
                        { value: 0, label: '0' },
                        { value: 1, label: '1' },
                        { value: 2, label: '2' }
                      ]}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {logarithmicParams.b.toFixed(1)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography gutterBottom>인수 이동 (c)</Typography>
                    <Slider
                      value={logarithmicParams.c}
                      onChange={(_, value) => handleLogarithmicParamChange('c', value as number)}
                      min={-2}
                      max={2}
                      step={0.1}
                      marks={[
                        { value: -1, label: '-1' },
                        { value: 0, label: '0' },
                        { value: 1, label: '1' }
                      ]}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {logarithmicParams.c.toFixed(1)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography gutterBottom>y축 이동 (d)</Typography>
                    <Slider
                      value={logarithmicParams.d}
                      onChange={(_, value) => handleLogarithmicParamChange('d', value as number)}
                      min={-3}
                      max={3}
                      step={0.1}
                      marks={[
                        { value: -2, label: '-2' },
                        { value: 0, label: '0' },
                        { value: 2, label: '2' }
                      ]}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {logarithmicParams.d.toFixed(1)}
                    </Typography>
                  </Box>
                                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Right Column - Graph and Properties */}
              <Box sx={{ flex: 1 }}>
                {/* Graph */}
                <ExponentialLogarithmicGraph 
                  functionType="logarithmic"
                  a={logarithmicParams.a}
                  b={logarithmicParams.b}
                  c={logarithmicParams.c}
                  d={logarithmicParams.d}
                />

                {/* Function Properties */}
                <Card elevation={6} sx={{ 
                  mt: 3,
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
                        📊 로그함수 성질
                      </Typography>
                    </Box>

                    {/* Function Formula */}
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
                        🔑 함수 공식
                      </Typography>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <MathJax>
                          {`\\(f(x) = ${logarithmicParams.b} \\times \\log_{${logarithmicParams.a}}(x+${logarithmicParams.c}) + ${logarithmicParams.d}\\)`}
                        </MathJax>
                      </Box>
                    </Paper>

                    {/* Properties Grid */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                      <Box>
                        <Paper sx={{ p: 3, bgcolor: '#f5f5f5', border: '2px solid #1976d2', borderRadius: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}>
                            📈 기본 성질
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>함수 유형:</strong> {logarithmicProperties.functionType}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>도메인:</strong> {logarithmicProperties.domain}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>치역:</strong> {logarithmicProperties.range}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>y절편:</strong> {logarithmicProperties.yInterceptDesc}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            <strong>x절편:</strong> {logarithmicProperties.xInterceptDesc}
                          </Typography>
                        </Paper>
                      </Box>
                      <Box>
                        <Paper sx={{ p: 3, bgcolor: '#f5f5f5', border: '2px solid #ff9800', borderRadius: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff9800', mb: 2 }}>
                            ⭐ 특별한 경우
                          </Typography>
                          {logarithmicProperties.specialCases.length > 0 ? (
                            logarithmicProperties.specialCases.map((specialCase, index) => (
                              <Chip
                                key={index}
                                label={specialCase}
                                color="primary"
                                size="small"
                                sx={{ mr: 1, mb: 1 }}
                              />
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              특별한 경우 없음
                            </Typography>
                          )}
                        </Paper>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            {/* Left Column - Controls */}
            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
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
                        🧮 방정식 매개변수 설정
                      </Typography>
                    </Box>

                    {/* Parameter Controls */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <Box>
                    <Typography gutterBottom>계수 (a)</Typography>
                    <Slider
                      value={equationParams.a}
                      onChange={(_, value) => handleEquationParamChange('a', value as number)}
                      min={-3}
                      max={3}
                      step={0.1}
                      marks={[
                        { value: -2, label: '-2' },
                        { value: 0, label: '0' },
                        { value: 2, label: '2' }
                      ]}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {equationParams.a.toFixed(1)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography gutterBottom>밑수 (b)</Typography>
                    <Slider
                      value={equationParams.b}
                      onChange={(_, value) => handleEquationParamChange('b', value as number)}
                      min={0.1}
                      max={5}
                      step={0.1}
                      marks={[
                        { value: 0.5, label: '0.5' },
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: Math.E, label: 'e' },
                        { value: 10, label: '10' }
                      ]}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {equationParams.b.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography gutterBottom>상수 (c)</Typography>
                    <Slider
                      value={equationParams.c}
                      onChange={(_, value) => handleEquationParamChange('c', value as number)}
                      min={-5}
                      max={5}
                      step={0.1}
                      marks={[
                        { value: -3, label: '-3' },
                        { value: 0, label: '0' },
                        { value: 3, label: '3' }
                      ]}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {equationParams.c.toFixed(1)}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography gutterBottom>목표값</Typography>
                    <Slider
                      value={equationParams.target}
                      onChange={(_, value) => handleEquationParamChange('target', value as number)}
                      min={-10}
                      max={20}
                      step={0.1}
                      marks={[
                        { value: -5, label: '-5' },
                        { value: 0, label: '0' },
                        { value: 5, label: '5' },
                        { value: 10, label: '10' }
                      ]}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {equationParams.target.toFixed(1)}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={handleSolveEquation}
                    startIcon={<FunctionsIcon />}
                    sx={{ mr: 2 }}
                  >
                    방정식 해결
                  </Button>
                                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Right Column - Solution */}
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
                        🎯 방정식 해결 결과
                      </Typography>
                    </Box>

                    {/* Equation Display */}
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
                        📝 방정식
                      </Typography>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        <MathJax>
                          {`\\(${equationSolution.equation}\\)`}
                        </MathJax>
                      </Box>
                    </Paper>

                    {/* Solution */}
                    <Paper elevation={3} sx={{ 
                      p: 3, 
                      borderRadius: 3,
                      background: equationSolution.solutionCount > 0 
                        ? 'linear-gradient(135deg, #e8f5e8 0%, #f1f8e9 100%)'
                        : 'linear-gradient(135deg, #ffebee 0%, #fce4ec 100%)',
                      border: equationSolution.solutionCount > 0 
                        ? '2px solid #4caf50'
                        : '2px solid #f44336'
                    }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: equationSolution.solutionCount > 0 ? '#4caf50' : '#f44336',
                        mb: 2,
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {equationSolution.solutionCount > 0 ? '✅ 해' : '❌ 해 없음'}
                      </Typography>
                      <Box sx={{ textAlign: 'center', p: 2 }}>
                        {equationSolution.solutionCount > 0 ? (
                          <Typography variant="h5" sx={{ 
                            fontWeight: 700, 
                            color: '#4caf50',
                            fontFamily: 'monospace'
                          }}>
                            x = {equationSolution.solutions.map(s => s.toFixed(4)).join(', ')}
                          </Typography>
                        ) : (
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600, 
                            color: '#f44336'
                          }}>
                            {equationSolution.message}
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
        )}

        <Accordion defaultExpanded sx={{ mt: 4 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
              <CalculateIcon sx={{ mr: 2, color: '#1976d2', fontSize: 28 }} />
              📚 핵심 개념 정리
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
              <Box>
                <Paper elevation={3} sx={{ p: 3, bgcolor: '#f5f5f5', border: '2px solid #1976d2', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1976d2', mb: 3 }}>
                    📈 지수함수
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    • <strong>정의:</strong> f(x) = a^x (a {'>'} 0, a ≠ 1)
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    • <strong>도메인:</strong> (-∞, ∞) - 모든 실수
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    • <strong>치역:</strong> (0, ∞) - 양의 실수
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    • <strong>특징:</strong> a {'>'} 1일 때 증가함수, 0 {'<'} a {'<'} 1일 때 감소함수
                  </Typography>
                                     <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                     • <strong>점근선:</strong> y = d (수평점근선만 존재, 수직점근선 없음)
                   </Typography>
                </Paper>
              </Box>
              <Box>
                <Paper elevation={3} sx={{ p: 3, bgcolor: '#f5f5f5', border: '2px solid #ff9800', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#ff9800', mb: 3 }}>
                    📉 로그함수
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    • <strong>정의:</strong> f(x) = log_a(x) (a {'>'} 0, a ≠ 1)
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    • <strong>도메인:</strong> (0, ∞) - 양의 실수
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    • <strong>치역:</strong> (-∞, ∞) - 모든 실수
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                    • <strong>특징:</strong> a {'>'} 1일 때 증가함수, 0 {'<'} a {'<'} 1일 때 감소함수
                  </Typography>
                                     <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                     • <strong>점근선:</strong> x = -c (수직점근선만 존재, 수평점근선 없음)
                   </Typography>
                </Paper>
              </Box>
            </Box>
            
            <Paper elevation={3} sx={{ p: 3, mt: 3, bgcolor: '#f5f5f5', border: '2px solid #4caf50', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#4caf50', mb: 3 }}>
                🔄 역함수 관계
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                지수함수와 로그함수는 서로 역함수 관계입니다:
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <MathJax>
                  {`\\(f(x) = a^x \\leftrightarrow f^{-1}(x) = \\log_a(x)\\)`}
                </MathJax>
              </Box>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                • f(x) = e^x ↔ f^(-1)(x) = ln(x) (자연로그)
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                • f(x) = 10^x ↔ f^(-1)(x) = log₁₀(x) (상용로그)
              </Typography>
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Box>
    </MathJaxContext>
  );
};

export default ExponentialLogarithmic;
