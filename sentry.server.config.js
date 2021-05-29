import * as Sentry from '@sentry/nextjs';

Sentry.init({
	dsn: `https://efa1290915604f23b12e56c17569512c@o749062.ingest.sentry.io/5791314`,
	sampleRate: 0.2,
	// ...
	// Note: if you want to override the automatic release value, do not set a
	// `release` value here - use the environment variable `SENTRY_RELEASE`, so
	// that it will also get attached to your source maps
});
