# Niki Warehouse App

Niki Warehouse App microservices project for warehouse inventory and store ordering, built with FastAPI, Redis Streams, and a React + Vite frontend.

## Overview

This project contains:

- `warehouse/` — warehouse service (product CRUD)
- `store/` — order service (creates orders and publishes completion events)
- `web/` — React frontend for products and ordering

Event-driven flow is implemented with Redis Streams:

- `store` publishes `order-completed`
- `warehouse/fulfillment.py` (warehouse worker) consumes `order-completed` and decrements inventory
- if fulfillment fails, the warehouse service publishes `refund-order`
- `store/update.py` consumes `refund-order` and marks order as `refunded`

---

## Architecture

1. User creates products in the warehouse service.
2. User places an order in the store service.
3. Store calculates fee/total and creates order with `pending` status.
4. After background processing, store marks order `completed` and emits stream event.
5. Fulfillment worker updates product stock.
6. If stock update fails, refund event is emitted and order becomes `refunded`.

---

## Tech Stack

- Warehouse + Store APIs: FastAPI
- Data + messaging: Redis + Redis OM + Redis Streams
- Frontend: React, TypeScript, Vite.js, Material UI

---

## Prerequisites

- Python 3.10+
- Node.js 22+ (recommended)
- npm 10+
- Redis running locally

## Environment Variables

Create `.env` files in both `warehouse/` and `store/`:

```env
HOST=localhost
PORT=6379
PASSWORD=
```

Create `web/.env`:

```env
VITE_PRODUCT_URL=http://localhost:8000
VITE_ORDER_URL=http://localhost:8001
```

---

## Install Dependencies

### 1. Warehouse service

```bash
cd warehouse
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### 2. Store service

```bash
cd store
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

### 3. Frontend

```bash
cd web
npm install
```

---

## Run the Project

Use separate terminals.

### Terminal 1 — Warehouse API (port 8000)

```bash
cd warehouse
source env/bin/activate
uvicorn main:app --reload --port 8000
```

### Terminal 2 — Fulfillment worker

```bash
cd warehouse
source env/bin/activate
python3 fulfillment.py
```

### Terminal 3 — Store API (port 8001)

```bash
cd store
source env/bin/activate
uvicorn main:app --reload --port 8001
```

### Terminal 4 — Refund worker

```bash
cd store
source env/bin/activate
python3 update.py
```

### Terminal 5 — Frontend (port 5173)

```bash
cd web
npm run dev
```

Open: `http://localhost:5173/products`

---

## API Summary

### Warehouse (`warehouse/`, `:8000`)

- `POST /product` — create product
- `GET /product/{pk}` — get product by id
- `GET /products` — list products
- `DELETE /product/{pk}` — delete product

### Store (`store`, `:8001`)

- `POST /orders` — create order from product id + quantity
- `GET /orders/{pk}` — get order by id
- `GET /orders` — list orders

---

## Frontend Features

- Product list with search, sorting, pagination
- Product creation form
- Product deletion
- Order form (shows calculated fee preview from selected product)

---

## Notes

- Start Redis before running APIs/workers.
- The store service depends on warehouse service at `http://localhost:8000`.
- Workers (`fulfillment.py` and `update.py`) must be running for full event flow.

### Troubleshooting

- If you see `ModuleNotFoundError: No module named 'fastapi'`, your virtual environment is not active.
- Re-activate from the correct folder and reinstall dependencies if needed:

```bash
source env/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
