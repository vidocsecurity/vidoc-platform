import { http, match, report } from '../vidoc'

// Module metadata
export const metadata = {
  id: 'detect-exposed-settings-file',
  name: 'Detect exposed settings file',
  description: 'Detect exposed settings file',
  severity: 'critical',
};

// Simple HTTP request to detect exposed settings file
const Module = async (target) => {
  // create HTTP request template
  // it can be used for bruteforcing, fuzzing, etc.
  const template = http
    .newTemplate()
    .method('GET')
    // define list of paths to check
    .path([
      '/settings.php.bak',
      '/settings.php.dist',
      '/settings.php.old',
    ]);

  const responses = await http.send(target, {
    template
  });

  // check each response
  responses.forEach((response) => {
    // check if response contains DB_NAME
    if (response.status === 200 && response.body.includes('DB_NAME')) {
      // report issue
      report.issue(target, 'Settings file is exposed');
    }
  });
}

export default Module
