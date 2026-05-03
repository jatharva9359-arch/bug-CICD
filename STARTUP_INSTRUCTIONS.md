# BugTracker Startup Guide

## To Start the Frontend (React):

Option 1 - Using the batch file:
```
cd BugTracker-main\client
.\start.bat
```

Option 2 - Using PowerShell:
```
cd BugTracker-main\client
$env:NODE_OPTIONS='--openssl-legacy-provider'
npm start
```

The app will be available at: **http://localhost:3000**

## To Start the Backend (Spring Boot):

In a new terminal:
```
cd BugTracker-main\server
mvn spring-boot:run
```

The backend will be available at: **http://localhost:9090**

## Notes:
- The Node.js version v22 requires the `--openssl-legacy-provider` flag due to OpenSSL 3.0 compatibility
- Make sure both frontend and backend are running for full functionality
- The app uses Auth0 for authentication, ensure credentials are configured
