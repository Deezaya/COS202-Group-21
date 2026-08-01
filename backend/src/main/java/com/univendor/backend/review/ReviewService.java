package com.univendor.backend.review;

import com.univendor.backend.common.ConflictException;
import com.univendor.backend.common.ForbiddenException;
import com.univendor.backend.common.NotFoundException;
import com.univendor.backend.user.User;
import com.univendor.backend.user.UserRepository;
import com.univendor.backend.vendor.Vendor;
import com.univendor.backend.vendor.VendorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository, VendorRepository vendorRepository,
            UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
    }

    public ReviewResponse createReview(Long vendorId, ReviewRequest request, Long requesterId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new NotFoundException("Vendor " + vendorId + " not found"));

        Long ownerId = vendor.getOwnerId();
        if (ownerId != null && ownerId.equals(requesterId)) {
            throw new ForbiddenException("You cannot review your own vendor listing");
        }

        if (reviewRepository.findByVendorIdAndUserId(vendorId, requesterId).isPresent()) {
            throw new ConflictException(
                    "You have already reviewed this vendor - use PUT /api/reviews/{id} to update it");
        }

        User user = userRepository.getReferenceById(requesterId);
        Review review = new Review(vendor, user, request.rating(), request.comment());
        return ReviewResponse.from(reviewRepository.save(review));
    }

    public Page<ReviewResponse> listReviews(Long vendorId, Pageable pageable) {
        if (!vendorRepository.existsById(vendorId)) {
            throw new NotFoundException("Vendor " + vendorId + " not found");
        }
        return reviewRepository.findByVendorId(vendorId, pageable).map(ReviewResponse::from);
    }

    @Transactional
    public ReviewResponse updateReview(Long id, ReviewRequest request, Long requesterId) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Review " + id + " not found"));
        requireOwnership(review, requesterId);

        review.update(request.rating(), request.comment());
        return ReviewResponse.from(reviewRepository.save(review));
    }

    @Transactional
    public void deleteReview(Long id, Long requesterId) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Review " + id + " not found"));
        requireOwnership(review, requesterId);
        reviewRepository.delete(review);
    }

    @Transactional
    public void adminDeleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Review " + id + " not found"));
        reviewRepository.delete(review);
    }

    private void requireOwnership(Review review, Long requesterId) {
        if (!review.getUserId().equals(requesterId)) {
            throw new ForbiddenException("You do not own this review");
        }
    }
}
