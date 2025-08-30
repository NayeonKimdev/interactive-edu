import numpy as np
import matplotlib.pyplot as plt
from sympy import symbols, solve, S
import matplotlib.patches as patches

def solve_linear_inequality(a, b, inequality_type, x_range=(-10, 10)):
    """
    일차 부등식을 해결하고 시각화합니다.
    
    Args:
        a (float): x의 계수
        b (float): 상수항
        inequality_type (str): 부등식 유형 ('>', '<', '>=', '<=')
        x_range (tuple): x축 범위
    
    Returns:
        dict: 해결 결과
    """
    try:
        x = symbols('x')
        
        # 부등식 해결
        if inequality_type == '>':
            solution = solve(a*x + b > 0, x)
            boundary_type = 'open'
        elif inequality_type == '<':
            solution = solve(a*x + b < 0, x)
            boundary_type = 'open'
        elif inequality_type == '>=':
            solution = solve(a*x + b >= 0, x)
            boundary_type = 'closed'
        elif inequality_type == '<=':
            solution = solve(a*x + b <= 0, x)
            boundary_type = 'closed'
        else:
            raise ValueError("Invalid inequality type")
        
        # 경계점 계산
        boundary_point = -b / a if a != 0 else None
        
        # 해집합 설명
        if a > 0:
            if inequality_type in ['>', '>=']:
                solution_desc = f"x > {boundary_point:.2f}" if inequality_type == '>' else f"x ≥ {boundary_point:.2f}"
            else:
                solution_desc = f"x < {boundary_point:.2f}" if inequality_type == '<' else f"x ≤ {boundary_point:.2f}"
        elif a < 0:
            if inequality_type in ['>', '>=']:
                solution_desc = f"x < {boundary_point:.2f}" if inequality_type == '>' else f"x ≤ {boundary_point:.2f}"
            else:
                solution_desc = f"x > {boundary_point:.2f}" if inequality_type == '<' else f"x ≥ {boundary_point:.2f}"
        else:  # a == 0
            if b > 0:
                solution_desc = "모든 실수" if inequality_type in ['>', '>='] else "해 없음"
            elif b < 0:
                solution_desc = "해 없음" if inequality_type in ['>', '>='] else "모든 실수"
            else:  # b == 0
                solution_desc = "모든 실수" if inequality_type in ['>=', '<='] else "해 없음"
        
        # 그래프 생성
        x_vals = np.linspace(x_range[0], x_range[1], 1000)
        y_vals = a * x_vals + b
        
        return {
            'inequality': f"{a}x + {b} {inequality_type} 0",
            'solution': solution_desc,
            'boundary_point': boundary_point,
            'boundary_type': boundary_type,
            'x_values': x_vals.tolist(),
            'y_values': y_vals.tolist(),
            'success': True
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def solve_quadratic_inequality(a, b, c, inequality_type, x_range=(-10, 10)):
    """
    이차 부등식을 해결하고 시각화합니다.
    
    Args:
        a, b, c (float): 이차함수 계수 (ax² + bx + c)
        inequality_type (str): 부등식 유형 ('>', '<', '>=', '<=')
        x_range (tuple): x축 범위
    
    Returns:
        dict: 해결 결과
    """
    try:
        x = symbols('x')
        
        # 판별식 계산
        discriminant = b**2 - 4*a*c
        
        # 근 계산
        if discriminant > 0:
            x1 = (-b + np.sqrt(discriminant)) / (2*a)
            x2 = (-b - np.sqrt(discriminant)) / (2*a)
            roots = [min(x1, x2), max(x1, x2)]
            root_type = "two_distinct"
        elif discriminant == 0:
            x1 = -b / (2*a)
            roots = [x1]
            root_type = "one_repeated"
        else:
            roots = []
            root_type = "no_real"
        
        # 부등식 해결
        if inequality_type == '>':
            solution = solve(a*x**2 + b*x + c > 0, x)
        elif inequality_type == '<':
            solution = solve(a*x**2 + b*x + c < 0, x)
        elif inequality_type == '>=':
            solution = solve(a*x**2 + b*x + c >= 0, x)
        elif inequality_type == '<=':
            solution = solve(a*x**2 + b*x + c <= 0, x)
        else:
            raise ValueError("Invalid inequality type")
        
        # 해집합 설명
        if a > 0:  # 위로 볼록한 포물선
            if root_type == "two_distinct":
                if inequality_type in ['>', '>=']:
                    solution_desc = f"x < {roots[0]:.2f} 또는 x > {roots[1]:.2f}"
                else:
                    solution_desc = f"{roots[0]:.2f} ≤ x ≤ {roots[1]:.2f}"
            elif root_type == "one_repeated":
                if inequality_type in ['>', '>=']:
                    solution_desc = f"x ≠ {roots[0]:.2f}"
                else:
                    solution_desc = f"x = {roots[0]:.2f}"
            else:  # no_real
                solution_desc = "모든 실수" if inequality_type in ['>', '>='] else "해 없음"
        else:  # a < 0, 아래로 볼록한 포물선
            if root_type == "two_distinct":
                if inequality_type in ['>', '>=']:
                    solution_desc = f"{roots[0]:.2f} ≤ x ≤ {roots[1]:.2f}"
                else:
                    solution_desc = f"x < {roots[0]:.2f} 또는 x > {roots[1]:.2f}"
            elif root_type == "one_repeated":
                if inequality_type in ['>', '>=']:
                    solution_desc = f"x = {roots[0]:.2f}"
                else:
                    solution_desc = f"x ≠ {roots[0]:.2f}"
            else:  # no_real
                solution_desc = "해 없음" if inequality_type in ['>', '>='] else "모든 실수"
        
        # 그래프 생성
        x_vals = np.linspace(x_range[0], x_range[1], 1000)
        y_vals = a * x_vals**2 + b * x_vals + c
        
        return {
            'inequality': f"{a}x² + {b}x + {c} {inequality_type} 0",
            'solution': solution_desc,
            'roots': roots,
            'discriminant': discriminant,
            'root_type': root_type,
            'x_values': x_vals.tolist(),
            'y_values': y_vals.tolist(),
            'success': True
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def visualize_number_line(inequality_result, x_range=(-10, 10)):
    """
    수직선상에서 부등식의 해를 시각화합니다.
    """
    fig, ax = plt.subplots(figsize=(12, 3))
    
    # 수직선 그리기
    ax.axhline(y=0, color='black', linewidth=2)
    ax.set_xlim(x_range[0], x_range[1])
    ax.set_ylim(-0.5, 0.5)
    
    # 눈금 표시
    ax.set_xticks(np.arange(x_range[0], x_range[1]+1, 1))
    ax.set_yticks([])
    ax.grid(True, alpha=0.3)
    
    # 부등식 해 표시
    if 'boundary_point' in inequality_result:  # 일차 부등식
        boundary = inequality_result['boundary_point']
        if boundary is not None:
            # 경계점 표시
            if inequality_result['boundary_type'] == 'closed':
                ax.plot(boundary, 0, 'ko', markersize=10)
            else:
                ax.plot(boundary, 0, 'ko', markersize=10, markerfacecolor='white')
            
            # 해집합 표시
            if '>' in inequality_result['inequality'] or '>=' in inequality_result['inequality']:
                if 'x >' in inequality_result['solution']:
                    ax.arrow(boundary + 0.5, 0, 5, 0, head_width=0.1, head_length=0.2, fc='red', ec='red')
                else:
                    ax.arrow(boundary - 5, 0, -5, 0, head_width=0.1, head_length=0.2, fc='red', ec='red')
            else:
                if 'x <' in inequality_result['solution']:
                    ax.arrow(boundary - 5, 0, -5, 0, head_width=0.1, head_length=0.2, fc='red', ec='red')
                else:
                    ax.arrow(boundary + 0.5, 0, 5, 0, head_width=0.1, head_length=0.2, fc='red', ec='red')
    
    elif 'roots' in inequality_result:  # 이차 부등식
        roots = inequality_result['roots']
        for root in roots:
            ax.plot(root, 0, 'ko', markersize=8)
        
        # 해집합 표시 (간단한 버전)
        if '≤' in inequality_result['solution']:
            if len(roots) == 2:
                ax.axvspan(roots[0], roots[1], alpha=0.3, color='red')
    
    ax.set_title(f"수직선상 해집합: {inequality_result['solution']}", fontsize=14, fontweight='bold')
    return fig

def visualize_quadrant_region(inequality_result, x_range=(-10, 10), y_range=(-10, 10)):
    """
    사분면에서 부등식의 영역을 시각화합니다.
    """
    fig, ax = plt.subplots(figsize=(10, 10))
    
    # 좌표축 그리기
    ax.axhline(y=0, color='black', linewidth=1, alpha=0.5)
    ax.axvline(x=0, color='black', linewidth=1, alpha=0.5)
    ax.set_xlim(x_range[0], x_range[1])
    ax.set_ylim(y_range[0], y_range[1])
    ax.grid(True, alpha=0.3)
    
    # 부등식 그래프 그리기
    x_vals = np.array(inequality_result['x_values'])
    y_vals = np.array(inequality_result['y_values'])
    
    # 부등식 유형에 따른 영역 표시
    inequality_type = None
    for op in ['>', '<', '>=', '<=']:
        if op in inequality_result['inequality']:
            inequality_type = op
            break
    
    if inequality_type in ['>', '>=']:
        # 부등식 위쪽 영역 표시
        ax.fill_between(x_vals, y_vals, y_range[1], alpha=0.3, color='red', label='해집합')
    else:
        # 부등식 아래쪽 영역 표시
        ax.fill_between(x_vals, y_range[0], y_vals, alpha=0.3, color='red', label='해집합')
    
    # 함수 그래프 그리기
    ax.plot(x_vals, y_vals, 'b-', linewidth=2, label='경계선')
    
    # 근 표시 (이차 부등식인 경우)
    if 'roots' in inequality_result:
        for root in inequality_result['roots']:
            ax.plot(root, 0, 'ko', markersize=8, label=f'근: x = {root:.2f}')
    
    ax.set_title(f"사분면상 영역: {inequality_result['inequality']}", fontsize=14, fontweight='bold')
    ax.set_xlabel('x', fontsize=12)
    ax.set_ylabel('y', fontsize=12)
    ax.legend()
    
    return fig

# 예제 실행
print("=== 부등식 학습 카드 ===")

# 일차 부등식 예제들
linear_examples = [
    {"a": 2, "b": -6, "type": ">", "name": "2x - 6 > 0"},
    {"a": -1, "b": 3, "type": "<=", "name": "-x + 3 ≤ 0"},
    {"a": 1, "b": 0, "type": ">=", "name": "x ≥ 0"},
    {"a": 0, "b": 5, "type": ">", "name": "5 > 0 (상수)"}
]

print("\n--- 일차 부등식 ---")
linear_results = []
for example in linear_examples:
    result = solve_linear_inequality(example["a"], example["b"], example["type"])
    if result['success']:
        linear_results.append(result)
        print(f"\n부등식: {result['inequality']}")
        print(f"해: {result['solution']}")
        if result['boundary_point'] is not None:
            print(f"경계점: x = {result['boundary_point']:.2f}")

# 이차 부등식 예제들
quadratic_examples = [
    {"a": 1, "b": -3, "c": 2, "type": ">", "name": "x² - 3x + 2 > 0"},
    {"a": -1, "b": 0, "c": 4, "type": "<=", "name": "-x² + 4 ≤ 0"},
    {"a": 1, "b": -2, "c": 1, "type": ">=", "name": "x² - 2x + 1 ≥ 0"},
    {"a": 1, "b": 0, "c": 1, "type": "<", "name": "x² + 1 < 0"}
]

print("\n--- 이차 부등식 ---")
quadratic_results = []
for example in quadratic_examples:
    result = solve_quadratic_inequality(example["a"], example["b"], example["c"], example["type"])
    if result['success']:
        quadratic_results.append(result)
        print(f"\n부등식: {result['inequality']}")
        print(f"해: {result['solution']}")
        print(f"판별식: {result['discriminant']}")
        if result['roots']:
            print(f"근: {[f'{r:.2f}' for r in result['roots']]}")

# 시각화
plt.figure(figsize=(15, 10))

# 일차 부등식 그래프
for i, result in enumerate(linear_results[:2]):
    plt.subplot(2, 3, i+1)
    x_vals = np.array(result['x_values'])
    y_vals = np.array(result['y_values'])
    
    # 부등식 영역 표시
    inequality_type = None
    for op in ['>', '<', '>=', '<=']:
        if op in result['inequality']:
            inequality_type = op
            break
    
    if inequality_type in ['>', '>=']:
        plt.fill_between(x_vals, y_vals, 10, alpha=0.3, color='red')
    else:
        plt.fill_between(x_vals, -10, y_vals, alpha=0.3, color='red')
    
    plt.plot(x_vals, y_vals, 'b-', linewidth=2)
    plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
    plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)
    plt.title(result['inequality'], fontweight='bold')
    plt.grid(True, alpha=0.3)

# 이차 부등식 그래프
for i, result in enumerate(quadratic_results[:2]):
    plt.subplot(2, 3, i+3)
    x_vals = np.array(result['x_values'])
    y_vals = np.array(result['y_values'])
    
    # 부등식 영역 표시
    inequality_type = None
    for op in ['>', '<', '>=', '<=']:
        if op in result['inequality']:
            inequality_type = op
            break
    
    if inequality_type in ['>', '>=']:
        plt.fill_between(x_vals, y_vals, 10, alpha=0.3, color='red')
    else:
        plt.fill_between(x_vals, -10, y_vals, alpha=0.3, color='red')
    
    plt.plot(x_vals, y_vals, 'b-', linewidth=2)
    plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
    plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)
    plt.title(result['inequality'], fontweight='bold')
    plt.grid(True, alpha=0.3)

