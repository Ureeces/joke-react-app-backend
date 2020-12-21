const getUniqueErrorMessage = (err) => {
  let output;

  let message = err.message;

  try {
    let fieldName = message.substring(
      message.lastIndexOf(".$") + 2,
      message.lastIndexOf("_1")
    );

    let whereToSlice = fieldName.lastIndexOf(":") + 2;

    output = fieldName.slice(whereToSlice) + " Already exists";
  } catch (e) {
    output = "Unique field already exists";
  }

  return output;
};

const getErrorMessage = (err) => {
  let errorObj = {};
  let message = "";

  if (err.code) {
    switch (err.code) {
      case 404:
        errorObj.statusCode = err.code;
        errorObj.message = err.message;
        return errorObj;
      case 11000:
      case 11001:
        errorObj.statusCode = 409;
        errorObj.message = getUniqueErrorMessage(err);
        return errorObj;
      default:
        errorObj.statusCode = 500;
        errorObj.message = "Something went wrong";
        return errorObj;
    }
  } else if (err.message) {
    errorObj.message = err.message;
    errorObj.statusCode = 500;
    return errorObj;
  } else {
    for (let errName in err.errors) {
      if (err.errors[errName].message) {
        message = err.errors[errName].message;
      }
    }

    return message;
  }
};

module.exports = getErrorMessage;
