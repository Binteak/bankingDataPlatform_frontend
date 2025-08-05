export const environment = {
    production: true,
    // apiUrl: 'https://pruebaappbackend.onrender.com/api'
    apiURL: process.env['API_URL'] || ''
  };