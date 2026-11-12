from flask import Flask, jsonify, request
import time

app = Flask(__name__)

# Консольное логирование запроса(для продвинутого уровня)
@app.before_request
def log_request():
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {request.method} {request.path}")

# 1. Текстовый эндпоинт
@app.route('/')
def home():
    return 'Добро пожаловать на сервер обработки заказов!'

# 2. JSON эндпоинт: Сущность 1 (коллекция заказов)
@app.route('/api/orders')
def get_orders():
    orders = [
        {"id": 1, "item": "Ноутбук", "status": "доставлен", "price": 75000},
        {"id": 2, "item": "Мышь", "status": "в обработке", "price": 2500},
        {"id": 3, "item": "Клавиатура", "status": "отправлен", "price": 5000}
    ]
    return jsonify(orders)

# 3. JSON эндпоинт: Сущность 2 (коллекция клиентов)
@app.route('/api/clients')
def get_clients():
    clients = [
        {"id": 101, "name": "Алексей Смирнов", "email": "alex@example.com"},
        {"id": 102, "name": "Мария Иванова", "email": "maria@example.com"}
    ]
    return jsonify(clients)

# 4. JSON эндпоинт с параметром пути: получение заказа по ID
@app.route('/api/orders/<int:order_id>')
def get_order_by_id(order_id):
    return jsonify({
        "status": "success",
        "requestedId": order_id,
        "message": f"Информация по заказу №{order_id} получена"
    })

# Обработка 404
@app.errorhandler(404)
def not_found(error):
    return jsonify({ "error": "Маршрут не найден" }), 404

if __name__ == '__main__':
    app.run(port=3000, debug=True)