#!/usr/bin/env node

import program from 'commander';

// import pkg from '../package.json';
import { createWriteStreamAsync } from './transport';

// main cli logic
function main() {
  program
    // .version(pkg.version)
    .option('-d, --dsn <dsn>', 'Your Sentry DSN or Data Source Name')
    .option('-e, --environment <environment>', 'Sentry environment')
    .option('-n, --serverName <serverName>', 'Transport name')
    .option('-dm, --debug <debug>', 'Turns debug mode on or off')
    .option('-sr, --sampleRate <sampleRate>', 'Sample rate as a percentage of events to be sent in the range of 0.0 to 1.0')
    .option('-mb, --maxBreadcrumbs <maxBreadcrumbs>', 'Total amount of breadcrumbs that should be captured')
    .option('-di, --dist <dist>', 'Sets the distribution for all events')
    .option('--maxValueLength <maxValueLength>', 'Maximum number of chars a single value can have before it will be truncated.')
    .option('--release <release>', 'The release identifier used when uploading respective source maps.')
    .action(async ({ dsn, serverName, environment, debug, sampleRate, maxBreadcrumbs, dist, logLevel, maxValueLength, release }) => {
      try {
        console.info('start');
        const writeStream = await createWriteStreamAsync({
          dsn,
          serverName,
          environment,
          debug,
          sampleRate,
          maxBreadcrumbs,
          dist,
          logLevel,
          maxValueLength,
          release,
        });
        process.stdin.pipe(writeStream);
        console.info('logging');
      } catch (error) {
        console.log(error.message);
      }
    });

  program.parse(process.argv);
}

main();
