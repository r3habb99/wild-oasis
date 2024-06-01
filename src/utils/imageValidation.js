// Helper function to validate image file
export const isValidImage = (file) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return allowedMimeTypes.includes(file.type);
  };
  