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



// utils.ts

export const convertMongoDate = (utcDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Kolkata', // Set the desired time zone
  };

  const indianDate: string = new Date(utcDate).toLocaleString('en-IN', options);
  return indianDate;
};

// for giving date as inputr in input fields
export const dateConvert = (mongoDBDateString: string | undefined): string | undefined => {
    if (mongoDBDateString) {
      return mongoDBDateString.toString().split('T')[0];
    }
    return undefined;
  };


  // for showing date in information

  export const formatDate = (mongoDBDateString: string | undefined): string | undefined => {
    if (mongoDBDateString) {
        const parts = mongoDBDateString.split('T')[0].split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            // Rearrange the parts and join with '-'
            return `${day}-${month}-${year}`;
        }
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
