import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import RecoilNexus from "recoil-nexus";
import 'index.css';
import { App } from 'App';

// setup fake backend
// import { fakeBackend } from '_helpers';
// fakeBackend();

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <RecoilNexus />
            <App />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('app')
);
