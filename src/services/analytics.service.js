import ReactGA from 'react-ga';

const sendEventToGA = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  })
}

export {
  sendEventToGA
}