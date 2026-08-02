package com.univendor.backend.vendor;

import com.univendor.backend.category.Category;
import com.univendor.backend.category.CategoryRepository;
import com.univendor.backend.common.ConflictException;
import com.univendor.backend.common.ForbiddenException;
import com.univendor.backend.common.NotFoundException;
import com.univendor.backend.review.ReviewRepository;
import com.univendor.backend.review.VendorRatingSummary;
import com.univendor.backend.user.User;
import com.univendor.backend.user.UserRepository;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VendorService {

    private final VendorRepository vendorRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;

    public VendorService(VendorRepository vendorRepository, CategoryRepository categoryRepository,
            UserRepository userRepository, ReviewRepository reviewRepository) {
        this.vendorRepository = vendorRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
    }

    public Page<VendorResponse> listVendors(String categorySlug, String keyword, String hall, String faculty,
            String priceTier, Pageable pageable) {
        Page<Vendor> vendors = vendorRepository.search(categorySlug, keyword, hall, faculty, priceTier, null, pageable);
        Map<Long, VendorRatingSummary> ratings = ratingsFor(vendors.getContent().stream().map(Vendor::getId).toList());
        return vendors.map(v -> toResponse(v, ratings));
    }

    public VendorResponse getVendor(Long id) {
        Vendor vendor = vendorRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new NotFoundException("Vendor " + id + " not found"));
        return toResponse(vendor, ratingsFor(List.of(id)));
    }

    public VendorResponse createVendor(VendorCreateRequest request, Long ownerId) {
        Category category = categoryRepository.findBySlug(request.categorySlug())
                .orElseThrow(() -> new NotFoundException("Category " + request.categorySlug() + " not found"));
        User owner = userRepository.getReferenceById(ownerId);

        Vendor vendor = new Vendor(
                request.name(),
                request.description(),
                category,
                request.contactPhone(),
                request.contactWhatsapp(),
                request.contactInstagram(),
                request.hallOfResidence(),
                request.faculty(),
                request.priceTier(),
                owner);

        // A brand-new vendor provably has zero reviews - no need to query for it.
        return VendorResponse.from(vendorRepository.save(vendor), 0.0, 0L);
    }

    @Transactional
    public VendorResponse updateVendor(Long id, VendorCreateRequest request, Long requesterId) {
        Vendor vendor = vendorRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new NotFoundException("Vendor " + id + " not found"));
        requireOwnership(vendor, requesterId);

        Category category = categoryRepository.findBySlug(request.categorySlug())
                .orElseThrow(() -> new NotFoundException("Category " + request.categorySlug() + " not found"));

        vendor.update(
                request.name(),
                request.description(),
                category,
                request.contactPhone(),
                request.contactWhatsapp(),
                request.contactInstagram(),
                request.hallOfResidence(),
                request.faculty(),
                request.priceTier());

        Vendor saved = vendorRepository.save(vendor);
        return toResponse(saved, ratingsFor(List.of(id)));
    }

    @Transactional
    public void deleteVendor(Long id, Long requesterId) {
        Vendor vendor = vendorRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new NotFoundException("Vendor " + id + " not found"));
        requireOwnership(vendor, requesterId);
        vendorRepository.delete(vendor);
    }

    @Transactional
    public VendorResponse requestVerification(Long id, Long requesterId) {
        Vendor vendor = vendorRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new NotFoundException("Vendor " + id + " not found"));
        requireOwnership(vendor, requesterId);

        VerificationStatus status = vendor.getVerificationStatus();
        if (status == VerificationStatus.PENDING || status == VerificationStatus.VERIFIED) {
            throw new ConflictException("Vendor is already " + status.name().toLowerCase());
        }

        vendor.changeVerificationStatus(VerificationStatus.PENDING);
        Vendor saved = vendorRepository.save(vendor);
        return toResponse(saved, ratingsFor(List.of(id)));
    }

    public Page<VendorResponse> listVendorsByStatus(VerificationStatus status, Pageable pageable) {
        Page<Vendor> vendors = vendorRepository.search(null, null, null, null, null, status, pageable);
        Map<Long, VendorRatingSummary> ratings = ratingsFor(vendors.getContent().stream().map(Vendor::getId).toList());
        return vendors.map(v -> toResponse(v, ratings));
    }

    @Transactional
    public VendorResponse verifyVendor(Long id) {
        return changeStatus(id, VerificationStatus.VERIFIED);
    }

    @Transactional
    public VendorResponse rejectVendor(Long id) {
        return changeStatus(id, VerificationStatus.REJECTED);
    }

    private VendorResponse changeStatus(Long id, VerificationStatus status) {
        Vendor vendor = vendorRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new NotFoundException("Vendor " + id + " not found"));

        VerificationStatus current = vendor.getVerificationStatus();
        if (current != VerificationStatus.PENDING) {
            throw new ConflictException("Vendor is not pending verification (current status: "
                    + current.name().toLowerCase() + ")");
        }

        vendor.changeVerificationStatus(status);
        Vendor saved = vendorRepository.save(vendor);
        return toResponse(saved, ratingsFor(List.of(id)));
    }

    private void requireOwnership(Vendor vendor, Long requesterId) {
        Long ownerId = vendor.getOwnerId();
        if (ownerId == null || !ownerId.equals(requesterId)) {
            throw new ForbiddenException("You do not own this vendor listing");
        }
    }

    private Map<Long, VendorRatingSummary> ratingsFor(List<Long> vendorIds) {
        if (vendorIds.isEmpty()) {
            return Map.of();
        }
        return reviewRepository.summarizeRatings(vendorIds).stream()
                .collect(Collectors.toMap(VendorRatingSummary::vendorId, s -> s));
    }

    private VendorResponse toResponse(Vendor vendor, Map<Long, VendorRatingSummary> ratings) {
        VendorRatingSummary summary = ratings.get(vendor.getId());
        double averageRating = summary == null ? 0.0 : round1(summary.averageRating());
        long reviewCount = summary == null ? 0L : summary.reviewCount();
        return VendorResponse.from(vendor, averageRating, reviewCount);
    }

    private static double round1(double value) {
        return Math.round(value * 10.0) / 10.0;
    }
}
