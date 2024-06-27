import {Navigate, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {EmailVerification} from './components/EmailVerification'
import { CompanyBasicInfo } from './components/CompanyBasicInfo'
import {Login} from './components/Login'
import {AuthLayout} from './AuthLayout'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='email-verification' element={<EmailVerification />} />
      <Route path='company-information' element={<CompanyBasicInfo />} />
      <Route index element={<Login />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Route>
  </Routes>
)

export {AuthPage}
