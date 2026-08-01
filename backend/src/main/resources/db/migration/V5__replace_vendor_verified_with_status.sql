ALTER TABLE vendors ADD COLUMN verification_status VARCHAR(20);
UPDATE vendors SET verification_status = CASE WHEN verified THEN 'VERIFIED' ELSE 'NONE' END;
ALTER TABLE vendors ALTER COLUMN verification_status SET NOT NULL;
ALTER TABLE vendors DROP COLUMN verified;
