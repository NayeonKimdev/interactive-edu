import numpy as np
import matplotlib.pyplot as plt

def analyze_quadratic_function(a, b, c, x_range=(-10, 10)):
    """
    이차함수의 성질을 분석하고 시각화합니다.
    
    Args:
        a (float): x²의 계수
        b (float): x의 계수
        c (float): 상수항
        x_range (tuple): x축 범위
    
    Returns:
        dict: 분석 결과
    """
    try:
        # 이차함수 정의: f(x) = ax² + bx + c
        
        # 기본 성질
        domain = "(-∞, ∞)"  # 모든 실수
        
        # 판별식 계산
        discriminant = b**2 - 4*a*c
        
        # 꼭짓점 계산
        vertex_x = -b / (2*a)
        vertex_y = a * vertex_x**2 + b * vertex_x + c
        
        # y절편
        y_intercept = c
        
        # x절편 계산 (근의 공식)
        if discriminant > 0:
            x1 = (-b + np.sqrt(discriminant)) / (2*a)
            x2 = (-b - np.sqrt(discriminant)) / (2*a)
            x_intercepts = [x1, x2]
            x_intercepts_desc = f"x = {x1:.4f}, x = {x2:.4f}"
        elif discriminant == 0:
            x1 = -b / (2*a)
            x_intercepts = [x1]
            x_intercepts_desc = f"x = {x1:.4f} (중근)"
        else:
            x_intercepts = []
            x_intercepts_desc = "실근이 없음"
        
        # 범위 계산
        if a > 0:
            range_desc = f"[{vertex_y:.4f}, ∞)"
            range_type = "minimum"
        else:
            range_desc = f"(-∞, {vertex_y:.4f}]"
            range_type = "maximum"
        
        # 그래프 생성
        x_vals = np.linspace(x_range[0], x_range[1], 1000)
        y_vals = a * x_vals**2 + b * x_vals + c
        
        # 꼭짓점 형태로 변환
        vertex_form = f"f(x) = {a}(x - {vertex_x:.4f})² + {vertex_y:.4f}"
        
        # 특별한 경우들
        special_cases = []
        if a == 1 and b == 0 and c == 0:
            special_cases.append("기본 이차함수 (y = x²)")
        elif b == 0 and c == 0:
            special_cases.append("축대칭 함수 (y = ax²)")
        elif c == 0:
            special_cases.append("원점을 지나는 함수")
        
        return {
            'function': f"f(x) = {a}x² + {b}x + {c}",
            'vertex_form': vertex_form,
            'vertex': (vertex_x, vertex_y),
            'discriminant': discriminant,
            'x_intercepts': x_intercepts,
            'y_intercept': y_intercept,
            'domain': domain,
            'range': range_desc,
            'range_type': range_type,
            'x_intercepts_desc': x_intercepts_desc,
            'y_intercept_desc': f"y = {c:.4f}",
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

def create_quadratic_function_examples():
    """
    다양한 이차함수 예제들을 생성하고 분석합니다.
    """
    examples = [
        {"a": 1, "b": 0, "c": 0, "name": "f(x) = x²"},
        {"a": 1, "b": -4, "c": 4, "name": "f(x) = x² - 4x + 4"},
        {"a": 1, "b": 2, "c": -3, "name": "f(x) = x² + 2x - 3"},
        {"a": -1, "b": 0, "c": 4, "name": "f(x) = -x² + 4"},
        {"a": 2, "b": -8, "c": 6, "name": "f(x) = 2x² - 8x + 6"},
        {"a": 0.5, "b": -2, "c": 0, "name": "f(x) = 0.5x² - 2x"}
    ]
    
    print("=== 이차함수 분석 예제 ===")
    results = []
    
    for example in examples:
        result = analyze_quadratic_function(
            example["a"], 
            example["b"], 
            example["c"]
        )
        results.append({
            'name': example["name"],
            'result': result
        })
        
        print(f"\n{example['name']}:")
        print(f"  꼭짓점: ({result['vertex'][0]:.4f}, {result['vertex'][1]:.4f})")
        print(f"  x절편: {result['x_intercepts_desc']}")
        print(f"  y절편: {result['y_intercept_desc']}")
        print(f"  범위: {result['range']}")
        print(f"  판별식: {result['discriminant']:.4f}")
    
    return results

if __name__ == "__main__":
    # 예제 실행
    create_quadratic_function_examples()


