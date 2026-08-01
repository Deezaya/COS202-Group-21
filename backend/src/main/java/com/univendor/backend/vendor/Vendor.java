package com.univendor.backend.vendor;

import com.univendor.backend.category.Category;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "vendors")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String contactPhone;

    private String contactWhatsapp;

    private String contactInstagram;

    @Column(nullable = false)
    private boolean verified = false;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected Vendor() {
    }

    public Vendor(String name, String description, Category category, String contactPhone,
                  String contactWhatsapp, String contactInstagram) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.contactPhone = contactPhone;
        this.contactWhatsapp = contactWhatsapp;
        this.contactInstagram = contactInstagram;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Category getCategory() {
        return category;
    }

    public String getContactPhone() {
        return contactPhone;
    }

    public String getContactWhatsapp() {
        return contactWhatsapp;
    }

    public String getContactInstagram() {
        return contactInstagram;
    }

    public boolean isVerified() {
        return verified;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
