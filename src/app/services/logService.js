import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

function init() {
  Sentry.init({
    dsn: 'https://a412088391d54a74bcdbee5c3deec1c1@o1419514.ingest.sentry.io/6763448',
    integrations: [new BrowserTracing()],

    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

const logger = {
  init,
  log,
};

export default logger;
