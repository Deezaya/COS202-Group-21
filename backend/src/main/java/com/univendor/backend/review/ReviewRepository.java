package com.univendor.backend.review;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Explicit @Query throughout - "VendorId"/"UserId" collide with the entity's getVendorId()/getUserId()
    // convenience getters, which confuses Spring Data's derived-method-name property resolution
    // (it tries to match a literal "vendorId" attribute instead of traversing the vendor/user association).

    @Query("SELECT r FROM Review r WHERE r.vendor.id = :vendorId")
    Page<Review> findByVendorId(@Param("vendorId") Long vendorId, Pageable pageable);

    @Query("SELECT r FROM Review r WHERE r.vendor.id = :vendorId AND r.user.id = :userId")
    Optional<Review> findByVendorIdAndUserId(@Param("vendorId") Long vendorId, @Param("userId") Long userId);

    @Query("""
            SELECT new com.univendor.backend.review.VendorRatingSummary(r.vendor.id, AVG(r.rating), COUNT(r))
            FROM Review r
            WHERE r.vendor.id IN :vendorIds
            GROUP BY r.vendor.id
            """)
    List<VendorRatingSummary> summarizeRatings(@Param("vendorIds") Collection<Long> vendorIds);
}
