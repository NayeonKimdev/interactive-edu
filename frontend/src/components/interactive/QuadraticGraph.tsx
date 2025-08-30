import React, { useEffect, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface QuadraticGraphProps {
  a: number;
  b: number;
  c: number;
}

const QuadraticGraph: React.FC<QuadraticGraphProps> = ({ a, b, c }) => {
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
    
    // Dynamic scale based on vertex position
    let scale = 30; // default scale
    let offsetX = 0;
    let offsetY = 0;
    
    if (a !== 0) {
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX * vertexX + b * vertexX + c;
      
      // Calculate the range needed to show the function properly
      const xRange = Math.max(Math.abs(vertexX), 6); // at least 6 units on each side
      const yRange = Math.max(Math.abs(vertexY), 6);
      
      // Adjust scale to fit the function
      const scaleX = width / (xRange * 2.5);
      const scaleY = height / (yRange * 2.5);
      scale = Math.min(scaleX, scaleY, 40); // cap at 40 pixels per unit
      
      // Center the view on the vertex
      offsetX = vertexX * scale;
      offsetY = vertexY * scale;
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
      if (x === 0) continue;
      const xPos = centerX + x * scale - offsetX;
      if (xPos >= 0 && xPos <= width) {
        ctx.fillText(x.toString(), xPos, centerY + offsetY + 15);
      }
    }
    
    // Y-axis labels
    for (let y = -Math.floor(height / scale / 2); y <= Math.floor(height / scale / 2); y++) {
      if (y === 0) continue;
      const yPos = centerY - y * scale + offsetY;
      if (yPos >= 0 && yPos <= height) {
        ctx.fillText(y.toString(), centerX - offsetX - 15, yPos + 4);
      }
    }

    // Draw origin label
    ctx.fillText('0', centerX - offsetX + 15, centerY + offsetY + 15);

    // Draw quadratic function
    if (a !== 0) {
      ctx.strokeStyle = '#ff6b9d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      let firstPoint = true;
      const xStart = -width / scale / 2;
      const xEnd = width / scale / 2;
      
      for (let x = xStart; x <= xEnd; x += 0.1) {
        const y = a * x * x + b * x + c;
        const canvasX = centerX + x * scale - offsetX;
        const canvasY = centerY - y * scale + offsetY;
        
        if (canvasX >= 0 && canvasX <= width && canvasY >= 0 && canvasY <= height) {
          if (firstPoint) {
            ctx.moveTo(canvasX, canvasY);
            firstPoint = false;
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        }
      }
      ctx.stroke();

      // Draw vertex
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX * vertexX + b * vertexX + c;
      const canvasVertexX = centerX + vertexX * scale - offsetX;
      const canvasVertexY = centerY - vertexY * scale + offsetY;
      
      if (canvasVertexX >= 0 && canvasVertexX <= width && canvasVertexY >= 0 && canvasVertexY <= height) {
        ctx.fillStyle = '#ff6b9d';
        ctx.beginPath();
        ctx.arc(canvasVertexX, canvasVertexY, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw vertex label
        ctx.fillStyle = '#ff6b9d';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(`(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`, canvasVertexX, canvasVertexY - 10);
      }
    }

    // Draw roots if they exist
    if (a !== 0) {
      const discriminant = b * b - 4 * a * c;
      if (discriminant >= 0) {
        const sqrtDisc = Math.sqrt(discriminant);
        const x1 = (-b + sqrtDisc) / (2 * a);
        const x2 = (-b - sqrtDisc) / (2 * a);
        
        // Draw root 1
        const canvasX1 = centerX + x1 * scale - offsetX;
        const canvasY1 = centerY + offsetY;
        if (canvasX1 >= 0 && canvasX1 <= width) {
          ctx.fillStyle = '#4CAF50';
          ctx.beginPath();
          ctx.arc(canvasX1, canvasY1, 4, 0, 2 * Math.PI);
          ctx.fill();
          
          // Draw root label
          ctx.fillStyle = '#4CAF50';
          ctx.font = '12px Arial';
          ctx.fillText(`x₁=${x1.toFixed(2)}`, canvasX1, canvasY1 + 20);
        }
        
        // Draw root 2
        const canvasX2 = centerX + x2 * scale - offsetX;
        const canvasY2 = centerY + offsetY;
        if (canvasX2 >= 0 && canvasX2 <= width) {
          ctx.fillStyle = '#4CAF50';
          ctx.beginPath();
          ctx.arc(canvasX2, canvasY2, 4, 0, 2 * Math.PI);
          ctx.fill();
          
          // Draw root label
          ctx.fillStyle = '#4CAF50';
          ctx.font = '12px Arial';
          ctx.fillText(`x₂=${x2.toFixed(2)}`, canvasX2, canvasY2 + 20);
        }
      }
    }

  }, [a, b, c]);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, #fff5f7 0%, #fff 100%)',
        border: '2px solid #ffe0e6'
      }}
    >
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: '#ff6b9d', 
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 2
        }}
      >
        📊 Quadratic Function Graph
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mb: 2
      }}>
        <Typography variant="body2" color="text.secondary">
          f(x) = {a !== 0 ? (a === 1 ? '' : a === -1 ? '-' : a) : '0'}x²
          {b > 0 ? ' + ' + b : b < 0 ? ' ' + b : ''}x
          {c > 0 ? ' + ' + c : c < 0 ? ' ' + c : ''}
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        border: '3px solid #ffe0e6',
        borderRadius: 2,
        overflow: 'hidden',
        background: '#fff'
      }}>
        <canvas
          ref={canvasRef}
          width={450}
          height={350}
          style={{
            display: 'block',
            cursor: 'crosshair'
          }}
        />
      </Box>
      
      <Box sx={{ 
        mt: 2, 
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#888'
      }}>
        💡 Dynamic view • Vertex-centered • Auto-zoom
      </Box>
    </Paper>
  );
};

export default QuadraticGraph;
