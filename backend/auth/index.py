import json
import os
import re

import psycopg2


def handler(event: dict, context) -> dict:
    '''Авторизация пользователя MagicDraw по номеру телефона с именем ребёнка. Создаёт или находит профиль.'''
    method = event.get('httpMethod', 'POST')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': cors_headers,
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    phone_raw = str(body.get('phone', ''))
    child_name = str(body.get('child_name', '')).strip()
    avatar = str(body.get('avatar', '')).strip()

    phone = re.sub(r'[^0-9+]', '', phone_raw)

    if len(phone) < 10:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Введите корректный номер телефона'}),
        }

    if not child_name:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Введите имя ребёнка'}),
        }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    safe_phone = phone.replace("'", "''")
    safe_name = child_name.replace("'", "''")
    safe_avatar = avatar.replace("'", "''")

    cur.execute(f"SELECT id, phone, child_name, avatar FROM users WHERE phone = '{safe_phone}'")
    row = cur.fetchone()

    if row:
        cur.execute(
            f"UPDATE users SET child_name = '{safe_name}', avatar = '{safe_avatar}' "
            f"WHERE phone = '{safe_phone}' RETURNING id, phone, child_name, avatar"
        )
        row = cur.fetchone()
        is_new = False
    else:
        cur.execute(
            "INSERT INTO users (phone, child_name, avatar) "
            f"VALUES ('{safe_phone}', '{safe_name}', '{safe_avatar}') "
            "RETURNING id, phone, child_name, avatar"
        )
        row = cur.fetchone()
        is_new = True

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'id': row[0],
            'phone': row[1],
            'child_name': row[2],
            'avatar': row[3],
            'is_new': is_new,
        }),
    }
