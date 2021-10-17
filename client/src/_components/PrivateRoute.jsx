import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { useAuthWrapper } from '_helpers';

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    const authWrapper = useAuthWrapper();
    return (
        <Route {...rest} render={props => {
        
            if (authWrapper.tokenValue) {
                // if (JSON.parse(localStorage.getItem('userData')).role == 'teacher'){
                //     console.log("Teacher session initialized.");
                //     return <Component {...props} />
                // }
                // else if (JSON.parse(localStorage.getItem('userData')).role == 'student'){
                //     console.log("Student session initialized.");
                //     return <Component {...props} />
                // }
                return <Component {...props} />
            } else

            //not logged in
            return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
        }} />
    );
}