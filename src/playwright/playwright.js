import errorMessages from "../api/utils/errors.js";
import helper from "../api/utils/helper.js";
import {
  selectSubTitles,
  selectAllBlogPostsWrapper,
  selectBlogPostDescription,
} from "./selectors.js";
import { chromium } from "playwright";

const scrapeTarget = async (scrapCriterias) => {
  const arrayOfTitlesAndDescriptions = [];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const { includeTitles, includeDescriptions, targetURL } = scrapCriterias;
  try {
    let title;
    let short_description;
    const scrapeAllContent = helper.queryHasOnlyTargetUrl(scrapCriterias);
    await page.goto(targetURL).catch(() => {
      return errorMessages.navigationError;
    });
    const blogPostsWrapper = await page.$(selectAllBlogPostsWrapper);
    const blogPosts = await blogPostsWrapper.$$("> *");

    for (let i = 1; i <= blogPosts.length; i++) {
      if (includeTitles || scrapeAllContent) {
        const blogPostTitleElement = await page.$(selectSubTitles(i));
        title = await blogPostTitleElement.textContent();
      }
      if (includeDescriptions || scrapeAllContent) {
        const blogPostDescriptionElement = await page.$(
          selectBlogPostDescription(i)
        );
        short_description = await blogPostDescriptionElement.textContent();
      }

      arrayOfTitlesAndDescriptions.push({
        title,
        short_description,
      });
    }
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  }
  return arrayOfTitlesAndDescriptions;
};

export default scrapeTarget;
