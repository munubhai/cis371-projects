type Quote = {
  id: string;
  author: string;
  en: string;
}

type Author = {
  name: string;
  wikiUrl: string;
  quotes: Array<Quote>;
  quoteCount: number;
};

export { Author, Quote };
