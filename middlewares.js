import errorMessages from "./src/api/utils/errors.js";

const {
  queryCannotBeEmptyErrorMessage,
  queryHasUnsupportCriteriaErrorMessage,
  unsupportedTargetURLErrorMessage,
  navigationErrorErrorMessage,
} = errorMessages;

export function queryCannotBeEmpty(res) {
  res.status(400).json({ error: queryCannotBeEmpty });
}
export function queryHasUnsupportCriteria(res) {
  res.status(501).json({ error: queryHasUnsupportCriteria });
}
export function isUnsupportedTargetURL(res) {
  res.status(501).json({ error: unsupportedTargetURL });
}
export function isNavigationError(res) {
  res.status(404).json({ error: navigationError });
}
