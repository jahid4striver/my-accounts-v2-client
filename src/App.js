import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddBankDeposit from "./components/AddBankDeposit/AddBankDeposit";
import AddCash from "./components/AddCash/AddCash";
import AddCheques from "./components/AddCheque/AddCheques";
import AddExpense from "./components/AddExpense/AddExpense";
import AddAccounts from "./components/AddInformations/AddAccounts";
import AddAdvanceSalary from "./components/AddInformations/AddAdvanceSalary";
import AddBanks from "./components/AddInformations/AddBanks";
import AddCategories from "./components/AddInformations/AddCategories";
import AddLoanAccount from "./components/AddInformations/AddLoanAccount";
import AddLoanTakenAccount from "./components/AddInformations/AddLoanTakenAccounts";
import AddProfitAccounts from "./components/AddInformations/AddProfitAccounts";
import AddSubCategories from "./components/AddInformations/AddSubCategories";
import AddLoan from "./components/AddLoan/AddLoan";
import AddSalary from "./components/AddSalary/AddSalary";
import Login from "./components/Authentication/Login";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home/Home";
import MyExpenses from "./components/MyAccounts/MyExpenses";
import AdvanceSalaryReport from "./components/Reports/AdvanceSalaryReport";
import AllCash from "./components/Reports/AllCash";
import AllExpenses from "./components/Reports/AllExpenses";
import BankStatement from "./components/Reports/BankStatement";
import CashStatement from "./components/Reports/CashStatement";
import CategoryWiseBalance from "./components/Reports/CategoryWiseBalance";
import CategoryWiseReport from "./components/Reports/CategoryWiseReport";
import ChequeReport from "./components/Reports/ChequeReport";
import CurrentBalance from "./components/Reports/CurrentBalance";
import IncomeExpense from "./components/Reports/IncomeExpense";
import LoanBalanceSheet from "./components/Reports/LoanBalanceSheet";
import LoanGivenReport from "./components/Reports/LoanGivenReport";
import Navbar from "./components/Shared/Navbar";


function App() {
  return (
    <div>
      <Navbar></Navbar>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/myexpense" element={<MyExpenses />}></Route> */}
        <Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route index element={<Home />}></Route>
          <Route path="addexpense" element={<AddExpense />}></Route>
          <Route path="addloan" element={<AddLoan />}></Route>
          <Route path="addsalary" element={<AddSalary />}></Route>
          <Route path="adddeposit" element={<AddBankDeposit />}></Route>
          <Route path="addcheque" element={<AddCheques />}></Route>
          <Route path="addcash" element={<AddCash />}></Route>
          <Route path="addcategories" element={<AddCategories />}></Route>
          <Route path="addsubcategories" element={<AddSubCategories />}></Route>
          <Route path="addprofits" element={<AddProfitAccounts />}></Route>
          <Route path="addbank" element={<AddBanks />}></Route>
          <Route path="addaccounts" element={<AddAccounts />}></Route>
          <Route path="allexpenses" element={<AllExpenses />}></Route>
          <Route path="allcash" element={<AllCash />}></Route>
          <Route path="categorywisereport" element={<CategoryWiseReport />}></Route>
          <Route path="bankstatement" element={<BankStatement />}></Route>
          <Route path="addloangiven" element={<AddLoanAccount />}></Route>
          <Route path="addloantaken" element={<AddLoanTakenAccount />}></Route>
          <Route path="addloantaken" element={<AddLoanTakenAccount />}></Route>
          <Route path="addsalarygiven" element={<AddAdvanceSalary />}></Route>
          <Route path="cashstatement" element={<CashStatement />}></Route>
          <Route path="incomeexpense" element={<IncomeExpense />}></Route>
          <Route path="loangivenreturn" element={<LoanGivenReport />}></Route>
          <Route path="advancesalaryreport" element={<AdvanceSalaryReport />}></Route>
          <Route path="chequereport" element={<ChequeReport />}></Route>
          <Route path="myexpenses" element={<MyExpenses />}></Route>
          <Route path="currentbalance" element={<CurrentBalance />}></Route>
          <Route path="categorywisebalance" element={<CategoryWiseBalance />}></Route>
          <Route path="loanbalance" element={<LoanBalanceSheet />}></Route>
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
