import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alert from './components/layout/Alert';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// extra
import SignIn from './components/sign/SignIn';
import SignUp from './components/sign/SingUp';
import Landing from './components/landing/Landing';

import Message from './components/message/Message';
import MessageLink from './components/message/MessageLink';
import MessagePassword from './components/message/MessagePassword';
import MessageView from './components/message/MessageView';

import File from './components/file/File';
import FileLink from './components/file/FileLink';
import FilePassword from './components/file/FilePassword';
import FileView from './components/file/FileView';

import Stripe from './components/payment/Stripe';

import AdminDashboard from './components/admindashboard/AdminDashboard';
import Info from './components/adminpages/Info';
import Files from './components/adminpages/Files';
import Messages from './components/adminpages/Messages';
import Payments from './components/adminpages/Payments';
import Users from './components/adminpages/Users';

import UserDashboard from './components/userdashboard/UserDashboard';

import './App.scss';
import api from './utils/api';
import Key from './utils/keys';
const App = () => {
  // check for token in LS when app first runs
  if (localStorage.token) {
    console.log('app : setAuthtoken');
    // if there is a token set axios headers for all requests
    setAuthToken(localStorage.token);
  }
  // try to fetch a user, if no token or invalid token we
  // will get a 401 response from our API
  useEffect(() => {
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  const getPbKey = async () => {
    try {
      const result = await api.get('/admin/paysetting');
      if (result.data) {
        Key.pbKey = result.data.publicKey
      }
    } catch (error) {
      console.log(error)
    }
  }

  getPbKey();

  return (
    <div className='app'>
      <Provider store={store}>
        <Router>
          <Alert />
          <Routes>

            <Route path="/*" element={<NotFound />} />

            <Route
              path='/'
              element={<Landing path='/' />}
            />

            <Route
              path='/message'
              element={<Message path='/message' />}
            />
            <Route
              path='/message/link'
              element={<MessageLink path='/message/link' />}
            />
            <Route
              path='/message/password/:id'
              element={<MessagePassword path='/message/password/:id' />}
            />
            <Route
              path='/message/view/:id'
              element={<MessageView path='/message/view/:id' />}
            />

            <Route
              path='/file'
              element={<File path='/file' />}
            />
            <Route
              path='/file/link'
              element={<FileLink path='/file/link' />}
            />
            <Route
              path='/file/password/:id'
              element={<FilePassword path='/file/password/:id' />}
            />
            <Route
              path='/file/view/:id'
              element={<FileView path='/file/view/:id' />}
            />
            <Route
              path='/payment'
              element={<Stripe path='/payment' />}
            />
            <Route
              path='/signin'
              element={<SignIn path='/signin' />}
            />
            <Route
              path='/signup'
              element={<SignUp path='/signup' />}
            />

            {/* Admin route for security */}
            <Route
              path='/admin/dashboard'
              element={<AdminRoute component={AdminDashboard} />}
            />
            <Route
              path='/admin/message'
              element={<AdminRoute component={Messages} />}
            />
            <Route
              path='/admin/file'
              element={<AdminRoute component={Files} />}
            />
            <Route
              path='/admin/info'
              element={<AdminRoute component={Info} />}
            />
            <Route
              path='/admin/payment'
              element={<AdminRoute component={Payments} />}
            />
            <Route
              path='/admin/user'
              element={<AdminRoute component={Users} />}
            />
            
            {/* User Route */}
            <Route
              path='/user/dashboard'
              element={<UserDashboard path='/user/dashboard' />}
            />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
