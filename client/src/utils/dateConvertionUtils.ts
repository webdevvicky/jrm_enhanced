export const convertMongoDBDate = (mongoDBDateString: Date | undefined): Date | undefined => {
    if (mongoDBDateString) {
      const convertedDate = new Date(
        Date.UTC(
          mongoDBDateString.getUTCFullYear(),
          mongoDBDateString.getUTCMonth(),
          mongoDBDateString.getUTCDate()
        )
      );
      return convertedDate;
    }
    return undefined;
};



export const dateConvert = (mongoDBDateString: string | undefined): string | undefined => {
    if (mongoDBDateString) {
      return mongoDBDateString.toString().split('T')[0];
    }
    return undefined;
  };


  export const calculateDaysDifference = (startDate: Date, endDate: Date): number => {
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  };





// Utility function to get formatted time
const getFormattedTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Utility function to use in other components
export const getCurrentTime = () => {
  return getFormattedTime();
};



// Utility function to get formatted date
const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Utility function to use in other components
export const getCurrentDate = () => {
  return getFormattedDate();
};
