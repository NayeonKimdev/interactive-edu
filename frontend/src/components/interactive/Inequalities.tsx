import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Slider,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';
import { PlayArrow as PlayIcon, Refresh as RefreshIcon } from '@mui/icons-material';

interface InequalitiesProps {
  cardId: string;
}

interface CardData {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  prerequisites: string[];
  estimatedTime: number;
}

const Inequalities: React.FC<InequalitiesProps> = ({ cardId }) => {
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 일차 부등식 상태
  const [linearA, setLinearA] = useState(2);
  const [linearB, setLinearB] = useState(-6);
  const [linearInequalityType, setLinearInequalityType] = useState('>');

  // 이차 부등식 상태
  const [quadraticA, setQuadraticA] = useState(1);
  const [quadraticB, setQuadraticB] = useState(-3);
  const [quadraticC, setQuadraticC] = useState(2);
  const [quadraticInequalityType, setQuadraticInequalityType] = useState('>');

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

  const solveLinearInequality = (a: number, b: number, type: string) => {
    if (a === 0) {
      if (b > 0) {
        return type === '>' || type === '>=' ? '모든 실수' : '해 없음';
      } else if (b < 0) {
        return type === '>' || type === '>=' ? '해 없음' : '모든 실수';
      } else {
        return type === '>=' || type === '<=' ? '모든 실수' : '해 없음';
      }
    }

    const boundary = -b / a;
    if (a > 0) {
      if (type === '>') return `x > ${boundary.toFixed(2)}`;
      if (type === '>=') return `x ≥ ${boundary.toFixed(2)}`;
      if (type === '<') return `x < ${boundary.toFixed(2)}`;
      if (type === '<=') return `x ≤ ${boundary.toFixed(2)}`;
    } else {
      if (type === '>') return `x < ${boundary.toFixed(2)}`;
      if (type === '>=') return `x ≤ ${boundary.toFixed(2)}`;
      if (type === '<') return `x > ${boundary.toFixed(2)}`;
      if (type === '<=') return `x ≥ ${boundary.toFixed(2)}`;
    }
    return '해 없음';
  };

  const solveQuadraticInequality = (a: number, b: number, c: number, type: string) => {
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant > 0) {
      const x1 = (-b - Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root1 = Math.min(x1, x2);
      const root2 = Math.max(x1, x2);
      
      if (a > 0) {
        if (type === '>' || type === '>=') {
          return `x < ${root1.toFixed(2)} 또는 x > ${root2.toFixed(2)}`;
        } else {
          return `${root1.toFixed(2)} ≤ x ≤ ${root2.toFixed(2)}`;
        }
      } else {
        if (type === '>' || type === '>=') {
          return `${root1.toFixed(2)} ≤ x ≤ ${root2.toFixed(2)}`;
        } else {
          return `x < ${root1.toFixed(2)} 또는 x > ${root2.toFixed(2)}`;
        }
      }
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      if (type === '>' || type === '>=') {
        return a > 0 ? `x ≠ ${root.toFixed(2)}` : `x = ${root.toFixed(2)}`;
      } else {
        return a > 0 ? `x = ${root.toFixed(2)}` : `x ≠ ${root.toFixed(2)}`;
      }
    } else {
      return a > 0 ? (type === '>' || type === '>=' ? '모든 실수' : '해 없음') 
                   : (type === '>' || type === '>=' ? '해 없음' : '모든 실수');
    }
  };

  const getQuadraticFactoring = (a: number, b: number, c: number) => {
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant > 0) {
      const x1 = (-b - Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root1 = Math.min(x1, x2);
      const root2 = Math.max(x1, x2);
      
      if (a === 1) {
        return `(x - ${root1.toFixed(2)})(x - ${root2.toFixed(2)})`;
      } else if (a === -1) {
        return `-(x - ${root1.toFixed(2)})(x - ${root2.toFixed(2)})`;
      } else {
        return `${a}(x - ${root1.toFixed(2)})(x - ${root2.toFixed(2)})`;
      }
    } else if (discriminant === 0) {
      const root = -b / (2 * a);
      if (a === 1) {
        return `(x - ${root.toFixed(2)})²`;
      } else if (a === -1) {
        return `-(x - ${root.toFixed(2)})²`;
      } else {
        return `${a}(x - ${root.toFixed(2)})²`;
      }
    } else {
      return '인수분해 불가능';
    }
  };

  const resetValues = () => {
    setLinearA(2);
    setLinearB(-6);
    setLinearInequalityType('>');
    setQuadraticA(1);
    setQuadraticB(-3);
    setQuadraticC(2);
    setQuadraticInequalityType('>');
  };

  // 수직선 시각화 컴포넌트
  const NumberLineVisualization = ({ boundary, type, solution, isQuadratic = false, roots = [] }: { 
    boundary: number, 
    type: string, 
    solution: string, 
    isQuadratic?: boolean,
    roots?: number[]
  }) => {
    const isClosed = type === '>=' || type === '<=';
    
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          📏 수직선상 해집합
        </Typography>
        <Box sx={{ 
          position: 'relative', 
          height: 100, 
          bgcolor: 'white', 
          border: '2px solid #e0e0e0',
          borderRadius: 2,
          display: 'flex', 
          alignItems: 'center',
          px: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* 수직선 */}
          <Box sx={{ 
            position: 'absolute', 
            left: '50%', 
            top: 0, 
            bottom: 0, 
            width: 2, 
            bgcolor: '#666',
            transform: 'translateX(-50%)'
          }} />
          
          {/* 눈금들 */}
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((tick) => (
            <Box key={tick} sx={{ 
              position: 'absolute',
              left: `${50 + tick * 10}%`,
              top: '50%',
              width: 1,
              height: 12,
              bgcolor: '#999',
              transform: 'translate(-50%, -50%)'
            }} />
          ))}
          
          {/* 해집합 영역 표시 */}
          {(() => {
            if (isQuadratic && roots.length === 2) {
              const [root1, root2] = roots;
              const a = quadraticA;
              const isGreater = type === '>' || type === '>=';
              
              if (a > 0) {
                if (isGreater) {
                  // x < root1 또는 x > root2
                  return (
                    <>
                      <Box sx={{
                        position: 'absolute',
                        left: '0%',
                        right: `${50 - root1 * 10}%`,
                        top: '50%',
                        height: 8,
                        bgcolor: '#ff4444',
                        opacity: 0.6,
                        transform: 'translateY(-50%)'
                      }} />
                      <Box sx={{
                        position: 'absolute',
                        left: `${50 + root2 * 10}%`,
                        right: '0%',
                        top: '50%',
                        height: 8,
                        bgcolor: '#ff4444',
                        opacity: 0.6,
                        transform: 'translateY(-50%)'
                      }} />
                    </>
                  );
                } else {
                  // root1 < x < root2
                  return (
                    <Box sx={{
                      position: 'absolute',
                      left: `${50 + root1 * 10}%`,
                      right: `${50 - root2 * 10}%`,
                      top: '50%',
                      height: 8,
                      bgcolor: '#ff4444',
                      opacity: 0.6,
                      transform: 'translateY(-50%)'
                    }} />
                  );
                }
              } else {
                if (isGreater) {
                  // root1 < x < root2
                  return (
                    <Box sx={{
                      position: 'absolute',
                      left: `${50 + root1 * 10}%`,
                      right: `${50 - root2 * 10}%`,
                      top: '50%',
                      height: 8,
                      bgcolor: '#ff4444',
                      opacity: 0.6,
                      transform: 'translateY(-50%)'
                    }} />
                  );
                } else {
                  // x < root1 또는 x > root2
                  return (
                    <>
                      <Box sx={{
                        position: 'absolute',
                        left: '0%',
                        right: `${50 - root1 * 10}%`,
                        top: '50%',
                        height: 8,
                        bgcolor: '#ff4444',
                        opacity: 0.6,
                        transform: 'translateY(-50%)'
                      }} />
                      <Box sx={{
                        position: 'absolute',
                        left: `${50 + root2 * 10}%`,
                        right: '0%',
                        top: '50%',
                        height: 8,
                        bgcolor: '#ff4444',
                        opacity: 0.6,
                        transform: 'translateY(-50%)'
                      }} />
                    </>
                  );
                }
              }
            } else {
              // 일차 부등식
              const isGreater = type.includes('>');
              return (
                <Box sx={{
                  position: 'absolute',
                  left: isGreater ? `${50 + boundary * 10}%` : '0%',
                  right: isGreater ? '0%' : `${50 - boundary * 10}%`,
                  top: '50%',
                  height: 8,
                  bgcolor: '#ff4444',
                  opacity: 0.6,
                  transform: 'translateY(-50%)'
                }} />
              );
            }
          })()}
          
          {/* 경계점들 */}
          {isQuadratic && roots.length === 2 ? (
            roots.map((root, index) => (
              <Box key={index} sx={{ 
                position: 'absolute',
                left: `${50 + root * 10}%`,
                top: '50%',
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: isClosed ? '#1976d2' : 'white',
                border: '3px solid #1976d2',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }} />
            ))
          ) : (
            <Box sx={{ 
              position: 'absolute',
              left: `${50 + boundary * 10}%`,
              top: '50%',
              width: 16,
              height: 16,
              borderRadius: '50%',
              bgcolor: isClosed ? '#1976d2' : 'white',
              border: '3px solid #1976d2',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }} />
          )}
          
          {/* 숫자 라벨들 */}
          {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((num) => (
            <Typography key={num} variant="caption" sx={{ 
              position: 'absolute',
              left: `${50 + num * 10}%`,
              bottom: -25,
              transform: 'translateX(-50%)',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              color: '#555'
            }}>
              {num}
            </Typography>
          ))}
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: '#666', textAlign: 'center' }}>
          해: <strong>{solution}</strong>
        </Typography>
      </Box>
    );
  };

  // 사분면 시각화 컴포넌트
  const QuadrantVisualization = ({ a, b, c, type, isLinear = false }: { a: number, b: number, c: number, type: string, isLinear?: boolean }) => {
    const size = 250;
    const center = size / 2;
    
    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          📊 사분면상 영역
        </Typography>
        <Box sx={{ 
          position: 'relative', 
          width: size, 
          height: size, 
          bgcolor: 'white', 
          border: '2px solid #e0e0e0',
          borderRadius: 2,
          mx: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {/* 좌표축 */}
          <Box sx={{ 
            position: 'absolute', 
            left: center, 
            top: 0, 
            bottom: 0, 
            width: 2, 
            bgcolor: '#666'
          }} />
          <Box sx={{ 
            position: 'absolute', 
            top: center, 
            left: 0, 
            right: 0, 
            height: 2, 
            bgcolor: '#666'
          }} />
          
          {/* 눈금들 */}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((tick) => (
            <React.Fragment key={tick}>
              <Box sx={{ 
                position: 'absolute',
                left: center + tick * 25,
                top: center - 3,
                width: 6,
                height: 6,
                bgcolor: '#999',
                borderRadius: '50%'
              }} />
              <Box sx={{ 
                position: 'absolute',
                left: center - 3,
                top: center + tick * 25,
                width: 6,
                height: 6,
                bgcolor: '#999',
                borderRadius: '50%'
              }} />
            </React.Fragment>
          ))}
          
          {/* 함수 그래프 */}
          <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff4444', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#ff4444', stopOpacity: 0.2 }} />
              </linearGradient>
            </defs>
            
            {/* 해집합 영역 */}
            <path
              d={(() => {
                const points = [];
                for (let x = -4; x <= 4; x += 0.1) {
                  const y = isLinear ? a * x + b : a * x * x + b * x + c;
                  const screenX = center + x * 25;
                  const screenY = center - y * 25;
                  points.push(`${screenX},${screenY}`);
                }
                return `M ${points.join(' L ')}`;
              })()}
              fill="url(#gradient)"
              stroke="none"
            />
            
            {/* 함수 선 */}
            <path
              d={(() => {
                const points = [];
                for (let x = -4; x <= 4; x += 0.1) {
                  const y = isLinear ? a * x + b : a * x * x + b * x + c;
                  const screenX = center + x * 25;
                  const screenY = center - y * 25;
                  points.push(`${screenX},${screenY}`);
                }
                return `M ${points.join(' L ')}`;
              })()}
              fill="none"
              stroke="#1976d2"
              strokeWidth="3"
            />
          </svg>
          
          {/* 원점 라벨 */}
          <Typography variant="caption" sx={{ 
            position: 'absolute',
            left: center + 8,
            top: center + 8,
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: '#666'
          }}>
            O
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: '#666', textAlign: 'center', fontWeight: 'bold' }}>
          {isLinear ? `y = ${a}x + ${b}` : `y = ${a}x² + ${b}x + ${c}`}
        </Typography>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h6">로딩 중...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  const linearSolution = solveLinearInequality(linearA, linearB, linearInequalityType);
  const quadraticSolution = solveQuadraticInequality(quadraticA, quadraticB, quadraticC, quadraticInequalityType);
  const linearBoundary = linearA !== 0 ? -linearB / linearA : 0;
  
  // 이차방정식의 근 계산
  const quadraticDiscriminant = quadraticB * quadraticB - 4 * quadraticA * quadraticC;
  const quadraticRoots = quadraticDiscriminant > 0 ? [
    (-quadraticB - Math.sqrt(quadraticDiscriminant)) / (2 * quadraticA),
    (-quadraticB + Math.sqrt(quadraticDiscriminant)) / (2 * quadraticA)
  ].sort((a, b) => a - b) : [];

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* 헤더 */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          {cardData?.title || '부등식의 이해와 해결'}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          {cardData?.description || '일차 부등식과 이차 부등식을 해결하고, 수직선상 범위와 사분면에서의 영역을 시각화하는 학습 카드입니다.'}
        </Typography>
      </Paper>

      {/* 학습 목표 */}
      {cardData?.learningObjectives && (
        <Card sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              🎯 학습 목표
            </Typography>
            <ul>
              {cardData.learningObjectives.map((objective, index) => (
                <li key={index}>
                  <Typography variant="body1">{objective}</Typography>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* 일차 부등식 섹션 */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            📈 일차 부등식
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            ax + b {linearInequalityType} 0 형태의 부등식을 해결합니다.
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                계수 설정
              </Typography>
              
              {/* a 계수 */}
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>a (x의 계수): {linearA}</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Slider
                    value={linearA}
                    onChange={(_, value) => setLinearA(value as number)}
                    min={-5}
                    max={5}
                    step={0.5}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    type="number"
                    value={linearA}
                    onChange={(e) => setLinearA(parseFloat(e.target.value) || 0)}
                    size="small"
                    sx={{ width: 100 }}
                    inputProps={{ step: 0.5 }}
                  />
                </Box>
              </Box>
              
              {/* b 계수 */}
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>b (상수항): {linearB}</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Slider
                    value={linearB}
                    onChange={(_, value) => setLinearB(value as number)}
                    min={-10}
                    max={10}
                    step={0.5}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    type="number"
                    value={linearB}
                    onChange={(e) => setLinearB(parseFloat(e.target.value) || 0)}
                    size="small"
                    sx={{ width: 100 }}
                    inputProps={{ step: 0.5 }}
                  />
                </Box>
              </Box>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>부등식 유형</InputLabel>
                <Select
                  value={linearInequalityType}
                  onChange={(e) => setLinearInequalityType(e.target.value)}
                  label="부등식 유형"
                >
                  <MenuItem value=">">{'>'}</MenuItem>
                  <MenuItem value=">=">{'>='}</MenuItem>
                  <MenuItem value="<">{'<'}</MenuItem>
                  <MenuItem value="<=">{'<='}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                해집합
              </Typography>
              <Paper elevation={2} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  부등식: {linearA}x + {linearB} {linearInequalityType} 0
                </Typography>
                <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  해: {linearSolution}
                </Typography>
              </Paper>
              
              {/* 수직선 시각화 */}
              {linearA !== 0 && (
                <NumberLineVisualization 
                  boundary={linearBoundary} 
                  type={linearInequalityType} 
                  solution={linearSolution} 
                />
              )}
            </Box>
          </Box>
          
          {/* 사분면 시각화 */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <QuadrantVisualization 
              a={linearA} 
              b={linearB} 
              c={0} 
              type={linearInequalityType} 
              isLinear={true} 
            />
          </Box>
        </CardContent>
      </Card>

      {/* 이차 부등식 섹션 */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            📊 이차 부등식
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            ax² + bx + c {quadraticInequalityType} 0 형태의 부등식을 해결합니다.
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                계수 설정
              </Typography>
              
              {/* a 계수 */}
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>a (x²의 계수): {quadraticA}</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Slider
                    value={quadraticA}
                    onChange={(_, value) => setQuadraticA(value as number)}
                    min={-3}
                    max={3}
                    step={0.5}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    type="number"
                    value={quadraticA}
                    onChange={(e) => setQuadraticA(parseFloat(e.target.value) || 0)}
                    size="small"
                    sx={{ width: 100 }}
                    inputProps={{ step: 0.5 }}
                  />
                </Box>
              </Box>
              
              {/* b 계수 */}
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>b (x의 계수): {quadraticB}</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Slider
                    value={quadraticB}
                    onChange={(_, value) => setQuadraticB(value as number)}
                    min={-5}
                    max={5}
                    step={0.5}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    type="number"
                    value={quadraticB}
                    onChange={(e) => setQuadraticB(parseFloat(e.target.value) || 0)}
                    size="small"
                    sx={{ width: 100 }}
                    inputProps={{ step: 0.5 }}
                  />
                </Box>
              </Box>
              
              {/* c 계수 */}
              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>c (상수항): {quadraticC}</Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Slider
                    value={quadraticC}
                    onChange={(_, value) => setQuadraticC(value as number)}
                    min={-5}
                    max={5}
                    step={0.5}
                    marks
                    valueLabelDisplay="auto"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    type="number"
                    value={quadraticC}
                    onChange={(e) => setQuadraticC(parseFloat(e.target.value) || 0)}
                    size="small"
                    sx={{ width: 100 }}
                    inputProps={{ step: 0.5 }}
                  />
                </Box>
              </Box>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>부등식 유형</InputLabel>
                <Select
                  value={quadraticInequalityType}
                  onChange={(e) => setQuadraticInequalityType(e.target.value)}
                  label="부등식 유형"
                >
                  <MenuItem value=">">{'>'}</MenuItem>
                  <MenuItem value=">=">{'>='}</MenuItem>
                  <MenuItem value="<">{'<'}</MenuItem>
                  <MenuItem value="<=">{'<='}</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                해집합
              </Typography>
              <Paper elevation={2} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom>
                  부등식: {quadraticA}x² + {quadraticB}x + {quadraticC} {quadraticInequalityType} 0
                </Typography>
                <Typography variant="h5" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  해: {quadraticSolution}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, color: '#666' }}>
                  판별식: D = {quadraticB}² - 4×{quadraticA}×{quadraticC} = {quadraticDiscriminant.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                  인수분해: {getQuadraticFactoring(quadraticA, quadraticB, quadraticC)}
                </Typography>
                {quadraticRoots.length === 2 && (
                  <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                    근: x = {quadraticRoots[0].toFixed(2)}, x = {quadraticRoots[1].toFixed(2)}
                  </Typography>
                )}
              </Paper>
              
              {/* 수직선 시각화 */}
              {quadraticDiscriminant > 0 && (
                <NumberLineVisualization 
                  boundary={0} 
                  type={quadraticInequalityType} 
                  solution={quadraticSolution}
                  isQuadratic={true}
                  roots={quadraticRoots}
                />
              )}
            </Box>
          </Box>
          
          {/* 사분면 시각화 */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <QuadrantVisualization 
              a={quadraticA} 
              b={quadraticB} 
              c={quadraticC} 
              type={quadraticInequalityType} 
              isLinear={false} 
            />
          </Box>
        </CardContent>
      </Card>

      {/* 리셋 버튼 */}
      <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={resetValues}
          sx={{ px: 4, py: 1.5, borderRadius: 2 }}
        >
          값 초기화
        </Button>
      </Box>

      {/* 추가 정보 */}
      <Card sx={{ mt: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            💡 학습 팁
          </Typography>
          <Typography variant="body1" paragraph>
            • 일차 부등식의 해는 기울기(a)의 부호에 따라 방향이 결정됩니다.
          </Typography>
          <Typography variant="body1" paragraph>
            • 이차 부등식의 해는 판별식과 이차항 계수(a)의 부호에 따라 달라집니다.
          </Typography>
          <Typography variant="body1" paragraph>
            • 수직선상에서 해집합을 표시할 때는 경계점의 포함 여부를 주의하세요.
          </Typography>
          <Typography variant="body1" paragraph>
            • 이차부등식의 인수분해 형태를 보면 해집합을 더 쉽게 이해할 수 있습니다.
          </Typography>
          <Typography variant="body1">
            • 사분면상에서 영역을 시각화할 때는 부등호 방향에 따라 위쪽/아래쪽을 구분하세요.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Inequalities;
