import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddCash from "./components/AddCash/AddCash";
import AddCheques from "./components/AddCheque/AddCheques";
import AddExpense from "./components/AddExpense/AddExpense";
import AddAccounts from "./components/AddInformations/AddAccounts";
import AddBanks from "./components/AddInformations/AddBanks";
import AddCategories from "./components/AddInformations/AddCategories";
import AddLoanAccount from "./components/AddInformations/AddLoanAccount";
import AddSubCategories from "./components/AddInformations/AddSubCategories";
import Login from "./components/Authentication/Login";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home/Home";
import AllExpenses from "./components/Reports/AllExpenses";
import CashStatement from "./components/Reports/CashStatement";
import CategoryWiseReport from "./components/Reports/CategoryWiseReport";
import Navbar from "./components/Shared/Navbar";


function App() {
  return (
    <div>
      <Navbar></Navbar>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route index element={<Home />}></Route>
          <Route path="addexpense" element={<AddExpense />}></Route>
          <Route path="addcheque" element={<AddCheques />}></Route>
          <Route path="addcash" element={<AddCash />}></Route>
          <Route path="addcategories" element={<AddCategories />}></Route>
          <Route path="addsubcategories" element={<AddSubCategories />}></Route>
          <Route path="addbank" element={<AddBanks />}></Route>
          <Route path="addaccounts" element={<AddAccounts />}></Route>
          <Route path="allexpenses" element={<AllExpenses />}></Route>
          <Route path="categorywisereport" element={<CategoryWiseReport />}></Route>
          <Route path="addloan" element={<AddLoanAccount />}></Route>
          <Route path="cashstatement" element={<CashStatement />}></Route>
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
