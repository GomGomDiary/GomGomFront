import ReactGA from 'react-ga4';

export const PageviewTrigger = (router) => {
  ReactGA.send({
    hitType: 'pageview',
    page: router.pathname,
  });
};

export const EventTrigger = ({ action, category, label, value }) => {
  ReactGA.event({
    action: action,
    category: category,
    label: label,
    value: value,
  });
};
