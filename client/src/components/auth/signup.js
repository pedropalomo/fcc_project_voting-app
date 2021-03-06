import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';



class Signup extends Component {

    handleFormSubmit(formProps) {
        // Need to do something to log user in
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
               return (
                <div className="alert alert-danger">
              <strong>Oops!</strong> {this.props.errorMessage}
            </div>
            );
        }
    }

    render() {

        const {
            handleSubmit,
            fields: { email, password, passwordConfirm }
        } = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <fieldset className="form-group">
                <label className="nav-item">Email:</label>
                <input {...email} className="form-control" />
                 {email.touched && email.error && <div className="error">{email.error}</div>}
            </fieldset>
            <fieldset className="form-group">
                <label className="nav-item">Password:</label>
                <input {...password} type="password" className="form-control" />
                 {password.touched && password.error && <div className="error">{password.error}</div>}
            </fieldset>
                <fieldset className="form-group">
                <label className="nav-item">Confirm Password:</label>
                <input {...passwordConfirm} type="password" className="form-control" />
                {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
            </fieldset>
            {this.renderAlert()}
            <button action="submit"  className="btn btn-primary">Sign up!</button>
            </form>
        );
    }
}


function validate (formProps) {
    const errors = {};
    
    if (!formProps.email) {
        errors.email = 'enter mail';
    }
    
    if (!formProps.password) {
        errors.password = 'enter password';
    }
    
    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'enter password confirm';
    }
    
    if (formProps.password !== formProps.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match';
    }
    
    return errors;
}


function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup);
