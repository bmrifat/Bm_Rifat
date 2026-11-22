export interface BookItem {
  id: string;
  title: string;
  author: string;
  year?: string;
  category: {
    en: string;
    bn: string;
  };
  takeaway: {
    en: string;
    bn: string;
  };
  quote?: {
    en: string;
    bn: string;
  };
}

export const books: BookItem[] = [
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    year: "2014",
    category: {
      en: "Technology & Monopoly Moats",
      bn: "প্রযুক্তি ও মৌলিক উদ্ভাবন",
    },
    takeaway: {
      en: "True progress happens when you build something entirely new (0 to 1) and escape cutthroat competition through proprietary technical moats.",
      bn: "প্রকৃত অগ্রগতি তখনই ঘটে যখন গতানুগতিক অনুকরণ এড়িয়ে সম্পূর্ণ নতুন কিছু তৈরি করা যায় এবং টেকসই প্রযুক্তিগত শ্রেষ্ঠত্ব অর্জন সম্ভব হয়।",
    },
    quote: {
      en: "The best entrepreneurs know this: every great business is built around a secret that's hidden from the outside.",
      bn: "সেরা উদ্যোক্তারা জানেন: প্রতিটি যুগান্তকারী ব্যবসা গড়ে ওঠে এমন এক গোপন সত্যের ওপর যা বাইরের সবার কাছে লুকানো থাকে।",
    },
  },
  {
    id: "high-output-management",
    title: "High Output Management",
    author: "Andrew S. Grove",
    year: "1983",
    category: {
      en: "Operational Leverage & Execution",
      bn: "লিভারেজ ও অপারেশনাল এক্সিকিউশন",
    },
    takeaway: {
      en: "Managing teams is an engineering science: maximize leverage, focus on bottleneck throughput, and optimize system output over vanity hours.",
      bn: "দল ও সিস্টেম পরিচালনা একটি নিখুঁত প্রকৌশল: ব্যক্তিগত সময়ের চেয়ে পুরো প্রতিষ্ঠানের উৎপাদনশীলতা ও বটলনেক অপ্টিমাইজেশনকে প্রাধান্য দেওয়া।",
    },
    quote: {
      en: "A manager's output = the output of his organization + the output of the neighboring organizations under his influence.",
      bn: "একজন নেতার আসল কাজ হলো তার পুরো দলের উৎপাদনশীলতাকে বহুগুণ বাড়িয়ে দেওয়া।",
    },
  },
  {
    id: "thinking-in-systems",
    title: "Thinking in Systems: A Primer",
    author: "Donella H. Meadows",
    year: "2008",
    category: {
      en: "System Architecture & Resilience",
      bn: "সিস্টেম থিংকিং ও সহনশীলতা",
    },
    takeaway: {
      en: "Viewing complex systems through stocks, feedback loops, and delays reveals why surface-level quick hacks fail and architectural leverage wins.",
      bn: "যেকোনো জটিল কাঠামোকে ফিডব্যাক লুপ ও দীর্ঘমেয়াদী প্রবাহের চোখে দেখলে বোঝা যায় কেন সাময়িক হ্যাক ব্যর্থ হয় এবং দীর্ঘমেয়াদী আর্কিটেকচার বিজয়ী হয়।",
    },
    quote: {
      en: "You think that because you understand 'one' that you must therefore understand 'two' because one and one make two. But you must also understand 'and'.",
      bn: "আলাদা উপাদান নয়, উপাদানগুলোর পারস্পরিক সংযোগ ও আন্তঃসম্পর্কই হলো পুরো সিস্টেমের আসল শক্তি।",
    },
  },
  {
    id: "gitanjali",
    title: "গীতাঞ্জলি (Gitanjali) & সঞ্চয়িতা",
    author: "রবীন্দ্রনাথ ঠাকুর (Rabindranath Tagore)",
    year: "Classic",
    category: {
      en: "Bengali Classical Literature",
      bn: "ধ্রুপদী বাংলা সাহিত্য ও দর্শন",
    },
    takeaway: {
      en: "Timeless lyrical depth, spiritual serenity, and the sovereign beauty of the Bengali mother tongue.",
      bn: "বাংলা ভাষার অনুপম মাধুর্য, গভীর আধ্যাত্মিক মনন এবং শান্ত প্রশান্তির চিরায়ত আশ্রয়।",
    },
    quote: {
      en: "Where the mind is without fear and the head is held high; where knowledge is free.",
      bn: "চিত্ত যেথা ভয়শূন্য, উচ্চ যেথা শির, জ্ঞান যেথা মুক্ত, যেথা গৃহের প্রাচীর...",
    },
  },
];
