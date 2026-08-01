package com.univendor.backend.review;

public record VendorRatingSummary(Long vendorId, Double averageRating, Long reviewCount) {
}
