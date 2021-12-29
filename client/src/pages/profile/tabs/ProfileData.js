import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useMutation } from "react-query";
import { useAlert } from "react-alert";
import { mutateUser } from "../../../api/user";

export default function ProfileData() {
  const alert = useAlert();
  const { auth, setAuth } = useContext(AuthContext);
  const mutation = useMutation((data) =>
    mutateUser(auth.user.id, auth.token, data)
  );
  const [form, setForm] = useState({
    name: auth.user.name,
    email: auth.user.email,
  });

  function handleSubmit(e) {
    e.preventDefault();

    mutation.mutate(
      {
        ...form,
        email: auth.user.email === form.email ? undefined : form.email,
      },
      {
        onSuccess: ({ data }) => {
          alert.success("Your data was changed successfully");
          setAuth((p) => ({
            ...p,
            user: { ...p.user, name: form.name, email: form.email },
          }));
        },
        onError: (data) => {
          alert.error(
            data.response.data.message ||
              data.response.data.error ||
              "Something went wrong"
          );
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="text"
        className="form-control mb-3"
        id="name"
        placeholder="name"
        value={form.name}
        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
      />
      <label htmlFor="name" className="form-label">
        Email
      </label>
      <input
        type="text"
        className="form-control mb-4"
        id="email"
        value={form.email}
        placeholder="name@example.com"
        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
      />
      <button className="btn btn-success">Update</button>
    </form>
  );
}
