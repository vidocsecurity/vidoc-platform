import { vidoc } from './defs'

export const metadata = {
  id: 'extract-all-javascript-files',
  name: 'Extract all Javascript files',
  description: 'Extract all Javascript files from target',
  severity: 'informative',
};

// Simplicity of Javascript and speed of Go.
const ExtractAllJavascriptFiles = async (target) => {
  // send simple HTTP request to target
  const response = await vidoc.http.get(target);

  // parse HTML response
  const doc = vidoc.html.parse(response.body);

  // find all <script> tags
  const scripts = doc.findAll('script');

  // extract src attribute from each script tag
  const scriptSources = scripts.map((script) => {
    return script.attr('src');
  });

  // report the script sources
  vidoc.report.metadata(target, scriptSources);
}

export default ExtractAllJavascriptFiles
