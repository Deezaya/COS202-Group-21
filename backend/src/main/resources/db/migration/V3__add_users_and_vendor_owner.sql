CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

ALTER TABLE vendors ADD COLUMN owner_id BIGINT REFERENCES users(id);
CREATE INDEX idx_vendors_owner_id ON vendors(owner_id);
