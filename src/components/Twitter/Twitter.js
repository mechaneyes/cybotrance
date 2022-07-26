import "./Twitter.scss";

// https://twitter.com/howltweeter

function Twitter() {
  return (
    <section className="twitter">
      <p className="tweet">
        who howled on their knees in the subway and were dragged off the roof
        waving genitals and manuscripts,
      </p>
      <div className="twitter__meta">
        <p className="twitter__handle">@HowlTweeter </p>
        {/* <p className="twitter__middot">&nbsp;&middot;&nbsp;</p> */}
        <p className="twitter__middot">&middot;</p>
        <p className="twitter__timestamp">23m</p>
      </div>
    </section>
  );
}

export default Twitter;
