/* ───────── DATA LAYER — replace these with Neon/API calls later.
   getRegions() · getTraits() · getMoments() · getStats() · getStories() · submitStory()
   Nothing outside this module reaches the raw objects directly. ───────── */

export const traits = [
  { id: 'courage', ar: 'الشجاعة', en: 'Courage', flex: '3 1 420px', img: 'FALCON IN FLIGHT — LOW ANGLE',
    descAr: 'من رمال نجد إلى قمم السروات، الشجاعة هنا قرار يُتخذ قبل ما يصير حكاية.',
    descEn: 'From the sands of Najd to the peaks of Sarawat, courage here is a decision made long before it becomes a story.',
    factAr: 'الصقر رمزٌ للفروسية منذ قرون', factEn: 'The falcon: a symbol of chivalry for centuries', region: 'NAJD · نجد' },
  { id: 'vision', ar: 'الرؤية', en: 'Vision', flex: '2 1 340px', img: 'RIYADH SKYLINE AT BLUE HOUR',
    descAr: 'تشوف المدينة قبل ما تُبنى… وتبنيها مثل ما شفتها.',
    descEn: 'To see the city before it is built — then build it exactly as you saw it.',
    factAr: 'رؤية ٢٠٣٠ تدخل مرحلة التسليم', factEn: 'Vision 2030 enters delivery phase', region: 'RIYADH · الرياض' },
  { id: 'authenticity', ar: 'الأصالة', en: 'Authenticity', flex: '2 1 340px', img: 'NAJDI MUD ARCHITECTURE — DETAIL',
    descAr: 'طين ونخل وظل: عمارة تعرف جوّها وتحترم أهلها.',
    descEn: 'Mud, palm and shade: an architecture that knows its climate and respects its people.',
    factAr: 'الدرعية · موقع تراث عالمي', factEn: 'At-Turaif · UNESCO World Heritage', region: 'DIRIYAH · الدرعية' },
  { id: 'determination', ar: 'الهمة', en: 'Determination', flex: '3 1 420px', img: 'ASIR TERRACES & MOUNTAIN ROAD',
    descAr: 'همّة تشقّ الجبل طريق، وتزرع المدرّج مكان ما فيه تربة.',
    descEn: 'A determination that carves roads through mountains and terraces soil where there was none.',
    factAr: 'مدرّجات زراعية عمرها قرون في عسير', factEn: 'Centuries-old farming terraces across Asir', region: 'ASEER · عسير' },
  { id: 'generosity', ar: 'الجود', en: 'Generosity', flex: '2 1 340px', img: 'COMMUNITY IFTAR — OVERHEAD',
    descAr: 'تعطي قبل ما يُطلب منك، وتنسى إنك عطيت.',
    descEn: 'To give before being asked — and to forget that you gave.',
    factAr: '٢٫٥ مليون نخلة في الأحساء', factEn: '2.5M date palms in Al-Ahsa', region: 'AL-AHSA · الأحساء' },
  { id: 'hospitality', ar: 'الكرم', en: 'Hospitality', flex: '3 1 420px', img: 'ARABIC COFFEE POURED IN A MAJLIS',
    descAr: 'فنجان صغير يقول لك شيء كبير: أنت هنا في بيتك.',
    descEn: 'A small cup carrying a large message: you are home here.',
    factAr: 'القهوة العربية على قائمة اليونسكو منذ ٢٠١٥', factEn: 'Arabic coffee on the UNESCO list since 2015', region: 'HAIL · حائل' },
]

