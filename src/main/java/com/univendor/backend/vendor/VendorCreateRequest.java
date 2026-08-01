package com.univendor.backend.vendor;

import jakarta.validation.constraints.NotBlank;

public record VendorCreateRequest(
        @NotBlank String name,
        @NotBlank String description,
        @NotBlank String categorySlug,
        @NotBlank String contactPhone,
        String contactWhatsapp,
        String contactInstagram) {
}
