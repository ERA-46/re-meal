# ReMeal – Food Redistribution Web App

A full-stack web application that connects restaurants with surplus food to
people in need and volunteers in the community. Restaurants can list available
food, requesters can claim it, and volunteers can coordinate delivery.

> College group project · Douglas College

---

## Features

- Restaurant role: list surplus food items with quantity and expiry details
- Requester role: browse and claim available food listings
- Volunteer role: view and manage delivery assignments
- REST API with role-based endpoints
- In-memory H2 database for development and testing

---

## Tech stack

| Layer    | Technology        |
|----------|-------------------|
| Frontend | React             |
| Backend  | Java, Spring Boot |
| Database | H2 (in-memory)    |
| Tools    | Git, Maven        |

---

## Running the backend locally

### Prerequisites

- Java JDK 17 or later
- Maven

### Steps

```bash
git clone https://github.com/ERA-46/re-meal.git
cd re-meal/backend
./mvnw spring-boot:run
```

The API runs at `http://localhost:8080` by default.
The H2 console is available at `http://localhost:8080/h2-console`.

---

## Running the frontend locally

```bash
cd re-meal/frontend
npm install
npm start
```

Open `http://localhost:3000` in your browser.

---

## Contributors

Please see the [contributors page](https://github.com/ERA-46/re-meal/graphs/contributors).
