package com.univendor.backend.vendor;

import com.univendor.backend.category.Category;
import com.univendor.backend.category.CategoryRepository;
import com.univendor.backend.common.ForbiddenException;
import com.univendor.backend.common.NotFoundException;
import com.univendor.backend.user.User;
import com.univendor.backend.user.UserRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VendorService {

    private final VendorRepository vendorRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public VendorService(VendorRepository vendorRepository, CategoryRepository categoryRepository,
            UserRepository userRepository) {
        this.vendorRepository = vendorRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public List<VendorResponse> listVendors(String categorySlug, String keyword, String hall, String faculty,
            String priceTier) {
        return vendorRepository.search(categorySlug, keyword, hall, faculty, priceTier).stream()
                .map(VendorResponse::from)
                .toList();
    }

    public VendorResponse getVendor(Long id) {
        return vendorRepository.findByIdWithCategory(id)
                .map(VendorResponse::from)
                .orElseThrow(() -> new NotFoundException("Vendor " + id + " not found"));
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

        return VendorResponse.from(vendorRepository.save(vendor));
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

        return VendorResponse.from(vendorRepository.save(vendor));
    }

    @Transactional
    public void deleteVendor(Long id, Long requesterId) {
        Vendor vendor = vendorRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new NotFoundException("Vendor " + id + " not found"));
        requireOwnership(vendor, requesterId);
        vendorRepository.delete(vendor);
    }

    private void requireOwnership(Vendor vendor, Long requesterId) {
        Long ownerId = vendor.getOwnerId();
        if (ownerId == null || !ownerId.equals(requesterId)) {
            throw new ForbiddenException("You do not own this vendor listing");
        }
    }
}
