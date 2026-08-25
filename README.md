# Banking Data Platform — Frontend

Frontend web application for a banking data governance and regulatory reporting platform.

The application provides an interactive interface for managing banking risk exposure data, performing data quality checks, exploring datasets and reviewing regulatory reporting results.

## Features

- Interactive dashboard
- CSV data upload interface
- Dataset management
- Data Quality controls
- Data validation and monitoring
- Data Explorer with interactive filters
- Risk reporting and analysis
- Audit reporting
- Housekeeping and data management
- Audit log visualization
- Responsive user interface
- Mock data support for production demo

## Technologies

- Angular
- TypeScript
- HTML
- SCSS
- PrimeNG
- RxJS
- REST API
- Netlify

## Architecture

The frontend is built with Angular using a component-based architecture.

The application communicates with the Django REST API to retrieve, process and display banking risk data.

The frontend is responsible for:

- User interface and navigation
- Data visualization
- Form handling
- Client-side validation
- Filtering and data exploration
- Reporting views
- API communication
- Application state management

## Backend

This frontend works together with the Banking Data Platform backend:

https://github.com/Binteak/bankingDataPlatform_backend

## Demo

The application is deployed on Netlify:

https://banking-data-platform-frontend.onrender.com

## Production Demo

The deployed version runs using mock data for demonstration purposes.

No real banking or customer data is used.

The application is designed to demonstrate the functionality and architecture of a banking data governance and regulatory reporting platform.

## Screenshots

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Data Upload

![Data Upload](screenshots/upload-data.png)

### Data Quality

![Data Quality](screenshots/data-quality.png)

### Data Explorer

![Data Explorer](screenshots/data-explorer.png)

### Reporting

![Reporting](screenshots/reporting.png)

### Audit Reporting

![Audit Reporting](screenshots/audit-reporting.png)
