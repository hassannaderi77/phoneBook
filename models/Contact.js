import { Schema, models, model } from "mongoose";

const contactSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    minLength: [3, "حداقل 3 کاراکتر وارد کنید"],
    maxLength: [15, "حداکثر 15 کاراکتر وارد کنید"],
  },
  lastName: {
    type: String,
    trim: true,
    minLength: [3, "حداقل 3 کاراکتر وارد کنید"],
    maxLength: [15, "حداکثر 15 کاراکتر وارد کنید"],
  },
  age: {
    type: String,
    min: [17, "سن بالای 17 باشد"]
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
    trim: true,
    maxLength: [11, "شماره وارد شده باید 11 رقم باشد" ],
    match: [/09\d{9}/, "پیش شماره باید با 09 باشد و شامل 11 کاراکتر"]
  },
});

const Contact = models.Contact || model("Contact", contactSchema);

export default Contact;
