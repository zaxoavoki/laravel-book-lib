import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { mutateLogin } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { setToken } = useContext(AuthContext);
  const alert = useAlert();
  const mutation = useMutation((data) => mutateLogin(data));
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess: ({ data }) => {
        if (data.access_token) {
          setToken(data.access_token);
          alert.success("You were logged in");
          return history.push("/");
        }
        alert.error(data.error || "Something went wrong");
      },
      onError: (data) => {
        alert.error(
          data.response.data.message ||
            data.response.data.error ||
            "Something went wrong"
        );
      },
    });
  }

  return (
    <div className="container mt-5">
      <div className="row mt-5">
        <div className="col-8 offset-2">
          <h2 className="mb-3 text-center">Log in</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={form.password}
                onChange={(e) =>
                  setForm((p) => ({ ...p, password: e.target.value }))
                }
                className="form-control"
                id="password"
                type="password"
              />
            </div>
            <button className="btn btn-primary float-end">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
