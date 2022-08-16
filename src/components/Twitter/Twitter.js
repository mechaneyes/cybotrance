import { useState, useEffect } from "react";
import "./Twitter.scss";

// https://twitter.com/howltweeter

const Twitter = () => {
  const [tweet, setTweet] = useState("Allen Ginsberg was here");
  const [tweetTime, setTweetTime] = useState(0)

  // const twitterClient = new TwitterClient({
  //   apiKey: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
  //   apiSecret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
  //   accessToken: process.env.REACT_APP_TWITTER_ACCESS_TOKEN,
  //   accessTokenSecret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET,
  // });

  let mostRecentID;
  let sinceLastTweet = 0;

  const checkTweets = (data) => {
    fetch("http://avalon.local:3003/twitter")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.data[0]);
        let incomingID = data.data[0].id;

        if (incomingID == mostRecentID) {
          // Check every 30 seconds, but only update frontend every 60
          // 
          sinceLastTweet += 0.5;
          sinceLastTweet % 1 == 0 ? setTweetTime(sinceLastTweet) : ''

          console.log("sinceLastTweet", sinceLastTweet);
        } else {
          setTweet(data.data[0].text)

          mostRecentID = incomingID;
          setTweetTime(0)
          sinceLastTweet = 0
          
          console.log("new howl");
        }
      })
      .catch((err) => {
        console.log("error retrieving data", err);
      });
  };

  useEffect(() => {
    checkTweets();
    const interval = setInterval(() => {
      checkTweets();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="twitter">
      <p className="tweet">{tweet}</p>
      <div className="twitter__meta">
        <p className="twitter__handle">@HowlTweeter </p>
        <p className="twitter__middot">&middot;</p>
        <p className="twitter__timestamp">{tweetTime}m</p>
      </div>
    </section>
  );
};

export default Twitter;
