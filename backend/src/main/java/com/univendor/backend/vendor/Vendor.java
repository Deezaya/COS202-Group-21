package com.univendor.backend.vendor;

import com.univendor.backend.category.Category;
import com.univendor.backend.common.ConflictException;
import com.univendor.backend.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false)
    private VerificationStatus verificationStatus = VerificationStatus.NONE;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    private String hallOfResidence;

    private String faculty;

    private String priceTier;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "owner_id")
    private User owner;

    protected Vendor() {
    }

    public Vendor(String name, String description, Category category, String contactPhone,
                  String contactWhatsapp, String contactInstagram, String hallOfResidence,
                  String faculty, String priceTier, User owner) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.contactPhone = contactPhone;
        this.contactWhatsapp = contactWhatsapp;
        this.contactInstagram = contactInstagram;
        this.hallOfResidence = hallOfResidence;
        this.faculty = faculty;
        this.priceTier = priceTier;
        this.owner = owner;
    }

    public void update(String name, String description, Category category, String contactPhone,
                        String contactWhatsapp, String contactInstagram, String hallOfResidence,
                        String faculty, String priceTier) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.contactPhone = contactPhone;
        this.contactWhatsapp = contactWhatsapp;
        this.contactInstagram = contactInstagram;
        this.hallOfResidence = hallOfResidence;
        this.faculty = faculty;
        this.priceTier = priceTier;
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

    public VerificationStatus getVerificationStatus() {
        return verificationStatus;
    }

    public void requestVerification() {
        if (verificationStatus == VerificationStatus.PENDING || verificationStatus == VerificationStatus.VERIFIED) {
            throw new ConflictException("Vendor is already " + verificationStatus.name().toLowerCase());
        }
        verificationStatus = VerificationStatus.PENDING;
    }

    public void verify() {
        if (verificationStatus == VerificationStatus.VERIFIED) {
            return;
        }
        if (verificationStatus != VerificationStatus.PENDING) {
            throw new ConflictException(
                    "Vendor cannot be verified from status: " + verificationStatus.name().toLowerCase());
        }
        verificationStatus = VerificationStatus.VERIFIED;
    }

    public void reject() {
        if (verificationStatus == VerificationStatus.REJECTED) {
            return;
        }
        if (verificationStatus != VerificationStatus.PENDING && verificationStatus != VerificationStatus.VERIFIED) {
            throw new ConflictException(
                    "Vendor cannot be rejected from status: " + verificationStatus.name().toLowerCase());
        }
        verificationStatus = VerificationStatus.REJECTED;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public String getHallOfResidence() {
        return hallOfResidence;
    }

    public String getFaculty() {
        return faculty;
    }

    public String getPriceTier() {
        return priceTier;
    }

    public Long getOwnerId() {
        return owner == null ? null : owner.getId();
    }
}
