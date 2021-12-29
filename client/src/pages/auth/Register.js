import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { mutateSignup } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";

export default function Register() {
  const alert = useAlert();
  const { setToken } = useContext(AuthContext);
  const mutation = useMutation((data) => mutateSignup(data));
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    name: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(form, {
      onSuccess: ({ data }) => {
        setToken(data.access_token);
        alert.success("You were logged in automatically");
        return history.push("/books");
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
          <h3 className="mb-3 text-center">Register</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Password Confirmation
              </label>
              <input
                value={form.password_confirmation}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    password_confirmation: e.target.value,
                  }))
                }
                className="form-control"
                id="password_confirmation"
                type="password"
              />
            </div>
            <button className="btn btn-primary float-end">
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
