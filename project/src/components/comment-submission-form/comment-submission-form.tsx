import {FormEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks-toolkit';
import {postNewCommentsByID} from '../../store/api-actions';

function CommentSubmissionForm() {
  const [reviewText, setReviewText] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const rating = useAppSelector((state) => state.filmCard.ratingFilms);
  const idFilms = useAppSelector((state) => state.filmCard.filmByID?.id);

  const dispatch = useAppDispatch();
  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    if (rating !== null && idFilms !== undefined) {
      dispatch(postNewCommentsByID({id: idFilms, comment: reviewText, rating}));
      setIsDisabled(true);
    }
  };

  return (
    <div className="add-review__text">
      <textarea
        className="add-review__textarea"
        name="review-text"
        id="review-text"
        placeholder="Review text"
        value={reviewText}
        onChange={(event) => {
          setReviewText(event.target.value);
        }}
        disabled={isDisabled}
      />
      <div className="add-review__submit">
        <button
          className="add-review__btn"
          type="submit"
          disabled={reviewText.length < 50 || reviewText.length > 400 || rating === null || isDisabled}
          onClick={handleSubmitForm}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CommentSubmissionForm;
