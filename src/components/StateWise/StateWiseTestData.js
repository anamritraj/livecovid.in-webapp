import React from 'react'
import { useTranslation } from "react-i18next";

export default ({testingData}) => {
  const { t } = useTranslation()

  return (
    <>
      <div className="testing-stats">
        <span>{t('Tested')}</span><br />
        {testingData && testingData.totaltested ? Number(testingData.totaltested).toLocaleString('en'): "-"}
      </div>
    </>
  )
}