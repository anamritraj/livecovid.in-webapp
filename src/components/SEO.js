import React from 'react'
import { Helmet } from 'react-helmet'

const schemaMarkup = () => ({
  '@context': 'http://schema.org/',
  '@type': 'NewsMediaOrganization',
  name: 'Coronavirus India Live State-wise Dashboard',
  alternateName: 'COVID-19 Tracker State-wise India',
  url: 'https://livecovid.in/',
  description:
    'Provides real-time live tracking of coronavirus (Covid-19) cases in India District-wise / Statewise.',
  identifier: 'https://livecovid.in',
})

const HelmetDefault = (props) => (
  <Helmet>
    <title itemProp="name" lang="en">
      {props.title} | Live Coronavirus Tracker India State-wise, District-wise
    </title>
    <meta
      name="description"
      content="Dashboard to track the spread of Coronavirus (COVID-19) in India, contains state-wise, district-wise live updates"
    />
    <meta
      name="keywords"
      content="coronavirus,corona,covid,covid19,covid-19,covidindia,india,virus"
    />
  </Helmet>
)

export { schemaMarkup, HelmetDefault }
