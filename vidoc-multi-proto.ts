import { vidoc } from './defs'

export const metadata = {
  id: 'multi-protocol',
  name: 'Multi Protocol',
  description: 'Check s3 bucket misconfigurations',
  severity: 'medium',
};

// Simplicity of Javascript and speed of Go.
const MultiProtocol = async (target) => {
  const dnsRecord = await vidoc.dns.resolve(target, {
    type: 'CNAME'
  });

  // we only care about S3 buckets
  if(!dnsRecord.value.includes('s3.')) {
    return;
  }

  // send simple HTTP request to target
  const response = await vidoc.http.put(target, {
    path: '/test213213213',
    body: 'test',
  });

  if(response.status === 200) {
    vidoc.report.issue(target, 'S3 bucket is writable');
  }
}

export default MultiProtocol
