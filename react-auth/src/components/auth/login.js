import React from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import AuthService from "../../services/auth.service";


const required = value => {

    if(!value){
        return (
            <div className="alert alert-danger">This field is required!</div>
        );
    }
};

const email = value => {
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email
            </div>
        );
    }
};

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        };
    }

        onChangeEmail(e){
            this.ListeningStateChangedEvent({
                email: e.target.value
            });
        }
        onChangePassword(e){
            this.setState({
                password: e.target.value
            });
        }
        handleLogin(e){
            e.preventDefault();
            this.setState({
                message:"",
                loading:true
            });

            this.form.validateAll();
            
            if(this.checkBtn.context._errors.length === 0){
                AuthService.login(this.state.username, this.state.password).then(
                    () => {
                        this.props.history.push("/profile");
                        window.location.reload();
                    },
                    error => {
                        const resMessage = 
                        (error.response &&
                            ErrorEvent.response.data && 
                            error.response.data.message) ||
                        error.message ||
                    error.toString(); 
                
                this.setState({
                    loading: false,
                    message: resMessage
                });
            }  
            );
            }
            else{
                this.setState({
                    loading: false
                });
            }
        }

        render() {
            return(

                <div className="col-md-12">
                    <div className="card card-container">
                        <img
                            src = "//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="profile-img-card" />

                            <Form 
                                onSubmit = {this.handleLogin}
                                ref = {c => {
                                    this.form = c;
                                }} 
                            >
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations = {[required, email]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-conttrol"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button 
                                        className="btn btn-primary btn-block"
                                        disabled={this.state.loading}
                                    >
                                        {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Login</span>
                                    </button>
                                </div>
                                {this.state.message && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}
                                <CheckButton
                                    style={{display: "none"}}
                                    ref={c=> {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                    </div>


                </div>
            );
        }
}