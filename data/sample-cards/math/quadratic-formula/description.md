# Quadratic Function (이차함수)

## Learning Objectives
- Understand and visualize quadratic function graphs
- Learn key properties: zeros, y-intercepts, vertex, and discriminant
- Master transformation between standard form and vertex form
- Observe in real-time how coefficients affect the graph and properties
- Analyze the relationship between different forms of quadratic functions

## Quadratic Function Forms

### 1. Standard Form
**f(x) = ax² + bx + c** (a ≠ 0)

### 2. Vertex Form
**f(x) = a(x - h)² + k**
- **h**: x-coordinate of vertex
- **k**: y-coordinate of vertex
- **a**: determines width and direction

### 3. Factored Form
**f(x) = a(x - r₁)(x - r₂)**
- **r₁, r₂**: zeros (roots) of the function

## Key Properties and Analysis

### 1. Graph Characteristics
- **Shape**: Parabola
- **Direction**: 
  - a > 0: opens upward (minimum)
  - a < 0: opens downward (maximum)
- **Width**: |a| determines how narrow/wide the parabola is

### 2. Zeros (Roots/X-intercepts)
- **Definition**: Points where f(x) = 0
- **Formula**: x = (-b ± √(b² - 4ac)) / (2a)
- **Count**: Maximum of 2 real roots
- **Relationship**: Zeros are identical to x-intercepts

### 3. Y-intercept
- **Definition**: Point where function intersects y-axis
- **Calculation**: f(0) = c
- **Coordinates**: (0, c)

### 4. Vertex (Minimum/Maximum Point)
- **Definition**: The highest or lowest point of the parabola
- **x-coordinate**: x = -b/(2a)
- **y-coordinate**: f(-b/(2a)) = -b²/(4a) + c
- **Significance**: 
  - a > 0: minimum value
  - a < 0: maximum value

### 5. Discriminant Analysis
- **Formula**: D = b² - 4ac
- **Cases**:
  - D > 0: Two distinct real roots
  - D = 0: One real root (repeated root)
  - D < 0: Two distinct complex roots (no real roots)

## Form Transformations

### Standard Form → Vertex Form
1. **Complete the square**:
   f(x) = ax² + bx + c
   = a(x² + (b/a)x) + c
   = a(x² + (b/a)x + (b/2a)² - (b/2a)²) + c
   = a(x + b/2a)² - b²/4a + c
   = a(x + b/2a)² + (4ac - b²)/4a

2. **Result**: f(x) = a(x - h)² + k
   where h = -b/2a, k = (4ac - b²)/4a

### Vertex Form → Standard Form
1. **Expand**: f(x) = a(x - h)² + k
   = a(x² - 2hx + h²) + k
   = ax² - 2ahx + ah² + k

2. **Result**: f(x) = ax² + bx + c
   where b = -2ah, c = ah² + k

## Example Analysis
For f(x) = x² - 4x + 3:

### Standard Form Analysis
- **a = 1, b = -4, c = 3**
- **Discriminant**: D = 16 - 12 = 4 > 0 (two distinct real roots)
- **Zeros**: x = (4 ± √4)/2 = 1, 3
- **Y-intercept**: (0, 3)
- **Vertex**: x = -(-4)/(2×1) = 2, y = f(2) = 4 - 8 + 3 = -1

### Vertex Form
- **Transformation**: f(x) = (x - 2)² - 1
- **Vertex**: (2, -1)
- **Minimum value**: -1 at x = 2

## Interactive Learning Experience
1. **Adjust coefficients** a, b, c using sliders
2. **Observe real-time changes** in:
   - Graph shape and position
   - Zeros and their values
   - Y-intercept location
   - Vertex coordinates
   - Discriminant value
3. **Transform between forms** and see the relationships
4. **Analyze patterns** in how coefficients affect properties
5. **Practice calculations** with different quadratic functions
