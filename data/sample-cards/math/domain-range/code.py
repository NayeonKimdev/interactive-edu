import numpy as np
import matplotlib.pyplot as plt
from sympy import symbols, solve, S, sin, cos, tan, log, exp, sqrt, oo

def analyze_function(func_expr, x_range=(-10, 10)):
    """
    함수의 도메인과 범위를 분석하고 시각화합니다.
    
    Args:
        func_expr (str): 분석할 함수 표현식 (예: "x**2", "1/x", "sqrt(x)")
        x_range (tuple): x축 범위
    
    Returns:
        dict: 분석 결과
    """
    x = symbols('x')
    
    try:
        # 함수 정의 및 도메인/범위 분석
        if func_expr == "x**2":
            f = x**2
            domain = "(-∞, ∞)"
            range_desc = "[0, ∞)"
        elif func_expr == "1/x":
            f = 1/x
            domain = "(-∞, 0) ∪ (0, ∞)"
            range_desc = "(-∞, 0) ∪ (0, ∞)"
        elif func_expr == "sqrt(x)":
            f = sqrt(x)
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
            try:
                f = eval(func_expr)
                # 기본적으로 모든 실수에서 정의된다고 가정
                domain = "(-∞, ∞)"
                range_desc = "(-∞, ∞)"
            except:
                f = x**2  # 기본값
                domain = "(-∞, ∞)"
                range_desc = "[0, ∞)"
        
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

# 예제 함수들
functions = ["x**2", "1/x", "sqrt(x)", "sin(x)", "log(x)", "exp(x)", "abs(x)", "x**3"]

print("=== 함수 도메인과 범위 분석 ===")
for func in functions:
    result = analyze_function(func)
    if result['success']:
        print(f"\n함수: f(x) = {result['function']}")
        print(f"도메인: {result['domain']}")
        print(f"범위: {result['range']}")
    else:
        print(f"\n함수 {func} 분석 실패: {result['error']}")

# 시각화
plt.figure(figsize=(15, 10))

for i, func in enumerate(functions):
    result = analyze_function(func)
    if result['success']:
        plt.subplot(2, 4, i+1)
        plt.plot(result['x_values'], result['y_values'], 'b-', linewidth=2)
        plt.title(f'f(x) = {result["function"]}')
        plt.xlabel('x')
        plt.ylabel('y')
        plt.grid(True, alpha=0.3)
        plt.axhline(y=0, color='k', linestyle='-', alpha=0.3)
        plt.axvline(x=0, color='k', linestyle='-', alpha=0.3)

plt.tight_layout()
plt.show()
