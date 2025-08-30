#!/usr/bin/env python3
"""
Interactive Educational Platform Backend
메인 애플리케이션 진입점
"""

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
