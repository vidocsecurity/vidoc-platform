import { vidoc } from './defs'

export const metadata = {
  id: 'detect-exposed-settings-file',
  name: 'Detect exposed settings file',
  description: 'Detect exposed settings file',
  severity: 'critical',
};

// Simplicity of Javascript and speed of Go.
const DetectExposedSettingsFile = async (target) => {
  // create HTTP request template
  // it can be used for bruteforcing, fuzzing, etc.
  const requestTemplate = vidoc.http
    .newTemplate()
    .method('GET')
    .path([
      '/settings.php.bak',
      '/settings.php.dist',
      '/settings.php.old',
      '/settings.php.save',
      '/settings.php.swp',
      '/settings.php.txt'
    ]);

  // send HTTP requests to target based on request template
  const responses = await vidoc.http.sendAll(target, requestTemplate);

  return vidoc.http.match(responses, (response) => {
    if (response.status === 200 && response.body.includes('DB_NAME')) {
      vidoc.report.issue(target, 'Settings file is exposed');
    }
  });
}

export default DetectExposedSettingsFile
