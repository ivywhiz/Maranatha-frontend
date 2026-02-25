// src/components/resources/bible-data.ts

export type TestamentTab = "old" | "new"

export interface BibleBook {
  name: string
  chapters: number
}

export interface BibleVerse {
  verse: number
  text: string
}

export const OLD_TESTAMENT: BibleBook[] = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Esther", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },
]

export const NEW_TESTAMENT: BibleBook[] = [
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 },
]

export const BIBLE_VERSIONS: string[] = ["KJV", "NKJV", "NIV", "ESV", "NLT", "NASB", "AMP", "MSG"]

export const SAMPLE_VERSES: Record<string, BibleVerse[]> = {
  "John-3": [
    { verse: 1, text: "There was a man of the Pharisees named Nicodemus, a ruler of the Jews." },
    { verse: 2, text: "This man came to Jesus by night and said to Him, \"Rabbi, we know that You are a teacher come from God; for no one can do these signs that You do unless God is with him.\"" },
    { verse: 3, text: "Jesus answered and said to him, \"Most assuredly, I say to you, unless one is born again, he cannot see the kingdom of God.\"" },
    { verse: 4, text: "Nicodemus said to Him, \"How can a man be born when he is old? Can he enter a second time into his mother's womb and be born?\"" },
    { verse: 5, text: "Jesus answered, \"Most assuredly, I say to you, unless one is born of water and the Spirit, he cannot enter the kingdom of God.\"" },
    { verse: 6, text: "That which is born of the flesh is flesh, and that which is born of the Spirit is spirit." },
    { verse: 7, text: "Do not marvel that I said to you, 'You must be born again.'" },
    { verse: 16, text: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life." },
    { verse: 17, text: "For God did not send His Son into the world to condemn the world, but that the world through Him might be saved." },
  ],
  "Genesis-1": [
    { verse: 1, text: "In the beginning God created the heavens and the earth." },
    { verse: 2, text: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters." },
    { verse: 3, text: "Then God said, \"Let there be light\"; and there was light." },
    { verse: 4, text: "And God saw the light, that it was good; and God divided the light from the darkness." },
    { verse: 5, text: "God called the light Day, and the darkness He called Night. So the evening and the morning were the first day." },
  ],
  "Psalms-23": [
    { verse: 1, text: "The Lord is my shepherd; I shall not want." },
    { verse: 2, text: "He makes me to lie down in green pastures; He leads me beside the still waters." },
    { verse: 3, text: "He restores my soul; He leads me in the paths of righteousness for His name's sake." },
    { verse: 4, text: "Yea, though I walk through the valley of the shadow of death, I will fear no evil; for You are with me; Your rod and Your staff, they comfort me." },
    { verse: 5, text: "You prepare a table before me in the presence of my enemies; You anoint my head with oil; my cup runs over." },
    { verse: 6, text: "Surely goodness and mercy shall follow me all the days of my life; and I will dwell in the house of the Lord forever." },
  ],
}