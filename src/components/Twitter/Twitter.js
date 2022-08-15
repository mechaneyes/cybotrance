import { useState, useEffect } from "react";
import "./Twitter.scss";

// https://twitter.com/howltweeter

const Twitter = () => {
  const [howler, setHowler] = useState("Allen Ginsberg was here");
  const [sinceLast, setSinceLast] = useState(0)

  // const twitterClient = new TwitterClient({
  //   apiKey: process.env.REACT_APP_TWITTER_CONSUMER_KEY,
  //   apiSecret: process.env.REACT_APP_TWITTER_CONSUMER_SECRET,
  //   accessToken: process.env.REACT_APP_TWITTER_ACCESS_TOKEN,
  //   accessTokenSecret: process.env.REACT_APP_TWITTER_ACCESS_TOKEN_SECRET,
  // });

  let mostRecent;
  let sinceLastTweet = 0;

  const checkNewTweet = (data) => {
    fetch("http://localhost:3003/twitter")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data.data[0]);
        let incomingID = data.data[0].id;

        if (incomingID == mostRecent) {
          sinceLastTweet++;
          setSinceLast(sinceLastTweet)
          console.log("sinceLastTweet", sinceLastTweet);
        } else {
          setHowler(data.data[0].text)
          mostRecent = incomingID;
          console.log("new howl");
        }
      })
      .catch((err) => {
        console.log("error retrieving data", err);
      });
  };

  useEffect(() => {
    checkNewTweet();
    const interval = setInterval(() => {
      checkNewTweet();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="twitter">
      <p className="tweet">{howler}</p>
      <div className="twitter__meta">
        <p className="twitter__handle">@HowlTweeter </p>
        <p className="twitter__middot">&middot;</p>
        <p className="twitter__timestamp">{sinceLast}m</p>
      </div>
    </section>
  );
};

export default Twitter;
