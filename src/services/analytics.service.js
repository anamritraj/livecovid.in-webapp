import ReactGA from 'react-ga'

ReactGA.initialize('UA-83719221-8')

const sendEventToGA = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  })
}

const sendPageView = (page) => {
  ReactGA.pageview(page)
}

export { sendEventToGA, sendPageView }
