type AuthorResponse = {
  results: Array<Author>;
};

// Define the type User to match the JSON structure from https://randomuser.me/api
// type SearchQuery = {
//   message: string;
//   data: {
//     results: {
//       model: {
//         raw: string;
//       };
//       category: {
//         raw: string;
//       };
//       brand: {
//         raw: string;
//       };
//       version: {
//         raw: string;
//       };
//     };
//   };
// };

type Author = {
  name: string;
  wikiUrl: string;
  quoteCount: number;
};

export { Author, AuthorResponse };
