import { useContext } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ProfileData from "./tabs/ProfileData";
import UserBooks from "./tabs/UserBooks";
import UserReviews from "./tabs/UserReviews";

export default function Profile() {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  const links = [
    { to: `/users/${auth.user.id}`, text: "Change profile" },
    { to: `/users/${auth.user.id}/books`, text: "Books" },
    { to: `/users/${auth.user.id}/reviews`, text: "Reviews" },
  ];

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-4">
          <div className="list-group">
            {links.map((link) => (
              <Link
                key={link.text}
                to={link.to}
                className={`list-group-item list-group-item-action ${
                  location.pathname === link.to ? "active" : ""
                }`}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="col-12 col-md-8">
          <Switch>
            <Route path="/users/:id/books" component={UserBooks} />
            <Route path="/users/:id/reviews" component={UserReviews} />
            <Route path="" component={ProfileData} />
          </Switch>
        </div>
      </div>
    </div>
  );
}
