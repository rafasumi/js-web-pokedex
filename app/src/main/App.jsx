import './app.css';
import 'modules/bootstrap/dist/css/bootstrap.min.css';
import 'modules/font-awesome/css/font-awesome.min.css';
import 'modules/jquery/dist/jquery.min.js';
import 'modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import React from 'react';
import Routes from './Routes';
import Navbar from '../templates/Navbar';

export default function App(props) {
    return (
        <div className="container">
            <Navbar/>
            <Routes/>
        </div>
    );
}