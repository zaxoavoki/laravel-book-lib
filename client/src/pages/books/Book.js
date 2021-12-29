import { useContext } from "react";
import { useAlert } from "react-alert";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  fetchBookById,
  fetchBookByIdFromLocalServer,
  mutateStoreBook,
} from "../../api/book";
import { mutateDeleteReview } from "../../api/review";
import ReviewCard from "../../components/cards/ReviewCard";
import { AuthContext } from "../../contexts/AuthContext";

export default function Book() {
  const alert = useAlert();
  const { auth, setAuth } = useContext(AuthContext);
  const { id } = useParams();
  const mutation = useMutation((data) => mutateStoreBook(auth.token, data));
  const removeMutation = useMutation((id) =>
    mutateDeleteReview(auth.token, id)
  );
  const query = useQuery(["book", id], () => fetchBookById(id));

  const book = query.data?.data;
  const localQuery = useQuery(
    ["book_local", book?.id],
    () => fetchBookByIdFromLocalServer(auth.token, book?.id),
    { enabled: !!book?.id }
  );

  function handleSaveBook() {
    mutation.mutate(
      {
        bid: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors?.join(", "),
        description: book.volumeInfo.description,
        image: book.volumeInfo?.imageLinks?.thumbnail,
      },
      {
        onSuccess: ({ data }) => {
          if (data.data?.id) {
            setAuth((p) => ({
              ...p,
              user: { ...p.user, books: [...p.user.books, book.id] },
            }));
            return alert.success("You saved a book");
          }
          alert.error(data.error || "You can not save this book");
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

  function removeReview(id) {
    removeMutation.mutate(id, {
      onSuccess: ({ data }) => {
        if (data.data.id) {
          localQuery.refetch();
          return alert.success("Review was deleted successfully");
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

  if (query.isError) {
    return <h3 className="mt-5 fw-bold text-center">Book does not exist</h3>;
  }

  if (query.isLoading) {
    return <h3 className="mt-5 fw-bold text-center">Loading, please wait</h3>;
  }

  const reviews = localQuery.data?.data?.data?.reviews;
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-4">
          <img
            className="w-100"
            src={book.volumeInfo.imageLinks?.thumbnail}
            alt=""
          />
        </div>
        <div className="col-12 col-md-8">
          <h1>{book.volumeInfo.title}</h1>
          {book.volumeInfo.authors?.map((author, i) => (
            <span key={i} className="badge bg-primary mb-2 me-2">
              {author}
            </span>
          ))}
          <div className="d-flex justify-items-center mb-2">
            {!auth.user.books?.includes(book.id) && (
              <button onClick={handleSaveBook} className="btn btn-success me-2">
                Save book
              </button>
            )}
            <Link
              to={"/reviews/create/" + book.id}
              className="btn btn-outline-success"
            >
              Add review
            </Link>
          </div>
          <p>
            {book.volumeInfo.description ||
              "There is no description for this book"}
          </p>
        </div>
      </div>
      <div className="row mt-4">
        <h4>Reviews</h4>
        {!reviews ||
          (reviews.length === 0 && (
            <h5 className="text-muted mt-3">
              This book does not have any review yet
            </h5>
          ))}
        {reviews?.map((review) => (
          <div className="col-12 mb-3" key={review.id}>
            <ReviewCard
              {...review}
              bid={book.id}
              title={book.volumeInfo.title}
              removeReview={removeReview}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
