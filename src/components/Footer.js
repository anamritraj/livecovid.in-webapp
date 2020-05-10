import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = (props) => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <span>
        <a
          href="https://github.com/anamritraj/livecovid.in-webapp/issues/new"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Report an error')}
        </a>
      </span>
      |
      <span>
        <Link to="/help">{t('Help')}</Link>
      </span>
      |
      <span>
        <a
          href="http://twitter.com/anamritraj"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Created by anamritraj')}
        </a>
      </span>
    </footer>
  );
};

export default React.memo(Footer);
