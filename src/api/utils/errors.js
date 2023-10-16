const errorMessages = {
  queryCannotBeEmpty: `Content cannot be extracted without defined criteria. You can establish criteria by using query parameters, or simply specify the 'targetURL' parameter to scrape all available content. For further details on this matter, kindly consult our documentation.🔍`,
  queryHasUnsupportCriteria:
    "One or more query parameters are not compatible. We recommend referring to our documentation and making use of the supported query parameters provided.🔍",
  unsupportedTargetURL:
    "The scraping service currently does not have compatibility with the specified target URL. We kindly recommend consulting our documentation and verifying the list of supported target URLs.🔍",
  navigationError:
    "Navigation to the specified URL is not possible. Please review the URL for any possible misspellings. If the server requires authentication, please be aware that this feature is not currently supported by our service.",
};

export default errorMessages;
