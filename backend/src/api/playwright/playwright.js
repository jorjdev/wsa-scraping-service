import ERROR_MESSAGES from "../utils/errors.js";
import helper from "../utils/helper.js";
import SELECTORS from "./selectors.js";
import { chromium } from "playwright";

const scrapeTarget = async (scrapCriterias) => {
  const {
    includeTitles,
    includeDescriptions,
    targetURL,
    includesAnchor,
    includesPicture,
    includesSentimentAnalysis,
    includesWordsCounter,
  } = scrapCriterias;
  const arrayOfTitlesAndDescriptions = [];
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const sanitizedTargetURL = targetURL.endsWith("/")
    ? targetURL.slice(0, -1)
    : targetURL;

  try {
    const scrapeAllContent = helper.queryHasOnlyTargetUrl(scrapCriterias);
    await page.goto(targetURL).catch(() => {
      return ERROR_MESSAGES.navigationError;
    });
    const blogPostsWrapper = await page.$(SELECTORS.selectAllBlogPostsWrapper);
    var blogPosts = await blogPostsWrapper.$$(" > *");
    const promises = [];
    for (let i = 1; i <= blogPosts.length; i++) {
      promises.push(
        (async () => {
          const data = {};

          if (includesAnchor || includesWordsCounter || scrapeAllContent) {
            const blogPostLink = await page.$(SELECTORS.selectBlogPostLink(i));
            const href = await blogPostLink.getAttribute("href");
            data.href = sanitizedTargetURL + href;
          }

          if (includeTitles || scrapeAllContent) {
            const blogPostTitleElement = await page.$(
              SELECTORS.selectSubTitles(i)
            );
            data.title = await blogPostTitleElement.textContent();
          }

          if (
            includesSentimentAnalysis ||
            includeDescriptions ||
            scrapeAllContent
          ) {
            const blogPostDescriptionElement = await page.$(
              SELECTORS.selectBlogPostDescription(i)
            );
            data.short_description =
              await blogPostDescriptionElement.textContent();
          }

          if (includesPicture || scrapeAllContent) {
            const blogPostPicture = await page.$(
              SELECTORS.selectBlogPostPicture(i)
            );
            const image = await blogPostPicture.getAttribute("src");
            data.image = sanitizedTargetURL + image;
          }
          if (includesSentimentAnalysis || scrapeAllContent) {
            data.sentiment = helper.analyzeSentiment(data.short_description);
          }
          if (includesWordsCounter || scrapeAllContent) {
            const blogPostPage = await browser.newPage();
            await blogPostPage.goto(data.href);
            const blogPostTitle = await blogPostPage.$(
              SELECTORS.selectBlogPostTitle
            );
            const blogPostContent = await blogPostPage.$(
              SELECTORS.selectBlogPostContent
            );
            const title = await blogPostTitle.textContent();
            const content = await blogPostContent.textContent();
            const sanitizedContent = helper
              .sanitizeText(content + title)
              .split(" ");
            data.words = sanitizedContent.length;
          }
          if (Object.keys(data).length > 0) {
            arrayOfTitlesAndDescriptions.push(data);
          }
        })()
      );
    }

    await Promise.all(promises);
  } catch (err) {
    console.log(err);
    return ERROR_MESSAGES.unhandledExceptionErrorMessage;
  } finally {
    await browser.close();
  }
  return arrayOfTitlesAndDescriptions;
};

export default scrapeTarget;
