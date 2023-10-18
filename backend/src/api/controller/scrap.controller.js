import {
  queryCannotBeEmpty,
  queryHasUnsupportCriteria,
  isUnsupportedTargetURL,
  isNavigationError,
  unhandledException,
} from "../../../middlewares.js";
import * as PlaywrightService from "../services/playwright.service.js";
import ERROR_MESSAGES from "../utils/errors.js";
import helper from "../utils/helper.js";

export const scrapeTarget = async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    if (helper.queryIsEmpty(req.query)) {
      queryCannotBeEmpty(res);
    } else if (helper.queryHasUnsupportedCriteria(req.query)) {
      queryHasUnsupportCriteria(res);
    } else if (helper.isUnsupportedTargetURL(req.query.targetURL)) {
      isUnsupportedTargetURL(res);
    } else {
      const {
        includeTitles,
        includeDescriptions,
        targetURL,
        includesAnchor,
        includesPicture,
        includesSentimentAnalysis,
        includesWordsCounter,
      } = req.query;
      const scrapedContent = await PlaywrightService.scrapeTargetURL({
        includeTitles,
        includeDescriptions,
        targetURL,
        includesAnchor,
        includesPicture,
        includesSentimentAnalysis,
        includesWordsCounter,
      });
      if (scrapedContent) {
        res.json(scrapedContent);
      } else if (scrapedContent === ERROR_MESSAGES.navigationError) {
        isNavigationError(res);
        res.status(404).json({ error: ERROR_MESSAGES.navigationError });
      } else if (
        scrapedContent === ERROR_MESSAGES.unhandledExceptionErrorMessage
      ) {
        unhandledException(res);
      }
    }
  } catch (error) {}
};
