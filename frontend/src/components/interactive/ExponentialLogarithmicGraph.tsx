import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface ExponentialLogarithmicGraphProps {
  functionType: 'exponential' | 'logarithmic';
  a: number;
  b: number;
  c: number;
  d: number;
}

const ExponentialLogarithmicGraph: React.FC<ExponentialLogarithmicGraphProps> = ({ 
  functionType, a, b, c, d 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Scale and offset
    let scale = 30;
    let offsetX = 0;
    let offsetY = 0;

    if (functionType === 'exponential') {
      // For exponential function, center around (0, b + d)
      const yIntercept = b * Math.pow(a, c) + d;
      offsetY = yIntercept * scale;
      scale = Math.min(scale, 35);
    } else {
      // For logarithmic function, center around (1-c, d)
      const xStart = 1 - c;
      offsetX = xStart * scale;
      scale = Math.min(scale, 35);
    }

    // Draw grid
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = -Math.floor(width / scale / 2); x <= Math.floor(width / scale / 2); x++) {
      const canvasX = centerX + x * scale - offsetX;
      if (canvasX >= 0 && canvasX <= width) {
        ctx.beginPath();
        ctx.moveTo(canvasX, 0);
        ctx.lineTo(canvasX, height);
        ctx.stroke();
      }
    }
    
    // Horizontal grid lines
    for (let y = -Math.floor(height / scale / 2); y <= Math.floor(height / scale / 2); y++) {
      const canvasY = centerY - y * scale + offsetY;
      if (canvasY >= 0 && canvasY <= height) {
        ctx.beginPath();
        ctx.moveTo(0, canvasY);
        ctx.lineTo(width, canvasY);
        ctx.stroke();
      }
    }

    // Draw axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(0, centerY + offsetY);
    ctx.lineTo(width, centerY + offsetY);
    ctx.stroke();
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(centerX - offsetX, 0);
    ctx.lineTo(centerX - offsetX, height);
    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels
    for (let x = -Math.floor(width / scale / 2); x <= Math.floor(width / scale / 2); x++) {
      const canvasX = centerX + x * scale - offsetX;
      if (canvasX >= 0 && canvasX <= width) {
        ctx.fillText(x.toString(), canvasX, centerY + offsetY + 15);
      }
    }
    
    // Y-axis labels
    for (let y = -Math.floor(height / scale / 2); y <= Math.floor(height / scale / 2); y++) {
      const canvasY = centerY - y * scale + offsetY;
      if (canvasY >= 0 && canvasY <= height) {
        ctx.fillText(y.toString(), centerX - offsetX - 15, canvasY + 4);
      }
    }

    // Draw asymptotes with labels
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 4]);
    
    if (functionType === 'exponential') {
      // Horizontal asymptote at y = d
      const asymptoteY = centerY - d * scale + offsetY;
      ctx.beginPath();
      ctx.moveTo(0, asymptoteY);
      ctx.lineTo(width, asymptoteY);
      ctx.stroke();
      
      // Add asymptote label
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`y = ${d}`, 10, asymptoteY - 10);
      
      // Add arrow indicators
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.moveTo(width - 20, asymptoteY - 5);
      ctx.lineTo(width - 10, asymptoteY);
      ctx.lineTo(width - 20, asymptoteY + 5);
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(20, asymptoteY - 5);
      ctx.lineTo(10, asymptoteY);
      ctx.lineTo(20, asymptoteY + 5);
      ctx.fill();
      
    } else {
      // Vertical asymptote at x = -c
      const asymptoteX = centerX + (-c) * scale - offsetX;
      ctx.beginPath();
      ctx.moveTo(asymptoteX, 0);
      ctx.lineTo(asymptoteX, height);
      ctx.stroke();
      
      // Add asymptote label
      ctx.fillStyle = '#ff6b6b';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`x = ${-c}`, asymptoteX, 20);
      
      // Add arrow indicators
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.moveTo(asymptoteX - 5, height - 20);
      ctx.lineTo(asymptoteX, height - 10);
      ctx.lineTo(asymptoteX + 5, height - 20);
      ctx.fill();
      
      ctx.beginPath();
      ctx.moveTo(asymptoteX - 5, 20);
      ctx.lineTo(asymptoteX, 10);
      ctx.lineTo(asymptoteX + 5, 20);
      ctx.fill();
    }
    
    ctx.setLineDash([]);

    // Draw function
    ctx.strokeStyle = '#1976d2';
    ctx.lineWidth = 3;
    ctx.beginPath();

    if (functionType === 'exponential') {
      // Draw exponential function
      let firstPoint = true;
      for (let i = 0; i < width; i++) {
        const x = (i - centerX + offsetX) / scale;
        const y = b * Math.pow(a, x + c) + d;
        const canvasY = centerY - y * scale + offsetY;
        
        if (canvasY >= 0 && canvasY <= height) {
          if (firstPoint) {
            ctx.moveTo(i, canvasY);
            firstPoint = false;
          } else {
            ctx.lineTo(i, canvasY);
          }
        }
      }
    } else {
      // Draw logarithmic function
      let firstPoint = true;
      for (let i = 0; i < width; i++) {
        const x = (i - centerX + offsetX) / scale;
        if (x + c > 0) { // Domain check
          const y = b * Math.log(x + c) / Math.log(a) + d;
          const canvasY = centerY - y * scale + offsetY;
          
          if (canvasY >= 0 && canvasY <= height) {
            if (firstPoint) {
              ctx.moveTo(i, canvasY);
              firstPoint = false;
            } else {
              ctx.lineTo(i, canvasY);
            }
          }
        }
      }
    }
    
    ctx.stroke();

    // Draw key points
    ctx.fillStyle = '#ff9800';
    ctx.strokeStyle = '#ff9800';
    ctx.lineWidth = 2;
    
    if (functionType === 'exponential') {
      // Y-intercept
      const yIntercept = b * Math.pow(a, c) + d;
      const yInterceptY = centerY - yIntercept * scale + offsetY;
      ctx.beginPath();
      ctx.arc(centerX - offsetX, yInterceptY, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // X-intercept if exists
      if (b !== 0 && a > 0) {
        try {
          const rightSide = -d / b;
          if (rightSide > 0) {
            const xIntercept = Math.log(rightSide) / Math.log(a) - c;
            const xInterceptX = centerX + xIntercept * scale - offsetX;
            if (xInterceptX >= 0 && xInterceptX <= width) {
              ctx.beginPath();
              ctx.arc(xInterceptX, centerY + offsetY, 4, 0, 2 * Math.PI);
              ctx.fill();
            }
          }
        } catch {}
      }
    } else {
      // Y-intercept if exists
      if (c > 0) {
        const yIntercept = b * Math.log(c) / Math.log(a) + d;
        const yInterceptY = centerY - yIntercept * scale + offsetY;
        ctx.beginPath();
        ctx.arc(centerX - offsetX, yInterceptY, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
      
      // X-intercept if exists
      if (b !== 0 && a > 0) {
        try {
          const exponent = -d / b;
          const xIntercept = Math.pow(a, exponent) - c;
          if (xIntercept > -c) {
            const xInterceptX = centerX + xIntercept * scale - offsetX;
            if (xInterceptX >= 0 && xInterceptX <= width) {
              ctx.beginPath();
              ctx.arc(xInterceptX, centerY + offsetY, 4, 0, 2 * Math.PI);
              ctx.fill();
            }
          }
        } catch {}
      }
    }

  }, [functionType, a, b, c, d]);

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 600, color: '#1976d2' }}>
        {functionType === 'exponential' ? '📈 Exponential Function Graph' : '📉 Logarithmic Function Graph'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{
            border: '2px solid #e0e0e0',
            borderRadius: '8px',
            background: '#ffffff'
          }}
        />
      </Box>
             <Box sx={{ mt: 2, textAlign: 'center' }}>
         <Typography variant="body2" color="text.secondary">
           🔴 Dashed line = Asymptote (점근선) | 🟠 Points = Intercepts (절편)
         </Typography>
         <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
           {functionType === 'exponential' 
             ? `수평점근선: y = ${d} (x축 점근선 없음)` 
             : `수직점근선: x = ${-c} (y축 점근선 없음)`
           }
         </Typography>
       </Box>
    </Paper>
  );
};

export default ExponentialLogarithmicGraph;
