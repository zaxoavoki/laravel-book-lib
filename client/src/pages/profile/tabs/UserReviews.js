import { useContext } from "react";
import { useAlert } from "react-alert";
import { useMutation, useQuery } from "react-query";
import { fetchMe } from "../../../api/auth";
import { mutateDeleteReview } from "../../../api/review";
import ReviewCard from "../../../components/cards/ReviewCard";
import { AuthContext } from "../../../contexts/AuthContext";

export default function UserReviews() {
  const alert = useAlert();
  const { auth } = useContext(AuthContext);
  const query = useQuery(["me"], () => fetchMe(auth.token));
  const mutation = useMutation((id) => mutateDeleteReview(auth.token, id));

  if (query.isLoading) {
    return <h3 className="mt-5 text-center">Loading, please wait</h3>;
  }

  if (query.isError) {
    return <h3 className="mt-5 text-center">Could not load the data</h3>;
  }

  function removeReview(id) {
    mutation.mutate(id, {
      onSuccess: ({ data }) => {
        if (data.data.id) {
          alert.success("Review was successfully deleted");
          query.refetch();
          return;
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

  const reviews = query.data?.data?.data?.reviews;
  return (
    <div>
      <h3>My reviews</h3>
      <div className="row mt-4">
        {!reviews ||
          (reviews.length === 0 && (
            <h4 className="text-muted mt-4 text-center">
              You do not have any review yet
            </h4>
          ))}
        {reviews.map((review) => (
          <div className="col-12 mb-3" key={review.id}>
            <ReviewCard {...review} removeReview={removeReview} />
          </div>
        ))}
      </div>
    </div>
  );
}
