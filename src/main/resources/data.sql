INSERT INTO categories (name, slug) VALUES
  ('Catering & Food', 'catering-food'),
  ('Fashion & Tailoring', 'fashion-tailoring'),
  ('Repairs & Maintenance', 'repairs-maintenance'),
  ('Tutoring & Lessons', 'tutoring-lessons');

INSERT INTO vendors (name, description, category_id, contact_phone, contact_whatsapp, contact_instagram, verified, created_at) VALUES
  ('Mama Kemi Kitchen', 'Home-cooked Nigerian meals delivered around campus, daily menu of rice, swallow and stew combos.', (SELECT id FROM categories WHERE slug = 'catering-food'), '+2348012345678', '+2348012345678', '@mamakemikitchen', true, now()),
  ('Snack Bae Unilag', 'Small chops, meat pies and chilled drinks for hostel parties and events, bulk orders welcome.', (SELECT id FROM categories WHERE slug = 'catering-food'), '+2348023456789', '+2348023456789', '@snackbaeunilag', false, now()),
  ('Threadwork by Tolu', 'Custom ankara outfits and alterations, turnaround in 3-5 days, fittings done on campus.', (SELECT id FROM categories WHERE slug = 'fashion-tailoring'), '+2348034567890', '+2348034567890', '@threadworkbytolu', true, now()),
  ('Denim Republic NG', 'Thrift denim jackets and jeans resale, sizes for both guys and girls, new stock weekly.', (SELECT id FROM categories WHERE slug = 'fashion-tailoring'), '+2348045678901', NULL, '@denimrepublicng', false, now()),
  ('Phone Doctor Unilag', 'Screen replacement, battery swaps and software fixes for Android and iPhone, same-day service.', (SELECT id FROM categories WHERE slug = 'repairs-maintenance'), '+2348056789012', '+2348056789012', '@phonedoctorunilag', true, now()),
  ('QuickFix Electronics', 'Laptop repairs, charger port fixes and data recovery for students, walk-in or hostel pickup.', (SELECT id FROM categories WHERE slug = 'repairs-maintenance'), '+2348067890123', '+2348067890123', NULL, false, now()),
  ('Calculus with Chidi', 'One-on-one and small group tutoring for MTH101/102, past questions and worked examples included.', (SELECT id FROM categories WHERE slug = 'tutoring-lessons'), '+2348078901234', '+2348078901234', '@calculuswithchidi', false, now()),
  ('CodeCamp Peer Tutors', 'Beginner-friendly Java and Python tutoring for COS200-level courses, weekend sessions.', (SELECT id FROM categories WHERE slug = 'tutoring-lessons'), '+2348089012345', NULL, '@codecamppeer', true, now());
