import React from 'react';

import Github from '../components/nav/github.svg'
import Twitter from '../components/nav/twitter.svg'
const SocialFooter = () => {
  return <div className="social-footer">
    <ul>
      <li><a className="github" target="_blank" rel="noopener noreferrer" href="https://github.com/anamritraj/livecovid.in-webapp">
        <img src={Github} alt="github share icon" />
        Contribute on Github
        </a></li>

      <li><a className="twitter" target="_blank" rel="noopener noreferrer" href="https://twitter.com/share?text=Covid-19 India provides the latest state-wise updates on the spread of the coronavirus in India. Stay Informed. Stay Inside!&url=https://livecovid.in">
        <img src={Twitter} alt="twitter share icon" />
        Share on Twitter
        </a></li>
    </ul>
  </div>
}

export default SocialFooter;