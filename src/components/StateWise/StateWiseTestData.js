import React from 'react'
import { useTranslation } from "react-i18next";
import { format, parse } from "date-fns";

export default ({testingData}) => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="state-desc-header">
        <div className="last-updated-state">
          {t('Updated on')}{" "}
          {format(parse(testingData.updatedon, 'dd/MM/yyyy', new Date()),'dd MMM yyyy')}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Total Tests</th>
            <th>Positive</th>
            <th>Negative</th>
            <th>Unconfirmed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{testingData.totaltested}</td>
            <td style={{color: 'red'}}>{testingData.positive}</td>
            <td style={{color: 'green'}}>{testingData.negative}</td>
            <td style={{color: 'orange'}}>{testingData.unconfirmed}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}