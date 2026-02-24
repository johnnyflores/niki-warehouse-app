from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel

from dotenv import load_dotenv
import os

load_dotenv() # take environment variables from .env.

HOST = os.getenv('HOST')
PORT = os.getenv('PORT')
PASSWORD = os.getenv('PASSWORD')

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

redis = get_redis_connection(
    host=HOST,
    port=int(PORT),
    password=PASSWORD,
    decode_responses=True
)

class Product(HashModel, index=True):
    name: str
    price: float
    quantity: int
    class Meta:
        database = redis

@app.post('/product', tags=['warehouse'])
def create(product: Product):
    return product.save()
    
@app.get('/product/{pk}', tags=['warehouse'])
def get(pk: str):
    return Product.get(pk)

@app.get('/products', tags=['warehouse'])
def get_all():
    return [format(pk) for pk in Product.all_pks()]

def format(pk: str):
    product = Product.get(pk)
    return {
        'id': product.pk,
        'name': product.name,
        'price': product.price,
        'quantity': product.quantity
    }

@app.delete('/product/{pk}', tags=['warehouse'])
def delete(pk: str):
    return Product.delete(pk)