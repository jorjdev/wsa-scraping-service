import ERROR_MESSAGES from "./src/api/utils/errors.js";

const {
  queryCannotBeEmptyErrorMessage,
  queryHasUnsupportCriteriaErrorMessage,
  unsupportedTargetURLErrorMessage,
  navigationErrorErrorMessage,
} = ERROR_MESSAGES;

export function queryCannotBeEmpty(res) {
  res.status(400).json({ error: queryCannotBeEmptyErrorMessage });
}
export function queryHasUnsupportCriteria(res) {
  res.status(501).json({ error: queryHasUnsupportCriteriaErrorMessage });
}
export function isUnsupportedTargetURL(res) {
  res.status(501).json({ error: unsupportedTargetURLErrorMessage });
}
export function isNavigationError(res) {
  res.status(404).json({ error: navigationErrorErrorMessage });
}
export function unhandledException(res) {
  res.status(500).json({ error: unhandledExceptionErrorMessage });
}
