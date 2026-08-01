package com.univendor.backend.vendor;

import com.univendor.backend.category.CategoryResponse;
import java.time.Instant;

public record VendorResponse(
        Long id,
        String name,
        String description,
        CategoryResponse category,
        String contactPhone,
        String contactWhatsapp,
        String contactInstagram,
        boolean verified,
        Instant createdAt) {

    public static VendorResponse from(Vendor vendor) {
        return new VendorResponse(
                vendor.getId(),
                vendor.getName(),
                vendor.getDescription(),
                CategoryResponse.from(vendor.getCategory()),
                vendor.getContactPhone(),
                vendor.getContactWhatsapp(),
                vendor.getContactInstagram(),
                vendor.isVerified(),
                vendor.getCreatedAt());
    }
}
