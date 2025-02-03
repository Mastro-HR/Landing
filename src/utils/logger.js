// src/utils/logger.js
const logger = {
    debug: (component, action, data) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `%c[${component}]%c[${action}]`,
          'color: #4CAF50; font-weight: bold',
          'color: #2196F3; font-weight: bold',
          data
        );
      }
    },
    info: (component, action, data) => {
      if (process.env.NODE_ENV === 'development') {
        console.info(
          `%c[${component}]%c[${action}]`,
          'color: #9C27B0; font-weight: bold',
          'color: #E91E63; font-weight: bold',
          data
        );
      }
    },
    warn: (component, action, data) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `%c[${component}]%c[${action}]`,
          'color: #FFC107; font-weight: bold',
          'color: #FF9800; font-weight: bold',
          data
        );
      }
    },
    error: (component, action, data) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(
          `%c[${component}]%c[${action}]`,
          'color: #F44336; font-weight: bold',
          'color: #FF5722; font-weight: bold',
          data
        );
      }
    }
  };
  
  export default logger;