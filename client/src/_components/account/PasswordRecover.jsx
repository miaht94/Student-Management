import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { useUserActions, useAlertActions } from '_actions';

export { PasswordRecover };

function PasswordRecover({ history }) {
    const userActions = useUserActions();
    const alertActions = useAlertActions();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Username is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit(data) {
        // return userActions.register(data)
        //     .then(() => {
        //         history.push('/account/login');
        //         alertActions.success('Registration successful');
        //     })
    }

    return (
        <div className="card m-3">
            <h4 className="card-header">Khôi phục tài khoản</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Vui lòng nhập email do quản trị hệ thống cấp với đuôi @vnu.edu.vn</label>
                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Khôi phục
                    </button>
                    <Link to="login" className="btn btn-link">Quay lại</Link>
                </form>
            </div>
        </div>
    )
}
