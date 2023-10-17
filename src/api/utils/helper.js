import { negativeWordsSet, positiveWordsSet } from "./constants.js";

const helper = {
  queryIsEmpty: (query) => {
    return Object.keys(query).length === 0;
  },
  queryHasUnsupportedCriteria: (query) => {
    const supportedCriteria = new Set([
      "includeTitles",
      "includeDescriptions",
      "targetURL",
      "includesPicture",
      "includesAnchor",
      "includesSentimentAnalysis",
      "includesWordsCounter"
    ]);
    for (let criteria of Object.keys(query)) {
      if (!supportedCriteria.has(criteria)) return true;
    }
    return false;
  },
  isUnsupportedTargetURL: (targetURL) => {
    const supportedTargetURLs = new Set([
      "https://wsa-test.vercel.app",
      "https://wsa-test.vercel.app/",
    ]);
    if (!supportedTargetURLs.has(targetURL)) return true;
    return false;
  },
  sanitizeTruthyQueryOptions: (queryOptions) => {
    return Object.fromEntries(
      Object.entries(queryOptions).filter(([key, value]) => value)
    );
  },
  queryHasOnlyTargetUrl: (query) => {
    for (let criteria of Object.keys(query)) {
      if (criteria !== "targetURL") return false;
    }
    return true;
  },
  analyzeSentiment: (input) => {
    let sentimentScore = 0;
    const sanitizedInput = input
      .slice(0, -1)
      .replace(new RegExp(",", "g"))
      .split(" ");
    for (const word of sanitizedInput) {
      if (negativeWordsSet.has(word)) {
        sentimentScore--;
      } else if (positiveWordsSet.has(word)) {
        sentimentScore++;
      }
    }
    return sentimentScore > 0
      ? "positive"
      : sentimentScore < 0
      ? "negative"
      : "neutral";
    // compose 2 categories(negativeWords,positiveWords).
    //Split each word in the sentence, and find which category contains this word.the sentence will have a 'sentiment score'.
    //The sentiment score is calculated this way: for each negative word -> score--; for each positive one -> score++; neutral ones will not affect the overall score.the initial score will be 0.
    //return is based on the value of the sentiment score;
    //ex : John is happy and that he just ate an apple. 0 0 1 0 0 0 0 1(will categorise eating as a positive :) ) 0 0 -> positive.
  },
  sanitizeText : (input) => {
    const inputWithoutPunctuation = input.replace(/[,:.]/g, '');
    const inputWithoutSeparators = inputWithoutPunctuation.replace(/([a-z])([A-Z])/g, '$1 $2');
    return inputWithoutSeparators;
  }
};

export default helper;
