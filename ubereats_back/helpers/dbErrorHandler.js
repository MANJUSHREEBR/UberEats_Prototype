"use strict";

/**
 * Get unique error field name
 */
// const uniqueMessage = error => {
//     let output;
//     try {
//         let fieldName = error.sqlMessage.substring(
//             error.message.lastIndexOf(".$") + 2,
//             error.message.lastIndexOf("_1")
//         );
//         output =
//             fieldName.charAt(0).toUpperCase() +
//             fieldName.slice(1) +
//             " already exists";
//     } catch (ex) {
//         output = "Unique field already exists";
//     }

//     return output;
// };

/**
 * Get the erroror message from error object
 */
exports.errorHandler = error => {
    let message = "";

    if (error.errno) {
        switch (error.errno) {
            case 1048:
            case 1062:
                message = error.sqlMessage;
                break;
            default:
                message = error.sqlMessage;
        }
    }
    else {
    //     // for (let errorName in error.errorors) {
    //     //     if (error.errorors[errorName].sqlMessage)
    //     //         message = error.errorors[errorName].sqlMessage;
    //     }
    }

    return message;
};

