package com.univendor.backend.vendor;

import com.univendor.backend.common.PagedResponses;
import jakarta.validation.Valid;
import java.net.URI;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/vendors")
public class VendorController {

    private final VendorService vendorService;

    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }

    @GetMapping
    public PagedModel<VendorResponse> listVendors(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String hall,
            @RequestParam(required = false) String faculty,
            @RequestParam(required = false) String priceTier,
            Pageable pageable) {
        return PagedResponses.of(vendorService.listVendors(category, q, hall, faculty, priceTier, pageable));
    }

    @GetMapping("/{id}")
    public VendorResponse getVendor(@PathVariable Long id) {
        return vendorService.getVendor(id);
    }

    @PostMapping
    public ResponseEntity<VendorResponse> createVendor(@Valid @RequestBody VendorCreateRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        VendorResponse created = vendorService.createVendor(request, currentUserId(jwt));
        return ResponseEntity.created(URI.create("/api/vendors/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public VendorResponse updateVendor(@PathVariable Long id, @Valid @RequestBody VendorCreateRequest request,
            @AuthenticationPrincipal Jwt jwt) {
        return vendorService.updateVendor(id, request, currentUserId(jwt));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        vendorService.deleteVendor(id, currentUserId(jwt));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/request-verification")
    public VendorResponse requestVerification(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        return vendorService.requestVerification(id, currentUserId(jwt));
    }

    private Long currentUserId(Jwt jwt) {
        return Long.parseLong(jwt.getSubject());
    }
}
