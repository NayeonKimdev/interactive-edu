import numpy as np
import matplotlib.pyplot as plt
import math

def analyze_exponential_function(a, b, c=0, d=0, x_range=(-5, 5)):
    """
    지수함수의 성질을 분석하고 시각화합니다.
    
    Args:
        a (float): 밑수 (base)
        b (float): 계수 (coefficient)
        c (float): 지수에 더해지는 상수
        d (float): y축 이동 상수
        x_range (tuple): x축 범위
    
    Returns:
        dict: 분석 결과
    """
    try:
        # 지수함수 정의: f(x) = b * a^(x+c) + d
        
        # 기본 성질
        domain = "(-∞, ∞)"  # 모든 실수
        if b > 0:
            if a > 1:
                range_desc = f"({d}, ∞)" if d > 0 else f"({d}, ∞)"
                function_type = "exponential growth"
            elif 0 < a < 1:
                range_desc = f"({d}, ∞)" if d > 0 else f"({d}, ∞)"
                function_type = "exponential decay"
            else:
                range_desc = f"({d}, ∞)"
                function_type = "constant"
        else:
            if a > 1:
                range_desc = f"(-∞, {d})" if d < 0 else f"(-∞, {d})"
                function_type = "exponential decay (negative)"
            elif 0 < a < 1:
                range_desc = f"(-∞, {d})" if d < 0 else f"(-∞, {d})"
                function_type = "exponential growth (negative)"
            else:
                range_desc = f"(-∞, {d})"
                function_type = "constant"
        
        # y절편 계산
        y_intercept = b * (a ** c) + d
        
        # x절편 계산 (f(x) = 0일 때)
        if b != 0 and a > 0:
            try:
                x_intercept = math.log(-d/b, a) - c
                if not np.isnan(x_intercept) and not np.isinf(x_intercept):
                    x_intercept_desc = f"x = {x_intercept:.4f}"
                else:
                    x_intercept = None
                    x_intercept_desc = "No x-intercept"
            except:
                x_intercept = None
                x_intercept_desc = "No x-intercept"
        else:
            x_intercept = None
            x_intercept_desc = "No x-intercept"
        
        # 그래프 생성
        x_vals = np.linspace(x_range[0], x_range[1], 1000)
        y_vals = b * (a ** (x_vals + c)) + d
        
        # 특별한 경우들
        special_cases = []
        if a == 1:
            special_cases.append("Constant function")
        elif a == math.e:
            special_cases.append("Natural exponential function")
        elif b == 1 and c == 0 and d == 0:
            special_cases.append("Basic exponential function")
        
        return {
            'function': f"f(x) = {b} * {a}^(x+{c}) + {d}",
            'base': a,
            'coefficient': b,
            'exponent_shift': c,
            'vertical_shift': d,
            'domain': domain,
            'range': range_desc,
            'function_type': function_type,
            'y_intercept': y_intercept,
            'x_intercept': x_intercept,
            'y_intercept_desc': f"y = {y_intercept:.4f}",
            'x_intercept_desc': x_intercept_desc,
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

def analyze_logarithmic_function(a, b, c=0, d=0, x_range=(0.1, 10)):
    """
    로그함수의 성질을 분석하고 시각화합니다.
    
    Args:
        a (float): 밑수 (base)
        b (float): 계수 (coefficient)
        c (float): 로그 안의 상수
        d (float): y축 이동 상수
        x_range (tuple): x축 범위
    
    Returns:
        dict: 분석 결과
    """
    try:
        # 로그함수 정의: f(x) = b * log_a(x + c) + d
        
        # 기본 성질
        domain = f"({-c}, ∞)" if c < 0 else f"[{-c}, ∞)"
        if b > 0:
            if a > 1:
                range_desc = "(-∞, ∞)"
                function_type = "logarithmic growth"
            elif 0 < a < 1:
                range_desc = "(-∞, ∞)"
                function_type = "logarithmic decay"
            else:
                range_desc = "(-∞, ∞)"
                function_type = "constant"
        else:
            if a > 1:
                range_desc = "(-∞, ∞)"
                function_type = "logarithmic decay (negative)"
            elif 0 < a < 1:
                range_desc = "(-∞, ∞)"
                function_type = "logarithmic growth (negative)"
            else:
                range_desc = "(-∞, ∞)"
                function_type = "constant"
        
        # y절편 계산 (x = 0일 때)
        if 0 + c > 0:
            y_intercept = b * math.log(0 + c, a) + d
            y_intercept_desc = f"y = {y_intercept:.4f}"
        else:
            y_intercept = None
            y_intercept_desc = "No y-intercept (outside domain)"
        
        # x절편 계산 (f(x) = 0일 때)
        if b != 0 and a > 0:
            try:
                x_intercept = (a ** (-d/b)) - c
                if x_intercept > -c and not np.isnan(x_intercept) and not np.isinf(x_intercept):
                    x_intercept_desc = f"x = {x_intercept:.4f}"
                else:
                    x_intercept = None
                    x_intercept_desc = "No x-intercept"
            except:
                x_intercept = None
                x_intercept_desc = "No x-intercept"
        else:
            x_intercept = None
            x_intercept_desc = "No x-intercept"
        
        # 그래프 생성
        x_vals = np.linspace(x_range[0], x_range[1], 1000)
        y_vals = []
        for x_val in x_vals:
            if x_val + c > 0:
                y_val = b * math.log(x_val + c, a) + d
                y_vals.append(y_val)
            else:
                y_vals.append(None)
        
        # None 값 제거
        valid_indices = [i for i, y in enumerate(y_vals) if y is not None]
        x_vals = x_vals[valid_indices]
        y_vals = [y_vals[i] for i in valid_indices]
        
        # 특별한 경우들
        special_cases = []
        if a == math.e:
            special_cases.append("Natural logarithm")
        elif a == 10:
            special_cases.append("Common logarithm")
        elif b == 1 and c == 0 and d == 0:
            special_cases.append("Basic logarithmic function")
        
        return {
            'function': f"f(x) = {b} * log_{a}(x+{c}) + {d}",
            'base': a,
            'coefficient': b,
            'argument_shift': c,
            'vertical_shift': d,
            'domain': domain,
            'range': range_desc,
            'function_type': function_type,
            'y_intercept': y_intercept,
            'x_intercept': x_intercept,
            'y_intercept_desc': y_intercept_desc,
            'x_intercept_desc': x_intercept_desc,
            'special_cases': special_cases,
            'x_values': x_vals.tolist(),
            'y_values': y_vals,
            'success': True
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def solve_exponential_equation(a, b, c, target=0):
    """
    지수방정식을 풉니다: a * b^x + c = target
    
    Args:
        a (float): 계수
        b (float): 밑수
        c (float): 상수
        target (float): 목표값
    
    Returns:
        dict: 해와 분석 결과
    """
    try:
        # a * b^x + c = target
        # b^x = (target - c) / a
        # x = log_b((target - c) / a)
        
        if a == 0:
            return {
                'equation': f"{a} * {b}^x + {c} = {target}",
                'solutions': [],
                'solution_count': 0,
                'message': 'No solution (a = 0)',
                'success': True
            }
        
        if b <= 0:
            return {
                'equation': f"{a} * {b}^x + {c} = {target}",
                'solutions': [],
                'solution_count': 0,
                'message': 'No solution (invalid base)',
                'success': True
            }
        
        right_side = (target - c) / a
        
        if right_side <= 0:
            return {
                'equation': f"{a} * {b}^x + {c} = {target}",
                'solutions': [],
                'solution_count': 0,
                'message': 'No real solution (right side <= 0)',
                'success': True
            }
        
        solution = math.log(right_side, b)
        
        if not np.isnan(solution) and not np.isinf(solution):
            return {
                'equation': f"{a} * {b}^x + {c} = {target}",
                'solutions': [solution],
                'solution_count': 1,
                'success': True
            }
        else:
            return {
                'equation': f"{a} * {b}^x + {c} = {target}",
                'solutions': [],
                'solution_count': 0,
                'message': 'No real solution',
                'success': True
            }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

def solve_logarithmic_equation(a, b, c, target=0):
    """
    로그방정식을 풉니다: a * log_b(x) + c = target
    
    Args:
        a (float): 계수
        b (float): 밑수
        c (float): 상수
        target (float): 목표값
    
    Returns:
        dict: 해와 분석 결과
    """
    try:
        # a * log_b(x) + c = target
        # log_b(x) = (target - c) / a
        # x = b^((target - c) / a)
        
        if a == 0:
            return {
                'equation': f"{a} * log_{b}(x) + {c} = {target}",
                'solutions': [],
                'solution_count': 0,
                'message': 'No solution (a = 0)',
                'success': True
            }
        
        if b <= 0 or b == 1:
            return {
                'equation': f"{a} * log_{b}(x) + {c} = {target}",
                'solutions': [],
                'solution_count': 0,
                'message': 'No solution (invalid base)',
                'success': True
            }
        
        exponent = (target - c) / a
        solution = b ** exponent
        
        if solution > 0 and not np.isnan(solution) and not np.isinf(solution):
            return {
                'equation': f"{a} * log_{b}(x) + {c} = {target}",
                'solutions': [solution],
                'solution_count': 1,
                'success': True
            }
        else:
            return {
                'equation': f"{a} * log_{b}(x) + {c} = {target}",
                'solutions': [],
                'solution_count': 0,
                'message': 'No real solution',
                'success': True
            }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

# 예제 실행
print("=== 지수함수와 로그함수 분석 ===")

# 지수함수 예제들
exponential_examples = [
    {"a": 2, "b": 1, "c": 0, "d": 0, "name": "f(x) = 2^x"},
    {"a": 0.5, "b": 1, "c": 0, "d": 0, "name": "f(x) = 0.5^x"},
    {"a": math.e, "b": 1, "c": 0, "d": 0, "name": "f(x) = e^x"},
    {"a": 2, "b": 3, "c": 0, "d": 1, "name": "f(x) = 3*2^x + 1"},
    {"a": 0.5, "b": -2, "c": 0, "d": 0, "name": "f(x) = -2*0.5^x"}
]

print("\n--- 지수함수 분석 ---")
exp_results = []
for example in exponential_examples:
    result = analyze_exponential_function(example["a"], example["b"], example["c"], example["d"])
    if result['success']:
        exp_results.append(result)
        print(f"\n함수: {result['function']}")
        print(f"함수 유형: {result['function_type']}")
        print(f"도메인: {result['domain']}")
        print(f"치역: {result['range']}")
        print(f"y절편: {result['y_intercept_desc']}")
        print(f"x절편: {result['x_intercept_desc']}")
        if result['special_cases']:
            print(f"특별한 경우: {', '.join(result['special_cases'])}")

# 로그함수 예제들
logarithmic_examples = [
    {"a": 2, "b": 1, "c": 0, "d": 0, "name": "f(x) = log_2(x)"},
    {"a": 0.5, "b": 1, "c": 0, "d": 0, "name": "f(x) = log_0.5(x)"},
    {"a": math.e, "b": 1, "c": 0, "d": 0, "name": "f(x) = ln(x)"},
    {"a": 10, "b": 1, "c": 0, "d": 0, "name": "f(x) = log_10(x)"},
    {"a": 2, "b": 2, "c": 1, "d": 0, "name": "f(x) = 2*log_2(x+1)"}
]

print("\n--- 로그함수 분석 ---")
log_results = []
for example in logarithmic_examples:
    result = analyze_logarithmic_function(example["a"], example["b"], example["c"], example["d"])
    if result['success']:
        log_results.append(result)
        print(f"\n함수: {result['function']}")
        print(f"함수 유형: {result['function_type']}")
        print(f"도메인: {result['domain']}")
        print(f"치역: {result['range']}")
        print(f"y절편: {result['y_intercept_desc']}")
        print(f"x절편: {result['x_intercept_desc']}")
        if result['special_cases']:
            print(f"특별한 경우: {', '.join(result['special_cases'])}")

# 방정식 해결 예제
print("\n--- 지수방정식 해결 ---")
exp_equations = [
    {"a": 1, "b": 2, "c": 0, "target": 8},
    {"a": 1, "b": 0.5, "c": 0, "target": 0.25},
    {"a": 2, "b": 3, "c": 1, "target": 19}
]

for eq in exp_equations:
    result = solve_exponential_equation(eq["a"], eq["b"], eq["c"], eq["target"])
    if result['success']:
        print(f"\n방정식: {result['equation']}")
        if result['solutions']:
            print(f"해: x = {result['solutions']}")
        else:
            print(f"해: {result['message']}")

print("\n--- 로그방정식 해결 ---")
log_equations = [
    {"a": 1, "b": 2, "c": 0, "target": 3},
    {"a": 1, "b": 10, "c": 0, "target": 2},
    {"a": 2, "b": 2, "c": 1, "target": 5}
]

for eq in log_equations:
    result = solve_logarithmic_equation(eq["a"], eq["b"], eq["c"], eq["target"])
    if result['success']:
        print(f"\n방정식: {result['equation']}")
        if result['solutions']:
            print(f"해: x = {result['solutions']}")
        else:
            print(f"해: {result['message']}")

# 시각화
plt.figure(figsize=(20, 12))

# 지수함수 그래프
plt.subplot(2, 3, 1)
for i, result in enumerate(exp_results[:3]):
    plt.plot(result['x_values'], result['y_values'], linewidth=2, label=result['function'])
plt.title('지수함수 비교', fontsize=14, fontweight='bold')
plt.xlabel('x', fontsize=12)
plt.ylabel('y', fontsize=12)
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

# 로그함수 그래프
plt.subplot(2, 3, 2)
for i, result in enumerate(log_results[:3]):
    plt.plot(result['x_values'], result['y_values'], linewidth=2, label=result['function'])
plt.title('로그함수 비교', fontsize=14, fontweight='bold')
plt.xlabel('x', fontsize=12)
plt.ylabel('y', fontsize=12)
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

# 지수함수와 로그함수의 역함수 관계
plt.subplot(2, 3, 3)
# f(x) = 2^x와 f(x) = log_2(x)
x_exp = np.linspace(-2, 3, 100)
y_exp = 2 ** x_exp
plt.plot(x_exp, y_exp, 'b-', linewidth=2, label='f(x) = 2^x')

x_log = np.linspace(0.1, 8, 100)
y_log = np.log2(x_log)
plt.plot(x_log, y_log, 'r-', linewidth=2, label='f(x) = log_2(x)')

# y = x 선
x_line = np.linspace(-2, 8, 100)
y_line = x_line
plt.plot(x_line, y_line, 'k--', alpha=0.5, label='y = x')

plt.title('지수함수와 로그함수의 역함수 관계', fontsize=14, fontweight='bold')
plt.xlabel('x', fontsize=12)
plt.ylabel('y', fontsize=12)
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

# 자연지수함수와 자연로그함수
plt.subplot(2, 3, 4)
x_exp = np.linspace(-2, 3, 100)
y_exp = np.exp(x_exp)
plt.plot(x_exp, y_exp, 'b-', linewidth=2, label='f(x) = e^x')

x_log = np.linspace(0.1, 20, 100)
y_log = np.log(x_log)
plt.plot(x_log, y_log, 'r-', linewidth=2, label='f(x) = ln(x)')

plt.title('자연지수함수와 자연로그함수', fontsize=14, fontweight='bold')
plt.xlabel('x', fontsize=12)
plt.ylabel('y', fontsize=12)
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

# 다양한 밑수의 지수함수
plt.subplot(2, 3, 5)
bases = [0.25, 0.5, 1, 2, 4]
x_vals = np.linspace(-2, 2, 100)

for base in bases:
    if base != 1:
        y_vals = base ** x_vals
        plt.plot(x_vals, y_vals, linewidth=2, label=f'f(x) = {base}^x')
    else:
        y_vals = np.ones_like(x_vals)
        plt.plot(x_vals, y_vals, 'k--', linewidth=2, label=f'f(x) = {base}^x')

plt.title('다양한 밑수의 지수함수', fontsize=14, fontweight='bold')
plt.xlabel('x', fontsize=12)
plt.ylabel('y', fontsize=12)
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

# 다양한 밑수의 로그함수
plt.subplot(2, 3, 6)
bases = [0.25, 0.5, 2, 4]
x_vals = np.linspace(0.1, 4, 100)

for base in bases:
    y_vals = np.log(x_vals) / np.log(base)
    plt.plot(x_vals, y_vals, linewidth=2, label=f'f(x) = log_{base}(x)')

plt.title('다양한 밑수의 로그함수', fontsize=14, fontweight='bold')
plt.xlabel('x', fontsize=12)
plt.ylabel('y', fontsize=12)
plt.grid(True, alpha=0.3)
plt.legend()
plt.axhline(y=0, color='k', linestyle='-', alpha=0.5)
plt.axvline(x=0, color='k', linestyle='-', alpha=0.5)

plt.tight_layout()
plt.show()

print("\n=== 지수함수와 로그함수 학습 완료 ===")
print("주요 개념:")
print("1. 지수함수: f(x) = a^x (a > 0, a ≠ 1)")
print("2. 로그함수: f(x) = log_a(x) (a > 0, a ≠ 1)")
print("3. 지수함수와 로그함수는 서로 역함수 관계")
print("4. 자연지수함수: f(x) = e^x")
print("5. 자연로그함수: f(x) = ln(x)")
print("6. 지수방정식과 로그방정식의 해법")
