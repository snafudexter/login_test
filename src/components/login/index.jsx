import * as React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import CONSTANT from '../../constant';

import { onChange} from './../../utils';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: { name: 'email', value: '', error: '', isRequired: true },
            password: { name: 'password', value: '', error: '', isRequired: true },
        }
    }

    componentWillMount(){
        var login = localStorage.getItem('login')
        if(login)
            this.props.history.push('/dashboard')
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="fluid-container login">
                <div className="row">
                        < div className="col-md-6 offset-md-3">
                            <div className="card m-3">
                                <div className="card-body">
                                    <h2 className="text-left">Login</h2>
                                    <form onSubmit={this.submitForm}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label>Email *</label>
                                                    <input
                                                        type="text"
                                                        className={email.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                        placeholder="Password"
                                                        name={email.name}
                                                        value={email.value}
                                                        onChange={this.onChange} />
                                                    
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
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <small>* Indicates required fields</small>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-3">
                                                <Link to={CONSTANT.url.register}>Register here</Link>
                                            </div>
                                            <div className="col-md-3">
                                                <button className="btn btn-primary btn-sm btn-block" type="submit">Submit</button>
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

    submitForm = (e) => {
        e.preventDefault();

        const {email, password} = this.state;

        var obj = {
            email: email.value,
            password: password.value
        }

        localStorage.setItem('login', JSON.stringify(obj))
        this.props.history.push('/dashboard')
    }
}

export default Login;