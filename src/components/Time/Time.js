// https://dev.to/ahmedsarhan/create-your-live-watch-and-date-in-react-js-no-3rd-party-hassle-1oa4

// Formatting:
// https://stackoverflow.com/a/69044670


import { useState, useEffect } from 'react';
import './Time.scss';

function Time() {
    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
           setInterval(() => setDateState(new Date()), 30000);
    }, []);

    return (
        <div className="time">
            {/* <p className='time__date'>
              {dateState.toLocaleDateString('en-CA', {
                 day: 'numeric',
                 month: 'numeric',
                 year: 'numeric',
              })}
            </p> */}
            <h1 className='time__time'>
             {dateState.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
            })}
            </h1>
        </div>
    );
}

export default Time;