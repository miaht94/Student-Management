import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRecoilValue, RecoilRoot } from 'recoil';

import { authAtom, initClassAtom } from '_state';
import { Login, PasswordRecover } from './';

export { Account };

function Account({ history, match }) {
    const auth = useRecoilValue(authAtom);
    const classPicked = useRecoilValue(initClassAtom);
    const { path } = match;

    useEffect(() => {
        if (auth) history.push('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 offset-sm-2 mt-5">
                    <Switch>
                        <Route path={`${path}/login`} component={Login} />
                        <Route path={`${path}/passwordrecover`} component={PasswordRecover} />
                    </Switch>
                </div>
            </div>
        </div>

    );
}
