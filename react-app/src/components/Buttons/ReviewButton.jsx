
const ReviewButton =
    ({ submitText, setSubmitText, closeModal, stars,
        reviewId, onSubmit, revBody, star, setCurrReview, setReviewBody, reviewBody }) => {
        const reviewClick = (e) => {
            onSubmit(e)
            setReviewBody(reviewBody)
            star(stars)
            closeModal()
        }
        return (
            <button onClick={reviewClick}>{submitText}</button>
        )
    }

export default ReviewButton;