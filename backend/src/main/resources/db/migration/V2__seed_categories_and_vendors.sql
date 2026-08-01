INSERT INTO categories (name, slug) VALUES
  ('Catering & Bites', 'catering'),
  ('Fashion & Tailoring', 'fashion'),
  ('Hair & Barbering', 'hairdressing'),
  ('Phone & Laptop Repair', 'tech-repair'),
  ('Photography & Reels', 'photography'),
  ('Graphic Design & Print', 'graphic-design'),
  ('Tutoring & Academics', 'tutoring'),
  ('Cosmetics & Glam', 'cosmetics'),
  ('Laundry & Sneakers', 'laundry'),
  ('Events & Surprises', 'events');

INSERT INTO vendors (name, description, category_id, contact_phone, contact_whatsapp, contact_instagram, verified, created_at, hall_of_residence, faculty, price_tier) VALUES
  ('Mama Kemi Kitchen', 'Home-cooked Nigerian meals delivered around campus, daily menu of rice, swallow and stew combos.', (SELECT id FROM categories WHERE slug = 'catering'), '+2348012345678', '+2348012345678', '@mamakemikitchen', true, now(), 'Moremi Hall', 'Faculty of Arts', '₦'),
  ('Snack Bae Unilag', 'Small chops, meat pies and chilled drinks for hostel parties and events, bulk orders welcome.', (SELECT id FROM categories WHERE slug = 'catering'), '+2348023456789', '+2348023456789', '@snackbaeunilag', false, now(), 'Sodeinde Hall', 'Faculty of Social Sciences', '₦'),
  ('Threadwork by Tolu', 'Custom ankara outfits and alterations, turnaround in 3-5 days, fittings done on campus.', (SELECT id FROM categories WHERE slug = 'fashion'), '+2348034567890', '+2348034567890', '@threadworkbytolu', true, now(), 'Mariere Hall', 'Faculty of Management Sciences', '₦₦₦'),
  ('Denim Republic NG', 'Thrift denim jackets and jeans resale, sizes for both guys and girls, new stock weekly.', (SELECT id FROM categories WHERE slug = 'fashion'), '+2348045678901', NULL, '@denimrepublicng', false, now(), 'Biobaku Hall', 'Faculty of Environmental Sciences', '₦₦'),
  ('Phone Doctor Unilag', 'Screen replacement, battery swaps and software fixes for Android and iPhone, same-day service.', (SELECT id FROM categories WHERE slug = 'tech-repair'), '+2348056789012', '+2348056789012', '@phonedoctorunilag', true, now(), 'Jaja Hall', 'Faculty of Engineering', '₦₦'),
  ('QuickFix Electronics', 'Laptop repairs, charger port fixes and data recovery for students, walk-in or hostel pickup.', (SELECT id FROM categories WHERE slug = 'tech-repair'), '+2348067890123', '+2348067890123', NULL, false, now(), 'Jaja Hall', 'Faculty of Engineering', '₦₦'),
  ('Calculus with Chidi', 'One-on-one and small group tutoring for MTH101/102, past questions and worked examples included.', (SELECT id FROM categories WHERE slug = 'tutoring'), '+2348078901234', '+2348078901234', '@calculuswithchidi', false, now(), 'Jaja Hall', 'Faculty of Engineering', '₦'),
  ('CodeCamp Peer Tutors', 'Beginner-friendly Java and Python tutoring for COS200-level courses, weekend sessions.', (SELECT id FROM categories WHERE slug = 'tutoring'), '+2348089012345', NULL, '@codecamppeer', true, now(), 'Eni Njoku Hall', 'Faculty of Science', '₦'),
  ('Temi Glam & Braiding Studio', 'Knotless braids, French curls and wig revamping right in Moremi Hall, premium attachments used.', (SELECT id FROM categories WHERE slug = 'hairdressing'), '+2348034567891', '+2348034567891', '@temiglam_unilag', true, now(), 'Moremi Hall', 'Faculty of Social Sciences', '₦₦'),
  ('Fade Kingz Barbershop', 'Clean skin fades, line-ups and locs maintenance done in-room, walk-ins welcome after lectures.', (SELECT id FROM categories WHERE slug = 'hairdressing'), '+2348034567892', '+2348034567892', '@fadekingz_unilag', false, now(), 'Kofo Ademola Hall', 'Faculty of Law', '₦'),
  ('Unilag Snaps Studio', 'High-aesthetic matriculation, birthday portraits and editorial outdoor shoots around campus.', (SELECT id FROM categories WHERE slug = 'photography'), '+2348143344556', '+2348143344556', '@unilag_snaps', true, now(), 'Eni Njoku Hall', 'Faculty of Environmental Sciences', '₦₦'),
  ('PixelCraft WhatsApp Flyers', 'High-converting WhatsApp flyers, Instagram graphics and logos for student brands, same-day turnaround.', (SELECT id FROM categories WHERE slug = 'graphic-design'), '+2348167788990', '+2348167788990', '@pixelcraft_ng', true, now(), 'Amina Hall', 'Faculty of Science', '₦'),
  ('GlowByDebby Skincare', 'Handcrafted organic whipped shea butter, body scrubs and tinted lip glosses for hall pickup.', (SELECT id FROM categories WHERE slug = 'cosmetics'), '+2348182233445', '+2348182233445', '@glowbydebby_', true, now(), 'Kofo Ademola Hall', 'Faculty of Science', '₦'),
  ('FreshExpress Laundry & Kicks', 'Hall door-to-door laundry pickup, steam ironing and deep sneaker whitening within 24 hours.', (SELECT id FROM categories WHERE slug = 'laundry'), '+2347036677889', '+2347036677889', '@freshexpress_unilag', true, now(), 'Biobaku Hall', 'Faculty of Environmental Sciences', '₦'),
  ('Hall Surprises & Saxophone', 'Unforgettable birthday surprise boxes, saxophone tunes and room balloon setups across all halls.', (SELECT id FROM categories WHERE slug = 'events'), '+2348159900011', '+2348159900011', '@unilag_surprises', true, now(), 'Amina Hall', 'Faculty of Arts', '₦₦');
