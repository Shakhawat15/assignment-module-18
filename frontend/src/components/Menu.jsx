import {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

const Menu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize as false or get the value from authentication state
  const navigate = useNavigate();

  // const token = localStorage.getItem('authToken');
  //
  // console.log(token)
  //
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Example function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate("/");
    // Perform logout logic, e.g., clearing tokens, etc.
    // setIsLoggedIn(false); // Update the isLoggedIn state to reflect user logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3 sticky-top shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          BLOG
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/logins">
                  Login/Registration
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