export const regions = [
  { id: 'riyadh', ar: 'الرياض', en: 'Riyadh', lat: 24.71, lng: 46.68, pop: '8.59M', traitAr: 'الرؤية', traitEn: 'Vision', img: 'KING ABDULLAH FINANCIAL DISTRICT',
    quote: 'حيث تلتقي الطموحات وتُصنع الفرص.',
    historyAr: 'من جذورها النجدية وحكاية التأسيس، إلى حاضرٍ يتجدد كل يوم؛ تحمل الرياض حكاية تمتد عبر الأجيال.',
    historyEn: 'From its Najdi roots and the founding story to a present renewed every day — Riyadh carries a story that spans generations.',
    nowAr: 'مترو الرياض يعيد تعريف حركة المدينة، والدرعية تستعيد حكاية التأسيس.',
    nowEn: 'Riyadh Metro is redefining how the city moves, while Diriyah restores the founding story.',
    facts: ['الدرعية: أول عاصمة للدولة السعودية الأولى', 'مترو الرياض: ٦ مسارات و٨٥ محطة', 'مقر لكثير من كبرى الشركات في المملكة'] },
  { id: 'makkah', ar: 'مكة المكرمة', en: 'Makkah', lat: 21.42, lng: 40.5, pop: '7.77M', traitAr: 'الجود', traitEn: 'Generosity', img: 'PILGRIMS AT DAWN — WIDE',
    quote: 'قِبلةُ قلبٍ لا تعرف الجغرافيا.',
    historyAr: 'مدينةٌ استقبلت الحجيج قبل أن تُرسم الطرق التي توصل إليها.',
    historyEn: 'A city that received pilgrims long before the roads leading to it were drawn.',
    nowAr: 'موسم حج ١٤٤٧ استقبل أكثر من ١٫٧ مليون حاج بمنظومة رقمية متكاملة.',
    nowEn: 'The 2026 Hajj season welcomed over 1.7 million pilgrims through a fully digital system.',
    facts: ['جدة التاريخية «بوابة مكة» على قائمة اليونسكو منذ ٢٠١٤', 'ميناء جدة الإسلامي: من أكبر موانئ المملكة', '١٫٧ مليون حاج في ٢٠٢٦'] },
  { id: 'madinah', ar: 'المدينة المنورة', en: 'Madinah', lat: 24.8, lng: 39.6, pop: '2.39M', traitAr: 'الأصالة', traitEn: 'Authenticity', img: 'ALULA — HEGRA TOMBS AT GOLDEN HOUR',
    quote: 'حيث تهدأ الخطى وتصفو الحكاية.',
    historyAr: 'مدينةٌ من نخيلٍ وبازلت، ومن حولها الحِجر التي نحت الأنباط صخرها بيوتاً.',
    historyEn: 'A city of palms and basalt, ringed by Hegra — where stone was carved into houses.',
    nowAr: 'العلا تتحول إلى وجهة ثقافية عالمية دون أن تفقد صمتها.',
    nowEn: 'AlUla is becoming a global cultural destination without losing its silence.',
    facts: ['الحِجر: أول موقع سعودي في اليونسكو ٢٠٠٨', '١١١ مقبرة منحوتة في الصخر', 'واحة العلا: أكثر من ٢ مليون نخلة'] },
  { id: 'eastern', ar: 'المنطقة الشرقية', en: 'Eastern Province', lat: 24.5, lng: 49.2, pop: '5.13M', traitAr: 'الهمة', traitEn: 'Determination', img: 'AL-AHSA OASIS FROM ABOVE',
    quote: 'حيث بدأت الحكاية الصناعية.',
    historyAr: 'من بئر الدمام رقم ٧ عام ١٩٣٨ تغيّر مسار المنطقة والعالم.',
    historyEn: 'Dammam Well No. 7, 1938 — the moment that changed the region and the world.',
    nowAr: 'الأحساء أكبر واحة نخيل في العالم وموقع تراث عالمي منذ ٢٠١٨.',
    nowEn: 'Al-Ahsa is the world’s largest palm oasis and a World Heritage Site since 2018.',
    facts: ['٢٫٥ مليون نخلة في الأحساء', 'الظهران: مركز الطاقة في المملكة', 'جزيرة تاروت: آثار تعود لخمسة آلاف عام'] },
  { id: 'aseer', ar: 'عسير', en: 'Aseer', lat: 18.7, lng: 42.6, pop: '2.02M', traitAr: 'الهمة', traitEn: 'Determination', img: 'RIJAL ALMAA STONE VILLAGE IN MIST',
    quote: 'ضبابٌ يصنع لوناً، وجبلٌ يصنع صبراً.',
    historyAr: 'بيوتٌ حجرية بارتفاع خمسة طوابق، وفنّ القطّ العسيري تنقشه النساء على الجدران.',
    historyEn: 'Five-storey stone houses, and Al-Qatt Al-Asiri painted on walls by the women of the region.',
    nowAr: 'قمة السودة تتحول إلى وجهة جبلية على ارتفاع ٣٬٠٠٠ متر.',
    nowEn: 'Soudah Peaks is becoming a mountain destination at 3,000 metres.',
    facts: ['القطّ العسيري في قائمة اليونسكو ٢٠١٧', 'من أعلى قمم المملكة: نحو ٣٬٠٠٠ م', 'رجال ألمع: قرية من ٦٠ قصراً حجرياً'] },
  { id: 'jazan', ar: 'جازان', en: 'Jazan', lat: 17.3, lng: 42.7, pop: '1.40M', traitAr: 'الجود', traitEn: 'Generosity', img: 'FARASAN ISLANDS — SHALLOW REEF',
    quote: 'بحرٌ وجبلٌ في مشهدٍ واحد.',
    historyAr: 'موانئ قديمة على البحر الأحمر، ومصائد لؤلؤٍ كانت تُقصد من بعيد.',
    historyEn: 'Ancient Red Sea ports and pearl banks that drew travellers from far away.',
    nowAr: 'محمية جزر فرسان وجهة بيئية للغوص ورصد الطيور المهاجرة.',
    nowEn: 'The Farasan Islands reserve is now a destination for diving and migratory birds.',
    facts: ['أكثر من ١٧٠ جزيرة في أرخبيل فرسان', 'زراعة البن الخولاني منذ قرون', 'جبل فيفا: مدرجات زراعية حلزونية'] },
  { id: 'qassim', ar: 'القصيم', en: 'Qassim', lat: 26.2, lng: 43.6, pop: '1.34M', traitAr: 'الكرم', traitEn: 'Hospitality', img: 'BURAIDAH DATE MARKET AT SUNRISE',
    quote: 'سلّةُ التمر وميزانُ الكرم.',
    historyAr: 'سوق التمور في بريدة من أقدم الأسواق الموسمية وأكبرها في العالم.',
    historyEn: 'Buraidah’s date market is among the oldest and largest seasonal markets on earth.',
    nowAr: 'التمور السعودية تصل إلى أكثر من ١٠٠ دولة، والقصيم في الصدارة.',
    nowEn: 'Saudi dates reach more than 100 countries, with Qassim a leading producer.',
    facts: ['أكثر من ١١ مليون نخلة', 'مهرجان الكليجا في عنيزة', 'عنيزة من أقدم مدن نجد'] },
  { id: 'tabuk', ar: 'تبوك', en: 'Tabuk', lat: 28.4, lng: 36.8, pop: '0.89M', traitAr: 'الرؤية', traitEn: 'Vision', img: 'NEOM COASTLINE — RED SEA CLIFFS',
    quote: 'حيث تبدأ الخرائط الجديدة.',
    historyAr: 'محطة على طريق الحج الشامي، ومسار سكة حديد الحجاز.',
    historyEn: 'A station on the Levantine pilgrimage route and the Hejaz Railway line.',
    nowAr: 'مشاريع البحر الأحمر ونيوم تعيد رسم شمال غرب المملكة.',
    nowEn: 'The Red Sea and NEOM projects are redrawing the Kingdom’s north-west.',
    facts: ['جبال حسمى ذات التكوينات الرملية', 'محمية الأمير محمد بن سلمان الملكية', 'ميناء ضباء على البحر الأحمر'] },
  { id: 'hail', ar: 'حائل', en: 'Hail', lat: 27.3, lng: 41.6, pop: '0.75M', traitAr: 'الكرم', traitEn: 'Hospitality', img: 'JUBBAH ROCK ART PANEL',
    quote: 'أرضُ حاتم، حيث الكرم اسمٌ لا صفة.',
    historyAr: 'نقوش جُبّة وأم سنمان تحمل رسائل عمرها عشرة آلاف عام.',
    historyEn: 'The rock art of Jubbah carries messages ten thousand years old.',
    nowAr: 'حائل محطة رئيسية في رالي داكار السعودية.',
    nowEn: 'Hail is a principal stage of the Dakar Rally in Saudi Arabia.',
    facts: ['فن الصخور في حائل: يونسكو ٢٠١٥', 'جبل أجا وسلمى', 'مضيف حاتم الطائي في الأدب العربي'] },
  { id: 'jawf', ar: 'الجوف', en: 'Al Jawf', lat: 29.9, lng: 39.3, pop: '0.60M', traitAr: 'الأصالة', traitEn: 'Authenticity', img: 'DUMAT AL-JANDAL — MARID CASTLE',
    quote: 'زيتونٌ وحجرٌ وذاكرة.',
    historyAr: 'دومة الجندل: مدينةٌ ذُكرت في النقوش الآشورية قبل الميلاد.',
    historyEn: 'Dumat Al-Jandal appears in Assyrian inscriptions from before the common era.',
    nowAr: 'الجوف من أكبر مناطق إنتاج الزيتون في الشرق الأوسط.',
    nowEn: 'Al Jawf is among the Middle East’s largest olive-producing regions.',
    facts: ['أكثر من ٢٠ مليون شجرة زيتون', 'أعمدة الرجاجيل: ستونهنج العرب', 'قلعة مارد الأثرية'] },
  { id: 'najran', ar: 'نجران', en: 'Najran', lat: 17.6, lng: 44.5, pop: '0.59M', traitAr: 'الأصالة', traitEn: 'Authenticity', img: 'AL-UKHDUD ARCHAEOLOGICAL SITE',
    quote: 'طينٌ مزخرفٌ وحكايةٌ أقدم من التاريخ.',
    historyAr: 'الأخدود: مدينةٌ من مدن طريق البخور القديم.',
    historyEn: 'Al-Ukhdud was a city on the ancient incense route.',
    nowAr: 'العمارة النجرانية الطينية تُرمَّم وتُعاد إلى الحياة.',
    nowEn: 'Najran’s mud architecture is being restored and brought back to life.',
    facts: ['قصر الإمارة التاريخي', 'طريق البخور القديم', 'النقوش المسندية في الأخدود'] },
  { id: 'northern', ar: 'الحدود الشمالية', en: 'Northern Borders', lat: 30.4, lng: 41.6, pop: '0.37M', traitAr: 'الشجاعة', traitEn: 'Courage', img: 'DESERT STEPPE AFTER RAIN',
    quote: 'سهوبٌ تتفتح بعد المطر.',
    historyAr: 'مسارات قوافل قديمة بين الجزيرة وبلاد الشام.',
    historyEn: 'Ancient caravan routes between Arabia and the Levant.',
    nowAr: 'مشروع وعد الشمال: مدينة تعدينية متكاملة.',
    nowEn: 'Waad Al Shamal: an integrated mining city.',
    facts: ['نحو ٧٪ من احتياطي الفوسفات العالمي', 'محمية الخنفة البرية', 'عرعر: بوابة الشمال'] },
  { id: 'bahah', ar: 'الباحة', en: 'Al Bahah', lat: 20.0, lng: 41.4, pop: '0.34M', traitAr: 'الشجاعة', traitEn: 'Courage', img: 'RAGHADAN FOREST — JUNIPER CANOPY',
    quote: 'غاباتٌ لا يتوقعها أحد.',
    historyAr: 'قرى ذي عين الأثرية مبنيةٌ من الحجر على جبلٍ من المرمر.',
    historyEn: 'The stone village of Dhee Ayn stands on a hill of white marble.',
    nowAr: 'الباحة وجهة صيفية للغابات والعسل الجبلي.',
    nowEn: 'Al Bahah is a summer destination of forests and mountain honey.',
    facts: ['أكثر من ٤٠ غابة طبيعية', 'قرية ذي عين الرخامية', 'عسل السدر الجبلي'] },
]

