-- =====================================================
-- 分类数据源统一化 - 将硬编码分类迁移到数据库
-- =====================================================

-- 1. 添加缺失的描述字段
-- =====================================================
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'categories' AND column_name = 'short_desc'
    ) THEN
        ALTER TABLE categories ADD COLUMN short_desc text;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'categories' AND column_name = 'full_desc'
    ) THEN
        ALTER TABLE categories ADD COLUMN full_desc text;
    END IF;
END $$;

-- 2. 插入五大分类数据（如果不存在）
-- =====================================================
INSERT INTO categories (name, name_en, slug, short_desc, full_desc, sort_order) VALUES
  ('修持法具', 'Practice Tools', 'practice-tools', '修行刚需', '日常早晚课、诵经、打坐的必备法器，助您精进修行', 1),
  ('供养庄严', 'Offerings', 'offerings', '空间布局', '佛堂布置与佛前供具，营造神圣清净的居家空间', 2),
  ('法音经典', 'Dharma Audio', 'dharma-audio', '文化传播', '经典法本与法音载体，让智慧音声常住身边', 3),
  ('随身护佑', 'Protective', 'protective', '文创饰品', '随身佩戴的护佑法物与文创首饰', 4),
  ('禅意生活', 'Zen Lifestyle', 'lifestyle', '健康跨界', '融合禅意美学与现代生活的身心调养之物', 5)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  name_en = EXCLUDED.name_en,
  short_desc = EXCLUDED.short_desc,
  full_desc = EXCLUDED.full_desc,
  sort_order = EXCLUDED.sort_order;

-- 3. 插入子分类数据
-- =====================================================
-- 先获取父分类ID
DO $$
DECLARE
  practice_tools_id uuid;
  offerings_id uuid;
  dharma_audio_id uuid;
  protective_id uuid;
  lifestyle_id uuid;
BEGIN
  SELECT id INTO practice_tools_id FROM categories WHERE slug = 'practice-tools';
  SELECT id INTO offerings_id FROM categories WHERE slug = 'offerings';
  SELECT id INTO dharma_audio_id FROM categories WHERE slug = 'dharma-audio';
  SELECT id INTO protective_id FROM categories WHERE slug = 'protective';
  SELECT id INTO lifestyle_id FROM categories WHERE slug = 'lifestyle';

  -- 修持法具子分类
  INSERT INTO categories (name, name_en, slug, parent_id, sort_order) VALUES
    ('念珠手串', 'Malas', 'practice-tools/malas', practice_tools_id, 1),
    ('法器法音', 'Ritual Implements', 'practice-tools/ritual-implements', practice_tools_id, 2),
    ('修行辅助', 'Practice Aids', 'practice-tools/practice-aids', practice_tools_id, 3)
  ON CONFLICT (slug) DO NOTHING;

  -- 供养庄严子分类
  INSERT INTO categories (name, name_en, slug, parent_id, sort_order) VALUES
    ('佛像造像', 'Buddha Statues', 'offerings/buddha-statues', offerings_id, 1),
    ('供灯净水', 'Offering Lamps', 'offerings/offering-lamps', offerings_id, 2),
    ('香炉供具', 'Censers', 'offerings/censers', offerings_id, 3)
  ON CONFLICT (slug) DO NOTHING;

  -- 法音经典子分类
  INSERT INTO categories (name, name_en, slug, parent_id, sort_order) VALUES
    ('经书法物', 'Sutras & Texts', 'dharma-audio/sutras', dharma_audio_id, 1),
    ('法音载体', 'Audio Carriers', 'dharma-audio/audio-carriers', dharma_audio_id, 2),
    ('抄经文具', 'Copying Tools', 'dharma-audio/copying-tools', dharma_audio_id, 3)
  ON CONFLICT (slug) DO NOTHING;

  -- 随身护佑子分类
  INSERT INTO categories (name, name_en, slug, parent_id, sort_order) VALUES
    ('护身佩戴', 'Amulets', 'protective/amulets', protective_id, 1),
    ('珠宝首饰', 'Jewelry', 'protective/jewelry', protective_id, 2),
    ('符咒法物', 'Protective Charms', 'protective/charms', protective_id, 3)
  ON CONFLICT (slug) DO NOTHING;

  -- 禅意生活子分类
  INSERT INTO categories (name, name_en, slug, parent_id, sort_order) VALUES
    ('茶道香具', 'Tea Ceremony', 'lifestyle/tea-ceremony', lifestyle_id, 1),
    ('禅修服饰', 'Zen Robes', 'lifestyle/zen-robes', lifestyle_id, 2),
    ('空间香氛', 'Space Fragrance', 'lifestyle/space-fragrance', lifestyle_id, 3)
  ON CONFLICT (slug) DO NOTHING;
END $$;

-- 4. 创建索引
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);
