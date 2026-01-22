document.addEventListener('DOMContentLoaded', function() {
    let reviews = [];
    let currentFeaturedIndex = 0;
    let fiveStarReviews = [];

    // Fetch reviews from JSON file
    fetch('data/reviews.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            reviews = Array.isArray(data) ? data : [];
            fiveStarReviews = reviews.filter(review => review.stars === 5);
            calculateAverageRating();
            displayFeaturedReview();
            if (fiveStarReviews.length > 1) {
                startReviewRotation();
            }
        })
        .catch(error => {
            console.error('Error loading reviews:', error);
            document.getElementById('average-rating').textContent = 'Error loading reviews';
        });

    function calculateAverageRating() {
        if (reviews.length === 0) {
            document.getElementById('average-rating').textContent = 'No reviews';
            return;
        }
        
        const total = reviews.reduce((sum, review) => sum + review.stars, 0);
        const average = total / reviews.length;
        document.getElementById('average-rating').textContent = average.toFixed(1) + ' (' + reviews.length + ' reviews)';
    }

    function displayFeaturedReview() {
        if (fiveStarReviews.length === 0) {
            document.getElementById('featured-review').innerHTML = '<p>No featured reviews available</p>';
            return;
        }
        
        const featuredReview = fiveStarReviews[currentFeaturedIndex];
        const featuredDiv = document.getElementById('featured-review');
        
        featuredDiv.innerHTML = `
            <div class="review-card featured">
                <div class="stars">${'★'.repeat(featuredReview.stars)}${'☆'.repeat(5 - featuredReview.stars)}</div>
                <h3 class="review-title">${featuredReview.review_title || 'Untitled Review'}</h3>
                <p class="review-text">"${featuredReview.review_content || 'No content provided'}"</p>
                <p class="review-author">- ${featuredReview.user?.name || 'Anonymous'}, ${featuredReview.user?.location || 'Unknown location'}</p>
                <p class="review-date">${new Date(featuredReview.date).toLocaleDateString()}</p>
            </div>
        `;
    }

    function startReviewRotation() {
        setInterval(() => {
            currentFeaturedIndex = (currentFeaturedIndex + 1) % fiveStarReviews.length;
            displayFeaturedReview();
        }, 5000);
    }

    function showAllReviews() {
        const allReviewsDiv = document.getElementById('all-reviews');
        if (reviews.length === 0) {
            allReviewsDiv.innerHTML = '<p>No reviews available</p>';
            return;
        }
        
        allReviewsDiv.innerHTML = '<h3>All Reviews</h3>';
        
        reviews.forEach(review => {
            allReviewsDiv.innerHTML += `
                <div class="review-card">
                    <div class="stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
                    <h4 class="review-title">${review.review_title || 'Untitled Review'}</h4>
                    <p class="review-text">"${review.review_content || 'No content provided'}"</p>
                    <p class="review-author">- ${review.user?.name || 'Anonymous'}, ${review.user?.location || 'Unknown location'}</p>
                    <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
                </div>
            `;
        });
    }

    function filterReviews(rating) {
        const filteredReviews = reviews.filter(review => review.stars === rating);
        const allReviewsDiv = document.getElementById('all-reviews');
        
        allReviewsDiv.innerHTML = `<h3>${rating} Star Reviews</h3>`;
        
        if (filteredReviews.length === 0) {
            allReviewsDiv.innerHTML += `<p>No ${rating} star reviews found.</p>`;
            return;
        }
        
        filteredReviews.forEach(review => {
            allReviewsDiv.innerHTML += `
                <div class="review-card">
                    <div class="stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</div>
                    <h4 class="review-title">${review.review_title || 'Untitled Review'}</h4>
                    <p class="review-text">"${review.review_content || 'No content provided'}"</p>
                    <p class="review-author">- ${review.user?.name || 'Anonymous'}, ${review.user?.location || 'Unknown location'}</p>
                    <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
                </div>
            `;
        });
    }

    // Make functions available globally
    window.showAllReviews = showAllReviews;
    window.filterReviews = filterReviews;
});