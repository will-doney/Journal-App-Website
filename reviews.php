<?php 
$pageTitle = "Reviews";
include 'inc/header.php';
include 'inc/nav.php';
?>

<main>
    <section class="reviews">
        <h2>What Our Users Say</h2>
        <div id="featured-review" class="featured-review">
            <!-- JavaScript will populate this -->
        </div>
        <div class="stats">
            <p>Average Rating: <span id="average-rating">Loading...</span></p>
        </div>
        <div class="filter-options">
            <button onclick="showAllReviews()">Show All Reviews</button>
            <button onclick="filterReviews(5)">5 Star Reviews</button>
            <button onclick="filterReviews(4)">4 Star Reviews</button>
            <button onclick="filterReviews(3)">3 Star Reviews</button>
            <button onclick="filterReviews(2)">2 Star Reviews</button>
            <button onclick="filterReviews(1)">1 Star Reviews</button>
        </div>
        <div id="all-reviews" class="all-reviews">
            <!-- JavaScript will populate this when showing all reviews -->
        </div>
    </section>
</main>

<script src="js/reviews.js"></script>
<?php include 'inc/footer.php'; ?>