/* Deep-exploration content per region (rendered by RegionDetail).
   shortAr — the locative name used in CTAs: «خذ لك لفة في …» / «وش قصتك مع …؟»
   storyCity — the StoryBuilder city prefilled by the region's final CTA.
   cities — story cities that belong to this region (community stories filter). */
export const regionDetails = {
  riyadh: {
    shortAr: 'الرياض', storyCity: 'الرياض', cities: ['الرياض'],
    places: [
      { ar: 'قصر المصمك', en: 'Masmak Fortress' },
      { ar: 'حي الطريف بالدرعية', en: 'At-Turaif, Diriyah' },
      { ar: 'مركز الملك عبدالله المالي', en: 'KAFD' },
      { ar: 'وادي حنيفة', en: 'Wadi Hanifah' },
    ],
    storyAr: 'في يناير ١٩٠٢ استعاد الملك عبدالعزيز الرياض، ومن قصر المصمك بدأت حكاية التوحيد. ومن الدرعية وحكاية التأسيس إلى مشهدٍ حضري يتجدد كل يوم — الرياض تكبر على العزم نفسه، جيلاً بعد جيل.',
    storyEn: 'In January 1902, King Abdulaziz reclaimed Riyadh, and from Masmak Fortress the story of unification began. From Diriyah and the founding chapters to a city renewing itself every day — Riyadh grows on the same resolve, generation after generation.',
    numbers: [
      { v: '85', ar: 'محطة مترو على ٦ مسارات', en: 'Metro stations on 6 lines', src: 'RCRC · 2024' },
      { v: '1727', ar: 'تأسيس الدولة السعودية الأولى في الدرعية', en: 'First Saudi State founded in Diriyah', src: 'DARAH' },
    ],
  },
  makkah: {
    shortAr: 'مكة', storyCity: 'مكة المكرمة', cities: ['مكة المكرمة', 'جدة'],
    places: [
      { ar: 'المسجد الحرام', en: 'The Grand Mosque' },
      { ar: 'جبل النور — غار حراء', en: 'Jabal Al-Nour' },
      { ar: 'جدة التاريخية «البلد»', en: 'Historic Jeddah' },
      { ar: 'ميناء جدة الإسلامي', en: 'Jeddah Islamic Port' },
    ],
    storyAr: 'قبل أن تُرسم الطرق كانت القوافل تعرف اتجاهها: مكة. ومن روشان جدة التاريخية أطلّ التجار قروناً على بحرٍ جاء منه الحجاج. اليوم يصل الحاج من المطار إلى الحرم في ساعات — والوجهة نفسها ما تغيّرت منذ أربعة عشر قرناً.',
    storyEn: 'Before roads were drawn, caravans knew their direction: Makkah. For centuries, merchants watched from Historic Jeddah’s roshan windows as pilgrims arrived by sea. Today a pilgrim moves from airport to Haram in hours — and the destination hasn’t changed in fourteen centuries.',
    numbers: [
      { v: '1,707,301', ar: 'حاجاً في موسم ١٤٤٧', en: 'Pilgrims in the 2026 Hajj', src: 'GASTAT · 2026' },
      { v: '2014', ar: 'إدراج جدة التاريخية في اليونسكو', en: 'Historic Jeddah inscribed by UNESCO', src: 'UNESCO' },
    ],
  },
  madinah: {
    shortAr: 'المدينة', storyCity: 'المدينة المنورة', cities: ['المدينة المنورة', 'المدينة', 'العلا'],
    places: [
      { ar: 'المسجد النبوي', en: 'The Prophet’s Mosque' },
      { ar: 'الحِجر — مدائن صالح', en: 'Hegra' },
      { ar: 'البلدة القديمة في العلا', en: 'AlUla Old Town' },
      { ar: 'جبل أُحد', en: 'Mount Uhud' },
    ],
    storyAr: 'على بُعد ساعات من سكينة المسجد النبوي، نحت الأنباط ١١١ واجهة في صخر الحِجر قبل ألفي عام. المدينة تعلّمك أن الأصالة ليست معروضة في متحف — هي طريقة عيش: نخلٌ يُسقى، وصخرٌ يحكي، وهدوءٌ يتوارثه الناس.',
    storyEn: 'Hours from the calm of the Prophet’s Mosque, the Nabataeans carved 111 façades into the rock of Hegra two thousand years ago. Madinah teaches that authenticity isn’t a museum piece — it’s a way of living: palms tended, stone that speaks, a quiet passed down.',
    numbers: [
      { v: '111', ar: 'مقبرة منحوتة في صخر الحِجر', en: 'Rock-cut tombs at Hegra', src: 'UNESCO · 2008' },
      { v: '2M+', ar: 'نخلة في واحة العلا', en: 'Date palms in the AlUla oasis', src: 'RCU' },
    ],
  },
  eastern: {
    shortAr: 'الشرقية', storyCity: 'الدمام', cities: ['الدمام', 'الخبر', 'الأحساء'],
    places: [
      { ar: 'واحة الأحساء', en: 'Al-Ahsa Oasis' },
      { ar: 'بئر الدمام رقم ٧', en: 'Dammam Well No. 7' },
      { ar: 'جزيرة تاروت', en: 'Tarout Island' },
      { ar: 'واجهة الخبر البحرية', en: 'Khobar Corniche' },
    ],
    storyAr: 'ست محاولات لم تحقق المأمول… ثم تدفّق بئر الدمام رقم ٧ في ١٩٣٨ وغيّر مسار المنطقة والعالم. وقبل النفط بآلاف السنين كانت تاروت ميناءً يتاجر مع حضارات ما بين النهرين. الشرقية ما بدأت مع النفط — النفط هو اللي لحق بها.',
    storyEn: 'Six wells came up short — then Dammam Well No. 7 flowed in 1938 and changed the region and the world. Thousands of years before oil, Tarout was already a port trading with Mesopotamia. The Eastern Province didn’t begin with oil; oil caught up with it.',
    numbers: [
      { v: '2.5M', ar: 'نخلة في واحة الأحساء', en: 'Date palms in Al-Ahsa', src: 'UNESCO · 2018' },
      { v: '1938', ar: 'عام تدفّق بئر رقم ٧', en: 'Well No. 7 strikes oil', src: 'ARAMCO' },
      { v: '5,000', ar: 'عام من التاريخ على جزيرة تاروت', en: 'Years of history on Tarout', src: 'HERITAGE COMMISSION' },
    ],
  },
  aseer: {
    shortAr: 'عسير', storyCity: 'أبها', cities: ['أبها'],
    places: [
      { ar: 'قرية رجال ألمع', en: 'Rijal Almaa' },
      { ar: 'قمم السودة', en: 'Soudah Peaks' },
      { ar: 'أبها القديمة', en: 'Old Abha' },
      { ar: 'مدرّجات السروات', en: 'Sarawat terraces' },
    ],
    storyAr: 'في عسير كانت النساء يرسمن «القطّ» على جدران البيوت: خطوطاً وألواناً ترحّب بالضيف قبل الكلام. ومن بيوت حجرية بخمسة طوابق في رجال ألمع إلى مدرّجات زُرعت على حواف الجبال — هنا تعلّم الناس أن الجبل ما هو عائق… هو بيت.',
    storyEn: 'In Asir, women painted Al-Qatt on the walls of their homes: lines and colours that welcome a guest before a word is spoken. From five-storey stone houses in Rijal Almaa to terraces sown on mountain edges — here, people learned the mountain is not an obstacle. It’s home.',
    numbers: [
      { v: '~3,000m', ar: 'ارتفاع قمم السودة', en: 'Elevation of Soudah Peaks', src: 'SOUDAH DEVELOPMENT' },
      { v: '60', ar: 'قصراً حجرياً في رجال ألمع', en: 'Stone palaces in Rijal Almaa', src: 'MOC' },
      { v: '2017', ar: 'القطّ العسيري في قائمة اليونسكو', en: 'Al-Qatt joins UNESCO', src: 'UNESCO' },
    ],
  },
  jazan: {
    shortAr: 'جازان', storyCity: 'جازان', cities: ['جازان'],
    places: [
      { ar: 'جزر فرسان', en: 'Farasan Islands' },
      { ar: 'جبل فيفا', en: 'Fifa Mountains' },
      { ar: 'مرتفعات الداير', en: 'Al-Dayer highlands' },
    ],
    storyAr: 'كان الغواصون يخرجون من فرسان وراء اللؤلؤ، وفوق في الجبال كان المزارعون يعلّقون مدرّجات البن الخولاني على حواف فيفا. بحرٌ وجبلٌ على مرمى نظر — وفنجان قهوتك اليوم ربما بدأ حبةً على جبلٍ في جازان.',
    storyEn: 'Divers once sailed out of Farasan after pearls, while farmers above hung Khawlani coffee terraces on the edges of Fifa. Sea and mountain within one glance — and your cup of coffee today may have started as a bean on a Jazan mountainside.',
    numbers: [
      { v: '170+', ar: 'جزيرة في أرخبيل فرسان', en: 'Islands in the Farasan archipelago', src: 'NCW' },
      { v: '2021', ar: 'فرسان محمية محيط حيوي في اليونسكو', en: 'Farasan joins UNESCO biosphere reserves', src: 'UNESCO' },
    ],
  },
  qassim: {
    shortAr: 'القصيم', storyCity: 'بريدة', cities: ['بريدة'],
    places: [
      { ar: 'مدينة التمور في بريدة', en: 'Buraidah Dates City' },
      { ar: 'عنيزة القديمة', en: 'Old Unaizah' },
      { ar: 'برج الشنانة', en: 'Al-Shinanah Tower' },
    ],
    storyAr: 'منذ قرون تحمل قوافل القصيم التمر إلى ما حولها وتعود بالحكايات. واليوم يُعدّ سوق التمور في بريدة من أكبر الأسواق الموسمية في العالم — والصفقة لا تزال تنعقد بكلمة، والضيف لا يزال يخرج وبيده تمر.',
    storyEn: 'For centuries, Qassim’s caravans have carried dates far and wide and returned with stories. Today, Buraidah’s date market is among the largest seasonal markets in the world — a deal is still sealed with a word, and no guest leaves empty-handed.',
    numbers: [
      { v: '11M+', ar: 'نخلة في المنطقة', en: 'Date palms across the region', src: 'MEWA' },
      { v: '100+', ar: 'دولة تصلها التمور السعودية', en: 'Countries importing Saudi dates', src: 'NCPD' },
    ],
  },
  tabuk: {
    shortAr: 'تبوك', storyCity: 'تبوك', cities: ['تبوك'],
    places: [
      { ar: 'جبال حسمى', en: 'Hisma Mountains' },
      { ar: 'قلعة تبوك', en: 'Tabuk Castle' },
      { ar: 'محطة سكة حديد الحجاز', en: 'Hejaz Railway station' },
      { ar: 'ساحل البحر الأحمر', en: 'Red Sea coast' },
    ],
    storyAr: 'مرّ من هنا الحجاج قروناً على درب الشام، ثم مرّ قطار الحجاز، واليوم تُرسم على الأرض نفسها خرائط نيوم ومشروع البحر الأحمر. تبوك عوّدت التاريخ أنها دايم البداية: كل عصرٍ يبدأ خريطته منها.',
    storyEn: 'Pilgrims crossed here for centuries on the Levantine route, then the Hejaz Railway, and today NEOM and the Red Sea project are being drawn on the same ground. Tabuk has taught history a habit: every era starts its map here.',
    numbers: [
      { v: '26,500', ar: 'كم² مساحة نيوم', en: 'km² — the area of NEOM', src: 'NEOM' },
      { v: '1,300+', ar: 'كيلومتراً امتداد سكة حديد الحجاز مروراً بتبوك', en: 'Kilometres of the Hejaz Railway, passing through Tabuk', src: 'MOC' },
    ],
  },
  hail: {
    shortAr: 'حائل', storyCity: 'حائل', cities: ['حائل'],
    places: [
      { ar: 'نقوش جُبّة وأم سنمان', en: 'Jubbah rock art' },
      { ar: 'جبلا أجا وسلمى', en: 'Aja & Salma mountains' },
      { ar: 'قصر القشلة', en: 'Al-Qishlah Palace' },
    ],
    storyAr: 'قبل عشرة آلاف سنة وقف إنسان على صخور جُبّة ونقش ما يشوف: صيادين وقطعاناً ووجوهاً. وبعدها بآلاف السنين صار اسم واحدٍ من أهل حائل مرادفاً للكرم كله: حاتم الطائي. أرضٌ توثّق — بالصخر مرة، وبالسيرة مرة.',
    storyEn: 'Ten thousand years ago, someone stood at the rocks of Jubbah and carved what he saw: hunters, herds, faces. Millennia later, one name from Hail became a synonym for generosity itself: Hatim Al-Tai. A land that keeps its records — once in stone, once in story.',
    numbers: [
      { v: '10,000', ar: 'عام عمر نقوش جُبّة', en: 'Years of Jubbah’s engravings', src: 'UNESCO · 2015' },
      { v: '2022', ar: 'انطلاق رالي داكار من حائل', en: 'The Dakar Rally sets off from Hail', src: 'DAKAR' },
    ],
  },
  jawf: {
    shortAr: 'الجوف', storyCity: 'سكاكا', cities: ['سكاكا'],
    places: [
      { ar: 'دومة الجندل وقلعة مارد', en: 'Dumat Al-Jandal & Marid Castle' },
      { ar: 'مسجد عمر بن الخطاب', en: 'Omar Mosque' },
      { ar: 'أعمدة الرجاجيل', en: 'Al-Rajajil columns' },
    ],
    storyAr: 'ذُكرت دومة الجندل في نقوش الآشوريين قبل الميلاد، وما زالت قلعة مارد شاهدةً على ذاكرة المكان. واليوم تحيط بالمدينة القديمة ملايين أشجار الزيتون — جذورٌ ضاربة في التاريخ، وموسمٌ جديد كل عام.',
    storyEn: 'Dumat Al-Jandal appears in Assyrian inscriptions from before the common era, and Marid Castle still stands as the keeper of the place’s memory. Today, millions of olive trees surround the old city — roots deep in history, and a new harvest every year.',
    numbers: [
      { v: '20M+', ar: 'شجرة زيتون في المنطقة', en: 'Olive trees across the region', src: 'MEWA' },
      { v: '~6,000', ar: 'عام عمر أعمدة الرجاجيل', en: 'Years of Al-Rajajil — “Arabia’s Stonehenge”', src: 'HERITAGE COMMISSION' },
    ],
  },
  najran: {
    shortAr: 'نجران', storyCity: 'نجران', cities: ['نجران'],
    places: [
      { ar: 'موقع الأخدود', en: 'Al-Ukhdud site' },
      { ar: 'قصر الإمارة التاريخي', en: 'Historic Emirate Palace' },
      { ar: 'البيوت الطينية النجرانية', en: 'Najrani mud houses' },
    ],
    storyAr: 'على طريق البخور القديم كانت القوافل تحطّ في الأخدود ثم تكمل نحو البحر. وبقيت نجران ترفع بيوتها من الطين المزخرف طابقاً فوق طابق، حتى صار البيت النجراني نفسه حكاية: عمارة تشبه أهلها — قريبة من الأرض ومرتفعة الهامة.',
    storyEn: 'On the ancient incense route, caravans rested at Al-Ukhdud before continuing to the sea. Najran kept raising its decorated mud houses floor above floor, until the Najrani house became a story itself: architecture like its people — close to the earth, head held high.',
    numbers: [
      { v: '2,000+', ar: 'عام من التاريخ في مدينة الأخدود', en: 'Years of history at Al-Ukhdud', src: 'HERITAGE COMMISSION' },
      { v: '6', ar: 'طوابق قد تبلغها البيوت الطينية التقليدية', en: 'Storeys a traditional mud house can reach', src: 'MOC' },
    ],
  },
  northern: {
    shortAr: 'الحدود الشمالية', storyCity: 'عرعر', cities: ['عرعر'],
    places: [
      { ar: 'عرعر — بوابة الشمال', en: 'Arar' },
      { ar: 'درب زبيدة قرب رفحاء', en: 'Darb Zubaydah near Rafha' },
      { ar: 'محمية الخنفة', en: 'Al-Khanfah reserve' },
    ],
    storyAr: 'من هنا مرّ درب زبيدة يسقي الحجاج من بركٍ محفورة في الصحراء، كرمُ أرضٍ قبل أن يكون كرمَ أهل. وتحت السهوب نفسها التي تخضرّ بعد المطر يرقد نحو ٧٪ من فوسفات العالم — أرضٌ واسعة الهدوء، وفوقها وتحتها عطاءٌ ما يوقف.',
    storyEn: 'Darb Zubaydah passed through here, watering pilgrims from cisterns dug into the desert — a land’s generosity before its people’s. Beneath the same steppes that turn green after rain lies about 7% of the world’s phosphate. A land of wide calm, giving without pause above ground and below.',
    numbers: [
      { v: '~7%', ar: 'من احتياطي الفوسفات العالمي', en: 'Of the world’s phosphate reserves', src: 'MAADEN' },
      { v: '1,200+', ar: 'عام من تاريخ درب زبيدة', en: 'Years of Darb Zubaydah', src: 'HERITAGE COMMISSION' },
    ],
  },
  bahah: {
    shortAr: 'الباحة', storyCity: 'الباحة', cities: ['الباحة'],
    places: [
      { ar: 'قرية ذي عين الأثرية', en: 'Dhee Ayn village' },
      { ar: 'غابة رغدان', en: 'Raghadan Forest' },
      { ar: 'جبل شدا الأعلى', en: 'Shada Al-A’la' },
    ],
    storyAr: 'بنى أهل ذي عين قريتهم من الحجر فوق تلة من المرمر الأبيض تلمع تحت الشمس كأنها مضيئة من الداخل. وحولها أكثر من أربعين غابة وعسل سدرٍ يُجنى من رؤوس الجبال — الباحة تختصرها كلمة واحدة: خضراء.',
    storyEn: 'The people of Dhee Ayn built their village in stone atop a hill of white marble that glows under the sun as if lit from within. Around it: forty-plus forests and sidr honey gathered from mountaintops. Al Bahah is summed up in a single word: green.',
    numbers: [
      { v: '40+', ar: 'غابة طبيعية في المنطقة', en: 'Natural forests across the region', src: 'MEWA' },
      { v: '~400', ar: 'عام عمر قرية ذي عين', en: 'Years of Dhee Ayn village', src: 'HERITAGE COMMISSION' },
    ],
  },
}

