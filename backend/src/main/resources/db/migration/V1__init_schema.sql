CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE vendors (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    contact_phone VARCHAR(255) NOT NULL,
    contact_whatsapp VARCHAR(255),
    contact_instagram VARCHAR(255),
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    hall_of_residence VARCHAR(255),
    faculty VARCHAR(255),
    price_tier VARCHAR(255)
);

CREATE INDEX idx_vendors_category_id ON vendors(category_id);
