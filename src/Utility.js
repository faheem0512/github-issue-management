export function arrayToJSON(json) {
    if (Array.isArray(json)) {
        let _newProps = {};
        var _len = json.length;
        for (let i = 0; i < _len; i++) {
            for (let k in json[i]) {
                _newProps[k] = json[i][k];
            }
        }
        return _newProps;
    } else {
        return json || {};
    }
}