regions.forEach((r) => Object.assign(r, regionDetails[r.id]))

export const moments = [
  { y: '1727', cat: 'foundation', ar: 'تأسيس الدولة السعودية الأولى', en: 'The First Saudi State', dAr: 'من الدرعية تبدأ الحكاية: دولةٌ تتشكل في قلب نجد.', dEn: 'The story begins in Diriyah: a state taking shape in the heart of Najd.', src: 'DARAH', img: 'AT-TURAIF MUD WALLS' },
  { y: '1824', cat: 'foundation', ar: 'الدولة السعودية الثانية', en: 'The Second Saudi State', dAr: 'الرياض عاصمةً جديدة بعد سنوات الانقطاع.', dEn: 'Riyadh becomes the new capital after years of interruption.', src: 'DARAH', img: 'OLD RIYADH GATE' },
  { y: '1902', cat: 'foundation', ar: 'استرداد الرياض', en: 'The Recapture of Riyadh', dAr: 'ليلةٌ واحدة أعادت رسم مسار الجزيرة العربية.', dEn: 'A single night that redrew the course of the Arabian Peninsula.', src: 'DARAH', img: 'MASMAK FORTRESS' },
  { y: '1932', cat: 'foundation', ar: 'توحيد المملكة العربية السعودية', en: 'Unification of the Kingdom', dAr: '٢٣ سبتمبر: إعلان اسمٍ واحد لأرضٍ واحدة.', dEn: '23 September: one name declared for one land.', src: 'DARAH', img: 'UNIFICATION DECREE DOCUMENT' },
  { y: '1938', cat: 'economy', ar: 'اكتشاف النفط في الدمام', en: 'Oil Discovered at Dammam', dAr: 'بئر رقم ٧ تتدفق، ويبدأ فصلٌ جديد في الاقتصاد.', dEn: 'Well No. 7 flows, opening a new economic chapter.', src: 'ARAMCO', img: 'DAMMAM WELL NO. 7' },
  { y: '1953', cat: 'society', ar: 'إنشاء مجلس الوزراء', en: 'Council of Ministers Established', dAr: 'ركيزة مؤسسية في بناء حكومة الدولة الحديثة.', dEn: 'An institutional cornerstone of the modern state’s government.', src: 'SPA', img: 'ARCHIVAL GOVERNMENT PORTRAIT' },
  { y: '1957', cat: 'society', ar: 'تأسيس جامعة الملك سعود', en: 'King Saud University Founded', dAr: 'أول جامعة في المملكة تفتح أبوابها.', dEn: 'The Kingdom’s first university opens its doors.', src: 'KSU', img: 'CAMPUS ARCHIVE PHOTO' },
  { y: '1975', cat: 'economy', ar: 'انطلاق الجبيل وينبع', en: 'Jubail & Yanbu Launched', dAr: 'مدينتان صناعيتان تنهضان على ساحلي المملكة.', dEn: 'Two industrial cities rising on the Kingdom’s two coasts.', src: 'RCJY', img: 'INDUSTRIAL COASTLINE' },
  { y: '1985', cat: 'technology', ar: 'أول رائد فضاء عربي', en: 'First Arab Astronaut', dAr: 'سلطان بن سلمان على متن ديسكفري.', dEn: 'Sultan bin Salman aboard Discovery.', src: 'NASA', img: 'SHUTTLE MISSION PATCH' },
  { y: '2000', cat: 'heritage', ar: 'الهيئة العليا للسياحة', en: 'Supreme Commission for Tourism', dAr: 'بداية العمل المؤسسي على السياحة وحماية المواقع.', dEn: 'The start of institutional work on tourism and heritage sites.', src: 'MOC', img: 'EXCAVATION SITE' },
  { y: '2008', cat: 'heritage', ar: 'الحِجر أول موقع تراث عالمي', en: 'Hegra — First UNESCO Site', dAr: '١١١ مقبرة منحوتة تدخل قائمة التراث العالمي.', dEn: '111 rock-cut tombs enter the World Heritage List.', src: 'UNESCO', img: 'HEGRA TOMB FACADE' },
  { y: '2010', cat: 'heritage', ar: 'حي الطريف بالدرعية', en: 'At-Turaif District', dAr: 'مهد الدولة السعودية الأولى يُدرج عالمياً.', dEn: 'The birthplace of the First Saudi State is inscribed.', src: 'UNESCO', img: 'AT-TURAIF AT NIGHT' },
  { y: '2014', cat: 'heritage', ar: 'جدة التاريخية', en: 'Historic Jeddah', dAr: 'الروشان والمرجان: عمارة البحر الأحمر تُصان.', dEn: 'Roshan and coral stone: Red Sea architecture preserved.', src: 'UNESCO', img: 'ROSHAN BALCONY DETAIL' },
  { y: '2015', cat: 'heritage', ar: 'فن الصخور في حائل', en: 'Rock Art of Hail', dAr: 'نقوشٌ عمرها عشرة آلاف عام على جبل أم سنمان.', dEn: 'Ten-thousand-year-old engravings at Jabal Umm Sinman.', src: 'UNESCO', img: 'PETROGLYPH PANEL' },
  { y: '2016', cat: 'foundation', ar: 'إطلاق رؤية ٢٠٣٠', en: 'Vision 2030 Launched', dAr: 'خطةٌ وطنية تعيد تعريف الاقتصاد والمجتمع.', dEn: 'A national plan redefining economy and society.', src: 'VISION 2030', img: 'VISION LAUNCH STAGE' },
  { y: '2017', cat: 'culture', ar: 'القطّ العسيري', en: 'Al-Qatt Al-Asiri', dAr: 'فنّ نساء عسير يدخل التراث غير المادي.', dEn: 'The wall art of Asir’s women joins intangible heritage.', src: 'UNESCO', img: 'PAINTED INTERIOR WALL' },
  { y: '2018', cat: 'heritage', ar: 'واحة الأحساء', en: 'Al-Ahsa Oasis', dAr: 'أكبر واحة نخيل في العالم على قائمة اليونسكو.', dEn: 'The world’s largest palm oasis joins the UNESCO list.', src: 'UNESCO', img: 'PALM CANOPY FROM ABOVE' },
  { y: '2019', cat: 'tourism', ar: 'التأشيرة السياحية', en: 'Tourist Visa Introduced', dAr: 'المملكة تفتح أبوابها لزوار العالم لأول مرة.', dEn: 'The Kingdom opens to leisure visitors for the first time.', src: 'MT', img: 'AIRPORT ARRIVALS HALL' },
  { y: '2019', cat: 'culture', ar: 'انطلاق موسم الرياض', en: 'Riyadh Season Launches', dAr: 'من أكبر المواسم الترفيهية والثقافية في المنطقة يفتح أبوابه.', dEn: 'One of the region’s largest cultural and entertainment seasons opens.', src: 'GEA', img: 'BOULEVARD AT NIGHT' },
  { y: '2022', cat: 'sport', ar: 'فوز تاريخي في كأس العالم', en: 'A Historic World Cup Win', dAr: 'الأخضر يكتب ليلةً لا تُنسى.', dEn: 'The Green Falcons write an unforgettable night.', src: 'SAFF', img: 'STADIUM CROWD CELEBRATION' },
  { y: '2023', cat: 'tourism', ar: 'تجاوز ١٠٠ مليون زيارة', en: '100M+ Visits', dAr: 'المملكة تحقق مستهدف الزيارات قبل موعده بسبع سنوات.', dEn: 'The Kingdom hits its visitor target seven years early.', src: 'MT', img: 'TRAVELLERS AT ALULA' },
  { y: '2024', cat: 'heritage', ar: 'مشهد الفاو الأثري', en: 'Al-Faw Cultural Landscape', dAr: 'الموقع السعودي الثامن على قائمة التراث العالمي.', dEn: 'The Kingdom’s eighth World Heritage property.', src: 'UNESCO', img: 'AL-FAW DESERT PLATEAU' },
  { y: '2024', cat: 'technology', ar: 'انطلاق مترو الرياض', en: 'Riyadh Metro Opens', dAr: '٦ مسارات و٨٥ محطة تغيّر إيقاع العاصمة.', dEn: 'Six lines and 85 stations change the capital’s rhythm.', src: 'RCRC', img: 'METRO STATION INTERIOR' },
  { y: '2025', cat: 'economy', ar: 'الرياض إير تحلّق', en: 'Riyadh Air Takes Off', dAr: 'ناقل وطني جديد يستهدف أكثر من مئة وجهة بحلول ٢٠٣٠.', dEn: 'A new national carrier aiming for 100+ destinations by 2030.', src: 'RIYADH AIR', img: 'AIRCRAFT LIVERY DETAIL' },
  { y: '2026', cat: 'sport', ar: 'التأهل إلى كأس العالم ٢٠٢٦', en: 'Qualification for World Cup 2026', dAr: 'الأخضر يواصل الحضور على أكبر مسرح رياضي.', dEn: 'The Green Falcons return to the sport’s biggest stage.', src: 'SAFF', img: 'TEAM LINE-UP' },
  { y: '2026', cat: 'society', ar: 'اليوم الوطني السعودي ٩٦', en: '96th Saudi National Day', dAr: 'ستة وتسعون عاماً، وحكايةٌ ما زالت تُروى.', dEn: 'Ninety-six years, and a story still being told.', src: 'SPA', img: 'FLAG AGAINST EVENING SKY' },
]

