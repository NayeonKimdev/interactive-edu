from flask import Blueprint, jsonify
from datetime import datetime
import time

bp = Blueprint('health', __name__, url_prefix='/api/health')

@bp.route('/', methods=['GET'])
def health_check():
    """API 상태 확인 엔드포인트"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'uptime': time.time(),
        'version': '1.0.0'
    })

@bp.route('/ping', methods=['GET'])
def ping():
    """간단한 ping 응답"""
    return jsonify({'message': 'pong'})

