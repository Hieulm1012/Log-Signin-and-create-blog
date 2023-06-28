import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "../LogIn/LogIn";
import SignIn from "../SignIn/SignIn";
import Blog from "../Blog/Blog";

export default function App_share() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="LogIn" element={<LogIn />} />         
        <Route path="SignIn" element={<SignIn />} />
        <Route path=":idCustomer?/:nameCustomer?/blog" element={<Blog />} Component={Blog}/>
      </Routes>
    </BrowserRouter>
  );
}
