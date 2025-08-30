const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory (production build)
app.use(express.static(path.join(__dirname, 'dist')));

// Serve static files from src directory (development)
app.use('/dev', express.static(path.join(__dirname, 'src')));

// API endpoint for health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// API endpoint for study stats (mock data)
app.get('/api/stats', (req, res) => {
    res.json({
        totalUsers: 1250,
        completedLessons: 8500,
        averageScore: 87,
        activeToday: 145
    });
});

// Development route - serve from src
app.get('/dev', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Production route - serve built files
app.get('*', (req, res) => {
    // Check if dist directory exists and has index.html
    const distIndex = path.join(__dirname, 'dist', 'index.html');
    const srcIndex = path.join(__dirname, 'src', 'index.html');
    
    try {
        require('fs').accessSync(distIndex);
        res.sendFile(distIndex);
    } catch (err) {
        // Fallback to src for development
        res.sendFile(srcIndex);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Interactive Edu Server running on http://0.0.0.0:${PORT}`);
    console.log(`📚 Access the app at: http://localhost:${PORT}`);
    console.log(`🔧 Development mode: http://localhost:${PORT}/dev`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;