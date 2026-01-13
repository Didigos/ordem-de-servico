import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login/Login"
import NotFound from "../pages/NotFound"
import Select from "../pages/Select.tsx/Select"
import ReceiveForm from "../components/receiveForm/ReceiveForm"
import Orders from "../pages/Orders/Orders"

const AppRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/select" element={<Select />} />
        <Route path="/select-receive" element={<ReceiveForm />} />
        <Route path="/orders" element={<Orders />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
