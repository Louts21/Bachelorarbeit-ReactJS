//--Variables--------------------------------------------------------------------------------------------------------------------------------------------

let returnJson = { data: 'JSON is empty' };

//--Methods----------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Fills JSON with string if empty
 * @param {JSON} json - required
 * @returns JSON file
 */
const fillJSONIfEmpty = (json) => {
    if (isJSON(json)) {
        if (Object.keys(json).length !== 0) {
            return json
        } else {
            return returnJson;
        }
    } else {
        alert("Value was not a JSON");
        return json;
    }
}

/**
 * Checks if the given JSON is realy a JSON object
 * @param {JSON} json - required
 * @returns false if its not a JSON else true
 */
const isJSON = (json) => {
    if (json != null && isNaN(json)) {
        try {
            JSON.parse(JSON.stringify(json));
        } catch (exception) {
            return false;
        }
    } else {
        return false
    }

    return true;
}

/**
 * Checks if the given string is realy a string and contains numbers
 * @see "https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number"
 * @param {string} string
 * @returns false if its not numeric, true if it is
 */
const isNumericString = (string) => {
    if (typeof string != "string") {
        return false
    }
    return !isNaN(string) && !isNaN(parseFloat(string))
}

//--Export-----------------------------------------------------------------------------------------------------------------------------------------------

export { fillJSONIfEmpty, isJSON, isNumericString }
