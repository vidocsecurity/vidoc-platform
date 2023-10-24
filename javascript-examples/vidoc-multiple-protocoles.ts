import { http, dns, report } from '../vidoc'

// Module metadata
export const metadata = {
  id: 'multi-protocol',
  name: 'Multi Protocol',
  description: 'Check s3 bucket misconfigurations',
  severity: 'medium',
};

// Simple HTTP request to detect exposed settings file
const Module = async (target) => {
  // resolve CNAME record
  const cnameRecord = await dns.resolve(target, {
    type: 'CNAME'
  });

  // check if its an S3 bucket
  if(!cnameRecord.value.includes('s3.aws')) {
    return;
  }

  // try writing to bucket and check if its writable
  const response = await http.put(target, {
    path: '/test213213213',
    body: 'test',
  });

  // check if response is 200
  if(response.status === 200) {
    report.issue(target, 'S3 bucket is writable');
  }
}

export default Module
