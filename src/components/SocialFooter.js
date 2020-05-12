import React from 'react';

import { useTranslation } from 'react-i18next';
import Github from './nav/github.svg';
import Twitter from './nav/twitter.svg';
import Slack from './nav/slack.svg';
import Whatsapp from './nav/whatsapp.svg';
import Telegram from './nav/telegram.svg';

import { sendEventToGA } from '../services/analytics.service';

const handleOnclick = (app) => {
  sendEventToGA('User', `Clicked Share/${app}`, app);
};

const SocialFooter = () => {
  const { t } = useTranslation();
  return (
    <div className="social-footer">
      <ul>
        <li>
          <a className="github" target="_blank" rel="noopener noreferrer" onClick={() => handleOnclick('github')} href="https://github.com/anamritraj/livecovid.in-webapp">
            <img src={Github} alt="github share icon" />
            {t('Contribute on Github')}
          </a>
        </li>
        {/* <li>
          <a className="slack" target="_blank" rel="noopener noreferrer" onClick={() => handleOnclick('slack')} href="https://join.slack.com/t/livecovidin/shared_invite/zt-e10jouqp-HquZhM2L853zaN0JM9S2qg">
            <img src={Slack} alt="slack join" />
            {t('Join on Slack')}
          </a>
        </li> */}
        <li>
          <a className="telegram" target="_blank" rel="noopener noreferrer" onClick={() => handleOnclick('telegram')} href="https://t.me/livecovidin">
            <img src={Telegram} alt="telegram join" />
            {t('Join on Telegram')}
          </a>
        </li>
        <li>
          <a className="twitter" target="_blank" rel="noopener noreferrer" onClick={() => handleOnclick('twitter')} href="https://twitter.com/share?text=Covid-19 India provides the latest state-wise updates on the spread of the coronavirus in India. Stay Informed. Stay Inside!&url=https://livecovid.in">
            <img src={Twitter} alt="twitter share icon" />
            {t('Share on Twitter')}
          </a>
        </li>
        <li>
          <a className="whatsapp" data-action="share/whatsapp/share" target="_blank" rel="noopener noreferrer" onClick={() => handleOnclick('whatsapp')} href="whatsapp://send?text=Covid-19 India provides the latest state-wise updates on the spread of the coronavirus in India. Stay Informed. Stay Inside https://livecovid.in/">
            <img src={Whatsapp} alt="whatsapp join" />
            {t('Share on Whatsapp')}
          </a>
        </li>

      </ul>
    </div>
  );
};

export default SocialFooter;
