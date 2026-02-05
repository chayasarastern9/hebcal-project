
# Hebcal Zmanim App

A full-stack web application that provides a simple interface for the **Hebcal Zmanim (Halachic Times) API**.  
Users can search zmanim by city, ZIP code, or current location.

## Live Demo
https://hebcal-zmanim-app-3.azurewebsites.net/

## Tech Stack

**Frontend**
React
Axios
CSS

**Backend**
Node.js
Express
Axios
CORS

## Features

City autocomplete search
ZIP code search
Current location search
Responsive zmanim card display
Azure deployment

## Running Locally

### 1. Clone Repo

### 2. Install Dependencies
npm install
cd client
npm install
cd ..

### 3. Run Backend
node server.js
Runs on: http://localhost:5000

### 4. Run Frontend
cd client
npm start
Runs on: http://localhost:3000


## API Usage

GET /api/zmanim

### Examples

City:
/api/zmanim?city=Brooklyn

ZIP:
/api/zmanim?zip=90001

Coordinates:
/api/zmanim?lat=40.6782&lon=-73.9442


## Deployment

The app is deployed using **Azure App Service**.

To build the frontend for production:

cd client
npm run build

The backend serves the production React build.


## Author
Chaya Gordon