# 수직선상 해집합
plt.subplot(2, 3, 5)
if linear_results:
    visualize_number_line(linear_results[0])
    plt.title("수직선상 해집합", fontweight='bold')

# 사분면상 영역
plt.subplot(2, 3, 6)
if quadratic_results:
    visualize_quadrant_region(quadratic_results[0])
    plt.title("사분면상 영역", fontweight='bold')

plt.tight_layout()
plt.show()

# 추가 시각화: 다양한 부등식 비교
plt.figure(figsize=(15, 10))

# 일차 부등식 비교
plt.subplot(2, 2, 1)
x_vals = np.linspace(-5, 5, 100)
inequalities = [
    (2, -4, '>', '2x - 4 > 0'),
    (-1, 2, '<', '-x + 2 < 0'),
    (1, 0, '>=', 'x >= 0')
]

for a, b, op, label in inequalities:
    y_vals = a * x_vals + b
    if op in ['>', '>=']:
        plt.fill_between(x_vals, y_vals, 10, alpha=0.2, label=label)
    else:
        plt.fill_between(x_vals, -10, y_vals, alpha=0.2, label=label)
    plt.plot(x_vals, y_vals, linewidth=2)

plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)
plt.title('일차 부등식 비교', fontweight='bold')
plt.legend()
plt.grid(True, alpha=0.3)

