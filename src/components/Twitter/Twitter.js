import https from "https";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Twitter.scss";

// https://twitter.com/howltweeter

const Twitter = () => {
  const tempTweet =
    "Moloch the incomprehensible prison! Moloch the crossbone soulless jailhouse and Congress of sorrows! Moloch whose buildings are judgement! Moloch the vast stone of war! Moloch the stunned governments!";
  const [tweet, setTweet] = useState(tempTweet);
  const [tweetTime, setTweetTime] = useState("0s");
  let lastId = 1560884341714178049;
  let start = Date.now();
  let delta;

  let checkTweets = () => {
    fetch("http://avalon.local:3003/twitter")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        if (data.id !== lastId) {
          setTweet(data.text);

          lastId = data.id;
          setTweetTime("0");
          start = Date.now();

          console.log("new howl");
        }
      })
      .catch((err) => {
        console.log("error retrieving data", err);
      });
  };

  // setTimeout() and setInterval() cannot be trusted. Date + delta instead
  // https://stackoverflow.com/a/29972322
  //
  let looper = () => {
    // console.log(Math.floor(delta / 1000));
    delta = Date.now() - start;

    if (Math.floor(delta / 1000 < 60)) {
      setTweetTime(Math.floor(delta / 1000) + "s");
    } else {
      setTweetTime(Math.floor(delta / 60000) + "m");
    }

    if (Math.floor(delta / 1000) % 60 === 0) {
      console.log("uno minuto");
      checkTweets();
    }
  };
  
  useEffect(() => {
    checkTweets();

    setInterval(() => {
      looper();
    }, 1000);
  }, []);

  return (
    <section className="twitter">
      <p className="tweet">{tweet}</p>
      <div className="twitter__meta">
        <p className="twitter__handle">@HowlTweeter </p>
        <p className="twitter__middot">&middot;</p>
        <p className="twitter__timestamp">{tweetTime}</p>
      </div>
    </section>
  );
};

export default Twitter;
