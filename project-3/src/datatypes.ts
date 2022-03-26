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
}

type QuoteResults = {
  results: Array<Quote>;
};

export { Author, Quote, QuoteResults };
