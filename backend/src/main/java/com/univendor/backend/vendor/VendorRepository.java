package com.univendor.backend.vendor;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VendorRepository extends JpaRepository<Vendor, Long> {

    @Query("""
            SELECT v FROM Vendor v JOIN FETCH v.category c
            WHERE (:categorySlug IS NULL OR c.slug = :categorySlug)
            AND (:keyword IS NULL
                 OR LOWER(v.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
                 OR LOWER(v.description) LIKE LOWER(CONCAT('%', :keyword, '%')))
            ORDER BY v.id
            """)
    List<Vendor> search(@Param("categorySlug") String categorySlug, @Param("keyword") String keyword);

    @Query("SELECT v FROM Vendor v JOIN FETCH v.category WHERE v.id = :id")
    Optional<Vendor> findByIdWithCategory(@Param("id") Long id);
}