// stable ids for image slots (year alone collides for 2019/2024/2026)
moments.forEach((m) => { m.id = m.y + (['2019', '2024', '2026'].includes(m.y) ? '-' + m.cat : '') })

export const categories = [
  { key: 'all', ar: 'الكل', en: 'ALL' }, { key: 'foundation', ar: 'التأسيس', en: 'FOUNDATION' },
  { key: 'culture', ar: 'الثقافة', en: 'CULTURE' }, { key: 'heritage', ar: 'التراث', en: 'HERITAGE' },
  { key: 'society', ar: 'المجتمع', en: 'SOCIETY' }, { key: 'economy', ar: 'الاقتصاد', en: 'ECONOMY' },
  { key: 'tourism', ar: 'السياحة', en: 'TOURISM' }, { key: 'technology', ar: 'التقنية', en: 'TECHNOLOGY' },
  { key: 'sport', ar: 'الرياضة', en: 'SPORT' },
]

export const stats = [
  { id: 'hajj', display: '1,707,301', ar: 'حاج في موسم ١٤٤٧', en: 'Hajj pilgrims in 2026', source: 'GASTAT · 2026' },
  { id: 'pop', display: '35.3M', ar: 'إجمالي السكان تقديراً', en: 'Estimated population', source: 'GASTAT · 2024' },
  { id: 'tourism', display: '115.9M', ar: 'رحلة سياحية', en: 'Tourist trips', source: 'MINISTRY OF TOURISM · 2024' },
  { id: 'regions', display: '13', ar: 'منطقة إدارية', en: 'Administrative regions', source: 'MOI · 2024' },
  { id: 'unesco', display: '8', ar: 'مواقع تراث عالمي', en: 'UNESCO World Heritage properties', source: 'UNESCO · 2024' },
]

