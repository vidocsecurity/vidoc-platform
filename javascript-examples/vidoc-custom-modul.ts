import { http, html, report } from '../vidoc'

// Module metadata
export const metadata = {
  id: 'extract-all-javascript-files',
  name: 'Extract all Javascript files',
  description: 'Extract all Javascript files from target',
  severity: 'informative',
};

// Extract all Javascript files from target page
const Module = async (target) => {
  // send simple HTTP request to target
  const response = await http.get(target);

  // parse HTML response
  const doc = html.parse(response.body);

  // find all <script> tags
  const scripts = doc.findAll('script');

  // extract src attribute from each script tag
  const scriptSources = scripts.map((script) => {
    return script.attr('src');
  });

  // report the script sources
  // all of them will be displayed in the report
  report.metadata(target, scriptSources);
}

export default Module
