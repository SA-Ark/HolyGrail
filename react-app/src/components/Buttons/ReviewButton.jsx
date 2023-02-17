
const ReviewButton =
    ({ submitText, setSubmitText, closeModal, stars,
        reviewId, onSubmit, revBody, star, setCurrReview, setReviewBody, reviewBody }) => {
        // console.log('setSubmit', setSubmitText)
        // console.log(submitText, 'sub')
        // console.log('close', closeModal)
        const reviewClick = (e) => {
            // e.preventDefault()
            onSubmit(e)
            setReviewBody(reviewBody)
            star(stars)
            // if (submitText === 'Leave Feedback') {
            //     setSubmitText('Edit Feedback')
            // } else {
            //     setSubmitText('Submitted')
            // }
            closeModal()
        }
        return (
            <button onClick={reviewClick}>{submitText}</button>
        )
    }

export default ReviewButton;