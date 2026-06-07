import json
import os
import base64
import uuid
from datetime import datetime

import boto3
import psycopg2


def handler(event: dict, context) -> dict:
    '''Сохранение и получение детских рисунков MagicDraw: загрузка картинки в облако и запись в базу данных.'''
    method = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-User-Name',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    dsn = os.environ['DATABASE_URL']

    if method == 'GET':
        return _list_creations(event, dsn, cors_headers)

    if method == 'POST':
        return _create_creation(event, dsn, cors_headers)

    if method == 'PUT':
        return _like_creation(event, dsn, cors_headers)

    return {
        'statusCode': 405,
        'headers': cors_headers,
        'body': json.dumps({'error': 'Method not allowed'}),
    }


def _list_creations(event: dict, dsn: str, cors_headers: dict) -> dict:
    params = event.get('queryStringParameters') or {}
    user_name = params.get('user_name')

    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    if user_name:
        safe = user_name.replace("'", "''")
        cur.execute(
            "SELECT id, user_name, title, image_url, effect, emoji, likes, created_at "
            f"FROM creations WHERE user_name = '{safe}' ORDER BY created_at DESC LIMIT 100"
        )
    else:
        cur.execute(
            "SELECT id, user_name, title, image_url, effect, emoji, likes, created_at "
            "FROM creations ORDER BY created_at DESC LIMIT 100"
        )

    rows = cur.fetchall()
    cur.close()
    conn.close()

    items = []
    for r in rows:
        items.append({
            'id': r[0],
            'user_name': r[1],
            'title': r[2],
            'image_url': r[3],
            'effect': r[4],
            'emoji': r[5],
            'likes': r[6],
            'created_at': r[7].isoformat() if r[7] else None,
        })

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'creations': items}),
    }


def _create_creation(event: dict, dsn: str, cors_headers: dict) -> dict:
    body = json.loads(event.get('body') or '{}')

    image_base64 = body.get('image_base64', '')
    title = body.get('title', 'Мой рисунок')
    user_name = body.get('user_name', 'Гость')
    effect = body.get('effect', '')
    emoji = body.get('emoji', '🎨')

    if not image_base64:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'image_base64 is required'}),
        }

    if ',' in image_base64 and image_base64.strip().startswith('data:'):
        header, image_base64 = image_base64.split(',', 1)
        content_type = header.split(';')[0].replace('data:', '') or 'image/png'
    else:
        content_type = 'image/png'

    ext = content_type.split('/')[-1] if '/' in content_type else 'png'
    image_data = base64.b64decode(image_base64)

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    key = f"drawings/{uuid.uuid4().hex}.{ext}"
    s3.put_object(Bucket='files', Key=key, Body=image_data, ContentType=content_type)

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    conn = psycopg2.connect(dsn)
    cur = conn.cursor()

    safe_user = user_name.replace("'", "''")
    safe_title = title.replace("'", "''")
    safe_effect = effect.replace("'", "''")
    safe_emoji = emoji.replace("'", "''")
    safe_url = cdn_url.replace("'", "''")

    cur.execute(
        "INSERT INTO creations (user_name, title, image_url, effect, emoji) "
        f"VALUES ('{safe_user}', '{safe_title}', '{safe_url}', '{safe_effect}', '{safe_emoji}') "
        "RETURNING id, created_at"
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({
            'id': row[0],
            'image_url': cdn_url,
            'title': title,
            'user_name': user_name,
            'effect': effect,
            'emoji': emoji,
            'likes': 0,
            'created_at': row[1].isoformat() if row[1] else None,
        }),
    }


def _like_creation(event: dict, dsn: str, cors_headers: dict) -> dict:
    body = json.loads(event.get('body') or '{}')
    creation_id = body.get('id')

    if not isinstance(creation_id, int):
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'id (int) is required'}),
        }

    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        f"UPDATE creations SET likes = likes + 1 WHERE id = {creation_id} RETURNING likes"
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()

    if not row:
        return {
            'statusCode': 404,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'not found'}),
        }

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'id': creation_id, 'likes': row[0]}),
    }
