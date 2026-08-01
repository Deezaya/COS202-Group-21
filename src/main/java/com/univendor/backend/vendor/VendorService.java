package com.univendor.backend.vendor;

import com.univendor.backend.category.Category;
import com.univendor.backend.category.CategoryRepository;
import com.univendor.backend.common.NotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class VendorService {

    private final VendorRepository vendorRepository;
    private final CategoryRepository categoryRepository;

    public VendorService(VendorRepository vendorRepository, CategoryRepository categoryRepository) {
        this.vendorRepository = vendorRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<VendorResponse> listVendors(String categorySlug, String keyword) {
        return vendorRepository.search(categorySlug, keyword).stream()
                .map(VendorResponse::from)
                .toList();
    }

    public VendorResponse getVendor(Long id) {
        return vendorRepository.findByIdWithCategory(id)
                .map(VendorResponse::from)
                .orElseThrow(() -> new NotFoundException("Vendor " + id + " not found"));
    }

    public VendorResponse createVendor(VendorCreateRequest request) {
        Category category = categoryRepository.findBySlug(request.categorySlug())
                .orElseThrow(() -> new NotFoundException("Category " + request.categorySlug() + " not found"));

        Vendor vendor = new Vendor(
                request.name(),
                request.description(),
                category,
                request.contactPhone(),
                request.contactWhatsapp(),
                request.contactInstagram());

        return VendorResponse.from(vendorRepository.save(vendor));
    }
}
