package com.univendor.backend.review;

import java.time.Instant;

public record ReviewResponse(
        Long id,
        Long vendorId,
        Long userId,
        Integer rating,
        String comment,
        Instant createdAt) {

    public static ReviewResponse from(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getVendorId(),
                review.getUserId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt());
    }
}
