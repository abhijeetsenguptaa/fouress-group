function isValidPhoneNumber(phoneNumber) {
    // Check if the phone number is exactly 10 digits
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
}


module.exports = isValidPhoneNumber;