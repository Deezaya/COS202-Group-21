package com.univendor.backend.vendor;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    public List<VendorResponse> listVendors(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String hall,
            @RequestParam(required = false) String faculty,
            @RequestParam(required = false) String priceTier) {
        return vendorService.listVendors(category, q, hall, faculty, priceTier);
    }

    @GetMapping("/{id}")
    public VendorResponse getVendor(@PathVariable Long id) {
        return vendorService.getVendor(id);
    }

    @PostMapping
    public ResponseEntity<VendorResponse> createVendor(@Valid @RequestBody VendorCreateRequest request) {
        VendorResponse created = vendorService.createVendor(request);
        return ResponseEntity.created(URI.create("/api/vendors/" + created.id())).body(created);
    }
}
