import Types from "./types";

const fetchData = payload => ({
    type:Types.FETCH_DATA,
    payload
});

const setData = payload => ({
    type:Types.SET_DATA,
    payload
});

module.exports = {
    setData,
    fetchData
};