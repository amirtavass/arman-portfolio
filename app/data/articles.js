// app/data/articles.js
export const swimmingTypes = {
  freestyle: {
    name: "کرال سینه",
    englishName: "Freestyle",
    description: "سریع‌ترین و محبوب‌ترین شیوه شنا",
    englishDescription: "The fastest and most popular swimming style",
    gif: "/images/articles/crawl-technique.gif",
  },
  backstroke: {
    name: "کرال پشت",
    englishName: "Backstroke",
    description: "شنای روی پشت با حرکات ریتمیک",
    englishDescription: "Swimming on your back with rhythmic movements",
    gif: "/images/articles/backstroke_Swim.gif",
  },
  butterfly: {
    name: "پروانه",
    englishName: "Butterfly",
    description: "پیچیده‌ترین و قدرتمندترین تکنیک",
    englishDescription: "The most complex and powerful technique",
    gif: "/images/articles/butterfly_Swim.gif",
  },
  breaststroke: {
    name: "قورباغه",
    englishName: "Breaststroke",
    description: "آرام‌ترین و مناسب‌ترین برای مبتدیان",
    englishDescription: "The calmest and most suitable for beginners",
    gif: "/images/articles/breaststroke_SWIM.gif",
  },
};

export const articlesContent = {
  freestyle: {
    1: {
      id: 1,
      title: "همه‌چیز درباره‌ی شنای کرال سینه",
      englishTitle: "Everything About Freestyle Swimming",
      excerpt:
        "یادگیری اصول و تکنیک‌های درست برای شنای کرال سینه و بهبود عملکرد در آب",
      englishExcerpt:
        "Learn the correct principles and techniques for freestyle swimming and improve performance in water",
      image: "/images/articles/crawl-technique.gif",
      readTime: "۵ دقیقه",
      englishReadTime: "5 minutes",
      difficulty: "مبتدی تا متوسط",
      englishDifficulty: "Beginner to Intermediate",
      content: `
        <p>کرال سینه از انواع پرطرفدار شنا است که حرکاتی کاملا مشخص دارد. در این نوع شنا شانه‌ها با آب در یک خط قرار می‌گیرند و حرکات دست‌ و پا باهم انجام می‌شود. دست‌ها طی فرآیندی از سینه دور می‌شود و به دور بدن می‌چرخد و بعد دوباره به مکان اولیه برمی‌گردد.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">تکنیک صحیح بدن</h2>
        <p>قرارگیری صحیح بدن در آب اولین و مهم‌ترین قدم در یادگیری کرال سینه است. بدن باید در وضعیت افقی و صاف قرار گیرد تا مقاومت در برابر آب به حداقل برسد.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">حرکت دست‌ها</h2>
        <p>تعویض مرتب حرکت دست‌ها در شنای کرال سینه موجب پیشروی در آب می‌شود. هنگامی که یک دست حرکت کشش را در داخل آب انجام می‌دهد، در همان زمان دست دیگر در خارج از آب آماده‌ی ورود به آن می‌شود.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">ضربات پا</h2>
        <p>در شنای کرال سینه معمولا عمل شلاقی و پی‌درپی پاها منجر به تثبیت وضعیت خطی بدن می‌شود و تعادل لازم را برای شناگر فراهم و شنای کرال را موزون می‌کند.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">تنفس</h2>
        <p>یکی از قسمت‌های مهم شنای کرال سینه، نفس‌گیری در حین آن است و این مرحله همان تخلیه‌ی هوای ذخیره‌شده در شش‌ها است.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">نکات مهم</h2>
        <ul>
          <li>همیشه سر را در راستای بدن نگه دارید</li>
          <li>از حرکات غیرضروری اجتناب کنید</li>
          <li>تمرین منظم کلید موفقیت است</li>
          <li>ابتدا روی تکنیک تمرکز کنید، سپس روی سرعت</li>
        </ul>
      `,
      englishContent: `
        <p>Freestyle is one of the most popular swimming styles with very specific movements. In this type of swimming, the shoulders align with the water in a straight line and the movements of hands and feet are coordinated together.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Correct Body Position</h2>
        <p>Proper body positioning in water is the first and most important step in learning freestyle. The body should be in a horizontal and straight position to minimize resistance against water.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Arm Movements</h2>
        <p>Regular alternating arm movements in freestyle swimming enable forward motion in water. When one arm performs the pulling motion underwater, the other arm is outside the water, ready to enter.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Leg Kicks</h2>
        <p>In freestyle swimming, the whip-like and continuous action of the legs usually stabilizes the linear position of the body and provides the necessary balance for the swimmer, making freestyle swimming rhythmic.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Breathing</h2>
        <p>One of the important parts of freestyle swimming is breathing during it, and this stage is the release of air stored in the lungs.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Important Tips</h2>
        <ul>
          <li>Always keep your head aligned with your body</li>
          <li>Avoid unnecessary movements</li>
          <li>Regular practice is the key to success</li>
          <li>Focus on technique first, then on speed</li>
        </ul>
      `,
      tags: ["کرال سینه", "تکنیک", "مبتدی"],
      englishTags: ["Freestyle", "Technique", "Beginner"],
      author: "تیم محتوا",
      englishAuthor: "Content Team",
      publishDate: "1403/08/15",
      englishPublishDate: "2024/11/05",
    },
    5: {
      id: 5,
      title: "بهبود سرعت در کرال آزاد",
      englishTitle: "Improving Speed in Freestyle",
      excerpt: "تکنیک‌های پیشرفته برای افزایش سرعت و کاهش مقاومت در آب",
      englishExcerpt:
        "Advanced techniques for increasing speed and reducing water resistance",
      image: "/images/articles/freestyle-1.jpg",
      readTime: "۶ دقیقه",
      englishReadTime: "6 minutes",
      difficulty: "پیشرفته",
      englishDifficulty: "Advanced",
      content: `
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">استراتژی‌های افزایش سرعت</h2>
        <p>برای بهبود سرعت در کرال آزاد، ترکیب صحیح تکنیک و قدرت ضروری است. شناگران پیشرفته باید روی جزئیات دقیق حرکات تمرکز کنند.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">کاهش مقاومت آب</h2>
        <p>یکی از مهم‌ترین عوامل در افزایش سرعت، کاهش مقاومت در برابر آب است. این امر از طریق بهبود وضعیت بدن و تکنیک حرکات قابل دستیابی است.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">تمرینات تخصصی</h2>
        <p>تمرینات ویژه برای بهبود سرعت شامل تمرینات اسپرینت و فواصل کوتاه است که باید با دقت و برنامه‌ریزی مناسب انجام شوند.</p>
      `,
      englishContent: `
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Speed Improvement Strategies</h2>
        <p>To improve speed in freestyle, the right combination of technique and strength is essential. Advanced swimmers should focus on precise movement details.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Reducing Water Resistance</h2>
        <p>One of the most important factors in increasing speed is reducing resistance against water. This can be achieved through improving body position and movement technique.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Specialized Training</h2>
        <p>Special exercises for speed improvement include sprint training and short intervals that should be performed with precision and proper planning.</p>
      `,
      tags: ["کرال آزاد", "سرعت", "پیشرفته"],
      englishTags: ["Freestyle", "Speed", "Advanced"],
      author: "آرمان داریوشی",
      englishAuthor: "Arman Daryoushi",
      publishDate: "1403/08/10",
      englishPublishDate: "2024/10/31",
    },
  },

  breaststroke: {
    2: {
      id: 2,
      title: "شنای قورباغه برای مبتدیان",
      englishTitle: "Breaststroke Swimming for Beginners",
      excerpt: "راهنمای کامل برای یادگیری شنای قورباغه از صفر تا صد",
      englishExcerpt:
        "Complete guide for learning breaststroke swimming from zero to advanced",
      image: "/images/articles/breaststroke_SWIM.gif",
      readTime: "۷ دقیقه",
      englishReadTime: "7 minutes",
      difficulty: "مبتدی",
      englishDifficulty: "Beginner",
      content: `
        <h3 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b-3 border-slate-800">آشنایی با شنای قورباغه</h3>
        <p>شنای قورباغه یکی از قدیمی‌ترین سبک‌های شنا است که برای مبتدیان بسیار مناسب است. این سبک به دلیل ریتم آرام و حرکات طبیعی، آسان‌ترین روش برای شروع یادگیری شنا محسوب می‌شود.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">مراحل یادگیری</h2>
        <p>یادگیری قورباغه باید گام به گام و با صبر انجام شود. ابتدا باید حرکات پایه را بر روی خشکی تمرین کرد، سپس در آب تکرار نمود.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">تکنیک حرکت دست‌ها</h2>
        <p>در قورباغه، دست‌ها همزمان حرکت می‌کنند. حرکت از جلوی سینه شروع شده و به طرفین گسترده می‌شود، سپس دوباره به سمت جلو بازمی‌گردد.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">ضربات پا</h2>
        <p>ضربه پا در قورباغه متفاوت از سایر سبک‌ها است. پاها ابتدا جمع شده، سپس به طرفین باز می‌شوند و با حرکت دایره‌ای به حالت اولیه برمی‌گردند.</p>
      `,
      englishContent: `
        <h3 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b-3 border-slate-800">Introduction to Breaststroke Swimming</h3>
        <p>Breaststroke is one of the oldest swimming styles that is very suitable for beginners. Due to its calm rhythm and natural movements, this style is considered the easiest method to start learning swimming.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Learning Stages</h2>
        <p>Learning breaststroke should be done step by step and with patience. First, you should practice the basic movements on dry land, then repeat them in water.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Arm Movement Technique</h2>
        <p>In breaststroke, both arms move simultaneously. The movement starts from the front of the chest and extends to the sides, then returns forward again.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Leg Kicks</h2>
        <p>The leg kick in breaststroke is different from other styles. The legs first come together, then open to the sides and return to the initial position with a circular movement.</p>
      `,
      tags: ["قورباغه", "مبتدی", "آموزش"],
      englishTags: ["Breaststroke", "Beginner", "Training"],
      author: "آرمان داریوشی",
      englishAuthor: "Arman Daryoushi",
      publishDate: "1403/08/05",
      englishPublishDate: "2024/10/26",
    },
  },

  butterfly: {
    3: {
      id: 3,
      title: "شنای پروانه: تکنیک پیشرفته برای شناگران حرفه‌ای",
      englishTitle:
        "Butterfly Swimming: Advanced Technique for Professional Swimmers",
      excerpt: "آموزش کامل شنای پروانه از حرکات پایه تا تکنیک‌های پیشرفته",
      englishExcerpt:
        "Complete butterfly swimming training from basic movements to advanced techniques",
      image: "/images/articles/butterfly_Swim.gif",
      readTime: "۸ دقیقه",
      englishReadTime: "8 minutes",
      difficulty: "پیشرفته",
      englishDifficulty: "Advanced",
      content: `
        <p>شنای پروانه یکی از چالش‌برانگیزترین و زیباترین سبک‌های شنا است که نیاز به هماهنگی کامل، قدرت بالا و تکنیک دقیق دارد.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">اصول کلی شنای پروانه</h2>
        <p>در شنای پروانه، تمام حرکات بدن باید به صورت همزمان و هماهنگ انجام شود. این شامل حرکت موجی بدن، ضربات قدرتمند دست‌ها و ضربات دلفینی پاها است.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">تکنیک حرکت دست‌ها</h2>
        <p>دست‌ها همزمان وارد آب شده و با حرکت قدرتمند به عقب کشیده می‌شوند. خروج دست‌ها از آب نیز باید همزمان انجام شود.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">ضربات دلفینی</h2>
        <p>پاها همزمان و مانند دم دلفین حرکت می‌کنند. معمولاً در هر چرخه دست، دو ضربه پا انجام می‌شود.</p>
      `,
      englishContent: `
        <p>Butterfly swimming is one of the most challenging and beautiful swimming styles that requires complete coordination, high strength, and precise technique.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">General Principles of Butterfly Swimming</h2>
        <p>In butterfly swimming, all body movements must be performed simultaneously and in coordination. This includes the undulating body movement, powerful arm strokes, and dolphin kicks.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Arm Movement Technique</h2>
        <p>Both arms enter the water simultaneously and are pulled back with powerful movement. The exit of arms from water must also be done simultaneously.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Dolphin Kicks</h2>
        <p>Both legs move simultaneously like a dolphin's tail. Usually, two leg kicks are performed for each arm cycle.</p>
      `,
      tags: ["پروانه", "پیشرفته", "تکنیک"],
      englishTags: ["Butterfly", "Advanced", "Technique"],
      author: "آرمان داریوشی",
      englishAuthor: "Arman Daryoushi",
      publishDate: "1403/08/20",
      englishPublishDate: "2024/11/10",
    },
  },

  backstroke: {
    4: {
      id: 4,
      title: "آموزش شنای کرال پشت: تکنیک و نکات کاربردی",
      englishTitle:
        "Backstroke Swimming Tutorial: Technique and Practical Tips",
      excerpt: "راهنمای جامع برای یادگیری شنای کرال پشت با تمرکز بر تکنیک صحیح",
      englishExcerpt:
        "Comprehensive guide for learning backstroke swimming with focus on correct technique",
      image: "/images/articles/backstroke_Swim.gif",
      readTime: "۶ دقیقه",
      englishReadTime: "6 minutes",
      difficulty: "متوسط",
      englishDifficulty: "Intermediate",
      content: `
        <p>شنای کرال پشت یکی از سبک‌های منحصر به فرد شناست که در آن شناگر روی پشت قرار می‌گیرد و با حرکات متناوب دست‌ها و ضربات مداوم پا حرکت می‌کند.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">وضعیت صحیح بدن</h2>
        <p>بدن باید در وضعیت افقی روی پشت قرار گیرد. سر ثابت و چشمان رو به بالا باشند.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">تکنیک حرکت دست‌ها</h2>
        <p>دست‌ها به صورت متناوب حرکت می‌کنند. هر دست از کنار ران شروع شده، مستقیم به بالا می‌رود و سپس به شکل قوس وارد آب می‌شود.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">تنفس در کرال پشت</h2>
        <p>از آنجایی که صورت بالای آب است، تنفس آسان‌تر از سایر سبک‌ها است. با این حال، باید ریتم تنفس با حرکات هماهنگ باشد.</p>
      `,
      englishContent: `
        <p>Backstroke is a unique swimming style where the swimmer lies on their back and moves with alternating arm movements and continuous leg kicks.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Correct Body Position</h2>
        <p>The body should be in a horizontal position on the back. The head should be stable and eyes looking upward.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Arm Movement Technique</h2>
        <p>Arms move alternately. Each arm starts from beside the thigh, goes straight up, and then enters the water in an arc shape.</p>
        
        <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2">Breathing in Backstroke</h2>
        <p>Since the face is above water, breathing is easier than other styles. However, breathing rhythm should be coordinated with movements.</p>
      `,
      tags: ["کرال پشت", "متوسط", "تکنیک"],
      englishTags: ["Backstroke", "Intermediate", "Technique"],
      author: "آرمان داریوشی",
      englishAuthor: "Arman Daryoushi",
      publishDate: "1403/08/12",
      englishPublishDate: "2024/11/02",
    },
  },
};
