import { Product, Article, FAQItem } from './types';

export const products: Product[] = [
  {
    id: 'moroc-elixir',
    name: "L'Or du Maroc Elixir",
    subtitle: 'Restorative Prickly Pear Seed Oil',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    skinType: 'oily-combination',
    skinTypeLabel: 'Oily / Combination',
    price: 120.0,
    rating: 4.8,
    reviewsCount: 142,
    description: 'Extracted from the seeds of the Moroccan prickly pear cactus, this rare elixir is intensely hydrating and naturally rich in Vitamin E and essential fatty acids. Designed to restore a luminous, deeply nourished complexion while offering a moment of serene indulgence in your daily ritual.',
    ingredients: '100% Pure Organic Opuntia Ficus-Indica (Prickly Pear) Seed Oil. Cold-pressed in small batches to preserve maximum potency. Cruelty-free, vegan, and free from synthetic fragrances, fillers, and preservatives.',
    benefits: [
      'Intensally hydrates and plumps the skin barrier',
      'Provides exceptional antioxidant protection with high Vitamin E content',
      'Minimizes the appearance of fine lines and hyperpigmentation',
      'Balances sebum production for a healthy, glowing finish'
    ],
    howToUse: 'Warm 3-4 drops between fingertips. Press gently into cleansed and toned skin, focusing on areas of concern. Best used as the final step in your evening ritual to seal in moisture and stimulate cellular renewal overnight.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn1pcAXDbZFCcvn1aMTwkLNG00trPdeilMum9RVDL-T0g7PoqyK6e-pgTm254EDgCCsLI8wlhKJ6Pb8-16YdC5_y_epvkTU9-VO5C__DvckJrnZyIB6Rd9QctTQi1ynOn8qPlhONH2HLSOYJ1ofdpqKN8RIULF-04qniY4WfozDNi9ZnKXn0FjLP50HPxFfKGseZUQbbB2OG-A6sFEhWCtnRfil-Qt0QDbaP3gko8ni6cxB4HPQJtP-nvxr5hp6dHB7zlvE5OonQw',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn1pcAXDbZFCcvn1aMTwkLNG00trPdeilMum9RVDL-T0g7PoqyK6e-pgTm254EDgCCsLI8wlhKJ6Pb8-16YdC5_y_epvkTU9-VO5C__DvckJrnZyIB6Rd9QctTQi1ynOn8qPlhONH2HLSOYJ1ofdpqKN8RIULF-04qniY4WfozDNi9ZnKXn0FjLP50HPxFfKGseZUQbbB2OG-A6sFEhWCtnRfil-Qt0QDbaP3gko8ni6cxB4HPQJtP-nvxr5hp6dHB7zlvE5OonQw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBn5WSQgn3PW9xDvVOAS3NZ1Z1hQM6k_qpPoWWokUcOlg8CBgrbFZO2qk5ZaUHrcWL5jhv7IEyLxpLSoXK0YtFU64nnoUNnRVEhsxJM14gFSL6ZWCGhwohUA4vC2UEZ5HMvXcWFG3BBHmNF25WdSEyD7fZ8IBRfGF3INARjlinc1_qqXvzoP_IEck6EEX_WYPgZRd4RIZr3n_VqacyaRLOwHZxHRS4Izsm8z558e0d_9eRL8qpDbGGA3X5ZBEUw07IWg4tNbRo7fQU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Te39gb3zM5ljmrK0GLAPYt1ObHjlKivCyqZyZbCYKKbZKXMc0z3nUU7mbvLe0K8bFRabjr1C1nrj4fB_5Q32ipk_NR-3x9UkWy5_I-slFl1X5acVnjjer8DVjJ7-5JtoqB07A-D2RO4wcDTxanwmckeCdsVjpS3xFVTC6EDkEZJp2azzreiDkOAYbKvXx0uV-rDWOR6GjiqfcdnVNq9YqB4lnqr8JKeGR5x4n1ojJ2jdBvUO1Y34eNAyVCAiHYG0epMnkp3wJN8'
    ],
    isBestSeller: true
  },
  {
    id: 'argan-oil',
    name: '100% Pure Argan Oil',
    subtitle: 'Liquid Gold for Hair & Skin',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    skinType: 'dry',
    skinTypeLabel: 'Dry',
    price: 48.0,
    rating: 4.9,
    reviewsCount: 204,
    description: 'Our award-winning 100% Pure Argan Oil is a multi-tasking miracle worker. Responsibly and ethically harvested by a women’s cooperative in southwestern Morocco, it is cold-pressed to ensure the highest quality. This silky, lightweight oil absorbs instantly to deeply moisturize, condition, and restore absolute vitality to skin, hair, and nails.',
    ingredients: '100% Pure Organic Argania Spinosa (Argan) Kernel Oil. Absolutely single-ingredient purity.',
    benefits: [
      'Locks in rich, protective moisture for face and body',
      'Softens dry, frizzy hair and seals split ends with radiant shine',
      'Soothes skin irritations, redness, and flaky patches',
      'Strengthens cuticles and encourages healthy nail growth'
    ],
    howToUse: 'For Face: Massage 2-3 drops onto damp skin after cleansing. For Hair: Rub a few drops between palms and run through damp or dry hair, focusing on ends. For Body: Smooth over dry areas as a nourishing treatment.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJAN1rT1UV1wHwysY4E50L1VQSUUKrBVq8oGOSr6mTeLMshv5W3kWzRD8xrU7fjfvAAvlxaG32OAYTgsFl2Ex0lKjQ3vhJR7IjCZvZ9n2eZLhXodKjVgZlp55UWGExe9jBNRoON-an2_fdS7YKCk3SBWl615sx91_e8thUZF7zdlfTeDAjkd2zagilC_He4tVv_02NGKJlAWhyc78qd-9GbbZxfOjsGzRYnF1rvwqjKm3pdOzsL0Djk1lo5yyqxd9Hn91hxSlUzwk',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJAN1rT1UV1wHwysY4E50L1VQSUUKrBVq8oGOSr6mTeLMshv5W3kWzRD8xrU7fjfvAAvlxaG32OAYTgsFl2Ex0lKjQ3vhJR7IjCZvZ9n2eZLhXodKjVgZlp55UWGExe9jBNRoON-an2_fdS7YKCk3SBWl615sx91_e8thUZF7zdlfTeDAjkd2zagilC_He4tVv_02NGKJlAWhyc78qd-9GbbZxfOjsGzRYnF1rvwqjKm3pdOzsL0Djk1lo5yyqxd9Hn91hxSlUzwk'
    ],
    isBestSeller: true
  },
  {
    id: 'radiance-elixir',
    name: 'Radiance Elixir Oil',
    subtitle: 'Organic Rosehip & Argan',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    skinType: 'sensitive',
    skinTypeLabel: 'Sensitive',
    price: 85.0,
    rating: 4.7,
    reviewsCount: 98,
    description: 'A powerful restorative facial oil that combines Moroccan Argan Oil with organic Rosehip Seed extract. Specifically formulated to soothe sensitive complexions while addressing dullness, uneven texture, and moisture depletion. Envelops the skin in calming nourishment.',
    ingredients: 'Organic Argania Spinosa (Argan) Kernel Oil, Organic Rosa Canina (Rosehip) Seed Oil, Tocopherol (Vitamin E).',
    benefits: [
      'Visibly brightens and evens skin tone',
      'Reduces appearance of acne scars and hyperpigmentation',
      'Provides deep dermal soothing and anti-inflammatory properties',
      'Reinforces the skin’s natural lipid barrier'
    ],
    howToUse: 'Apply 2-3 drops onto clean, damp face and neck morning and evening. Pat gently into skin until absorbed. Follow with moisturizer if desired.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Te39gb3zM5ljmrK0GLAPYt1ObHjlKivCyqZyZbCYKKbZKXMc0z3nUU7mbvLe0K8bFRabjr1C1nrj4fB_5Q32ipk_NR-3x9UkWy5_I-slFl1X5acVnjjer8DVjJ7-5JtoqB07A-D2RO4wcDTxanwmckeCdsVjpS3xFVTC6EDkEZJp2azzreiDkOAYbKvXx0uV-rDWOR6GjiqfcdnVNq9YqB4lnqr8JKeGR5x4n1ojJ2jdBvUO1Y34eNAyVCAiHYG0epMnkp3wJN8',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Te39gb3zM5ljmrK0GLAPYt1ObHjlKivCyqZyZbCYKKbZKXMc0z3nUU7mbvLe0K8bFRabjr1C1nrj4fB_5Q32ipk_NR-3x9UkWy5_I-slFl1X5acVnjjer8DVjJ7-5JtoqB07A-D2RO4wcDTxanwmckeCdsVjpS3xFVTC6EDkEZJp2azzreiDkOAYbKvXx0uV-rDWOR6GjiqfcdnVNq9YqB4lnqr8JKeGR5x4n1ojJ2jdBvUO1Y34eNAyVCAiHYG0epMnkp3wJN8'
    ],
    isBestSeller: true
  },
  {
    id: 'rhassoul-clay',
    name: 'Rhassoul Clay Mask',
    subtitle: 'Purifying & Pore Refining',
    category: 'clays-masks',
    categoryLabel: 'Clays & Masks',
    skinType: 'oily-combination',
    skinTypeLabel: 'Oily / Combination',
    price: 32.0,
    rating: 4.6,
    reviewsCount: 115,
    description: 'Sourced from old lake beds in the Moroccan Atlas Mountains, Rhassoul Clay is an extraordinary mineral-rich clay used in traditional hammams for centuries. It draws out deep-seated impurities, absorbs excess sebum, and delivers essential minerals. Leaves the skin remarkably refined, polished, and visibly clear.',
    ingredients: '100% Pure Moroccan Lava Clay (Rhassoul Clay). High concentration of silica, magnesium, and calcium.',
    benefits: [
      'Deeply cleanses pores and reduces blackhead formation',
      'Improves skin elasticity and overall surface texture',
      'Absorbs excess surface oils without stripping vital moisture',
      'Gently exfoliates dead skin cells for a radiant finish'
    ],
    howToUse: 'Mix 1 tablespoon of clay with warm water or rose water in a non-metallic bowl until it forms a smooth paste. Apply to clean face and neck, avoiding the eye area. Leave on for 8-10 minutes (do not let it fully dry). Rinse thoroughly with warm water.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGMWDj823_ipyMUc1Fsq0Y9hmLtIuYNBV0SIuOUuIbGUI8PSCOvn-tTEcrLWD_yfXqY22o52aWnLKnCOa6fwURaCJYHuw6hx30zZX6-n7EXsgx5oHNs1IENG2Nql4sXllcigo25z5FLW05yL5hllxF2flkjlWSW0_-N7krVu6YN07Pn-10n6kSdJleKZfRL9c5gYKW95pP4G9q-miae_NgzxbR7vXFanPKZTl9plGlupIUf-m5Y3vr-2yNwfpHkDuYTkXpxxKdMY8',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGMWDj823_ipyMUc1Fsq0Y9hmLtIuYNBV0SIuOUuIbGUI8PSCOvn-tTEcrLWD_yfXqY22o52aWnLKnCOa6fwURaCJYHuw6hx30zZX6-n7EXsgx5oHNs1IENG2Nql4sXllcigo25z5FLW05yL5hllxF2flkjlWSW0_-N7krVu6YN07Pn-10n6kSdJleKZfRL9c5gYKW95pP4G9q-miae_NgzxbR7vXFanPKZTl9plGlupIUf-m5Y3vr-2yNwfpHkDuYTkXpxxKdMY8'
    ],
    isBestSeller: true
  },
  {
    id: 'rose-water-mist',
    name: 'Rose Water Mist',
    subtitle: 'Pure Hydrating Toning Mist',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    skinType: 'sensitive',
    skinTypeLabel: 'Sensitive',
    price: 28.0,
    rating: 4.9,
    reviewsCount: 312,
    description: 'Our pure Rose Water is steam-distilled from the petals of organically grown Damascus Roses in Morocco’s Valley of the Roses. This micro-fine hydrating mist rebalances pH levels, instantly refreshes tired skin, and acts as a humectant to prep skin for serums and oils. A luxurious sensory awakening.',
    ingredients: '100% Pure Organic Rosa Damascena (Rose) Flower Water.',
    benefits: [
      'Restores skin’s natural pH balance after cleansing',
      'Provides an immediate boost of cooling, soothing moisture',
      'Refines pores and reduces temporary redness and inflammation',
      'Delivers an exquisite, calming botanical aromatherapy experience'
    ],
    howToUse: 'Mist generously over face and neck after cleansing, or anytime throughout the day for a refreshing boost. Can be used to set makeup or mixed with Rhassoul clay for an elevated mask ritual.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1orFGTOdp8G2v9vlmM7SKPmmuNjKhe_I9V9S3Ow0aBbhNATTORE0TBOdFdg6D-YJtn2b9yT7ZXCPllUHG7ougt_OJYctyuY9EoTue8OH66g91Rk8zm-AI2hcNUu8NNa1-e_6bsMVGw56WjhqGXFbWmZJ_HK5gbWMnIm5vxWhxPEGy_6mV0gMvYhhoYA5Jcm5xaN2xQTuFtTAALyMqVo6bkjnj0ViMGijahAr-JIqINXdIcU1zAuL9lRZ_oQwaJ5tv8UVmShiboU0',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1orFGTOdp8G2v9vlmM7SKPmmuNjKhe_I9V9S3Ow0aBbhNATTORE0TBOdFdg6D-YJtn2b9yT7ZXCPllUHG7ougt_OJYctyuY9EoTue8OH66g91Rk8zm-AI2hcNUu8NNa1-e_6bsMVGw56WjhqGXFbWmZJ_HK5gbWMnIm5vxWhxPEGy_6mV0gMvYhhoYA5Jcm5xaN2xQTuFtTAALyMqVo6bkjnj0ViMGijahAr-JIqINXdIcU1zAuL9lRZ_oQwaJ5tv8UVmShiboU0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAENE1Otmod3f6Udoj0rOLx8Nd0sOatVMNpyTr_tRONkYYPoVSRLBHJIKtpJY3Y9aZ20K3PqTtNJpHWavadeoIAL3yCVKlqWqWr1JHmvHStSpHyOJtnIQMMFIkLjsShYEtpFZ7GlEvgDB0i02ZcCzOC4NhnDdCQBO-YWVufyxUSW-QZAVaeW2Y9haQyqqibqkhvC2THwBBUkeVdryBd93RA0zkoLPXgJX4co56xmCIH596LytYkGA2iFUFoQ4VXqPGUElunnPOpyLI'
    ],
    isNew: true
  },
  {
    id: 'cleansing-bar',
    name: 'Botanical Cleansing Bar',
    subtitle: 'Gentle Exfoliation and Deep Cleanse',
    category: 'cleansers',
    categoryLabel: 'Cleansers',
    skinType: 'all',
    skinTypeLabel: 'All Skin Types',
    price: 22.0,
    rating: 4.8,
    reviewsCount: 88,
    description: 'A luxurious hand-milled cleansing bar containing cold-pressed oils and botanicals to gently lift away impurities and daily debris. Enriched with fine Moroccan herbs to provide mild exfoliation, leaving skin supple, thoroughly clean, and gently polished.',
    ingredients: 'Sodium Olivate (Saponified Olive Oil), Saponified Argania Spinosa Kernel Oil, Saponified Coconut Oil, Ground Moroccan Sage and Rosemary leaves.',
    benefits: [
      'Lathers into a rich, creamy micro-foam that deeply cleanses',
      'Provides very gentle mechanical exfoliation with herbal particles',
      'Does not leave skin dry or tight, preserving natural oils',
      'Scented with pure organic Moroccan botanicals'
    ],
    howToUse: 'Lather bar with water between palms. Massage creamy lather onto damp face and body in gentle circular motions. Rinse thoroughly with lukewarm water. Use daily.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1eezXm8GR4cNBMbAZymG0zyLHAYyVUkHDTgM7ujlMl8hIFMLkXNqgU1ZBQAU30hycTwmdwAQ2ufqNoLg07ByXi-IyStxT5B9RA7lmG1upmTAnFvgoVntp-3iM8fHouYgfloJpRjPhqiKoL26kyPLU0_LQIGprQ_i0_pewC7i7f2yTdKimUlmTQ6Z4MyhD2uEDAJehTP3uNF26fZAsPQzahRJoSMfihrMP_qEyxJHgPqrqEqUUlKpBmnE5jO0TAdXhGY3An-u_RC4',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1eezXm8GR4cNBMbAZymG0zyLHAYyVUkHDTgM7ujlMl8hIFMLkXNqgU1ZBQAU30hycTwmdwAQ2ufqNoLg07ByXi-IyStxT5B9RA7lmG1upmTAnFvgoVntp-3iM8fHouYgfloJpRjPhqiKoL26kyPLU0_LQIGprQ_i0_pewC7i7f2yTdKimUlmTQ6Z4MyhD2uEDAJehTP3uNF26fZAsPQzahRJoSMfihrMP_qEyxJHgPqrqEqUUlKpBmnE5jO0TAdXhGY3An-u_RC4'
    ],
    isNew: true
  },
  {
    id: 'atlas-rose-clay',
    name: 'Atlas Rose Clay',
    subtitle: 'Nourishing Pink Clay Mask',
    category: 'clays-masks',
    categoryLabel: 'Clays & Masks',
    skinType: 'dry',
    skinTypeLabel: 'Dry',
    price: 48.0,
    rating: 4.7,
    reviewsCount: 76,
    description: 'A decadent combination of fine pink clay from the Moroccan mountains and steam-distilled Atlas Rose petals. Formulated to detoxify dry and sensitive skin complexions, refining pore structures while delivering vital soothing botanicals.',
    ingredients: 'Kaolinite (French Pink Clay), Montmorillonite (Moroccan Lava Clay), Organic Rosa Damascena Flower Powder.',
    benefits: [
      'Gently draws out impurities without pulling moisture from deep layers',
      'Soothes inflammation and balances sensitive skin barriers',
      'Provides micro-minerals that revive dull skin complexions',
      'Enhances elasticity and imparts a youthful rosy flush'
    ],
    howToUse: 'Combine equal parts clay and rose water in a glass dish. Spread a rich, smooth layer over facial contours. Allow to rest for 10 minutes. Before clay is completely dry, remove with a warm, damp cloth.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn5hc6D1xDxlabalFVkq19mJXzR4EWAoCzoTQyb6Qvoc73iww_tY55yodO26tEyO8ek7ISsJ-iqjwHVMLQHYpgqnLX7sCKka04HSDxHWLEMWwXB5Q1Pxu-6pznOVYp6FWgeDo3CYtVUbftRQaidL2jO1gyDjPEYjx77iqH51wACBTWZXCnu3uSis2P-9WcsmHGbcRY70UhLl9Hn4ngWxNCtdiHtTIpK191DrA9ihQZcvedXLfEnVUKvpevtBodpQfspoQ8nFqZX-4',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn5hc6D1xDxlabalFVkq19mJXzR4EWAoCzoTQyb6Qvoc73iww_tY55yodO26tEyO8ek7ISsJ-iqjwHVMLQHYpgqnLX7sCKka04HSDxHWLEMWwXB5Q1Pxu-6pznOVYp6FWgeDo3CYtVUbftRQaidL2jO1gyDjPEYjx77iqH51wACBTWZXCnu3uSis2P-9WcsmHGbcRY70UhLl9Hn4ngWxNCtdiHtTIpK191DrA9ihQZcvedXLfEnVUKvpevtBodpQfspoQ8nFqZX-4'
    ]
  },
  {
    id: 'neroli-mist',
    name: 'Neroli Essence Mist',
    subtitle: 'Brightening Floral Water',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    skinType: 'dry',
    skinTypeLabel: 'Dry',
    price: 55.0,
    rating: 4.8,
    reviewsCount: 65,
    description: 'Distilled from the blossoms of Moroccan bitter orange trees, Neroli Essence Mist is a hydrating floral water that rejuvenates, clears, and brightens the complexion. Its uplifting floral-citrus scent relieves stress while the formula works to tighten pores and boost natural radiance.',
    ingredients: '100% Organic Citrus Aurantium Amara (Orange Blossom) Distillate.',
    benefits: [
      'Delivers instant hydration and anti-inflammatory properties',
      'Uplifting and clarifying, perfect for dull skin',
      'Aromatherapeutic benefits reduce tension and soothe stress',
      'Gently tightens pores and smooths overall surface texture'
    ],
    howToUse: 'Spritz onto skin after cleansing or throughout the day. Inhale deeply to experience the aromatic benefits of orange blossom.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIlPrU_bp0DlcDATIKDuZDEtOI8k23ChXPbcI03CDtvuRuq7LSlJ4UuMohRNN_ZwWBU3TV1NlED1SveWjOvH55ZkjuXtFMs8vajslBLTUmVIUGN6rUC4STnYwNayOCNTpfTnpiDGdBj_i79zlSx_4kPKAELeXNTfnUbq2B37FvkUQeE3QpBf3JAOAZj1oJojUrWNs3mCgboqciDfBosA9KUdrVYEWoc3VpeLEZwyKammQPOeac9eYZ8XZiRJCrCV9fSo4PC03dkR0',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIlPrU_bp0DlcDATIKDuZDEtOI8k23ChXPbcI03CDtvuRuq7LSlJ4UuMohRNN_ZwWBU3TV1NlED1SveWjOvH55ZkjuXtFMs8vajslBLTUmVIUGN6rUC4STnYwNayOCNTpfTnpiDGdBj_i79zlSx_4kPKAELeXNTfnUbq2B37FvkUQeE3QpBf3JAOAZj1oJojUrWNs3mCgboqciDfBosA9KUdrVYEWoc3VpeLEZwyKammQPOeac9eYZ8XZiRJCrCV9fSo4PC03dkR0'
    ]
  },
  {
    id: 'lip-balm',
    name: 'Botanical Lip Balm',
    subtitle: 'Nourishing Mint & Honey Balm',
    category: 'body-ritual',
    categoryLabel: 'Body Rituals',
    skinType: 'all',
    skinTypeLabel: 'All Skin Types',
    price: 22.0,
    rating: 4.8,
    reviewsCount: 120,
    description: 'Crafted with Moroccan wild honey, organic beeswax, and sweet almond oil, this conditioning lip balm seals in moisture to prevent chapping. A subtle hint of Atlas mint delivers a refreshing, cooling sensation.',
    ingredients: 'Prunus Amygdalus Dulcis (Sweet Almond) Oil, Organic Cera Alba (Beeswax), Moroccan Mel (Wild Honey), Mentha Viridis (Spearmint) Leaf Oil.',
    benefits: [
      'Creates a long-lasting protective barrier against wind and dryness',
      'Soothes and heals cracked, chapped, or sensitive lips',
      'Subtle mint aroma provides a refreshing, cooling effect',
      'Completely free from petroleum and synthetic chemicals'
    ],
    howToUse: 'Smooth onto lips as needed throughout the day, or apply a thick layer before bed as a restorative night mask.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Rpo-4eKaPEm7NrKNXhfTymndxVy9uSWW6Qjji4o-PAnMnTn8k6XQbxt6NwNRSnr5F54qEXCbRAVR5eAzgmEML5qwboWDZ8aXyPeUqdB88Z8oHD_2ZBQL07FEUBHJLC7fJEP-6r8zz8CnUm5mUmq4h0uKakkp812YzyTzVcxogaqi5b7S6iUwIYYNRfy0gVdIJ2Hh9wxnPvH86PNB4qo7cC7gc0-eUd_D6FcZsiLkJyRbnqwRSx4RH9Tjk6xdgA3tc_6kfSDJpbU',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Rpo-4eKaPEm7NrKNXhfTymndxVy9uSWW6Qjji4o-PAnMnTn8k6XQbxt6NwNRSnr5F54qEXCbRAVR5eAzgmEML5qwboWDZ8aXyPeUqdB88Z8oHD_2ZBQL07FEUBHJLC7fJEP-6r8zz8CnUm5mUmq4h0uKakkp812YzyTzVcxogaqi5b7S6iUwIYYNRfy0gVdIJ2Hh9wxnPvH86PNB4qo7cC7gc0-eUd_D6FcZsiLkJyRbnqwRSx4RH9Tjk6xdgA3tc_6kfSDJpbU'
    ],
    isNew: true
  },
  {
    id: 'body-nectar',
    name: 'Golden Body Nectar',
    subtitle: 'Nourishing Argan Body Treatment',
    category: 'body-ritual',
    categoryLabel: 'Body Rituals',
    skinType: 'dry',
    skinTypeLabel: 'Dry',
    price: 85.0,
    rating: 4.9,
    reviewsCount: 154,
    description: 'A sumptuous body treatment that transforms dry skin. Combining organic Moroccan Argan Oil, jojoba oil, and wild orange blossoms, it delivers exceptional hydration while wrapping your body in a warm, relaxing citrus aroma.',
    ingredients: 'Organic Argania Spinosa Kernel Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Sweet Orange Blossom Essential Oil, Vitamin E.',
    benefits: [
      'Hydrates and softens dry, dull skin for a satin-like finish',
      'Improves skin firmness and diminishes stretch marks',
      'Sinks in beautifully without leaving any greasy residue',
      'Sublime orange blossom scent relaxes body and mind'
    ],
    howToUse: 'Massage over body following a warm bath or shower while skin is still slightly damp to seal in maximum moisture.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV89QTqQhDDpmrI1P2npltfsRQrCoUkiVQKvL7m-fYSTnUwKDDm_G4Qc_9RX_VKJfE563GWMEbv_Nun97szVBrq8cwO83RUOM3bwqziiZCE4vK1EIeDPIGZGTf64GxXtmWBjeqakYQegNCmiy5aLgfiRLljcB52F_njAJufK6bxdca4LsZS29IbcGREy6LWlrg8a7dhMCx0FZ_Tz6vANnc6a4E71AS7j4J0MrkAr2eqmUAIarvxzqfNrF8LCe2bQjYC9U67sf4PFU',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBV89QTqQhDDpmrI1P2npltfsRQrCoUkiVQKvL7m-fYSTnUwKDDm_G4Qc_9RX_VKJfE563GWMEbv_Nun97szVBrq8cwO83RUOM3bwqziiZCE4vK1EIeDPIGZGTf64GxXtmWBjeqakYQegNCmiy5aLgfiRLljcB52F_njAJufK6bxdca4LsZS29IbcGREy6LWlrg8a7dhMCx0FZ_Tz6vANnc6a4E71AS7j4J0MrkAr2eqmUAIarvxzqfNrF8LCe2bQjYC9U67sf4PFU'
    ],
    isBestSeller: true
  }
];

