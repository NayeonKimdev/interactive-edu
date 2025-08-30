# Interactive Educational Platform Backend
# Version: 1.0.0

from flask import Flask
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__)
    
    # CORS 설정
    CORS(app)
    
    # 설정 로드
    from .config import config
    app.config.from_object(config)
    
    # 라우터 등록
    from .api import cards, health
    app.register_blueprint(cards.bp)
    app.register_blueprint(health.bp)
    
    return app

