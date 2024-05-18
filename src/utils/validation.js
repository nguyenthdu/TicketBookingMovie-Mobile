const regexes = {
  userName:
    /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\ ]+$/,
  email: /^[^\s@]+@(gmail\.com|yahoo\.com|outlook\.com)$/,
  phoneNumber: /^(03|07|08|09|05)[0-9]{8}$/,
  password: /^(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
};

export const validateUserName = (userName) => {
  if (!userName.trim()) {
    return "Tên không được để trống";
  } else if (userName.length < 2) {
    return "Tên cần ít nhất 2 ký tự";
  } else if (!regexes.userName.test(userName)) {
    return "Tên chỉ được chứa ký tự chữ cái và khoảng trắng";
  } else {
    return "";
  }
};

export const validateEmail = (email) => {
  if (email === "") {
    return "Email không được để trống";
  } else if (!regexes.email.test(email)) {
    return "Email chỉ chứa các miền @gmail.com/@yahoo.com/outlook.com!";
  } else {
    return "";
  }
};

export const validatePhoneNumber = (phoneNumber) => {
  if (phoneNumber === "") {
    return "Số điện thoại không được để trống";
  } else if (phoneNumber.length !== 10) {
    return "Số điện thoại phải đủ 10 số";
  } else if (!regexes.phoneNumber.test(phoneNumber)) {
    return "Số điện thoại phải bắt đầu bằng các đầu số sau: 03x, 07x, 08x, 09x hoặc 05x.";
  } else {
    return "";
  }
};

export const validatePassword = (password) => {
  if (password === "") {
    return "Mật khẩu không được để trống";
  } else if (!regexes.password.test(password)) {
    return "Mật khẩu phải chứa ít nhất 1 ký tự hoa, 1 chữ số, và có ít nhất 6 ký tự!";
  } else {
    return "";
  }
};
