import React from 'react';
import Navbar from './components/Navbar/Navbar_Default';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Reports from './pages/Reports/Reports';
import Products from './pages/Product/Products';
import {
  RecoilRoot,
  useRecoilState
} from 'recoil';
import { SidebarData } from './pages/Common/SidebarData';



function App() {

  return (
    <>
    <RecoilRoot>
      <Router>
        
        <Navbar sideBarData={SidebarData}/>
        
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
        </Switch>
        
      </Router>
    </RecoilRoot>
    </>
  );

}

export default App;