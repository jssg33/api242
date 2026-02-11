// dto/auth.dto.js

class LoginRequest {
  constructor(body) {
    this.username = body.username;
    this.plainPassword = body.plainPassword;
  }

  validate() {
    if (!this.username) return "Username is required";
    if (!this.plainPassword) return "PlainPassword is required";
    return null;
  }
}

class SignupRequest {
  constructor(body) {
    this.firstname = body.firstname;
    this.lastname = body.lastname;
    this.username = body.username;
    this.email = body.email;
    this.plainPassword = body.plainPassword;
    this.activepictureurl = body.activepictureurl;
  }

  validate() {
    if (!this.firstname) return "Firstname is required";
    if (!this.lastname) return "Lastname is required";
    if (!this.username) return "Username is required";
    if (!this.email) return "Email is required";
    if (!this.plainPassword) return "PlainPassword is required";
    if (!this.activepictureurl) return "Activepictureurl is required";
    return null;
  }
}

class ForgotPasswordRequest {
  constructor(body) {
    this.email = body.email;
  }

  validate() {
    if (!this.email) return "Email is required";
    return null;
  }
}

class ResetPasswordRequest {
  constructor(body) {
    this.resetToken = body.resetToken;
    this.newPassword = body.newPassword;
  }

  validate() {
    if (!this.resetToken) return "ResetToken is required";
    if (!this.newPassword) return "NewPassword is required";
    return null;
  }
}

class ResetPasswordRequestProfile {
  constructor(body) {
    this.currentPassword = body.currentPassword;
    this.newPassword = body.newPassword;
  }

  validate() {
    if (!this.currentPassword) return "CurrentPassword is required";
    if (!this.newPassword) return "NewPassword is required";
    return null;
  }
}

module.exports = {
  LoginRequest,
  SignupRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ResetPasswordRequestProfile
};
