package com.univendor.backend.vendor;

public record VendorSearchCriteria(
        String categorySlug,
        String keyword,
        String hall,
        String faculty,
        String priceTier,
        VerificationStatus status) {

    public static VendorSearchCriteria of(String categorySlug, String keyword, String hall, String faculty,
            String priceTier) {
        return new VendorSearchCriteria(categorySlug, keyword, hall, faculty, priceTier, null);
    }

    public static VendorSearchCriteria byStatus(VerificationStatus status) {
        return new VendorSearchCriteria(null, null, null, null, null, status);
    }
}
