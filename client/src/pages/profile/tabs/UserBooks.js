import { useContext } from "react";
import { useQuery } from "react-query";
import { fetchMe } from "../../../api/auth";
import BookCard from "../../../components/cards/BookCard";
import { AuthContext } from "../../../contexts/AuthContext";

export default function UserBooks() {
  const { auth } = useContext(AuthContext);
  const query = useQuery(["me"], () => fetchMe(auth.token));

  if (query.isLoading) {
    return <h3 className="mt-5 text-center">Loading, please wait</h3>;
  }

  if (query.isError) {
    return <h3 className="mt-5 text-center">Could not load the data</h3>;
  }

  const books = query.data?.data?.data?.books;
  return (
    <div>
      <h3>My books</h3>
      <div className="row">
        {!books ||
          (books.length === 0 && (
            <h4 className="text-muted mt-4 text-center">
              You do not have any book yet
            </h4>
          ))}
        {books?.map((book) => (
          <div className="col-12" key={book.id}>
            <BookCard {...book} />
          </div>
        ))}
      </div>
    </div>
  );
}
