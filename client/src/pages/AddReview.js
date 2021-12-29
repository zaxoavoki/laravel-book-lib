import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useAlert } from "react-alert";
import { useMutation } from "react-query";
import { mutateStoreReview } from "../api/review";

export default function AddReview() {
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const alert = useAlert();
  const history = useHistory();
  const mutation = useMutation((data) => mutateStoreReview(auth.token, data));
  const [form, setForm] = useState({
    stars: 1,
    text: "",
  });

  function onSubmit(e) {
    e.preventDefault();
    mutation.mutate(
      { ...form, bid: id },
      {
        onSuccess: ({ data }) => {
          if (data.data?.id) {
            alert.success("Review was successfully added");
            return history.push("/books/" + id);
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
      }
    );
  }

  return (
    <div className="row">
      <div className="col-6 offset-3 mt-5">
        <form onSubmit={onSubmit}>
          <h3 className="mb-4">Add new review</h3>
          <div className="mb-3">
            <label htmlFor="stars" className="form-label">
              Stars
            </label>
            <input
              value={form.stars}
              onChange={(e) =>
                setForm((p) => ({ ...p, stars: e.target.value }))
              }
              type="number"
              min={1}
              max={5}
              className="form-control"
              id="stars"
              placeholder="3"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="text" className="form-label">
              Review text
            </label>
            <textarea
              value={form.text}
              onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
              className="form-control"
              id="text"
              rows="3"
            ></textarea>
          </div>
          <button className="btn btn-success">Add review</button>
        </form>
      </div>
    </div>
  );
}
