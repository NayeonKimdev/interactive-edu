import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface LinearGraphProps {
  m: number;
  b: number;
}

const LinearGraph: React.FC<LinearGraphProps> = ({ m, b }) => {
  // 그래프 데이터 생성
  const xValues = Array.from({ length: 21 }, (_, i) => i - 10);
  const yValues = xValues.map(x => m * x + b);
  
  // x절편 계산
  const xIntercept = m !== 0 ? -b / m : null;
  const yIntercept = b;
  
  // SVG 좌표계 변환 (SVG는 y축이 반대)
  const width = 400;
  const height = 300;
  const padding = 40;
  const xScale = (width - 2 * padding) / 20; // -10 to 10
  const yScale = (height - 2 * padding) / 20; // -10 to 10
  
  const transformX = (x: number) => padding + (x + 10) * xScale;
  const transformY = (y: number) => height - padding - (y + 10) * yScale;
  
  // 선 그래프 경로 생성
  const pathData = xValues.map((x, i) => {
    const xPos = transformX(x);
    const yPos = transformY(yValues[i]);
    return `${i === 0 ? 'M' : 'L'} ${xPos} ${yPos}`;
  }).join(' ');
  
  // 특별한 경우들 확인
  const getSpecialCaseInfo = () => {
    if (m === 0) {
      return {
        type: 'Constant Function',
        description: 'Horizontal line (y = constant)',
        color: '#e74c3c'
      };
    } else if (m === 1 && b === 0) {
      return {
        type: 'Identity Function',
        description: 'y = x (45° line through origin)',
        color: '#27ae60'
      };
    } else if (m === -1 && b === 0) {
      return {
        type: 'Negative Identity',
        description: 'y = -x (negative 45° line through origin)',
        color: '#f39c12'
      };
    } else if (b === 0) {
      return {
        type: 'Direct Proportion',
        description: 'Line passes through origin',
        color: '#9b59b6'
      };
    } else {
      return {
        type: 'General Linear Function',
        description: 'Standard linear function',
        color: '#667eea'
      };
    }
  };
  
  const specialCase = getSpecialCaseInfo();

  return (
    <Paper 
      elevation={6} 
      sx={{ 
        p: 3, 
        borderRadius: 4,
        background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
        border: `3px solid ${specialCase.color}`,
        boxShadow: `0 8px 32px ${specialCase.color}20`
      }}
    >
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          color: specialCase.color,
          mb: 1,
          letterSpacing: '0.5px'
        }}>
          📈 Linear Function Graph
        </Typography>
        <Typography variant="subtitle1" sx={{ 
          color: '#666',
          fontStyle: 'italic',
          fontWeight: 500
        }}>
          {specialCase.type}: {specialCase.description}
        </Typography>
      </Box>

      <Box sx={{ 
        height: 400, 
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
        border: `2px solid ${specialCase.color}40`
      }}>
        <svg width={width} height={height} style={{ display: 'block', margin: 'auto' }}>
          {/* 배경 격자 */}
          <defs>
            <pattern id="grid" width={xScale} height={yScale} patternUnits="userSpaceOnUse">
              <path d={`M ${xScale} 0 L 0 0 0 ${yScale}`} fill="none" stroke="#e0e0e0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* 축 */}
          <line x1={padding} y1={0} x2={padding} y2={height} stroke="#333" strokeWidth="2" />
          <line x1={0} y1={height - padding} x2={width} y2={height - padding} stroke="#333" strokeWidth="2" />
          
          {/* 선 그래프 */}
          <path d={pathData} stroke={specialCase.color} strokeWidth="3" fill="none" />
          
          {/* y절편 표시 */}
          <circle 
            cx={transformX(0)} 
            cy={transformY(yIntercept)} 
            r="6" 
            fill="#ff6b6b" 
            stroke="white" 
            strokeWidth="2"
          />
          <text 
            x={transformX(0) + 10} 
            y={transformY(yIntercept) - 10} 
            fontSize="12" 
            fill="#ff6b6b" 
            fontWeight="bold"
          >
            (0, {yIntercept.toFixed(1)})
          </text>
          
          {/* x절편 표시 */}
          {xIntercept !== null && xIntercept >= -10 && xIntercept <= 10 && (
            <>
              <circle 
                cx={transformX(xIntercept)} 
                cy={transformY(0)} 
                r="6" 
                fill="#4ecdc4" 
                stroke="white" 
                strokeWidth="2"
              />
              <text 
                x={transformX(xIntercept) + 10} 
                y={transformY(0) + 20} 
                fontSize="12" 
                fill="#4ecdc4" 
                fontWeight="bold"
              >
                ({xIntercept.toFixed(1)}, 0)
              </text>
            </>
          )}
          
          {/* 축 라벨 */}
          <text x={width / 2} y={height - 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333">x</text>
          <text x={10} y={height / 2} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333" transform={`rotate(-90, 10, ${height / 2})`}>y</text>
        </svg>
      </Box>

      {/* 함수 정보 표시 */}
      <Box sx={{ 
        mt: 3, 
        p: 2, 
        borderRadius: 2, 
        bgcolor: `${specialCase.color}10`,
        border: `2px solid ${specialCase.color}30`
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 700, 
          color: specialCase.color,
          mb: 2,
          textAlign: 'center'
        }}>
          Function Properties
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
          gap: 2 
        }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Slope (m):
            </Typography>
            <Typography variant="body1" sx={{ 
              fontWeight: 700, 
              color: m > 0 ? '#27ae60' : m < 0 ? '#e74c3c' : '#f39c12'
            }}>
              {m} {m > 0 ? '(increasing)' : m < 0 ? '(decreasing)' : '(constant)'}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Y-intercept (b):
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#9b59b6' }}>
              {b} → (0, {b})
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
              X-intercept:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#e67e22' }}>
              {m !== 0 ? `(-${b}/${m}) → (${(-b/m).toFixed(2)}, 0)` : 'None (horizontal line)'}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Domain & Range:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 700, color: '#34495e' }}>
              (-∞, ∞) for both
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default LinearGraph;
