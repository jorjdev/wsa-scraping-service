const SELECTORS = {
  selectSubTitles: (blogIndex) =>
    `//div/main/div/div/div[2]/div[${blogIndex}]/div/div[2]/div[1]/a`,

  selectAllBlogPostsWrapper: "//div/main/div/div/div[2]",
  selectBlogPostDescription: (blogIndex) =>
    `//div/main/div/div/div[2]/div[${blogIndex}]/div/div[2]/div[2]`,

  selectBlogPostPicture: (blogIndex) =>
    `//div/main/div/div/div[2]/div[${blogIndex}]/a/img`,

  selectBlogPostLink: (blogIndex) =>
    `//div/main/div/div/div[2]/div[${blogIndex}]/a`,
  selectBlogPostContent: `//div/div/div/div/div[2]/div[1]/div[3]`,
  selectBlogPostTitle: `//div/div/div/div/div[2]/div[1]/div[2]`

};

export default SELECTORS;
