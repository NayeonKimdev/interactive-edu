#!/usr/bin/env python3
"""
Python Code Runner for Interactive Educational Platform
"""

import json
import sys
import traceback
from io import StringIO
from contextlib import redirect_stdout, redirect_stderr
import matplotlib
matplotlib.use('Agg')  # GUI 없이 실행

def run_code(code: str, timeout: int = 30) -> dict:
    """
    Python 코드를 실행하고 결과를 반환합니다.
    
    Args:
        code (str): 실행할 Python 코드
        timeout (int): 실행 제한 시간 (초)
    
    Returns:
        dict: 실행 결과를 포함한 딕셔너리
    """
    result = {
        'success': False,
        'output': '',
        'error': '',
        'execution_time': 0,
        'variables': {}
    }
    
    try:
        # 표준 출력과 에러를 캡처
        stdout_capture = StringIO()
        stderr_capture = StringIO()
        
        # 코드 실행
        with redirect_stdout(stdout_capture), redirect_stderr(stderr_capture):
            exec(code, {})
        
        result['output'] = stdout_capture.getvalue()
        result['error'] = stderr_capture.getvalue()
        result['success'] = True
        
    except Exception as e:
        result['error'] = f"Error: {str(e)}\n{traceback.format_exc()}"
        result['success'] = False
    
    return result

def main():
    """메인 함수"""
    try:
        # 표준 입력에서 코드 읽기
        code = sys.stdin.read()
        
        if not code.strip():
            print(json.dumps({
                'success': False,
                'error': 'No code provided'
            }))
            return
        
        # 코드 실행
        result = run_code(code)
        
        # 결과를 JSON으로 출력
        print(json.dumps(result, ensure_ascii=False))
        
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': f'Runner error: {str(e)}'
        }))

if __name__ == '__main__':
    main()
