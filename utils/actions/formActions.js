import {
    validateString,
    validateEmail,
    validatePassword,
    validateCreditCardNumber,
    validateExpiryDate,
    validateCVV
} from '../ValidationConstraints'

export const validateInput = (inputId, inputValue) => {
    if (
        inputId === 'fullName' ||
        inputId === 'location' ||
        inputId === 'phoneNumber' ||
        inputId === 'creditCardHolderName' ||
        inputId === 'bio' ||
        inputId === 'address' ||
        inputId === 'street' ||
        inputId === 'postalCode' ||
        inputId === 'appartment'
    ) {
        return validateString(inputId, inputValue)
    } else if (inputId === 'email') {
        return validateEmail(inputId, inputValue)
    } else if (inputId === 'password' || inputId === 'confirmPassword') {
        return validatePassword(inputId, inputValue)
    } else if (inputId === 'resetToken') {
        return validateString(inputId, inputValue)
    }else if(inputId === 'creditCardNumber'){
        return validateCreditCardNumber(inputId, inputValue)
    }else if(inputId === 'creditCardExpiryDate'){
        return validateExpiryDate(inputId, inputValue)
    }else if(inputId === 'cvv'){
        return validateCVV(inputId, inputValue)
    }
}