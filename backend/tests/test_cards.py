import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    
    with app.test_client() as client:
        yield client

def test_get_cards(client):
    """카드 목록 조회 테스트"""
    response = client.get('/api/cards/')
    assert response.status_code == 200
    data = response.get_json()
    assert 'cards' in data
    assert 'count' in data

def test_get_card_by_id(client):
    """특정 카드 조회 테스트"""
    # 먼저 카드 목록을 가져와서 첫 번째 카드 ID를 사용
    response = client.get('/api/cards/')
    data = response.get_json()
    
    if data['cards']:
        card_id = data['cards'][0]['id']
        response = client.get(f'/api/cards/{card_id}')
        assert response.status_code == 200
        card_data = response.get_json()
        assert card_data['id'] == card_id

def test_get_cards_by_category(client):
    """카테고리별 카드 조회 테스트"""
    response = client.get('/api/cards/category/math')
    assert response.status_code == 200
    data = response.get_json()
    assert 'cards' in data
    assert 'count' in data

