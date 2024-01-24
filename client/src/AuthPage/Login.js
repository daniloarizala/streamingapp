import React from "react";

export const Login = ({ switchAuthHandler }) => {

  return (
    <div className="login-container">
        <h3>Logo</h3>
        <form className="auth-form">
            Form
        </form>
        <p className="auth-form-switch-label">Don't have an account? <span onClick={ switchAuthHandler }>Signup</span></p>
    </div>
  );
};
