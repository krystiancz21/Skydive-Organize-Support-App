import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import Offer from './components/Offer';
import OfferEdit from './components/OfferEdit';
import MyJumps from './components/MyJumps';
import EditUserData from './components/EditUserData';
import UserProfile from './components/UserProfile';
import Reservation from './components/Reservation';
import Messages from './components/Messages';
import JumpCalendar from './components/JumpCalendar';

import OwnerEmployeeAccounts from './components/OwnerEmployeeAccounts';
import OwnerCreateAccount from './components/OwnerCreateAccount';
import OwnerManageAccount from './components/OwnerManageAccount';
import OwnerFinancialOverview from './components/OwnerFinancialOverview';
import OwnerMain from './components/OwnerMain';

import EmployeeMain from './components/EmployeeMain';
import EmployeeOffer from './components/EmployeeOffer';
import EmployeeUsersAccounts from './components/EmployeeUsersAccounts';
import EmployeeCreateAccount from './components/EmployeeCreateAccount';
import EmployeeEditAccount from './components/EmployeeEditAccount';
import EmployeeManageJumps from './components/EmployeeManageJumps';
import EmployeePlanJumps from './components/EmployeePlanJumps';
import EmployeeCancelJumps from './components/EmployeeCanceJumps';

function App() {
  return (
    // trzeba style zabrać i lokalnie umieścić
    // <div className="App"> 
    //   <Main />
    // </div>
    
    // <Routes>
    //   {/* <Route path="/" element={<Navigate replace to="/main" />} /> */}
    //   <Route path="/signup" exact element={<Signup />} />
    //   <Route path="/login" exact element={<Login />} />
    //   <Route path="/main" exact element={<Main />} />
    // </Routes>
    
    <Routes>
      <Route path='/' element={<Navigate replace to="/main" />} />
      <Route path="/edit-user-data" element={<EditUserData />} />
      <Route path="/jump-calendar/:type?" element={<JumpCalendar />} />
      <Route path="/reservation/:jumpId" element={<Reservation />} />
      <Route path="/employeemain" element={<EmployeeMain />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/myjumps" element={<MyJumps />} />
      <Route path="/offer" element={<Offer />} />
      <Route path="/offer-edit/:offerId" element={<OfferEdit />} />
      <Route path="/ownermain" element={<OwnerMain />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/userprofile" element={<UserProfile />} />

      <Route path="/owner-employee-accounts" element={<OwnerEmployeeAccounts />} />
      <Route path="/owner-create-account" element={<OwnerCreateAccount />} />
      <Route path="/owner-manage-account" element={<OwnerManageAccount />} />
      <Route path="/owner-financial-overview" element={<OwnerFinancialOverview />} />
      
      <Route path="/employee-offer" element={<EmployeeOffer />} />
      <Route path="/employee-users-accounts" element={<EmployeeUsersAccounts />} />
      <Route path="/employee-create-account" element={<EmployeeCreateAccount />} />
      <Route path="/employee-edit-account/:clientId" element={<EmployeeEditAccount />} />
      <Route path="/employee-manage-jumps" element={<EmployeeManageJumps />} />
      <Route path="/employee-plan-jumps" element={<EmployeePlanJumps />} />
      <Route path="/employee-cancel-jumps" element={<EmployeeCancelJumps />} />
    </Routes>
  )
}

export default App;
