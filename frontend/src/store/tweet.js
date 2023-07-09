// constant to avoid debugging typos
const GET_ALL_TWEETS = "tweet/getAllTweets";
const ADD_TWEET = "tweet/AddTweet";

//regular action creator
const loadTweets = (tweets) => {
    return {
        type: GET_ALL_TWEETS,
        tweets,
    };
};

// thunk action creator
export const getAllTweets = () => async (dispatch) => {
    const response = await fetch("/api/tweets");

    if (response.ok) {
        const data = await response.json();

        dispatch(loadTweets(data));
        return data;
    }
};

const addTweet = (tweet) => {
    return {
        type: ADD_TWEET,
        payload: tweet,
    };
};

export const addNewTweet = (tweet) => async (dispatch) => {
    const res = await fetch("/api/tweets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweet),
    });

    if (res.ok) {
        const newTweet = await res.json();
        dispatch(addTweet(newTweet));
        return newTweet;
    }
};

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case GET_ALL_TWEETS:
            action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
            return newState;

        case ADD_TWEET:
            newState[action.payload.id] = action.payload;
            return newState;

        default:
            return state;
    }
};

export default tweetsReducer;
