import { useContext } from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { fetchLogout } from "../api/auth";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
  const alert = useAlert();
  const { auth, setToken } = useContext(AuthContext);
  const mutation = useMutation(() => fetchLogout(auth.token));

  function logout() {
    mutation.mutate(
      {},
      {
        onSuccess: () => {
          setToken(null);
          alert.success("You were logged out");
        },
        onError: () => {
          setToken(null);
          alert.error("Something went wrong");
        },
      }
    );
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Books
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Books list
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Users list
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {auth.user ? (
              <>
                <li className="nav-item text-white d-flex align-items-center">
                  <p className="mb-0">Hello, {auth.user.name}</p>
                </li>
                <li className="nav-item ms-3">
                  <Link
                    to={"/users/" + auth.user.id}
                    className="btn btn-outline-light"
                  >
                    View more
                  </Link>
                </li>
                <li className="nav-item ms-3" onClick={logout}>
                  <button className="btn btn-primary">Log out</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
