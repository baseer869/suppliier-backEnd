const constants = {

    UN_AUTHORIZED_USER: "Unauthorized user , you can not access the route",
    VALIDATION_ERROR: "Request send with incorrect or missing data. ",
    SERVER_ERROR: "Unknown Server Error.",
    OTP_GENERATED: "OTP Code generated.",
    OTP_NOT_GENERATED: "OTP Code not generated.",
    OTP_VERIFIED: "OTP Code verified.",
    OTP_NOT_VERIFIED: "OTP Code not verified.",
    SUBSCRIPTION_PACKAGE_FETCHED: "Subscription packages fetched.",
    OPTIN_PREACTIVE_WAIT_CONF: "OTP code generated.",
    OPTIN_ALREADY_ACTIVE: "User is already subscribed to the product.",
    OPTIN_MISSING_PARAM: "API is called with invalid or missing parameters.",
    OPTIN_CONF_MISSING_PARAM: "API is called without valid parameters.",
    OPTIN_ACTIVE_WAIT_CHARGING: "Code verify successfully.",
    // OPTIN_ACTIVE_WAIT_CHARGING: "When subscription is successfully done and is waiting for charging "
    OPTIN_CONF_WRONG_PIN: "Code is invalid.",
    // OPTIN_CONF_WRONG_PIN: "When opt‐in/confirm API is called with a wrong transactionAuthCode(pin).",
    //FREE_PERIOD_ENABLED: "This is applicable for free trial products and if the user is eligible for free trials. Post free period, user will be charged for the subscription."
    FREE_PERIOD_ENABLED: "You are eligible for free trails.",
    OOREDOO_NOT_RESPONDING: "Ooredoo server not responding.",
    NO_RECORD: "No record found.",
    SUBSCRIPTION_ADDED: "Subscription added",
    SUBSCRIPTION_EXISTS: "Subscription exists",
    OPTOUT_CANCELED_OK: "User is successfully unsubscribed for the product",
    OPTOUT_ALREADY_CANCELED: "User is already unsubscribed for the product",
    OPTOUT_ALL_CANCELED_OK: "Applicable for group un-subscription/common unsub keyword for multiple products",
    OPTOUT_ALL_ALREADY_CANCELED: "Applicable for group un-subscription/common unsub keyword for multiple products",
    OPTOUT_MISSING_PARAM: "API is called without valid parameters",
    OPTOUT_NO_SUB: "No subscription found for the product on the MSISDN",


    // Artist
    Request_Rejected: "Request Rejected", // Done
    Request_Pending: "Request Pending", // Done
    No_Record_Found: "No Record Found", // Done
    User_does_not_exist: "User does not exist", // Done

    // Auth
    Email_Required: "Email Required", // Done
    Password_Required: "Password Required", // Done
    social_id_Required: "social_id Required",
    email_password: "email & password", // Done
    Invalid_Credientials: "Invalid Credentials", // Done
    Login_Successful: "Login Successful", // Done
    Account_not_verified: "Account not verified", // Done
    No_user_found_with_this_email: "No user found with this email", // Done
    Forgot_Password: "Forgot Password",
    Otp_has_been_sent_on_email: "Otp has been sent on email", // Done
    New_code_has_been_resent_to_your_Phone: "New code has been resent to your Phone", // Done
    New_password_created: "New password created", // Done

    // Booking
    Pick_Another_Slot: "Pick Another Slot", // Done
    Registered_Booking: "Registered Booking",
    Your_booking_request_has_been_sent: "Your booking request has been sent",
    Promo_Code_Required: "Promo Code Required", // Done
    Invalid_Promo_Code: "Invalid Promo Code", // Done
    Payment_Successfull: "Payment Successfull", // Done
    Payment_Failed: "Payment Failed", // Done
    Your_booking_is_cancelled: "Your booking is cancelled.",
    Booking_cancel_successfully: "Booking canceled successfully.", // Done
    Your_reschedule_booking_request_has_been_sent: "Your reschedule booking request has been sent",
    Booking_rescheduled: "Booking rescheduled", // half Done
    error_while_approving_booking: "error while approving booking", // Done

    // Contact Us
    Successfully_Subscribed: "Successfully Subscribed", // Done

    // Review
    // expired: "expired",
    Canceled_Booking: "Cancel Booking",

    // OTP_has_been_sent_on_your_email: "OTP has been sent on your email",
    // Cancel_booking: "Cancel booking",
    // resehdule_booking: "resehdule booking",
    // your_bookingis_has_expired: "your bookingis has expired",
    approved: "Approved Booking",
    Your_booking_has_been_approved_please_pay_now: "Your booking has been approved please pay now.",
    Reject_Booking: "Reject Booking",
    Rescheduled_Booking: "Rescheduled Booking",
    // Your_booking_is_Rescheduled_successfully: "Your booking is Rescheduled successfully",
    Your_booking_has_been_rejected: "Your booking has been rejected.",
    // Your_booking_is_Rescheduled: "Your booking is Rescheduled",
    // invaild_promo_code: "invaild promo code",
    Notification_Setting_Updated: "Notification Setting Updated"
};
module.exports = function (key)
{
    return constants[key];
};
