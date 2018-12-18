import React from "react";

const LoginForm = () => {
  return (
    <div>
      <h1>Login Here!</h1>
      <form onSubmit={this.handleSubmit} method="POST">
        <label>Username</label>
        <input
          onChange={this.onChange}
          value={this.state.username}
          placeholder="Username"
          name="username"
        />
        <label>Password</label>
        <input
          type="password"
          onChange={this.onChange}
          value={this.state.pwd}
          name="password"
        />
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
