exports.errorHandler = (error) => {
  let message = '';

  if (error && error.errno) {
    switch (error.errno) {
      case 1048:
      case 1062:
        message = error.sqlMessage;
        break;
      default:
        message = error.sqlMessage;
    }
  } else {
    //     // for (let errorName in error.errorors) {
    //     //     if (error.errorors[errorName].sqlMessage)
    //     //         message = error.errorors[errorName].sqlMessage;
    //     }
  }

  return message;
};