# 이차 부등식 비교
plt.subplot(2, 2, 2)
x_vals = np.linspace(-5, 5, 100)
quad_inequalities = [
    (1, -3, 2, '>', 'x² - 3x + 2 > 0'),
    (-1, 0, 4, '<', '-x² + 4 < 0'),
    (1, -2, 1, '>=', 'x² - 2x + 1 >= 0')
]

for a, b, c, op, label in quad_inequalities:
    y_vals = a * x_vals**2 + b * x_vals + c
    if op in ['>', '>=']:
        plt.fill_between(x_vals, y_vals, 10, alpha=0.2, label=label)
    else:
        plt.fill_between(x_vals, -10, y_vals, alpha=0.2, label=label)
    plt.plot(x_vals, y_vals, linewidth=2)

plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)
plt.title('이차 부등식 비교', fontweight='bold')
plt.legend()
plt.grid(True, alpha=0.3)

# 복합 부등식
plt.subplot(2, 2, 3)
x_vals = np.linspace(-5, 5, 100)
y_vals = x_vals**2 - 4

# 복합 부등식: -2 ≤ x ≤ 2 AND y ≥ -4
plt.fill_between(x_vals, y_vals, 10, alpha=0.3, color='red', label='복합 부등식')
plt.plot(x_vals, y_vals, 'b-', linewidth=2)
plt.axvline(x=-2, color='g', linestyle='--', alpha=0.7)
plt.axvline(x=2, color='g', linestyle='--', alpha=0.7)
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)
plt.title('복합 부등식: -2 ≤ x ≤ 2 AND y ≥ -4', fontweight='bold')
plt.legend()
plt.grid(True, alpha=0.3)

# 절댓값 부등식
plt.subplot(2, 2, 4)
x_vals = np.linspace(-5, 5, 100)
y_vals = np.abs(x_vals) - 2

# |x| - 2 ≤ 0
plt.fill_between(x_vals, -10, y_vals, alpha=0.3, color='red', label='|x| - 2 ≤ 0')
plt.plot(x_vals, y_vals, 'b-', linewidth=2)
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)
plt.title('절댓값 부등식: |x| - 2 ≤ 0', fontweight='bold')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

print("\n=== 부등식 학습 완료 ===")
print("주요 개념:")
print("1. 일차 부등식: ax + b > 0 형태의 부등식")
print("2. 이차 부등식: ax² + bx + c > 0 형태의 부등식")
print("3. 수직선상 해집합: 실수선에서의 해의 범위")
print("4. 사분면상 영역: 좌표평면에서의 해의 영역")
print("5. 복합 부등식: 여러 부등식을 동시에 만족하는 해")
print("6. 절댓값 부등식: 절댓값이 포함된 부등식")
