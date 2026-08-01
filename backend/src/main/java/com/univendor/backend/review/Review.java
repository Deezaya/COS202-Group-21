package com.univendor.backend.review;

import com.univendor.backend.user.User;
import com.univendor.backend.vendor.Vendor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;

@Entity
@Table(name = "reviews", uniqueConstraints = @UniqueConstraint(columnNames = {"vendor_id", "user_id"}))
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "text")
    private String comment;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    protected Review() {
    }

    public Review(Vendor vendor, User user, Integer rating, String comment) {
        this.vendor = vendor;
        this.user = user;
        this.rating = rating;
        this.comment = comment;
    }

    public void update(Integer rating, String comment) {
        this.rating = rating;
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public Vendor getVendor() {
        return vendor;
    }

    public User getUser() {
        return user;
    }

    public Integer getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Long getVendorId() {
        return vendor.getId();
    }

    public Long getUserId() {
        return user.getId();
    }
}
