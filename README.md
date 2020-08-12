# pino-sentry-errors

Send [pino](https://github.com/pinojs/pino) error & fatal logs into [Sentry](https://sentry.io/)

## Index

- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)
  - [API](#api)
- [Options](#options-options)
  - [Transport options](#transport-options)
  - [Log Level Mapping](#log-level-mapping)
- [License](#license)

## Install

```bash
npm install pino-sentry-errors -g
```

## Usage

### CLI

```bash
node ./app.js | pino-sentry-errors --dsn=https://******@sentry.io/12345
```

### API

```js
const { createWriteStream } = require("pino-sentry-errors");
// ...
const opts = {
  /* ... */
};
const stream = createWriteStream({ dsn: process.env.SENTRY_DSN });
const logger = pino(opts, stream);
```

## Options (`options`)

### Transport options

- `--dsn` (`-d`): your Sentry DSN or Data Source Name (defaults to `process.env.SENTRY_DSN`)
- `--environment` (`-e`): (defaults to `process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'production'`)
- `--serverName` (`-n`): transport name (defaults to `pino-sentry-errors`)
- `--debug` (`-dm`): turns debug mode on or off (default to `process.env.SENTRY_DEBUG || false`)
- `--sampleRate` (`-sr`): sample rate as a percentage of events to be sent in the range of 0.0 to 1.0 (default to `1.0`)
- `--maxBreadcrumbs` (`-mx`): total amount of breadcrumbs that should be captured (default to `100`)

### Log Level Mapping

Pino logging levels are mapped by default to Sentry's acceptable levels.

```js
{
  trace: 'debug',
  debug: 'debug',
  info: 'info',
  warn: 'warning',
  error: 'error',
  fatal: 'fatal'
}
```

## Credits

This package is nearly identical with [`pino-sentry`](https://github.com/aandrewww/pino-sentry) by [@aandrewww](https://github.com/aandrewww). The only difference is that it only sends logs with level `error` and `fatal` to Sentry, while `pino-sentry` sends all logs.

## License

[MIT License][license-url]

[license-url]: LICENSE
[node-url]: https://nodejs.org
