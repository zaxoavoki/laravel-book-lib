import { Link } from "react-router-dom";

export default function ReviewCard({ text, book, stars, removeReview, id }) {
  const colorClasses = ["danger", "danger", "warning", "success", "success"];
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h6>{book?.title.substring(0, 100)}</h6>
          <span
            className={`ms-auto mt-1 badge rounded-pill bg-${colorClasses[stars - 1]}`}
          >
            {stars} out of 5
          </span>
          <i
            onClick={() => removeReview(id)}
            className="btn p-0 bi bi-trash ms-2"
          ></i>
        </div>
        <p className="small text-muted">{text.substring(0, 250)}</p>
        <Link to={"/books/" + book?.bid}>View more</Link>
      </div>
    </div>
  );
}