export const articles: Article[] = [
  {
    id: 'argan-cooperative',
    title: 'The Women Behind Moroccan Argan Oil',
    category: 'Story',
    excerpt: 'Deep in southwestern Morocco, women’s cooperatives keep the ancient heritage of hand-milled argan extraction alive, empowering local communities.',
    content: [
      'The story of Argan oil is inseparable from the hands that press it. In southwestern Morocco, the UNESCO-protected argan biosphere represents a fragile sanctuary where the Argania Spinosa tree grows. For centuries, Berber women have been the keepers of the complex knowledge required to extract this liquid gold.',
      'To make just one liter of hand-pressed oil requires 15 hours of intense labor. The kernels are harvested from the thorny trees, cracked open between two stones, and then slowly stone-ground into a fine paste which is hand-kneaded to separate the luxurious pure oil.',
      'Our partnership with rural cooperatives ensures these women receive fair living wages, healthcare, and educational programs. By investing in L’Essence Botanique, you directly support rural female literacy and sustainable forestry in the Atlas region.'
    ],
    date: 'June 15, 2026',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArVs2gvB_F9W-Vjpk_qeZXdTcJeJRMHEmSk5XwKf651nqsSSWlpbKzTAF8WwfpUIcsyauDxn8xx5uVF8WwI7EcrcYJ8kjr431IeLnfjGCNnvG7c7--Phf70QzSDbkX_u0dxXtFqXLlUYy3dYQuH46_NIrs-94hwK4n7hID6Fun7tMTDwCHq63r_3iNv-pKfgpj78tlk4CBsv-t8fsY-ptf1Bqn7hRa8LUe6FB78-K_eDYERUuFnFMWhzZvGCb3CZwsXNYH1UiCo5A',
    author: 'Samira Alami, Sourcing Director'
  },
  {
    id: 'rhassoul-clay-benefits',
    title: 'The Mineral Wonders of Rhassoul Clay',
    category: 'Ingredients',
    excerpt: 'Explore why Moroccan Rhassoul clay has been the cornerstone of cleansing hammam rituals for more than twelve centuries.',
    content: [
      'Rhassoul clay—also known as Ghassoul—derives its name from the Arabic verb "Rassala," meaning "to wash." Mined exclusively from deep deposits under the Atlas Range, it is a mineral composite unlike any other clay in the world.',
      'While general clays can dry the skin out, Rhassoul has a high level of silica and magnesium, giving it unique restructuring properties. Its high ion-exchange capacity allows it to swap minerals directly with the skin, drawing out deep impurities while replacing them with essential elements.',
      'When integrated into your facial care twice a week, Rhassoul works to deeply clarify pore walls, clear away blackheads, and refine uneven skin texture. It leaves your face feeling incredibly refreshed, velvety, and balanced.'
    ],
    date: 'May 28, 2026',
    readTime: '4 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGMWDj823_ipyMUc1Fsq0Y9hmLtIuYNBV0SIuOUuIbGUI8PSCOvn-tTEcrLWD_yfXqY22o52aWnLKnCOa6fwURaCJYHuw6hx30zZX6-n7EXsgx5oHNs1IENG2Nql4sXllcigo25z5FLW05yL5hllxF2flkjlWSW0_-N7krVu6YN07Pn-10n6kSdJleKZfRL9c5gYKW95pP4G9q-miae_NgzxbR7vXFanPKZTl9plGlupIUf-m5Y3vr-2yNwfpHkDuYTkXpxxKdMY8',
    author: 'Dr. Karim Benjelloun, Bio-Chemist'
  },
  {
    id: 'nightly-botanical-ritual',
    title: 'Creating a Calming Evening Skincare Ritual',
    category: 'Rituals',
    excerpt: 'Slow down and reconnect. Discover how a deliberate 4-step evening botanical routine can restore both your skin and your mind.',
    content: [
      'Modern life is fast, noisy, and stressful. At L’Essence Botanique, we believe skincare is not a chore—it is a sacred daily transition. By turning your evening application into a deliberate ritual, you let your nervous system transition into rest-and-digest mode, which drastically improves cellular repair.',
      'Step 1: Gentle Cleanse. Massage our Botanical Cleansing Bar over your damp face. Inhale the earthy sage notes to release cognitive fatigue.',
      'Step 2: Hydrate. Mist Rose Water over your face. Press the droplets in, feeling the cool floral energy wake up your skin cells.',
      'Step 3: Restorative Oil. Drop 3-4 drops of Prickly Pear Elixir into your palms, warm them, and press gently into your skin. Take three deep, conscious breaths.',
      'Consistency is the highest form of self-care. Treat your skin as a living garden, and watch it thrive under steady, loving care.'
    ],
    date: 'April 14, 2026',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBkD_Y4Kxxd2pJTGOMMao6Cn1Y3fyIuTzYmaiRYomwYwTVvr9Ag2D2D0HwerPusJir2eynOcddDMkF5Bf4ul1NPUjKHZljK_0xHbzM_OyS48nfBvSEXr1iZoevp3FMUzDHen8xYoirwGE9KglyOS-duIo2nBfXsmkdfGt0Ega6ahNO1s2kdYa9xQ5EQlonJk7A-tm34-t3pOdbUUh857ydmrXCKXaJLTaTbKGLyVJf6WMnOPgRll_uVLW6Zo3Vtu-egojO3a61Gu8',
    author: 'Yasmine Lahlou, Holistic Aesthetician'
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Where are your ingredients sourced?',
    answer: 'All our organic botanical extracts, clays, and floral mists are ethically and sustainably sourced from rural farming communities in Morocco. Our argan nuts are harvested in Essaouira, our roses are hand-picked in Kelaat M’gouna (Valley of the Roses), and our clays are extracted from old beds under the Atlas Range. We deal directly with small-scale cooperatives, guaranteeing fair wages and ethical treatment.',
    category: 'products'
  },
  {
    id: 'faq-2',
    question: 'How does prickly pear seed oil compare to argan oil?',
    answer: 'While both are magnificent moisturizers, Prickly Pear Seed Oil (from the Opuntia cactus) is extremely rare and contains 150% more Vitamin E than Argan Oil. It is incredibly lightweight, absorbs faster, and contains high concentrations of Vitamin K, making it exceptionally powerful for correcting dark under-eye circles and hyperpigmentation. Argan Oil is highly versatile and ideal for multi-purpose skin, hair, and body nourishment.',
    category: 'products'
  },
  {
    id: 'faq-3',
    question: 'What are your shipping policies?',
    answer: 'We offer free carbon-neutral standard shipping on all orders over $75. Orders are shipped in plastic-free, 100% recyclable, biodegradable packaging with biodegradable cornstarch packing peanuts. Delivery takes 3–5 business days within the USA and Europe. International delivery typically takes 7–14 business days.',
    category: 'shipping'
  },
  {
    id: 'faq-4',
    question: 'How do I check the status of my order?',
    answer: 'Once your package is hand-packed and dispatched, you will receive an elegant email confirmation containing a unique tracking link. You can also view your active shipment timeline and past purchases inside the Personal Space/Account section of our website.',
    category: 'orders'
  },
  {
    id: 'faq-5',
    question: 'Are your products safe for highly sensitive skin?',
    answer: 'Yes. Our formulations are built with zero synthetics, fillers, water dilution, or artificial fragrances. Because we focus on pure, single-origin botanical elixirs, our facial oils are hypoallergenic and highly beneficial for inflammatory skin conditions like eczema, psoriasis, or rosacea. We recommend doing a 24-hour patch test inside the elbow before full facial integration.',
    category: 'ritual'
  }
];
