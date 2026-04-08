// ---------------------------
// DTO CLASSES
// ---------------------------

class LoginRequest {
  constructor(body) {
    this.username = body.username;
    this.plainpassword = body.plainpassword;
  }

  validate() {
    if (!this.username) return "username is required";
    if (!this.plainpassword) return "plainpassword is required";
    return null;
  }
}

class SignupRequest {
  constructor(body) {
    this.firstname = body.firstname;
    this.lastname = body.lastname;
    this.username = body.username;
    this.email = body.email;
    this.plainpassword = body.plainpassword;
    this.activepictureurl = body.activepictureurl;
  }

  validate() {
    if (!this.firstname) return "firstname is required";
    if (!this.lastname) return "lastname is required";
    if (!this.username) return "username is required";
    if (!this.email) return "email is required";
    if (!this.plainpassword) return "plainpassword is required";
    if (!this.activepictureurl) return "activepictureurl is required";
    return null;
  }
}

class ForgotPasswordRequest {
  constructor(body) {
    this.email = body.email;
  }

  validate() {
    if (!this.email) return "email is required";
    return null;
  }
}

class ResetPasswordRequest {
  constructor(body) {
    this.resettoken = body.resettoken;
    this.newpassword = body.newpassword;
  }

  validate() {
    if (!this.resettoken) return "resettoken is required";
    if (!this.newpassword) return "newpassword is required";
    return null;
  }
}

class ResetPasswordRequestProfile {
  constructor(body) {
    this.currentpassword = body.currentpassword;
    this.newpassword = body.newpassword;
  }

  validate() {
    if (!this.currentpassword) return "currentpassword is required";
    if (!this.newpassword) return "newpassword is required";
    return null;
  }
}

// ---------------------------
// EXPORTS
// ---------------------------

module.exports = {
  LoginRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordRequestProfile
};

