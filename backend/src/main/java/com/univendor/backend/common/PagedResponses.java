package com.univendor.backend.common;

import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedModel;

public final class PagedResponses {

    private PagedResponses() {
    }

    public static <T> PagedModel<T> of(Page<T> page) {
        return new PagedModel<>(page);
    }
}
