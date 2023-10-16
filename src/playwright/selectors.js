export const selectSubTitles = (blogIndex) => {
  return `//div/main/div/div/div[2]/div[${blogIndex}]/div/div[2]/div[1]/a`;
};
export const selectAllBlogPostsWrapper = "//div/main/div/div/div[2]";
export const selectBlogPostDescription = (blogIndex) => {
  return `//div/main/div/div/div[2]/div[${blogIndex}]/div/div[2]/div[2]`;
};
