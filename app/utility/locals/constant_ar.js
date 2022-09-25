

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

    Request_Rejected: "طلبك مرفوض",
    Request_Pending: "طلبك قيد الانتظار",
    No_Record_Found: "لا يوجد سجلات",
    User_does_not_exist: "اسم المستخدم غير موجود",
    Email_Required: "البريد الالكتروني مطلوب",
    Password_Required: "كلمه المرور مطلوبه",
    social_id_Required: "",
    email_password: "البريد الالكتروني وكلمه المرور",
    Invalid_Credientials: "البيانات خاطئه",
    Login_Successful: "تم تسجيل الدخول بنجاح",
    Account_not_verified: "الحساب غير مفعل",
    No_user_found_with_this_email: "لم يتم العثور علئ مستخدم بهذا البريد الالكتروني",
    Forgot_Password: "نسيت كلمه المرور",
    Otp_has_been_sent_on_email: "تم ارسال رمز التفعيل لبريدك الالكتروني",
    New_code_has_been_resent_to_your_Phone: "تم ارسال رمز جديد الى جوالك",
    New_password_created: "تم انشاء كلمه مرور جديده",
    Pick_Another_Slot: "اختر موعد اخر",
    //Registered_Booking: "حجز مسجل",
    Registered_Booking: "طلب جديد",
    Your_booking_request_has_been_sent: ".تم ارسال طلب حجزك",
    Promo_Code_Required: "ادخل كود الخصم",
    Invalid_Promo_Code: "كود الخصم غير صحيح",
    Payment_Successfull: "تم الدفع",
    Payment_Failed: "لم يتم الدفع",
    Your_booking_is_cancelled: "تم الغاء حجزك",
    Booking_cancel_successfully: "تم الغاء حجزك بنجاح",
    Your_reschedule_booking_request_has_been_sent: "تم ارسال طلب اعاده حجزك بنجاح",
    Booking_rescheduled: "اعادة حجزك",
    error_while_approving_booking: "خطا اثناء تاكيد حجزك",
    Successfully_Subscribed: "تم الاشتراك بنجاح",
    expired: "منتهي",
    Canceled_Booking: "حجز ملغي",

    OTP_has_been_sent_on_your_email: "تم ارسال رمز التحقق لبريدك الالكتروني",
    Cancel_booking: "الغاء ",
    resehdule_booking: "اعادة جدولة",
    your_bookingis_has_expired: "تم انتهاء صلاحيه حجزك",
    Your_booking_has_been_approved_please_pay_now: "تمت الموافقه علي حجزك ادفع الان",
    Reject_Booking: "رفض الحجز",
    Rescheduled_Booking: "اعادة جدولة الحجز",
    Your_booking_is_Rescheduled_successfully: "تم اعادة جدولة الحجز بنجاح",
    Your_booking_has_been_rejected: "تم الغاء طلب حفلتك",
    Your_booking_is_Rescheduled: " تم اعادة جدولة الحجز",
    invaild_promo_code: "كود الخصم غير صحيح",
    approved:"تم الموافقه",
    Notification_Setting_Updated: "تم تحديث حالة تنبيه الاشعارات"

};
module.exports = function (key)
{
    return constants[key];
};