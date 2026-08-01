package com.univendor.backend.admin;

import com.univendor.backend.review.ReviewService;
import com.univendor.backend.vendor.VendorResponse;
import com.univendor.backend.vendor.VendorService;
import com.univendor.backend.vendor.VerificationStatus;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    private final VendorService vendorService;
    private final ReviewService reviewService;

    public AdminController(VendorService vendorService, ReviewService reviewService) {
        this.vendorService = vendorService;
        this.reviewService = reviewService;
    }

    @GetMapping("/api/admin/vendors")
    public List<VendorResponse> listVendors(@RequestParam(required = false) VerificationStatus status) {
        return vendorService.listVendorsByStatus(status);
    }

    @PostMapping("/api/admin/vendors/{id}/verify")
    public VendorResponse verifyVendor(@PathVariable Long id) {
        return vendorService.verifyVendor(id);
    }

    @PostMapping("/api/admin/vendors/{id}/reject")
    public VendorResponse rejectVendor(@PathVariable Long id) {
        return vendorService.rejectVendor(id);
    }

    @DeleteMapping("/api/admin/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.adminDeleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
