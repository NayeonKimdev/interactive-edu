import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  TextField,
  Button,
  Paper,
  Chip,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Functions as FunctionsIcon,
  ShowChart as ShowChartIcon,
  Info as InfoIcon
} from '@mui/icons-material';

interface DomainRangeProps {
  cardId: string;
}

interface CardData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  subcategory: string;
  difficulty: string;
  tags: string[];
  learning_objectives: string[];
  estimated_time: number;
}

interface FunctionAnalysis {
  function: string;
  domain: string;
  range: string;
  x_values: number[];
  y_values: number[];
  success: boolean;
  error?: string;
}

const DomainRange: React.FC<DomainRangeProps> = ({ cardId }) => {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 선택된 함수 상태
  const [selectedFunction, setSelectedFunction] = useState('x**2');
  const [xRange, setXRange] = useState<[number, number]>([-10, 10]);
  const [analysisResult, setAnalysisResult] = useState<FunctionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // 사용자 정의 함수 상태
  const [customFunction, setCustomFunction] = useState('x**2 + 2*x + 1');

  useEffect(() => {
    fetchCardData();
  }, [cardId]);

  const fetchCardData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cards/${cardId}`);
      if (response.ok) {
        const data = await response.json();
        setCardData(data);
      } else {
        setError('카드 데이터를 불러올 수 없습니다.');
      }
    } catch (error) {
      setError('서버 연결 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const analyzeFunction = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('http://localhost:5000/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: `
import numpy as np
import matplotlib.pyplot as plt
from sympy import symbols, solve, S

def analyze_function(func_expr, x_range=(-10, 10)):
    x = symbols('x')
    
    try:
        # 함수 정의
        if func_expr == "x**2":
            f = x**2
            domain = "(-∞, ∞)"
            range_desc = "[0, ∞)"
        elif func_expr == "1/x":
            f = 1/x
            domain = "(-∞, 0) ∪ (0, ∞)"
            range_desc = "(-∞, 0) ∪ (0, ∞)"
        elif func_expr == "sqrt(x)":
            f = x**(1/2)
            domain = "[0, ∞)"
            range_desc = "[0, ∞)"
        elif func_expr == "sin(x)":
            f = sin(x)
            domain = "(-∞, ∞)"
            range_desc = "[-1, 1]"
        elif func_expr == "cos(x)":
            f = cos(x)
            domain = "(-∞, ∞)"
            range_desc = "[-1, 1]"
        elif func_expr == "tan(x)":
            f = tan(x)
            domain = "(-∞, ∞) except π/2 + nπ"
            range_desc = "(-∞, ∞)"
        elif func_expr == "log(x)":
            f = log(x)
            domain = "(0, ∞)"
            range_desc = "(-∞, ∞)"
        elif func_expr == "exp(x)":
            f = exp(x)
            domain = "(-∞, ∞)"
            range_desc = "(0, ∞)"
        elif func_expr == "abs(x)":
            f = abs(x)
            domain = "(-∞, ∞)"
            range_desc = "[0, ∞)"
        elif func_expr == "x**3":
            f = x**3
            domain = "(-∞, ∞)"
            range_desc = "(-∞, ∞)"
        else:
            # 사용자 정의 함수 처리
            f = eval(func_expr)
            domain = "(-∞, ∞)"
            range_desc = "(-∞, ∞)"
        
        # 그래프 생성
        x_vals = np.linspace(x_range[0], x_range[1], 1000)
        
        # 정의역 제한 적용
        if func_expr == "1/x":
            x_vals = x_vals[x_vals != 0]
        elif func_expr == "sqrt(x)":
            x_vals = x_vals[x_vals >= 0]
        elif func_expr == "log(x)":
            x_vals = x_vals[x_vals > 0]
        elif func_expr == "tan(x)":
            # 탄젠트 함수의 불연속점 제거
            x_vals = x_vals[np.abs(np.cos(x_vals)) > 1e-10]
        
        y_vals = []
        for x_val in x_vals:
            try:
                y_val = float(f.subs(x, x_val))
                if not np.isnan(y_val) and not np.isinf(y_val):
                    y_vals.append(y_val)
                else:
                    y_vals.append(None)
            except:
                y_vals.append(None)
        
        # None 값 제거
        valid_indices = [i for i, y in enumerate(y_vals) if y is not None]
        x_vals = x_vals[valid_indices]
        y_vals = [y_vals[i] for i in valid_indices]
        
        return {
            'function': func_expr,
            'domain': domain,
            'range': range_desc,
            'x_values': x_vals.tolist(),
            'y_values': y_vals,
            'success': True
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

# 함수 분석 실행
result = analyze_function("${selectedFunction}", ${xRange})
print("ANALYSIS_RESULT:", result)
`,
          language: 'python'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.output) {
          // 출력에서 결과 추출
          const outputLines = data.output.split('\n');
          for (const line of outputLines) {
            if (line.startsWith('ANALYSIS_RESULT:')) {
              const resultStr = line.replace('ANALYSIS_RESULT:', '').trim();
              const result = JSON.parse(resultStr);
              setAnalysisResult(result);
              break;
            }
          }
        }
      } else {
        setError('함수 분석 중 오류가 발생했습니다.');
      }
    } catch (error) {
      setError('서버 연결 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (selectedFunction) {
      analyzeFunction();
    }
  }, [selectedFunction, xRange]);

  const predefinedFunctions = [
    { value: 'x**2', label: 'f(x) = x²', description: '이차함수' },
    { value: '1/x', label: 'f(x) = 1/x', description: '분수함수' },
    { value: 'sqrt(x)', label: 'f(x) = √x', description: '제곱근함수' },
    { value: 'sin(x)', label: 'f(x) = sin(x)', description: '사인함수' },
    { value: 'cos(x)', label: 'f(x) = cos(x)', description: '코사인함수' },
    { value: 'tan(x)', label: 'f(x) = tan(x)', description: '탄젠트함수' },
    { value: 'log(x)', label: 'f(x) = log(x)', description: '로그함수' },
    { value: 'exp(x)', label: 'f(x) = eˣ', description: '지수함수' },
    { value: 'abs(x)', label: 'f(x) = |x|', description: '절댓값함수' },
    { value: 'x**3', label: 'f(x) = x³', description: '삼차함수' }
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FunctionsIcon sx={{ mr: 2, color: '#1976d2', fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
            {cardData?.title}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ color: '#666', mb: 2 }}>
          {cardData?.subtitle}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', lineHeight: 1.6 }}>
          {cardData?.description}
        </Typography>
        
        {/* Tags */}
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {cardData?.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                fontWeight: 500
              }}
            />
          ))}
        </Box>
      </Paper>

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
                  🎛️ 함수 선택
                </Typography>
              </Box>

              {/* Predefined Functions */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                  기본 함수들
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
                  gap: 2 
                }}>
                  {predefinedFunctions.map((func) => (
                    <Card
                      key={func.value}
                      sx={{
                        cursor: 'pointer',
                        border: selectedFunction === func.value ? '2px solid #1976d2' : '1px solid #e0e0e0',
                        backgroundColor: selectedFunction === func.value ? '#e3f2fd' : '#fff',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#1976d2',
                          backgroundColor: '#f5f5f5'
                        }
                      }}
                      onClick={() => setSelectedFunction(func.value)}
                    >
                      <CardContent sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                          {func.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          {func.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>

              {/* Custom Function */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                  사용자 정의 함수
                </Typography>
                <TextField
                  fullWidth
                  label="함수 표현식"
                  value={customFunction}
                  onChange={(e) => setCustomFunction(e.target.value)}
                  placeholder="예: x**2 + 2*x + 1"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setSelectedFunction(customFunction)}
                  sx={{
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' }
                  }}
                >
                  분석 실행
                </Button>
              </Box>

              {/* X Range Control */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2c3e50' }}>
                  X축 범위 설정
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    type="number"
                    label="최솟값"
                    value={xRange[0]}
                    onChange={(e) => setXRange([parseFloat(e.target.value) || -10, xRange[1]])}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <Typography variant="body2" sx={{ color: '#666' }}>~</Typography>
                  <TextField
                    type="number"
                    label="최댓값"
                    value={xRange[1]}
                    onChange={(e) => setXRange([xRange[0], parseFloat(e.target.value) || 10])}
                    size="small"
                    sx={{ flex: 1 }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Right Column - Results */}
        <Box sx={{ flex: 1 }}>
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
                <ShowChartIcon sx={{ mr: 2, color: '#1976d2', fontSize: 28 }} />
                <Typography variant="h5" sx={{ 
                  color: '#1976d2', 
                  fontWeight: 700,
                  textAlign: 'center',
                  letterSpacing: '0.5px'
                }}>
                  📊 분석 결과
                </Typography>
              </Box>

              {isAnalyzing ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <CircularProgress />
                  <Typography sx={{ ml: 2 }}>함수를 분석하고 있습니다...</Typography>
                </Box>
              ) : analysisResult ? (
                <Box>
                  {/* Function Display */}
                  <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                      선택된 함수
                    </Typography>
                    <Typography variant="h4" sx={{ 
                      fontFamily: 'monospace',
                      color: '#1976d2',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}>
                      f(x) = {analysisResult.function}
                    </Typography>
                  </Paper>

                  {/* Domain and Range */}
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: 3, 
                    mb: 3 
                  }}>
                    <Paper elevation={2} sx={{ p: 3, backgroundColor: '#e8f5e8' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}>
                        🎯 도메인 (Domain)
                      </Typography>
                      <Typography variant="h5" sx={{ 
                        fontFamily: 'monospace',
                        color: '#2e7d32',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}>
                        {analysisResult.domain}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                        함수가 정의되는 모든 입력값의 집합
                      </Typography>
                    </Paper>
                    <Paper elevation={2} sx={{ p: 3, backgroundColor: '#fff3e0' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 1 }}>
                        📈 범위 (Range)
                      </Typography>
                      <Typography variant="h5" sx={{ 
                        fontFamily: 'monospace',
                        color: '#f57c00',
                        fontWeight: 700,
                        textAlign: 'center'
                      }}>
                        {analysisResult.range}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                        함수가 출력할 수 있는 모든 값의 집합
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Graph Placeholder */}
                  <Paper elevation={2} sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', mb: 2 }}>
                      📊 함수 그래프
                    </Typography>
                    <Box sx={{ 
                      height: 300, 
                      backgroundColor: '#fff',
                      border: '2px dashed #ccc',
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Typography variant="body1" sx={{ color: '#666' }}>
                        그래프 시각화 기능은 추후 구현 예정입니다.
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <InfoIcon sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" sx={{ color: '#666' }}>
                    함수를 선택하여 분석을 시작하세요
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Learning Objectives */}
      {cardData?.learning_objectives && (
        <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 3 }}>
            🎯 학습 목표
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 2 
          }}>
            {cardData.learning_objectives.map((objective, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  backgroundColor: '#1976d2',
                  mt: 1,
                  mr: 2,
                  flexShrink: 0
                }} />
                <Typography variant="body1" sx={{ color: '#2c3e50', lineHeight: 1.6 }}>
                  {objective}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default DomainRange;
