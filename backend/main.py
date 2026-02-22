from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection

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

