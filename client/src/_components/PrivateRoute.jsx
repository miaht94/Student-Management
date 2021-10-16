import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    const auth = useRecoilValue(authAtom);
    return (
        <Route {...rest} render={props => {
        
            if (auth) {
                // logged in 
                return <Component {...props} />
            } else

            //not logged in
            return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />
        }} />
    );
}