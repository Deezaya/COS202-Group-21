package com.univendor.backend.review;

import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PagedModel;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/api/vendors/{vendorId}/reviews")
    public ResponseEntity<ReviewResponse> createReview(@PathVariable Long vendorId,
            @Valid @RequestBody ReviewRequest request, @AuthenticationPrincipal Jwt jwt) {
        ReviewResponse created = reviewService.createReview(vendorId, request, currentUserId(jwt));
        return ResponseEntity.created(URI.create("/api/reviews/" + created.id())).body(created);
    }

    @GetMapping("/api/vendors/{vendorId}/reviews")
    public PagedModel<ReviewResponse> listReviews(@PathVariable Long vendorId,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return new PagedModel<>(reviewService.listReviews(vendorId, pageable));
    }

    @PutMapping("/api/reviews/{id}")
    public ReviewResponse updateReview(@PathVariable Long id, @Valid @RequestBody ReviewRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        return reviewService.updateReview(id, request, currentUserId(jwt));
    }

    @DeleteMapping("/api/reviews/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        reviewService.deleteReview(id, currentUserId(jwt));
        return ResponseEntity.noContent().build();
    }

    private Long currentUserId(Jwt jwt) {
        return Long.parseLong(jwt.getSubject());
    }
}
