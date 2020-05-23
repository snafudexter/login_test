import * as React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import CONSTANT from '../../constant';
import { onChange, setError, validPasswordRegex, validEmailRegex } from '../../utils';



class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: { name: 'email', value: '', error: '', isRequired: true },
            mobile: { name: 'mobile', value: '', error: '', isRequired: true },
            name: { name: 'name', value: '', error: '', isRequired: true },
            password: { name: 'password', value: '', error: '', isRequired: true },
            cnfPassword: { name: 'cnfPassword', value: '', error: '', isRequired: true },
        }
    }

    render() {
        const { email, mobile, name, password, cnfPassword } = this.state;
        return (
            <div className="col-md-5">
                <div className="row m-3">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Registration
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Your Name *</label>
                                                <input
                                                    type="text"
                                                    className={name.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Your full name"
                                                    name={name.name}
                                                    value={name.value}
                                                    onChange={this.onChange} />
                                                {name.error.length > 0 ? <span className="is-invalid">&nbsp;{name.error}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <label>Email * {email.error.length > 0 ? <span className="is-invalid">&nbsp;{email.error}</span> : null}</label>
                                                <input
                                                    type="email"
                                                    className={email.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Your email"
                                                    name={email.name}
                                                    value={email.value}
                                                    onChange={this.onChange} />
                                                {email.error.length > 0 ? <span className="is-invalid">&nbsp;{email.error}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <label>Mobile * </label>
                                                <NumberFormat
                                                    allowNegative={false}
                                                    className={mobile.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Your mobile number"
                                                    name={mobile.name}
                                                    maxLength={10}
                                                    value={mobile.value}
                                                    onChange={this.onChange}
                                                />
                                                {mobile.error.length > 0 ? <span className="is-invalid">&nbsp;{mobile.error}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <label>Password *</label>
                                                <input
                                                    type="password"
                                                    className={password.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Password"
                                                    name={password.name}
                                                    value={password.value}
                                                    onChange={this.onChange} />
                                                {password.error.length > 0 ? <span className="is-invalid">&nbsp;{password.error}</span> : null}
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm Password *</label>
                                                <input
                                                    type="password"
                                                    className={cnfPassword.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                    placeholder="Confirm Password"
                                                    name={cnfPassword.name}
                                                    value={cnfPassword.value}
                                                    onChange={this.onChange} />
                                                {cnfPassword.error.length > 0 ? <span className="is-invalid">&nbsp;{cnfPassword.error}</span> : null}
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <small>* Indicates required fields</small>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-3">
                                            <Link to={CONSTANT.url.login}>Login here</Link>
                                        </div>
                                        <div className="col-md-5">

                                        </div>
                                        <div className="col-md-4">
                                            <button className="btn btn-primary btn-sm btn-block" type="submit">Register</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        onChange(this, name, value);
    }

    validateForm = () => {
        const { email, mobile, name, password, cnfPassword } = this.state;

        let valid = true;
        let validPassword = true;

        if (name.value.length < 3) {
            setError(this, name.name, 'Fullname cannot be less than 3 chars')
            valid = false;
        }

        if (!validEmailRegex.test(email.value)) {
            setError(this, email.name, 'Email not valid')
            valid = false;
        }

        if (mobile.value.length < 10) {
            setError(this, mobile.name, 'Mobile number cannot be less than 10 digits')
            valid = false;
        }

        if (!validPasswordRegex.test(password.value)) {
            setError(this, password.name, 'Must contain one uppercase char, one special char and a number')
            valid = false;
            validPassword = false
        }

        if (validPassword) {
            if (cnfPassword.value !== password.value) {
                setError(this, cnfPassword.name, 'Passwords don\'t match')
                valid = false;
            }
        }


    }

    onSubmit = (e) => {
        e.preventDefault();
        this.validateForm();
    }
}


const Container = () => {

    const [forms, setForms] = React.useState([Register])

    return (<div className="container">
        <div className="row">
            {forms.map(Item => <Item />)}
        </div>
        <div className="row">
            <div className="col-md-2">
                <button className="btn btn-primary" onClick={()=> {
                    const frms = forms.slice(0)
                    frms.push(Register)
                    setForms(frms)
                }}>Add Form</button>
            </div>
        </div>
    </div>)
}

export default Container;