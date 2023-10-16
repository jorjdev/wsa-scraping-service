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
};

export default helper;
