import { Product, FAQItem } from './types';

export const products: Product[] = [
  {
    id: 'moroc-elixir',
    name: "L'Or du Maroc Elixir",
    nameFr: "L'Or du Maroc Elixir",
    subtitle: 'Restorative Prickly Pear Seed Oil',
    subtitleFr: 'Huile de Pépins de Figue de Barbarie Régénérante',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    categoryLabelFr: 'Huiles Visage',
    skinType: 'oily-combination',
    skinTypeLabel: 'Oily / Combination',
    skinTypeLabelFr: 'Grasses / Mixtes',
    price: 120.0,
    rating: 4.8,
    reviewsCount: 142,
    description: 'Extracted from the seeds of the Moroccan prickly pear cactus, this rare elixir is intensely hydrating and naturally rich in Vitamin E and essential fatty acids. Designed to restore a luminous, deeply nourished complexion while offering a moment of serene indulgence in your daily ritual.',
    descriptionFr: "Extrait des pépins du cactus de figue de barbarie marocain, cet élixir rare est intensément hydratant et naturellement riche en vitamine E et en acides gras essentiels. Conçu pour restaurer un teint lumineux et profondément nourri, tout en offrant un moment de sérénité absolue dans votre rituel quotidien.",
    ingredients: '100% Pure Organic Opuntia Ficus-Indica (Prickly Pear) Seed Oil. Cold-pressed in small batches to preserve maximum potency. Cruelty-free, vegan, and free from synthetic fragrances, fillers, and preservatives.',
    ingredientsFr: "Huile de pépins d'Opuntia Ficus-Indica (figue de barbarie) 100% pure et biologique. Pressée à froid en petits lots pour préserver une efficacité maximale. Sans cruauté, végétalienne et exempte de parfums synthétiques, de charges et de conservateurs.",
    benefits: [
      'Intensally hydrates and plumps the skin barrier',
      'Provides exceptional antioxidant protection with high Vitamin E content',
      'Minimizes the appearance of fine lines and hyperpigmentation',
      'Balances sebum production for a healthy, glowing finish'
    ],
    benefitsFr: [
      "Hydrate intensément et repulpe la barrière cutanée",
      "Offre une protection antioxydante exceptionnelle grâce à sa haute teneur en vitamine E",
      "Atténue visiblement l'apparence des ridules et de l'hyperpigmentation",
      "Régule la production de sébum pour un fini sain et éclatant"
    ],
    howToUse: 'Warm 3-4 drops between fingertips. Press gently into cleansed and toned skin, focusing on areas of concern. Best used as the final step in your evening ritual to seal in moisture and stimulate cellular renewal overnight.',
    howToUseFr: "Chauffez 3 à 4 gouttes entre le bout de vos doigts. Pressez délicatement sur la peau nettoyée et tonifiée, en insistant sur les zones concernées. À utiliser de préférence comme dernière étape de votre rituel du soir pour sceller l'hydratation et stimuler le renouvellement cellulaire pendant la nuit.",
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
    nameFr: "Huile d'Argan 100% Pure",
    subtitle: 'Liquid Gold for Hair & Skin',
    subtitleFr: "L'Or Liquide pour Cheveux & Peau",
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    categoryLabelFr: 'Huiles Visage',
    skinType: 'dry',
    skinTypeLabel: 'Dry',
    skinTypeLabelFr: 'Sèche',
    price: 48.0,
    rating: 4.9,
    reviewsCount: 204,
    description: 'Our award-winning 100% Pure Argan Oil is a multi-tasking miracle worker. Responsibly and ethically harvested by a women’s cooperative in southwestern Morocco, it is cold-pressed to ensure the highest quality. This silky, lightweight oil absorbs instantly to deeply moisturize, condition, and restore absolute vitality to skin, hair, and nails.',
    descriptionFr: "Notre huile d'argan 100% pure et primée est un produit miracle multi-usage. Récoltée de manière responsable et éthique par une coopérative de femmes dans le sud-ouest du Maroc, elle est pressée à froid pour garantir une qualité optimale. Cette huile soyeuse et légère s'absorbe instantanément pour hydrater en profondeur, revitaliser et restaurer la vitalité absolue de la peau, des cheveux et des ongles.",
    ingredients: '100% Pure Organic Argania Spinosa (Argan) Kernel Oil. Absolutely single-ingredient purity.',
    ingredientsFr: "Huile d'argan (Argania Spinosa) 100% pure et biologique. Une pureté absolue en un seul ingrédient.",
    benefits: [
      'Locks in rich, protective moisture for face and body',
      'Softens dry, frizzy hair and seals split ends with radiant shine',
      'Soothes skin irritations, redness, and flaky patches',
      'Strengthens cuticles and encourages healthy nail growth'
    ],
    benefitsFr: [
      "Scelle une hydratation riche et protectrice pour le visage et le corps",
      "Adoucit les cheveux secs et crépus et referme les pointes fourchues d'un éclat radieux",
      "Apaise les irritations cutanées, les rougeurs et les plaques de sécheresse",
      "Renforce les cuticules et favorise la croissance saine des ongles"
    ],
    howToUse: 'For Face: Massage 2-3 drops onto damp skin after cleansing. For Hair: Rub a few drops between palms and run through damp or dry hair, focusing on ends. For Body: Smooth over dry areas as a nourishing treatment.',
    howToUseFr: "Pour le visage : Massez 2 à 3 gouttes sur la peau humide après le nettoyage. Pour les cheveux : Frottez quelques gouttes entre les paumes et passez-les sur cheveux humides ou secs, en insistant sur les pointes. Pour le corps : Appliquez sur les zones sèches comme soin nourrissant.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJAN1rT1UV1wHwysY4E50L1VQSUUKrBVq8oGOSr6mTeLMshv5W3kWzRD8xrU7fjfvAAvlxaG32OAYTgsFl2Ex0lKjQ3vhJR7IjCZvZ9n2eZLhXodKjVgZlp55UWGExe9jBNRoON-an2_fdS7YKCk3SBWl615sx91_e8thUZF7zdlfTeDAjkd2zagilC_He4tVv_02NGKJlAWhyc78qd-9GbbZxfOjsGzRYnF1rvwqjKm3pdOzsL0Djk1lo5yyqxd9Hn91hxSlUzwk',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJAN1rT1UV1wHwysY4E50L1VQSUUKrBVq8oGOSr6mTeLMshv5W3kWzRD8xrU7fjfvAAvlxaG32OAYTgsFl2Ex0lKjQ3vhJR7IjCZvZ9n2eZLhXodKjVgZlp55UWGExe9jBNRoON-an2_fdS7YKCk3SBWl615sx91_e8thUZF7zdlfTeDAjkd2zagilC_He4tVv_02NGKJlAWhyc78qd-9GbbZxfOjsGzRYnF1rvwqjKm3pdOzsL0Djk1lo5yyqxd9Hn91hxSlUzwk'
    ],
    isBestSeller: true
  },
  {
    id: 'radiance-elixir',
    name: 'Radiance Elixir Oil',
    nameFr: "Élixir d'Éclat aux Fleurs",
    subtitle: 'Organic Rosehip & Argan',
    subtitleFr: 'Églantier & Argan Biologiques',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    categoryLabelFr: 'Huiles Visage',
    skinType: 'sensitive',
    skinTypeLabel: 'Sensitive',
    skinTypeLabelFr: 'Sensible',
    price: 85.0,
    rating: 4.7,
    reviewsCount: 98,
    description: 'A powerful restorative facial oil that combines Moroccan Argan Oil with organic Rosehip Seed extract. Specifically formulated to soothe sensitive complexions while addressing dullness, uneven texture, and moisture depletion. Envelops the skin in calming nourishment.',
    descriptionFr: "Une huile régénérante puissante pour le visage qui associe l'huile d'argan marocaine à l'extrait de pépins d'églantier biologique. Spécialement formulée pour apaiser les peaux sensibles tout en luttant contre le teint terne, le grain irrégulier et la déshydratation. Enveloppe la peau d'une nutrition apaisante.",
    ingredients: 'Organic Argania Spinosa (Argan) Kernel Oil, Organic Rosa Canina (Rosehip) Seed Oil, Tocopherol (Vitamin E).',
    ingredientsFr: "Huile d'argan biologique, huile de pépins d'églantier biologique, tocophérol (vitamine E).",
    benefits: [
      'Visibly brightens and evens skin tone',
      'Reduces appearance of acne scars and hyperpigmentation',
      'Provides deep dermal soothing and anti-inflammatory properties',
      'Reinforces the skin’s natural lipid barrier'
    ],
    benefitsFr: [
      "Illumine visiblement et unifie le teint",
      "Atténue l'apparence des cicatrices d'acné et de l'hyperpigmentation",
      "Procure un apaisement cutané profond et des propriétés anti-inflammatoires",
      "Renforce la barrière lipidique naturelle de la peau"
    ],
    howToUse: 'Apply 2-3 drops onto clean, damp face and neck morning and evening. Pat gently into skin until absorbed. Follow with moisturizer if desired.',
    howToUseFr: "Appliquez 2 à 3 gouttes sur le visage et le cou propres et humides matin et soir. Tapotez doucement pour faire pénétrer. Poursuivez avec votre crème hydratante si nécessaire.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Te39gb3zM5ljmrK0GLAPYt1ObHjlKivCyqZyZbCYKKbZKXMc0z3nUU7mbvLe0K8bFRabjr1C1nrj4fB_5Q32ipk_NR-3x9UkWy5_I-slFl1X5acVnjjer8DVjJ7-5JtoqB07A-D2RO4wcDTxanwmckeCdsVjpS3xFVTC6EDkEZJp2azzreiDkOAYbKvXx0uV-rDWOR6GjiqfcdnVNq9YqB4lnqr8JKeGR5x4n1ojJ2jdBvUO1Y34eNAyVCAiHYG0epMnkp3wJN8',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5Te39gb3zM5ljmrK0GLAPYt1ObHjlKivCyqZyZbCYKKbZKXMc0z3nUU7mbvLe0K8bFRabjr1C1nrj4fB_5Q32ipk_NR-3x9UkWy5_I-slFl1X5acVnjjer8DVjJ7-5JtoqB07A-D2RO4wcDTxanwmckeCdsVjpS3xFVTC6EDkEZJp2azzreiDkOAYbKvXx0uV-rDWOR6GjiqfcdnVNq9YqB4lnqr8JKeGR5x4n1ojJ2jdBvUO1Y34eNAyVCAiHYG0epMnkp3wJN8'
    ],
    isBestSeller: true
  },
  {
    id: 'rhassoul-clay',
    name: 'Rhassoul Clay Mask',
    nameFr: "Masque d'Argile Rhassoul",
    subtitle: 'Purifying & Pore Refining',
    subtitleFr: 'Purifiant & Affine les Pores',
    category: 'clays-masks',
    categoryLabel: 'Clays & Masks',
    categoryLabelFr: 'Argiles & Masques',
    skinType: 'oily-combination',
    skinTypeLabel: 'Oily / Combination',
    skinTypeLabelFr: 'Grasses / Mixtes',
    price: 32.0,
    rating: 4.6,
    reviewsCount: 115,
    description: 'Sourced from old lake beds in the Moroccan Atlas Mountains, Rhassoul Clay is an extraordinary mineral-rich clay used in traditional hammams for centuries. It draws out deep-seated impurities, absorbs excess sebum, and delivers essential minerals. Leaves the skin remarkably refined, polished, and visibly clear.',
    descriptionFr: "Provenant d'anciens sédiments lacustres des montagnes de l'Atlas marocain, le Rhassoul est une argile extraordinaire et riche en minéraux utilisée dans les hammams traditionnels depuis des siècles. Elle élimine les impuretés incrustées, absorbe l'excès de sébum et apporte des minéraux essentiels. Laisse la peau remarquablement affinée, lissée et visiblement nette.",
    ingredients: '100% Pure Moroccan Lava Clay (Rhassoul Clay). High concentration of silica, magnesium, and calcium.',
    ingredientsFr: "Argile lave 100% pure du Maroc (Argile Rhassoul). Haute concentration en silice, magnésium et calcium.",
    benefits: [
      'Deeply cleanses pores and reduces blackhead formation',
      'Improves skin elasticity and overall surface texture',
      'Absorbs excess surface oils without stripping vital moisture',
      'Gently exfoliates dead skin cells for a radiant finish'
    ],
    benefitsFr: [
      "Nettoie les pores en profondeur et réduit la formation de points noirs",
      "Améliore l'élasticité de la peau et la texture de sa surface",
      "Absorbe l'excès de sébum sans éliminer l'hydratation essentielle",
      "Exfolie en douceur les cellules mortes pour un teint éclatant"
    ],
    howToUse: 'Mix 1 tablespoon of clay with warm water or rose water in a non-metallic bowl until it forms a smooth paste. Apply to clean face and neck, avoiding the eye area. Leave on for 8-10 minutes (do not let it fully dry). Rinse thoroughly with warm water.',
    howToUseFr: "Mélangez 1 cuillère à soupe d'argile avec de l'eau tiède ou de l'eau de rose dans un bol non métallique jusqu'à l'obtention d'une pâte lisse. Appliquez sur le visage et le cou nettoyés, en évitant le contour des yeux. Laissez agir 8 à 10 minutes (ne laissez pas sécher complètement). Rincez abondamment à l'eau tiède.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGMWDj823_ipyMUc1Fsq0Y9hmLtIuYNBV0SIuOUuIbGUI8PSCOvn-tTEcrLWD_yfXqY22o52aWnLKnCOa6fwURaCJYHuw6hx30zZX6-n7EXsgx5oHNs1IENG2Nql4sXllcigo25z5FLW05yL5hllxF2flkjlWSW0_-N7krVu6YN07Pn-10n6kSdJleKZfRL9c5gYKW95pP4G9q-miae_NgzxbR7vXFanPKZTl9plGlupIUf-m5Y3vr-2yNwfpHkDuYTkXpxxKdMY8',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGMWDj823_ipyMUc1Fsq0Y9hmLtIuYNBV0SIuOUuIbGUI8PSCOvn-tTEcrLWD_yfXqY22o52aWnLKnCOa6fwURaCJYHuw6hx30zZX6-n7EXsgx5oHNs1IENG2Nql4sXllcigo25z5FLW05yL5hllxF2flkjlWSW0_-N7krVu6YN07Pn-10n6kSdJleKZfRL9c5gYKW95pP4G9q-miae_NgzxbR7vXFanPKZTl9plGlupIUf-m5Y3vr-2yNwfpHkDuYTkXpxxKdMY8'
    ],
    isBestSeller: true
  },
  {
    id: 'rose-water-mist',
    name: 'Rose Water Mist',
    nameFr: "Brumisation d'Eau de Rose",
    subtitle: 'Pure Hydrating Toning Mist',
    subtitleFr: 'Brume Tonique Hydratante Pure',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    categoryLabelFr: 'Huiles Visage',
    skinType: 'sensitive',
    skinTypeLabel: 'Sensitive',
    skinTypeLabelFr: 'Sensible',
    price: 28.0,
    rating: 4.9,
    reviewsCount: 312,
    description: 'Our pure Rose Water is steam-distilled from the petals of organically grown Damascus Roses in Morocco’s Valley of the Roses. This micro-fine hydrating mist rebalances pH levels, instantly refreshes tired skin, and acts as a humectant to prep skin for serums and oils. A luxurious sensory awakening.',
    descriptionFr: "Notre eau de rose pure est distillée à la vapeur à partir de pétales de roses de Damas issues de l'agriculture biologique dans la Vallée des Roses au Maroc. Cette brume hydratante micro-fine rééquilibre le pH, rafraîchit instantanément la peau fatiguée et agit comme un humectant pour préparer la peau aux sérums et aux huiles. Un réveil sensoriel luxueux.",
    ingredients: '100% Pure Organic Rosa Damascena (Rose) Flower Water.',
    ingredientsFr: "Eau florale 100% pure et biologique de Rosa Damascena (Rose).",
    benefits: [
      'Restores skin’s natural pH balance after cleansing',
      'Provides an immediate boost of cooling, soothing moisture',
      'Refines pores and reduces temporary redness and inflammation',
      'Delivers an exquisite, calming botanical aromatherapy experience'
    ],
    benefitsFr: [
      "Rétablit l'équilibre naturel du pH cutané après le nettoyage",
      "Procure une hydratation rafraîchissante et apaisante immédiate",
      "Affine les pores et réduit les rougeurs et inflammations passagères",
      "Offre une expérience d'aromathérapie botanique exquise et calmante"
    ],
    howToUse: 'Mist generously over face and neck after cleansing, or anytime throughout the day for a refreshing boost. Can be used to set makeup or mixed with Rhassoul clay for an elevated mask ritual.',
    howToUseFr: "Vaporisez généreusement sur le visage et le cou après le nettoyage, ou à tout moment de la journée pour un coup de fraîcheur. Peut être utilisée pour fixer le maquillage ou mélangée à l'argile Rhassoul pour un rituel de masque sublimé.",
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
    nameFr: "Pain de Toilette Botanique",
    subtitle: 'Gentle Exfoliation and Deep Cleanse',
    subtitleFr: 'Exfoliation Douce & Nettoyage Profond',
    category: 'cleansers',
    categoryLabel: 'Cleansers',
    categoryLabelFr: 'Nettoyants',
    skinType: 'all',
    skinTypeLabel: 'All Skin Types',
    skinTypeLabelFr: 'Tous Types de Peau',
    price: 22.0,
    rating: 4.8,
    reviewsCount: 88,
    description: 'A luxurious hand-milled cleansing bar containing cold-pressed oils and botanicals to gently lift away impurities and daily debris. Enriched with fine Moroccan herbs to provide mild exfoliation, leaving skin supple, thoroughly clean, and gently polished.',
    descriptionFr: "Un savon de nettoyage luxueux fabriqué à la main, contenant des huiles pressées à froid et des actifs botaniques pour éliminer en douceur les impuretés et les résidus quotidiens. Enrichi d'herbes fines marocaines pour offrir une exfoliation douce, laissant la peau souple, parfaitement propre et délicatement polie.",
    ingredients: 'Sodium Olivate (Saponified Olive Oil), Saponified Argania Spinosa Kernel Oil, Saponified Coconut Oil, Ground Moroccan Sage and Rosemary leaves.',
    ingredientsFr: "Olivate de sodium (huile d'olive saponifiée), huile d'argan saponifiée, huile de coco saponifiée, feuilles de sauge et de romarin marocaines broyées.",
    benefits: [
      'Lathers into a rich, creamy micro-foam that deeply cleanses',
      'Provides very gentle mechanical exfoliation with herbal particles',
      'Does not leave skin dry or tight, preserving natural oils',
      'Scented with pure organic Moroccan botanicals'
    ],
    benefitsFr: [
      "Se transforme en une mousse fine et crémeuse qui nettoie en profondeur",
      "Procure une exfoliation mécanique très douce grâce aux particules d'herbes",
      "Ne dessèche pas la peau et préserve ses huiles naturelles protectrices",
      "Parfumé aux extraits botaniques marocains biologiques purs"
    ],
    howToUse: 'Lather bar with water between palms. Massage creamy lather onto damp face and body in gentle circular motions. Rinse thoroughly with lukewarm water. Use daily.',
    howToUseFr: "Faites mousser le pain avec de l'eau entre vos paumes. Massez la mousse crémeuse sur le visage et le corps humides en mouvements circulaires doux. Rincez abondamment à l'eau tiède. Utilisez quotidiennement.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1eezXm8GR4cNBMbAZymG0zyLHAYyVUkHDTgM7ujlMl8hIFMLkXNqgU1ZBQAU30hycTwmdwAQ2ufqNoLg07ByXi-IyStxT5B9RA7lmG1upmTAnFvgoVntp-3iM8fHouYgfloJpRjPhqiKoL26kyPLU0_LQIGprQ_i0_pewC7i7f2yTdKimUlmTQ6Z4MyhD2uEDAJehTP3uNF26fZAsPQzahRJoSMfihrMP_qEyxJHgPqrqEqUUlKpBmnE5jO0TAdXhGY3An-u_RC4',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1eezXm8GR4cNBMbAZymG0zyLHAYyVUkHDTgM7ujlMl8hIFMLkXNqgU1ZBQAU30hycTwmdwAQ2ufqNoLg07ByXi-IyStxT5B9RA7lmG1upmTAnFvgoVntp-3iM8fHouYgfloJpRjPhqiKoL26kyPLU0_LQIGprQ_i0_pewC7i7f2yTdKimUlmTQ6Z4MyhD2uEDAJehTP3uNF26fZAsPQzahRJoSMfihrMP_qEyxJHgPqrqEqUUlKpBmnE5jO0TAdXhGY3An-u_RC4'
    ],
    isNew: true
  },
  {
    id: 'atlas-rose-clay',
    name: 'Atlas Rose Clay',
    nameFr: "Argile Rose de l'Atlas",
    subtitle: 'Nourishing Pink Clay Mask',
    subtitleFr: "Masque d'Argile Rose Nourrissant",
    category: 'clays-masks',
    categoryLabel: 'Clays & Masks',
    categoryLabelFr: 'Argiles & Masques',
    skinType: 'dry',
    skinTypeLabel: 'Dry',
    skinTypeLabelFr: 'Sèche',
    price: 48.0,
    rating: 4.7,
    reviewsCount: 76,
    description: 'A decadent combination of fine pink clay from the Moroccan mountains and steam-distilled Atlas Rose petals. Formulated to detoxify dry and sensitive skin complexions, refining pore structures while delivering vital soothing botanicals.',
    descriptionFr: "Une alliance décadente d'argile rose fine des montagnes marocaines et de pétales de roses de l'Atlas distillés à la vapeur. Formulée pour détoxifier les peaux sèches et sensibles, affiner la structure des pores tout en apportant des actifs botaniques apaisants indispensables.",
    ingredients: 'Kaolinite (French Pink Clay), Montmorillonite (Moroccan Lava Clay), Organic Rosa Damascena Flower Powder.',
    ingredientsFr: "Kaolinite (argile rose française), Montmorillonite (argile lave marocaine), poudre florale biologique de Rosa Damascena.",
    benefits: [
      'Gently draws out impurities without pulling moisture from deep layers',
      'Soothes inflammation and balances sensitive skin barriers',
      'Provides micro-minerals that revive dull skin complexions',
      'Enhances elasticity and imparts a youthful rosy flush'
    ],
    benefitsFr: [
      "Élimine en douceur les impuretés sans dessécher les couches profondes",
      "Apaise l'inflammation et équilibre les barrières cutanées sensibles",
      "Apporte des micro-minéraux qui ravivent les teints ternes",
      "Améliore l'élasticité et donne un teint rosé de jeunesse"
    ],
    howToUse: 'Combine equal parts clay and rose water in a glass dish. Spread a rich, smooth layer over facial contours. Allow to rest for 10 minutes. Before clay is completely dry, remove with a warm, damp cloth.',
    howToUseFr: "Mélangez à parts égales l'argile et l'eau de rose dans un récipient en verre. Étalez une couche riche et lisse sur les contours du visage. Laissez reposer 10 minutes. Avant que l'argile ne soit complètement sèche, retirez avec un linge chaud et humide.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn5hc6D1xDxlabalFVkq19mJXzR4EWAoCzoTQyb6Qvoc73iww_tY55yodO26tEyO8ek7ISsJ-iqjwHVMLQHYpgqnLX7sCKka04HSDxHWLEMWwXB5Q1Pxu-6pznOVYp6FWgeDo3CYtVUbftRQaidL2jO1gyDjPEYjx77iqH51wACBTWZXCnu3uSis2P-9WcsmHGbcRY70UhLl9Hn4ngWxNCtdiHtTIpK191DrA9ihQZcvedXLfEnVUKvpevtBodpQfspoQ8nFqZX-4',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn5hc6D1xDxlabalFVkq19mJXzR4EWAoCzoTQyb6Qvoc73iww_tY55yodO26tEyO8ek7ISsJ-iqjwHVMLQHYpgqnLX7sCKka04HSDxHWLEMWwXB5Q1Pxu-6pznOVYp6FWgeDo3CYtVUbftRQaidL2jO1gyDjPEYjx77iqH51wACBTWZXCnu3uSis2P-9WcsmHGbcRY70UhLl9Hn4ngWxNCtdiHtTIpK191DrA9ihQZcvedXLfEnVUKvpevtBodpQfspoQ8nFqZX-4'
    ]
  },
  {
    id: 'neroli-mist',
    name: 'Neroli Essence Mist',
    nameFr: "Brumisation d'Essence de Néroli",
    subtitle: 'Brightening Floral Water',
    subtitleFr: 'Eau Florale Éclaircissante',
    category: 'facial-oils',
    categoryLabel: 'Facial Oils',
    categoryLabelFr: 'Huiles Visage',
    skinType: 'dry',
    skinTypeLabel: 'Dry',
    skinTypeLabelFr: 'Sèche',
    price: 55.0,
    rating: 4.8,
    reviewsCount: 65,
    description: 'Distilled from the blossoms of Moroccan bitter orange trees, Neroli Essence Mist is a hydrating floral water that rejuvenates, clears, and brightens the complexion. Its uplifting floral-citrus scent relieves stress while the formula works to tighten pores and boost natural radiance.',
    descriptionFr: "Distillée à partir des fleurs de bigaradiers marocains, la Brume d'Essence de Néroli est une eau florale hydratante qui régénère, purifie et illumine le teint. Son parfum floral et d'agrumes revigorant soulage le stress tandis que la formule resserre les pores et stimule l'éclat naturel.",
    ingredients: '100% Organic Citrus Aurantium Amara (Orange Blossom) Distillate.',
    ingredientsFr: "Distillat 100% biologique de Citrus Aurantium Amara (Fleur d'oranger).",
    benefits: [
      'Delivers instant hydration and anti-inflammatory properties',
      'Uplifting and clarifying, perfect for dull skin',
      'Aromatherapeutic benefits reduce tension and soothe stress',
      'Gently tightens pores and smooths overall surface texture'
    ],
    benefitsFr: [
      "Procure une hydratation instantanée et des bienfaits anti-inflammatoires",
      "Tonifiant et clarifiant, idéal pour les peaux ternes",
      "Les bienfaits de l'aromathérapie réduisent la tension et apaisent le stress",
      "Resserre en douceur les pores et lisse le grain de la peau"
    ],
    howToUse: 'Spritz onto skin after cleansing or throughout the day. Inhale deeply to experience the aromatic benefits of orange blossom.',
    howToUseFr: "Vaporisez sur la peau après le nettoyage ou tout au long de la journée. Inspirez profondément pour profiter des bienfaits aromatiques de la fleur d'oranger.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIlPrU_bp0DlcDATIKDuZDEtOI8k23ChXPbcI03CDtvuRuq7LSlJ4UuMohRNN_ZwWBU3TV1NlED1SveWjOvH55ZkjuXtFMs8vajslBLTUmVIUGN6rUC4STnYwNayOCNTpfTnpiDGdBj_i79zlSx_4kPKAELeXNTfnUbq2B37FvkUQeE3QpBf3JAOAZj1oJojUrWNs3mCgboqciDfBosA9KUdrVYEWoc3VpeLEZwyKammQPOeac9eYZ8XZiRJCrCV9fSo4PC03dkR0',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIlPrU_bp0DlcDATIKDuZDEtOI8k23ChXPbcI03CDtvuRuq7LSlJ4UuMohRNN_ZwWBU3TV1NlED1SveWjOvH55ZkjuXtFMs8vajslBLTUmVIUGN6rUC4STnYwNayOCNTpfTnpiDGdBj_i79zlSx_4kPKAELeXNTfnUbq2B37FvkUQeE3QpBf3JAOAZj1oJojUrWNs3mCgboqciDfBosA9KUdrVYEWoc3VpeLEZwyKammQPOeac9eYZ8XZiRJCrCV9fSo4PC03dkR0'
    ]
  },
  {
    id: 'lip-balm',
    name: 'Botanical Lip Balm',
    nameFr: "Baume à Lèvres Botanique",
    subtitle: 'Nourishing Mint & Honey Balm',
    subtitleFr: "Baume Nourrissant Menthe & Miel",
    category: 'body-ritual',
    categoryLabel: 'Body Rituals',
    categoryLabelFr: 'Rituels Corps',
    skinType: 'all',
    skinTypeLabel: 'All Skin Types',
    skinTypeLabelFr: 'Tous Types de Peau',
    price: 22.0,
    rating: 4.8,
    reviewsCount: 120,
    description: 'Crafted with Moroccan wild honey, organic beeswax, and sweet almond oil, this conditioning lip balm seals in moisture to prevent chapping. A subtle hint of Atlas mint delivers a refreshing, cooling sensation.',
    descriptionFr: "Conçu avec du miel sauvage marocain, de la cire d'abeille biologique et de l'huile d'amande douce, ce baume à lèvres nourrissant scelle l'hydratation pour éviter les gerçures. Une subtile touche de menthe de l'Atlas procure une sensation rafraîchissante et revigorante.",
    ingredients: 'Prunus Amygdalus Dulcis (Sweet Almond) Oil, Organic Cera Alba (Beeswax), Moroccan Mel (Wild Honey), Mentha Viridis (Spearmint) Leaf Oil.',
    ingredientsFr: "Huile d'amande douce, cire d'abeille biologique, miel sauvage marocain, huile de menthe verte (menthe de l'Atlas).",
    benefits: [
      'Creates a long-lasting protective barrier against wind and dryness',
      'Soothes and heals cracked, chapped, or sensitive lips',
      'Subtle mint aroma provides a refreshing, cooling effect',
      'Completely free from petroleum and synthetic chemicals'
    ],
    benefitsFr: [
      "Crée une barrière protectrice durable contre le vent et la sécheresse",
      "Apaise et répare les lèvres gercées, abîmées ou sensibles",
      "L'arôme subtil de menthe procure un effet rafraîchissant agréable",
      "Totalement exempt de pétrole et d'ingrédients chimiques de synthèse"
    ],
    howToUse: 'Smooth onto lips as needed throughout the day, or apply a thick layer before bed as a restorative night mask.',
    howToUseFr: "Appliquez sur les lèvres au besoin tout au long de la journée, ou appliquez une couche épaisse avant le coucher comme masque de nuit réparateur.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Rpo-4eKaPEm7NrKNXhfTymndxVy9uSWW6Qjji4o-PAnMnTn8k6XQbxt6NwNRSnr5F54qEXCbRAVR5eAzgmEML5qwboWDZ8aXyPeUqdB88Z8oHD_2ZBQL07FEUBHJLC7fJEP-6r8zz8CnUm5mUmq4h0uKakkp812YzyTzVcxogaqi5b7S6iUwIYYNRfy0gVdIJ2Hh9wxnPvH86PNB4qo7cC7gc0-eUd_D6FcZsiLkJyRbnqwRSx4RH9Tjk6xdgA3tc_6kfSDJpbU',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB6Rpo-4eKaPEm7NrKNXhfTymndxVy9uSWW6Qjji4o-PAnMnTn8k6XQbxt6NwNRSnr5F54qEXCbRAVR5eAzgmEML5qwboWDZ8aXyPeUqdB88Z8oHD_2ZBQL07FEUBHJLC7fJEP-6r8zz8CnUm5mUmq4h0uKakkp812YzyTzVcxogaqi5b7S6iUwIYYNRfy0gVdIJ2Hh9wxnPvH86PNB4qo7cC7gc0-eUd_D6FcZsiLkJyRbnqwRSx4RH9Tjk6xdgA3tc_6kfSDJpbU'
    ],
    isNew: true
  },
  {
    id: 'body-nectar',
    name: 'Golden Body Nectar',
    nameFr: "Nectar de Corps Doré",
    subtitle: 'Nourishing Argan Body Treatment',
    subtitleFr: "Soin Nourrissant Corps à l'Argan",
    category: 'body-ritual',
    categoryLabel: 'Body Rituals',
    categoryLabelFr: 'Rituels Corps',
    skinType: 'dry',
    skinTypeLabel: 'Dry',
    skinTypeLabelFr: 'Sèche',
    price: 85.0,
    rating: 4.9,
    reviewsCount: 154,
    description: 'A sumptuous body treatment that transforms dry skin. Combining organic Moroccan Argan Oil, jojoba oil, and wild orange blossoms, it delivers exceptional hydration while wrapping your body in a warm, relaxing citrus aroma.',
    descriptionFr: "Un somptueux soin corporel qui métamorphose les peaux sèches. Alliant l'huile d'argan biologique du Maroc, l'huile de jojoba et les fleurs d'oranger sauvage, il offre une hydratation exceptionnelle tout en enveloppant votre corps d'un parfum d'agrumes chaleureux et apaisant.",
    ingredients: 'Organic Argania Spinosa Kernel Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Sweet Orange Blossom Essential Oil, Vitamin E.',
    ingredientsFr: "Huile de noyau d'Argania Spinosa biologique, huile de pépins de jojoba, huile essentielle de fleur d'oranger doux, vitamine E.",
    benefits: [
      'Hydrates and softens dry, dull skin for a satin-like finish',
      'Improves skin firmness and diminishes stretch marks',
      'Sinks in beautifully without leaving any greasy residue',
      'Sublime orange blossom scent relaxes body and mind'
    ],
    benefitsFr: [
      "Hydrate et adoucit la peau sèche et terne pour un fini satiné",
      "Améliore la fermeté de la peau et estompe les vergetures",
      "Pénètre merveilleusement sans laisser de résidu gras",
      "Le parfum sublime de fleur d'oranger détend le corps et l'esprit"
    ],
    howToUse: 'Massage over body following a warm bath or shower while skin is still slightly damp to seal in maximum moisture.',
    howToUseFr: "Massez sur le corps après un bain ou une douche chaude, lorsque la peau est encore légèrement humide, pour sceller un maximum d'hydratation.",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV89QTqQhDDpmrI1P2npltfsRQrCoUkiVQKvL7m-fYSTnUwKDDm_G4Qc_9RX_VKJfE563GWMEbv_Nun97szVBrq8cwO83RUOM3bwqziiZCE4vK1EIeDPIGZGTf64GxXtmWBjeqakYQegNCmiy5aLgfiRLljcB52F_njAJufK6bxdca4LsZS29IbcGREy6LWlrg8a7dhMCx0FZ_Tz6vANnc6a4E71AS7j4J0MrkAr2eqmUAIarvxzqfNrF8LCe2bQjYC9U67sf4PFU',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBV89QTqQhDDpmrI1P2npltfsRQrCoUkiVQKvL7m-fYSTnUwKDDm_G4Qc_9RX_VKJfE563GWMEbv_Nun97szVBrq8cwO83RUOM3bwqziiZCE4vK1EIeDPIGZGTf64GxXtmWBjeqakYQegNCmiy5aLgfiRLljcB52F_njAJufK6bxdca4LsZS29IbcGREy6LWlrg8a7dhMCx0FZ_Tz6vANnc6a4E71AS7j4J0MrkAr2eqmUAIarvxzqfNrF8LCe2bQjYC9U67sf4PFU'
    ],
    isBestSeller: true
  }
];
