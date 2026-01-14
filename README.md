# MERN Task App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks.

**Website URL**: https://mern-task-app-b0hjfac9h3fpcxcs.canadacentral-01.azurewebsites.net/

## Features

- Create, read, update, and delete tasks
- Responsive React frontend
- Express backend with MongoDB
- Environment variable configuration

## Local Development

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

3. Set up environment variables in `.env`:

   ```env
   MONGO_URI=mongodb://localhost:27017/mern-task-app
   PORT=5000
   NODE_ENV=development
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Production Build

To build the application for production:

```bash
npm run build
```

This will build the React frontend and copy the files to `backend/public`.

## Deployment to Microsoft Azure

Follow these steps to deploy the application on Microsoft Azure:

### 1. Prepare Your MERN Application

- Ensure the app is fully developed and tested locally.
- Backend is connected to MongoDB using environment variables.

### 2. Create a Microsoft Azure Account

- Sign up for a Microsoft Azure account if you don't have one.
- Access the Azure Portal.

### 3. Set Up MongoDB Atlas

- Since Azure doesn't offer MongoDB directly, use MongoDB Atlas.
- Create a MongoDB Atlas account.
- Create a new cluster and get the connection string.

### 4. Prepare App for Deployment

- Update `.env` or Azure config with MongoDB Atlas URI.
- Build the app: `npm run build`

### 5. Create an Azure Web App Service

- In Azure Portal: Create a resource > Web > Web App
- Fill in app name, resource group, region.
- Choose pricing tier.

### 6. Set Up Deployment Source

- In Web App settings: Deployment Center
- Choose Local Git or connect to GitHub.

### 7. Deploy Your MERN App

- If Local Git: Clone the Azure repo, copy built files (already in backend/public), commit and push.
- Azure will auto-deploy.

### 8. Configure Environment Variables

- In Web App: Configuration
- Set MONGO_URI to Atlas connection string, NODE_ENV=production, PORT if needed.

### 9. Test Deployed App

- Access the URL provided by Azure.
- Test functionalities and DB connectivity.

## API Endpoints

- GET /api/tasks - Get all tasks
- POST /api/tasks - Create a new task
- PUT /api/tasks/:id - Update a task
- DELETE /api/tasks/:id - Delete a task

## Technologies Used

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Other: Mongoose, CORS, Dotenv
