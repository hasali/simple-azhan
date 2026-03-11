export interface DailyMessage {
	theme: string
    verseArab: string
    verseEng: string
    verseSurah: string
    verseAyah: string
    hadith: string
    hadithSrc: string
}
export const dailyVerses = [
	/* TRUST */

	{
		theme: 'Trust',
		verseArab: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
		verseEng: 'And whoever relies upon Allah – He is sufficient for him.',
		verseSurah: 'At-Talaq',
		verseAyah: '65:3',
		hadith: 'Tie your camel and trust in Allah.',
		hadithSrc: 'Tirmidhi 2517'
	},
	{
		theme: 'Trust',
		verseArab: 'وَعَلَى اللَّهِ فَتَوَكَّلُوا إِن كُنتُم مُّؤْمِنِينَ',
		verseEng: 'And rely upon Allah if you are believers.',
		verseSurah: "Al-Ma'idah",
		verseAyah: '5:23',
		hadith: 'If you relied upon Allah as He deserves, He would provide for you.',
		hadithSrc: 'Tirmidhi 2344'
	},
	{
		theme: 'Trust',
		verseArab: 'وَاللَّهُ يُحِبُّ الْمُتَوَكِّلِينَ',
		verseEng: 'Allah loves those who rely upon Him.',
		verseSurah: 'Aal-E-Imran',
		verseAyah: '3:159',
		hadith: 'Seek help from Allah and do not give up.',
		hadithSrc: 'Muslim 2664'
	},
	{
		theme: 'Trust',
		verseArab: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
		verseEng: 'Allah is sufficient for us, and He is the best disposer of affairs.',
		verseSurah: 'Aal-E-Imran',
		verseAyah: '3:173',
		hadith: 'Allah says: I am as My servant thinks of Me.',
		hadithSrc: 'Bukhari 7405'
	},
	{
		theme: 'Trust',
		verseArab: 'إِنَّ اللَّهَ مَعَنَا',
		verseEng: 'Indeed, Allah is with us.',
		verseSurah: 'At-Tawbah',
		verseAyah: '9:40',
		hadith: 'Allah says: I am with My servant when he remembers Me.',
		hadithSrc: 'Muslim 2675'
	},
	{
		theme: 'Trust',
		verseArab: 'وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ',
		verseEng: 'And upon Allah let the believers rely.',
		verseSurah: 'Ibrahim',
		verseAyah: '14:11',
		hadith: 'Be mindful of Allah and He will protect you.',
		hadithSrc: 'Tirmidhi 2516'
	},
	{
		theme: 'Trust',
		verseArab: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
		verseEng: 'Whoever fears Allah, He will make a way out for him.',
		verseSurah: 'At-Talaq',
		verseAyah: '65:2',
		hadith: 'Whoever leaves something for Allah, He will replace it with better.',
		hadithSrc: 'Musnad Ahmad'
	},
	{
		theme: 'Trust',
		verseArab: 'وَاللَّهُ خَيْرُ الرَّازِقِينَ',
		verseEng: 'Allah is the best of providers.',
		verseSurah: "Al-Jumu'ah",
		verseAyah: '62:11',
		hadith: 'The Holy Spirit inspired me that no soul will die until it receives its provision.',
		hadithSrc: 'Ibn Majah 2144'
	},

	/* PATIENCE */

	{
		theme: 'Patience',
		verseArab: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
		verseEng: 'Indeed, Allah is with the patient.',
		verseSurah: 'Al-Baqarah',
		verseAyah: '2:153',
		hadith: 'No one is given a gift better than patience.',
		hadithSrc: 'Bukhari 1469'
	},
	{
		theme: 'Patience',
		verseArab: 'وَاللَّهُ يُحِبُّ الصَّابِرِينَ',
		verseEng: 'Allah loves the patient.',
		verseSurah: 'Aal-E-Imran',
		verseAyah: '3:146',
		hadith: 'Patience is light.',
		hadithSrc: 'Muslim 223'
	},
	{
		theme: 'Patience',
		verseArab: 'فَاصْبِرْ إِنَّ وَعْدَ اللَّهِ حَقٌّ',
		verseEng: 'So be patient, indeed the promise of Allah is true.',
		verseSurah: 'Ar-Rum',
		verseAyah: '30:60',
		hadith: 'Patience is at the first strike of hardship.',
		hadithSrc: 'Bukhari 1302'
	},
	{
		theme: 'Patience',
		verseArab: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
		verseEng: 'Indeed, with hardship comes ease.',
		verseSurah: 'Ash-Sharh',
		verseAyah: '94:6',
		hadith: 'Relief comes with patience.',
		hadithSrc: 'Musnad Ahmad'
	},
	{
		theme: 'Patience',
		verseArab: 'وَاصْبِرُوا إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
		verseEng: 'Be patient; indeed Allah is with the patient.',
		verseSurah: 'Al-Anfal',
		verseAyah: '8:46',
		hadith: 'How wonderful is the affair of the believer; patience brings good.',
		hadithSrc: 'Muslim 2999'
	},
	{
		theme: 'Patience',
		verseArab: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم',
		verseEng: 'Indeed the patient will be given their reward without measure.',
		verseSurah: 'Az-Zumar',
		verseAyah: '39:10',
		hadith: 'Allah says: I reward patience with Paradise.',
		hadithSrc: 'Bukhari'
	},
	{
		theme: 'Patience',
		verseArab: 'وَاصْبِرْ وَمَا صَبْرُكَ إِلَّا بِاللَّهِ',
		verseEng: 'Be patient, and your patience is only through Allah.',
		verseSurah: 'An-Nahl',
		verseAyah: '16:127',
		hadith: 'The strong believer controls himself when angry.',
		hadithSrc: 'Bukhari 6114'
	},
	{
		theme: 'Patience',
		verseArab: 'وَاصْبِرُوا لَعَلَّكُمْ تُفْلِحُونَ',
		verseEng: 'Be patient so that you may succeed.',
		verseSurah: 'Aal-E-Imran',
		verseAyah: '3:200',
		hadith: 'Whoever remains patient, Allah will make him patient.',
		hadithSrc: 'Bukhari 1469'
	},

	/* CHARITY */

	{
		theme: 'Charity',
		verseArab: 'وَأَحْسِنُوا',
		verseEng: 'And do good.',
		verseSurah: 'Al-Baqarah',
		verseAyah: '2:195',
		hadith: 'The best people are those most beneficial to others.',
		hadithSrc: "Al-Mu'jam Al-Awsat"
	},
	{
		theme: 'Charity',
		verseArab: 'وَآتُوا الزَّكَاةَ',
		verseEng: 'Give charity.',
		verseSurah: 'Al-Baqarah',
		verseAyah: '2:43',
		hadith: 'Charity extinguishes sins.',
		hadithSrc: 'Tirmidhi 614'
	},
	{
		theme: 'Charity',
		verseArab: 'مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا',
		verseEng: 'Who is it that will loan Allah a goodly loan?',
		verseSurah: 'Al-Baqarah',
		verseAyah: '2:245',
		hadith: 'Charity does not decrease wealth.',
		hadithSrc: 'Muslim 2588'
	},
	{
		theme: 'Charity',
		verseArab: 'وَيُؤْثِرُونَ عَلَى أَنفُسِهِمْ',
		verseEng: 'They give preference to others over themselves.',
		verseSurah: 'Al-Hashr',
		verseAyah: '59:9',
		hadith: 'The believer loves for his brother what he loves for himself.',
		hadithSrc: 'Bukhari 13'
	},
	{
		theme: 'Charity',
		verseArab: 'إِن تُقْرِضُوا اللَّهَ قَرْضًا حَسَنًا',
		verseEng: 'If you lend Allah a good loan, He will multiply it.',
		verseSurah: 'At-Taghabun',
		verseAyah: '64:17',
		hadith: 'Every day angels pray for the one who gives charity.',
		hadithSrc: 'Bukhari 1442'
	},
	{
		theme: 'Charity',
		verseArab: 'وَفِي أَمْوَالِهِمْ حَقٌّ لِّلسَّائِلِ',
		verseEng: 'In their wealth is a share for the needy.',
		verseSurah: 'Adh-Dhariyat',
		verseAyah: '51:19',
		hadith: 'Protect yourselves from the Fire even with half a date in charity.',
		hadithSrc: 'Bukhari 1417'
	},
	{
		theme: 'Charity',
		verseArab: 'وَيُطْعِمُونَ الطَّعَامَ',
		verseEng: 'They give food out of love for Him.',
		verseSurah: 'Al-Insan',
		verseAyah: '76:8',
		hadith: 'He is not a believer whose stomach is full while his neighbor is hungry.',
		hadithSrc: 'Al-Adab Al-Mufrad'
	},
	{
		theme: 'Charity',
		verseArab: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',
		verseEng: 'Establish prayer and give charity.',
		verseSurah: 'Al-Baqarah',
		verseAyah: '2:110',
		hadith: 'The best charity is that given in Ramadan.',
		hadithSrc: 'Tirmidhi'
	},

	/* MERCY */

	{
		theme: 'Mercy',
		verseArab: 'إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ',
		verseEng: 'Indeed Allah is Forgiving and Merciful.',
		verseSurah: 'An-Nisa',
		verseAyah: '4:96',
		hadith: 'Allah is more merciful than a mother to her child.',
		hadithSrc: 'Bukhari 5999'
	},
	{
		theme: 'Mercy',
		verseArab: 'وَاعْفُوا وَلْيَصْفَحُوا',
		verseEng: 'Let them pardon and overlook.',
		verseSurah: 'An-Nur',
		verseAyah: '24:22',
		hadith: 'Show mercy and you will be shown mercy.',
		hadithSrc: 'Tirmidhi 1924'
	},
	{
		theme: 'Mercy',
		verseArab: 'إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ',
		verseEng: 'Indeed the mercy of Allah is near.',
		verseSurah: "Al-A'raf",
		verseAyah: '7:56',
		hadith: 'Allah has divided mercy into one hundred parts.',
		hadithSrc: 'Muslim 2752'
	},
	{
		theme: 'Mercy',
		verseArab: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ',
		verseEng: 'Do not despair of Allah’s mercy.',
		verseSurah: 'Yusuf',
		verseAyah: '12:87',
		hadith: 'Allah accepts the repentance of His servant.',
		hadithSrc: 'Muslim 2759'
	},
	{
		theme: 'Mercy',
		verseArab: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ',
		verseEng: 'Allah loves those who repent.',
		verseSurah: 'Al-Baqarah',
		verseAyah: '2:222',
		hadith: 'The best sinners are those who repent.',
		hadithSrc: 'Ibn Majah 4251'
	},
	{
		theme: 'Mercy',
		verseArab: 'رَّبُّكُمْ أَعْلَمُ بِمَا فِي نُفُوسِكُمْ',
		verseEng: 'Your Lord knows best what is within yourselves.',
		verseSurah: 'Al-Isra',
		verseAyah: '17:25',
		hadith: 'Allah does not look at your appearance but your hearts.',
		hadithSrc: 'Muslim 2564'
	},
	{
		theme: 'Mercy',
		verseArab: 'إِنَّ اللَّهَ لَطِيفٌ خَبِيرٌ',
		verseEng: 'Indeed Allah is Subtle and Aware.',
		verseSurah: 'Luqman',
		verseAyah: '31:16',
		hadith: 'Allah is gentle and loves gentleness.',
		hadithSrc: 'Muslim 2593'
	},
	{
		theme: 'Mercy',
		verseArab: 'وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ',
		verseEng: 'My mercy encompasses all things.',
		verseSurah: "Al-A'raf",
		verseAyah: '7:156',
		hadith: 'Allah wrote: My mercy prevails over My wrath.',
		hadithSrc: 'Bukhari 7404'
	}
];
