import {  Form, Input, Button, Checkbox  } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useAlertActions, useUserActions } from '_actions';
import { Redirect } from 'react-router-dom';
import { authAtom } from '_state';
import { useRecoilValue } from 'recoil';
import { useAuthWrapper } from '_helpers';
export { Login };

function Login(props) {
    const userActions = useUserActions();
    const auth = useRecoilValue(authAtom);
    const authWrapper = useAuthWrapper();
    const [loginDone, setLoginDone] = useState(false)
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Vui lòng điền tên người dùng'),
        password: Yup.string().required('Vui lòng điền mật khẩu')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        async function loadUser(){
            await authWrapper.loadUser();
            setLoginDone(true);
        }
        if (auth)
            loadUser();
        else {
            userActions.logout();
        }
    }, [auth])
    return (loginDone ? 
            // logged in 
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        :
        
        <div className="card m-3">
            <h4 className="card-header">Đăng nhập hệ thống</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(userActions.login)}>
                    <div className="form-group">
                        <label>Tài khoản</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Đăng nhập
                    </button>
                    <Link to="passwordrecover" className="btn btn-link">Quên mật khẩu</Link>
                </form>
                
            </div>
        </div>

    )
}