export const milestones = [
  { tag: 'VISION 2030', ar: 'الرؤية تدخل مرحلة التسليم النهائية', en: 'Vision 2030 enters its final delivery phase' },
  { tag: 'AVIATION', ar: 'الرياض إير توسّع شبكتها الدولية', en: 'Riyadh Air expands its international network' },
  { tag: 'MOBILITY', ar: 'مترو الرياض: ٨٥ محطة في الخدمة', en: 'Riyadh Metro: 85 stations in service' },
  { tag: 'SPORT', ar: 'التأهل إلى كأس العالم ٢٠٢٦', en: 'Qualification for the FIFA World Cup 2026' },
  { tag: 'DIGITAL', ar: 'أكثر من ٦٠٠٠ خدمة حكومية رقمية', en: '6,000+ digital government services' },
  { tag: 'CULTURE', ar: 'ثمانية مواقع سعودية في قائمة اليونسكو', en: 'Eight Saudi properties on the UNESCO list' },
]

export const heritage = [
  { id: 'unesco', target: 8, suffix: '', ar: 'مواقع تراث عالمي', en: 'UNESCO World Heritage properties', place: 'KINGDOM-WIDE', source: 'UNESCO 2024', bg: '#F7F3EA', ink: '#0B3A28' },
  { id: 'palms', target: 2500000, suffix: '+', ar: 'نخلة', en: 'Date palms in the oasis of Al-Ahsa', place: 'AL-AHSA · الأحساء', source: 'UNESCO 2018', bg: '#0B3A28', ink: '#F7F3EA' },
  { id: 'faw', target: 12000, suffix: '~', ar: 'أثرٌ في الفاو', en: 'Archaeological remains at Al-Faw', place: 'AL-FAW · الفاو', source: 'HERITAGE COMMISSION', bg: '#F7F3EA', ink: '#0B3A28' },
]

