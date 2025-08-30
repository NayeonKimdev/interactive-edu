import numpy as np
import matplotlib.pyplot as plt

def analyze_linear_function(m, b, x_range=(-10, 10)):
    """
    일차함수의 성질을 분석하고 시각화합니다.
    
    Args:
        m (float): 기울기 (slope)
        b (float): y절편 (y-intercept)
        x_range (tuple): x축 범위
    
    Returns:
        dict: 분석 결과
    """
    try:
        # 일차함수 정의: f(x) = mx + b
        
        # 기본 성질
        domain = "(-∞, ∞)"  # 모든 실수
        range_desc = "(-∞, ∞)"  # 모든 실수
        
        # x절편 계산 (f(x) = 0일 때)
        if m != 0:
            x_intercept = -b / m
            x_intercept_desc = f"x = {x_intercept:.4f}"
        else:
            x_intercept = None
            x_intercept_desc = "No x-intercept (horizontal line)"
        
        # y절편
        y_intercept = b
        y_intercept_desc = f"y = {b:.4f}"
        
        # 기울기 분석
        if m > 0:
            slope_desc = "Positive slope (increasing function)"
            slope_type = "increasing"
        elif m < 0:
            slope_desc = "Negative slope (decreasing function)"
            slope_type = "decreasing"
        else:
            slope_desc = "Zero slope (constant function)"
            slope_type = "constant"
        
        # 그래프 생성
        x_vals = np.linspace(x_range[0], x_range[1], 1000)
        y_vals = m * x_vals + b
        
        # 특별한 경우들
        special_cases = []
        if m == 0:
            special_cases.append("Constant function (horizontal line)")
        elif m == 1:
            special_cases.append("Identity function (y = x)")
        elif m == -1:
            special_cases.append("Negative identity function (y = -x)")
        elif b == 0:
            special_cases.append("Direct proportion (passes through origin)")
        
        return {
            'function': f"f(x) = {m}x + {b}",
            'slope': m,
            'y_intercept': b,
            'x_intercept': x_intercept,
            'domain': domain,
            'range': range_desc,
            'slope_desc': slope_desc,
            'slope_type': slope_type,
            'x_intercept_desc': x_intercept_desc,
            'y_intercept_desc': y_intercept_desc,
            'special_cases': special_cases,
            'x_values': x_vals.tolist(),
            'y_values': y_vals.tolist(),
            'success': True
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def create_linear_function_examples():
    """
    다양한 일차함수 예제들을 생성하고 분석합니다.
    """
    examples = [
        {"m": 2, "b": 3, "name": "f(x) = 2x + 3"},
        {"m": -1, "b": 5, "name": "f(x) = -x + 5"},
        {"m": 0, "b": 4, "name": "f(x) = 4 (constant)"},
        {"m": 1, "b": 0, "name": "f(x) = x (identity)"},
        {"m": 0.5, "b": -2, "name": "f(x) = 0.5x - 2"},
        {"m": -2, "b": 0, "name": "f(x) = -2x (direct proportion)"}
    ]
    
    print("=== 일차함수 분석 예제 ===")
    results = []
    
    for example in examples:
        result = analyze_linear_function(example["m"], example["b"])
        if result['success']:
            results.append(result)
            print(f"\n함수: {result['function']}")
            print(f"기울기: {result['slope']} ({result['slope_desc']})")
            print(f"y절편: {result['y_intercept_desc']}")
            print(f"x절편: {result['x_intercept_desc']}")
            print(f"도메인: {result['domain']}")
            print(f"치역: {result['range']}")
            if result['special_cases']:
                print(f"특별한 경우: {', '.join(result['special_cases'])}")
        else:
            print(f"\n함수 {example['name']} 분석 실패: {result['error']}")
    
    return results

# 예제 실행
results = create_linear_function_examples()

# 시각화
plt.figure(figsize=(15, 10))

# 메인 그래프 (첫 번째 예제)
if results:
    main_result = results[0]
    plt.subplot(2, 3, 1)
    plt.plot(main_result['x_values'], main_result['y_values'], 'b-', linewidth=3, label=main_result['function'])
    plt.title(f'일차함수: {main_result["function"]}', fontsize=14, fontweight='bold')
    plt.xlabel('x', fontsize=12)
    plt.ylabel('y', fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
    plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)
    plt.legend()
    
    # y절편 표시
    plt.plot(0, main_result['y_intercept'], 'ro', markersize=8, label=f'y-intercept: (0, {main_result["y_intercept"]})')
    
    # x절편 표시
    if main_result['x_intercept'] is not None:
        plt.plot(main_result['x_intercept'], 0, 'go', markersize=8, label=f'x-intercept: ({main_result["x_intercept"]:.2f}, 0)')
    
    plt.legend()

# 다른 예제들
for i, result in enumerate(results[1:6]):
    plt.subplot(2, 3, i+2)
    plt.plot(result['x_values'], result['y_values'], 'b-', linewidth=2, label=result['function'])
    plt.title(result['function'], fontsize=12, fontweight='bold')
    plt.xlabel('x', fontsize=10)
    plt.ylabel('y', fontsize=10)
    plt.grid(True, alpha=0.3)
    plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
    plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)
    
    # 절편들 표시
    plt.plot(0, result['y_intercept'], 'ro', markersize=6)
    if result['x_intercept'] is not None:
        plt.plot(result['x_intercept'], 0, 'go', markersize=6)

