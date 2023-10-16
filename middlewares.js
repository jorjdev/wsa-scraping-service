import errorMessages from "./src/api/utils/errors.js";

export function queryCannotBeEmpty(res) {
    const errorMessage = errorMessages.queryCannotBeEmpty;
    res.status(400).json({ error: errorMessage });
}
export function queryHasUnsupportCriteria(res){
    const errorMessage = errorMessages.queryHasUnsupportCriteria;
    res.status(501).json({ error: errorMessage });
}
export function isUnsupportedTargetURL(res){
    const errorMessage = errorMessages.unsupportedTargetURL;
    res.status(501).json({ error: errorMessage });
}