export const cities = ['الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'العلا', 'أبها', 'الدمام', 'الخبر', 'الأحساء', 'تبوك', 'بريدة', 'حائل', 'جازان', 'سكاكا', 'نجران', 'عرعر', 'الباحة']

export const traitNames = ['الشجاعة', 'الرؤية', 'الأصالة', 'الهمة', 'الجود', 'الكرم']

export const traitHeadlines = {
  'الشجاعة': 'عزّي بشجاعتها', 'الرؤية': 'عزّي برؤيتها', 'الأصالة': 'عزّي بأصالتها',
  'الهمة': 'عزّي بهمتها', 'الجود': 'عزّي بجودها', 'الكرم': 'عزّي بكرمها',
}

export const pulseCities = [
  { ar: 'الرياض', lat: 24.71, lng: 46.68 }, { ar: 'جدة', lat: 21.49, lng: 39.19 },
  { ar: 'أبها', lat: 18.22, lng: 42.5 }, { ar: 'الخبر', lat: 26.28, lng: 50.21 },
  { ar: 'المدينة', lat: 24.47, lng: 39.61 }, { ar: 'تبوك', lat: 28.38, lng: 36.57 },
]

export const askMock = {
  alula: { text: 'العلا واحةٌ في شمال غرب المملكة تضم الحِجر، أول موقع سعودي يُدرج في قائمة التراث العالمي عام ٢٠٠٨، ويحتوي على ١١١ مقبرة منحوتة في الصخر الرملي، إضافةً إلى بلدة العلا القديمة وواحةٍ تضم ملايين النخيل.', chips: ['UNESCO 2008', 'ROYAL COMMISSION FOR ALULA'] },
  1932: { text: 'في ٢٣ سبتمبر ١٩٣٢ صدر المرسوم بتوحيد أجزاء المملكة تحت اسم «المملكة العربية السعودية». هذا التاريخ هو اليوم الوطني السعودي، ويوافق عام ٢٠٢٦ العام السادس والتسعين.', chips: ['DARAH', 'SPA'] },
  unesco: { text: 'للمملكة ثمانية مواقع على قائمة التراث العالمي: الحِجر، حي الطريف بالدرعية، جدة التاريخية، فن الصخور في حائل، واحة الأحساء، منطقة حِمى الثقافية، محمية عروق بني معارض، ومشهد الفاو الأثري.', chips: ['UNESCO 2024', 'HERITAGE COMMISSION'] },
  riyadh: { text: 'الرياض عاصمة المملكة ويقطنها نحو ٨٫٥٩ مليون نسمة. تشهد المدينة اليوم افتتاح المترو بستة مسارات، ومشروع الدرعية الذي يعيد إحياء مهد الدولة السعودية الأولى.', chips: ['GASTAT 2024', 'RCRC'] },
  asir: { text: 'عسير منطقة جبلية جنوب غرب المملكة، تشتهر بفن القطّ العسيري المدرج في قائمة اليونسكو للتراث غير المادي عام ٢٠١٧، وبقرية رجال ألمع الحجرية وقمم السودة من أعلى القمم في المملكة.', chips: ['UNESCO 2017', 'MOC'] },
}

export const askSuggestions = ['Tell me about AlUla', 'What happened in 1932?', 'Saudi UNESCO sites', 'Tell me about Riyadh', 'What makes Asir unique?']

export function answerFor(q) {
  const k = (q || '').toLowerCase()
  if (k.includes('alula') || k.includes('العلا')) return askMock.alula
  if (k.includes('1932') || k.includes('١٩٣٢')) return askMock[1932]
  if (k.includes('unesco') || k.includes('تراث')) return askMock.unesco
  if (k.includes('riyadh') || k.includes('الرياض')) return askMock.riyadh
  if (k.includes('asir') || k.includes('عسير')) return askMock.asir
  return { text: 'إجاباتنا هنا من أرشيف مختار عن أماكن ولحظات سعودية موثّقة — جرّب أحد الاقتراحات.', chips: [] }
}

/* ── API layer (Express server → Neon Postgres) ───────────────────── */

export const cityEnMap = {
  'الرياض': 'Riyadh', 'جدة': 'Jeddah', 'مكة المكرمة': 'Makkah', 'المدينة المنورة': 'Madinah',
  'العلا': 'AlUla', 'أبها': 'Abha', 'الدمام': 'Dammam', 'الخبر': 'Khobar', 'تبوك': 'Tabuk',
  'بريدة': 'Buraidah', 'حائل': 'Hail', 'جازان': 'Jazan', 'الأحساء': 'Al-Ahsa', 'المدينة': 'Madinah',
  'سكاكا': 'Sakaka', 'نجران': 'Najran', 'عرعر': 'Arar', 'الباحة': 'Al Bahah',
}

const AR_DIGITS = (n) => String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d])