plt.tight_layout()
plt.show()

# 기울기와 y절편의 관계 시각화
plt.figure(figsize=(12, 8))

# 다양한 기울기 (같은 y절편)
y_intercept = 2
slopes = [-3, -1, 0, 1, 3]

plt.subplot(2, 2, 1)
for m in slopes:
    x_vals = np.linspace(-5, 5, 100)
    y_vals = m * x_vals + y_intercept
    plt.plot(x_vals, y_vals, linewidth=2, label=f'm = {m}')
plt.title('다양한 기울기 (y절편 = 2)', fontweight='bold')
plt.xlabel('x')
plt.ylabel('y')
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

# 다양한 y절편 (같은 기울기)
slope = 1
y_intercepts = [-3, -1, 0, 1, 3]

plt.subplot(2, 2, 2)
for b in y_intercepts:
    x_vals = np.linspace(-5, 5, 100)
    y_vals = slope * x_vals + b
    plt.plot(x_vals, y_vals, linewidth=2, label=f'b = {b}')
plt.title('다양한 y절편 (기울기 = 1)', fontweight='bold')
plt.xlabel('x')
plt.ylabel('y')
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

# 평행선과 수직선
plt.subplot(2, 2, 3)
# 평행선들
for b in [-2, 0, 2]:
    x_vals = np.linspace(-5, 5, 100)
    y_vals = 2 * x_vals + b
    plt.plot(x_vals, y_vals, linewidth=2, label=f'y = 2x + {b}')
plt.title('평행선들 (기울기 = 2)', fontweight='bold')
plt.xlabel('x')
plt.ylabel('y')
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

# 특별한 경우들
plt.subplot(2, 2, 4)
x_vals = np.linspace(-5, 5, 100)

# 상수함수
y_const = np.full_like(x_vals, 3)
plt.plot(x_vals, y_const, 'r-', linewidth=3, label='f(x) = 3 (constant)')

# 항등함수
y_identity = x_vals
plt.plot(x_vals, y_identity, 'g-', linewidth=3, label='f(x) = x (identity)')

# 음의 항등함수
y_neg_identity = -x_vals
plt.plot(x_vals, y_neg_identity, 'b-', linewidth=3, label='f(x) = -x')

plt.title('특별한 일차함수들', fontweight='bold')
plt.xlabel('x')
plt.ylabel('y')
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

plt.tight_layout()
plt.show()

print("\n=== 일차함수 학습 완료 ===")
print("주요 개념:")
print("1. 기울기(m): 함수의 증가/감소율")
print("2. y절편(b): x=0일 때의 y값")
print("3. x절편: y=0일 때의 x값")
print("4. 도메인과 치역: 모두 실수 전체")
print("5. 특별한 경우: 상수함수, 항등함수, 직접비례")
