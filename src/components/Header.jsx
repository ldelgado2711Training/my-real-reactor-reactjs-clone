import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const Header = () =>{
  const [pageState, setPageState] = useState("Sign in")
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else{
        setPageState("Sign in");
      }
    });
  });

  const pathMatchRoute = (route) => {    
    if (route === location.pathname) {  
      return true;
    }
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            className="h-5 cursor-pointer"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            onClick={() => {
              navigate("/")
            }}
          />
        </div>
        <nav>
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${ (pathMatchRoute("/") || pathMatchRoute("/home")) && "text-black" && "border-b-red-500"}`}
              onClick={() => {
                navigate("/")
              }}
            >
              Home
            </li>
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${pathMatchRoute("/offers") && "text-black" && "border-b-red-500"}`}
              onClick={() => {
                navigate("/offers")
              }}
            >
              Offers
            </li>

            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black" && "border-b-red-500"}`}
              onClick={() => {
                navigate("/profile")
              }}
            >
              {pageState}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;