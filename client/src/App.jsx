import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authAtom } from '_state';
import { Nav, Alert, PrivateRoute } from '_components';
import { history } from '_helpers';
import { Home } from 'home';
import { Users } from 'users';
import { Account } from '_components/account';
import { Dashboard } from '_components/dashboard';
import { Feed } from '_components/feed';
import { Chat } from '_components/chat';
import { Profile } from '_components/profile';
import { StudentInfoList } from '_components/studentInfoList';
import { StudentScoreList } from '_components/studentScoreList';

import { useAuthWrapper } from '_helpers';

export { App };

function App() {
    const auth = useRecoilValue(authAtom);
    const authWrapper = useAuthWrapper();
    authWrapper.loadLoginToken();
    authWrapper.getLoginToken();
    return (
        <div className={'app-container' + (auth ? ' bg-light' : '')}>
            <Router history={history}>
                <div className='navbar'>
                    <Nav />
                </div>
                <Alert />
                <div className='content'>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/studentinfo" component={StudentInfoList} />
                        <PrivateRoute exact path="/studentscore" component={StudentScoreList} />
                        <PrivateRoute exact path="/feed" component={Feed} />
                        <PrivateRoute exact path="/chat" component={Chat} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute path="/users" component={Users} />
                        <Route path="/account" component={Account} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}
