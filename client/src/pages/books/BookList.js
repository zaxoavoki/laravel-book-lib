import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BookList() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (search) {
      fetch("https://www.googleapis.com/books/v1/volumes?q=" + search + "&printType=books")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.items) {
            setBooks(res.items);
          }
        });
    }
  }, [search]);

  return (
    <div className="container">
      <div className="row">
        <input
          className="form-control mt-4"
          placeholder="Type to search"
          type="text"
          onChange={(e) => setTimeout(() => setSearch(e.target.value), 1000)}
        />
      </div>
      <div className="row d-flex align-items-stretch">
        {books.length === 0 && (
          <h2 className="fw-bold mt-5">Type to search something</h2>
          
        )}
        {books.length > 0 &&
          books.map((book, i) => (
            <div key={i} className="col col-sm-6 col-lg-3 mt-4 h-100">
              <div className="card h-100">
                <img
                  src={book.volumeInfo?.imageLinks?.thumbnail}
                  className="card-img-top"
                  alt=""
                />
                <div className="card-body">
                  <h5 className="card-title">{book.volumeInfo.title}</h5>
                  <p className="card-text text-muted small">
                    {book.volumeInfo.description?.substring(0, 150)}
                  </p>
                  <div>
                    {book.volumeInfo.authors?.map((author, j) => (
                      <span key={j} className="badge bg-primary me-2">
                        {author}
                      </span>
                    ))}
                  </div>
                  <Link to={"/books/" + book.id}>View more</Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
