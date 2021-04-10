import React from "react";
import { api } from "../helpers/api";
import { userService } from "../helpers/userService";
import "../less/dialog.less";
import "../less/signin-dialog.less";

interface State {
  username: string;
  password: string;
}

interface Props {
  close: FunctionType;
}

export class SigninDialog extends React.Component<Props> {
  public state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  public render() {
    return (
      <div className="dialog-wrapper">
        <div className="dialog-container signin-dialog">
          <div className="dialog-header-container">
            <p className="title-text">Sign in/up</p>
            <button className="text-btn close-btn" onClick={this.handleDialogCloseBtnClick.bind(this)}>
              close
            </button>
          </div>
          <div className="dialog-content-container">
            <input type="text" value={this.state.username} onChange={this.handleUsernameChanged.bind(this)} />
            <input type="password" value={this.state.password} onChange={this.handlePasswordChanged.bind(this)} />
          </div>
          <div className="dialog-footer-container">
            <button className="text-btn signup-btn" onClick={this.handleSignupBtnClick.bind(this)}>
              Sign up
            </button>
            <button className="text-btn signin-btn" onClick={this.handleSigninBtnClick.bind(this)}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  protected handleDialogCloseBtnClick() {
    this.props.close();
  }

  protected handleUsernameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: e.currentTarget.value,
    });
  }

  protected handlePasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.currentTarget.value,
    });
  }

  protected async handleSigninBtnClick() {
    const { username, password } = this.state;
    await api.signin(username, password);

    await userService.doSignIn();
    if (userService.getUserInfo()) {
      console.log("succeed in sign in");
      this.props.close();
    }
  }

  protected async handleSignupBtnClick() {
    const { username, password } = this.state;
    await api.signup(username, password);

    await userService.doSignIn();
    if (userService.getUserInfo()) {
      console.log("succeed in sign up");
      this.props.close();
    }
  }
}