export function timeAgoAr(dateStr) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(dateStr).getTime()) / 60000))
  if (mins < 1) return 'الآن'
  if (mins === 1) return 'قبل دقيقة'
  if (mins === 2) return 'قبل دقيقتين'
  if (mins < 11) return `قبل ${AR_DIGITS(mins)} دقائق`
  if (mins < 60) return `قبل ${AR_DIGITS(mins)} دقيقة`
  const hours = Math.round(mins / 60)
  if (hours === 1) return 'قبل ساعة'
  if (hours === 2) return 'قبل ساعتين'
  if (hours < 11) return `قبل ${AR_DIGITS(hours)} ساعات`
  if (hours < 24) return `قبل ${AR_DIGITS(hours)} ساعة`
  const days = Math.round(hours / 24)
  if (days === 1) return 'قبل يوم'
  if (days === 2) return 'قبل يومين'
  return `قبل ${AR_DIGITS(days)} أيام`
}

export async function fetchStories() {
  const res = await fetch('/api/stories')
  if (!res.ok) throw new Error('stories fetch failed')
  const { stories: rows } = await res.json()
  return rows.map((r) => ({
    name: r.name || 'مجهول',
    cityAr: r.city,
    cityEn: cityEnMap[r.city] || r.city,
    traitAr: r.trait,
    text: r.text,
    time: timeAgoAr(r.created_at),
  }))
}

export async function fetchPulse() {
  const res = await fetch('/api/pulse')
  if (!res.ok) throw new Error('pulse fetch failed')
  return res.json()
}

export async function submitStory(payload) {
  const res = await fetch('/api/stories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'submit failed')
  }
  return res.json()
}
