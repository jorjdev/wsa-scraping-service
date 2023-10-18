import scrapeTarget from "../playwright/playwright.js";
import helper from "../utils/helper.js";

export const scrapeTargetURL = async (scrapeByCriteria) => {
    try {
        const truthyQueryParams =
            helper.sanitizeTruthyQueryOptions(scrapeByCriteria);
        const scrapedData = await scrapeTarget(truthyQueryParams);
        return scrapedData;
    } catch (error) {
        throw new Error(error);
    }
};
