// Helper function for error handling
export const handleError = (error, action) => {
    if (error) {
      console.error(error);
      throw new Error(`${action} failed: ${error.message}`);
    }
  };
  