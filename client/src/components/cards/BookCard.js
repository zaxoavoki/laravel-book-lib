import { Link } from "react-router-dom";

export default function BookCard({ title, description, bid }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h6>{title}</h6>
        <p className="text-muted">{(description || '-').substr(0, 300)}</p>
        <Link to={"/books/" + bid} className="small mt-3">View more</Link>
      </div>
    </div>
  );
}
