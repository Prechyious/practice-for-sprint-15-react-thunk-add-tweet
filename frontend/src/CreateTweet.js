import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewTweet } from "./store/tweet";

const CreateTweet = () => {
    const [tweet, setTweet] = useState("");
    const tweets = useSelector((state) => state.tweet);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (tweet) {
            const newTweet = {
                id: Object.keys(tweets).length + 1,
                message: tweet,
            };
            dispatch(addNewTweet(newTweet));
            reset();
        }
    };

    const reset = () => setTweet("");

    return (
        <>
            <h1>Create New Tweet</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="tweet"
                    id="tweet"
                    placeholder="New Tweet"
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default CreateTweet;
