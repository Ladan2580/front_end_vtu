import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
//general import
import Login from './Welcome/login';
import Register from './Welcome/register';
import Reset from './Welcome/reset';
import Reset_pin from './Welcome/reset_pin';
import Forgot from './Welcome/forgot';
// user import
import Data from './user_components/data';
import Setting from './user_components/setting';
import Airtime from './user_components/airtime';
import Cable from './user_components/cable';
import Bill from './user_components/bill';
import Sms from './user_components/sms';
import Education from './user_components/education';
import Dashboard from './user_components/dashbord';
import Data_transaction from './user_components/data_transaction';
import Wallet_transaction from './user_components/wallet_transaction';
import Funding_transaction from './user_components/funding_transaction';
import Sms_transaction from './user_components/sms_transaction';
import Bill_transaction from './user_components/bill_transaction';
import Cable_transaction from './user_components/cable_transaction';
import Edu_transaction from './user_components/edu_transaction';
import Airtime_transaction from './user_components/airtime_transaction';
//admin import
 import Admin_Dashboard from './admin_components/dashbord';
 import Manage_users from './admin_components/manage_users';
import Data_setting from './admin_components/data';
import Cable_setting from './admin_components/cable';
import Bill_setting from './admin_components/bill';
import Airtime_setting from './admin_components/airtime';
import Sms_setting from './admin_components/sms';
import Education_setting from './admin_components/education';

import Admin_data_transaction from './admin_components/data_transaction';
import Admin_sms_transaction from './admin_components/sms_transaction';
import Admin_funding_transaction from './admin_components/funding_transaction';
import Admin_bill_transaction from './admin_components/bill_transaction';
import Admin_cable_transaction from './admin_components/cable_transaction';
import Admin_edu_transaction from './admin_components/edu_transaction';
import Admin_airtime_transaction from './admin_components/airtime_transaction';
import Admin_wallet_transaction from './admin_components/wallet_transaction';
//import Admin_funding_transaction from './admin_components/funding_transaction';

function App() {
  return (
    <Router>
      <Routes>
        {/* user routes */}
        <Route path='/' element={<Login/>}/>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/reset' element={<Reset/>}/>
        <Route path='/reset_pin' element={<Reset_pin/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/user/dashbord' element={<Dashboard/>}/>
        <Route path='/user/data' element={<Data/>}/>
        <Route path='/user/cable' element={<Cable/>}/>
        <Route path='/user/bill' element={<Bill/>}/>
        <Route path='/user/sms' element={<Sms/>}/>
        <Route path='/user/airtime' element={<Airtime/>}/>
        <Route path='/user/education' element={<Education/>}/>
        <Route path='/user/setting' element={<Setting/>}/>
        <Route path='/user/data_history' element={<Data_transaction/>}/>
        <Route path='/user/airtime_history' element={<Airtime_transaction/>}/>
        <Route path='/user/bill_history' element={<Bill_transaction/>}/>
        <Route path='/user/cable_history' element={<Cable_transaction/>}/>
        <Route path='/user/sms_history' element={<Sms_transaction/>}/>
        <Route path='/user/cable_history' element={<Cable_transaction/>}/>
        <Route path='/user/education_history' element={<Edu_transaction/>}/>
        {/* <Route path='/user/wallet_history' element={<Wallet_transaction/>}/> */}
        <Route path='/user/wallet_history' element={<Funding_transaction/>}/>

        {/* admin routes */}
        
        <Route path='/auth/dashbord' element={<Admin_Dashboard/>}/>
        <Route path='/auth/manage_users' element={<Manage_users/>}/>
        <Route path='/auth/airtime_setting' element={<Airtime_setting/>}/>
        <Route path='/auth/data_setting' element={<Data_setting/>}/>
        <Route path='/auth/cable_setting' element={<Cable_setting/>}/>
        <Route path='/auth/bill_setting' element={<Bill_setting/>}/>
        <Route path='/auth/sms_setting' element={<Sms_setting/>}/>
        <Route path='/auth/education_setting' element={<Education_setting/>}/>
        
        <Route path='/auth/data_history' element={<Admin_data_transaction/>}/>
        <Route path='/auth/airtime_history' element={<Admin_airtime_transaction/>}/>
        <Route path='/auth/bill_history' element={<Admin_bill_transaction/>}/>
        <Route path='/auth/cable_history' element={<Admin_cable_transaction/>}/>
        <Route path='/auth/sms_history' element={<Admin_sms_transaction/>}/>
        <Route path='/auth/cable_history' element={<Admin_cable_transaction/>}/>
        <Route path='/auth/edu_history' element={<Admin_edu_transaction/>}/>
        <Route path='/auth/funding_history' element={<Admin_funding_transaction/>}/>
        <Route path='/auth/wallet_history' element={<Admin_wallet_transaction/>}/>

        {/* <Route path='/auth/data_history' element={<Admin_data_transaction/>}/>
        <Route path='/auth/airtime_history' element={<Admin_airtime_transaction/>}/>
        <Route path='/auth/bill_history' element={<Admin_bill_transaction/>}/>
        <Route path='/auth/cable_history' element={<Admin_cable_transaction/>}/>
        <Route path='/auth/sms_history' element={<Admin_sms_transaction/>}/>
        <Route path='/auth/cable_history' element={<Admin_cable_transaction/>}/>
        <Route path='/auth/edu_history' element={<Admin_edu_transaction/>}/> */}
      </Routes>
    </Router>
    
  );
}

export default App;
