package com.univendor.backend.vendor;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VendorRepository extends JpaRepository<Vendor, Long> {

    @Query("""
            SELECT v FROM Vendor v JOIN FETCH v.category c
            WHERE (:#{#criteria.categorySlug()} IS NULL OR c.slug = :#{#criteria.categorySlug()})
            AND (:#{#criteria.keyword()} IS NULL
                 OR LOWER(v.name) LIKE LOWER(CONCAT('%', :#{#criteria.keyword()}, '%'))
                 OR LOWER(v.description) LIKE LOWER(CONCAT('%', :#{#criteria.keyword()}, '%')))
            AND (:#{#criteria.hall()} IS NULL OR v.hallOfResidence = :#{#criteria.hall()})
            AND (:#{#criteria.faculty()} IS NULL OR v.faculty = :#{#criteria.faculty()})
            AND (:#{#criteria.priceTier()} IS NULL OR v.priceTier = :#{#criteria.priceTier()})
            AND (:#{#criteria.status()} IS NULL OR v.verificationStatus = :#{#criteria.status()})
            """)
    Page<Vendor> search(@Param("criteria") VendorSearchCriteria criteria, Pageable pageable);

    @Query("SELECT v FROM Vendor v JOIN FETCH v.category WHERE v.id = :id")
    Optional<Vendor> findByIdWithCategory(@Param("id") Long id);
}
