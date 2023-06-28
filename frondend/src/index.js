import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './css/index.css'
import App_share from './page/main';
import {LogIn} from './LogIn/LogIn';
import { SignIn } from './SignIn/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
    <App_share />
</>);
