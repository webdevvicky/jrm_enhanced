const handleValidationError = (res, error) => {
  return res.status(400).json({ error: error.message });
};

const handleDuplicateKeyError = (res, error) => {
  // Check if it's a duplicate key error for MongoDB (code 11000)
  if (error.name === 'MongoError' && error.code === 11000) {
    const keyPattern = /email/; 
    if (keyPattern.test(error.message)) {
      return res.status(409).json({ error: 'Email already exists' });
    }
  }
};

const handleMongoDBError = (res, error) => {
  // Check for other MongoDB errors
  if (error.name === 'MongoError') {
   
    return res.status(500).json({ error: 'MongoDB Error' });
  }
};

const errorHandler = (res, error) => {
  console.error(error);

  if (error.name === 'ValidationError') {
    return handleValidationError(res, error);
  } else {
    handleDuplicateKeyError(res, error);
    handleMongoDBError(res, error);
    
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = errorHandler;
