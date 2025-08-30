from flask import Blueprint, jsonify, request
import os
import json
from pathlib import Path

bp = Blueprint('cards', __name__, url_prefix='/api/cards')

def load_cards_from_filesystem():
    """파일 시스템에서 카드 데이터를 로드하는 함수"""
    cards = []
    sample_cards_path = Path(__file__).parent.parent.parent.parent / 'data' / 'raw'
    
    try:
        if sample_cards_path.exists():
            for category_dir in sample_cards_path.iterdir():
                if category_dir.is_dir():
                    for subcategory_dir in category_dir.iterdir():
                        if subcategory_dir.is_dir():
                            metadata_file = subcategory_dir / 'metadata.json'
                            
                            if metadata_file.exists():
                                try:
                                    with open(metadata_file, 'r', encoding='utf-8') as f:
                                        metadata = json.load(f)
                                    
                                    cards.append({
                                        'id': metadata.get('id'),
                                        'title': metadata.get('title'),
                                        'category': metadata.get('category'),
                                        'subcategory': metadata.get('subcategory'),
                                        'difficulty': metadata.get('difficulty'),
                                        'description': metadata.get('description'),
                                        'tags': metadata.get('tags', []),
                                        'learningObjectives': metadata.get('learningObjectives', []),
                                        'estimatedTime': metadata.get('estimatedTime'),
                                        'prerequisites': metadata.get('prerequisites', [])
                                    })
                                except Exception as e:
                                    print(f"메타데이터 파일 읽기 오류 ({metadata_file}): {e}")
    except Exception as e:
        print(f'카드 데이터 로드 오류: {e}')
    
    return cards

@bp.route('/', methods=['GET'])
def get_cards():
    """모든 카드 목록을 반환"""
    try:
        cards = load_cards_from_filesystem()
        return jsonify({'cards': cards, 'count': len(cards)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/<card_id>', methods=['GET'])
def get_card(card_id):
    """특정 카드 정보를 반환"""
    try:
        cards = load_cards_from_filesystem()
        card = next((c for c in cards if c['id'] == card_id), None)
        
        if card:
            return jsonify(card)
        else:
            return jsonify({'error': 'Card not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@bp.route('/category/<category>', methods=['GET'])
def get_cards_by_category(category):
    """카테고리별 카드 목록을 반환"""
    try:
        cards = load_cards_from_filesystem()
        filtered_cards = [c for c in cards if c['category'] == category]
        return jsonify({'cards': filtered_cards, 'count': len(filtered_cards)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

