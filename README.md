<p align="center"><a href="https://k6.io/"><img src="assets/new-cover-with-logo.png" alt="k6" /></a></p>

<h3 align="center">Security automation platform</h3>
<h4 align="center">One-click Recon, Vulnerability Scanning automation, custom security checks, for security teams and pros. No setup needed</h4>

Vidoc is a platform that handles the infrastructure for you. Scanning is powered by Modules. We improved on the known concept of Templates. **We wrote our own module engine.** (we might opensource it)

## Vision

We are huge fans of community made tools - but we also think that they can be greately improved. We want to make tools that are easy to use, fast and scalable. **We handle the infrastructure - you will handle the security.**

## Core Vidoc features

- **Zero setup.** Just write your modules and run them. All results in one place.
- **Speed.** You can run Modules against thousands of hosts in matter of minutes.
- **YAML modules compatible with Nuclei\*.** You can use all Nuclei modules with Vidoc.
- **[Passive Modules](#passive-module).** Think of it as grep on ALL responses that were received from the target (even if they were received by other modules).
- **[Javascript modules](#our-take-on-javascript-modules). (BETA)**
    - **An embedded JavaScript engine. (BETA)** Real Javascript, not string embedded in YAML.
    - **Multiple Protocol support.** HTTP, DNS, WebSockets, gRPC...
    - **Speed.** The performance of Go
- **Improved DSL.** We validate and help you write our DSL.

\* You can use our importer to convert Nuclei modules to Vidoc modules.

This is what security automation looks like in the 21st century.

# Our take on Javascript modules

The performance of Go, the scripting familiarity of JavaScript.

**We belive that if you can read Javascript, so you can write Vidoc modules. Yes, it is that simple.**

**Example of a Javascript modules:**

```javascript
import { http, dns, report } from '../vidoc'

// Module metadata
export const metadata = {
  id: 'multi-protocol',
  name: 'Multi Protocol',
  description: 'Check s3 bucket misconfigurations',
  severity: 'medium',
};

// Module that checks if S3 bucket is writable - uses multiple protocols
const Module = async function(target) {
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
```

More examples in the [javascript-examples](javascript-examples) directory.

# Passive module

Passive module is a module that does not send any requests to the target. It only checks the responses of the target. More examples in the [yaml-examples](yaml-examples) directory.

**Why is this useful?**

Sometimes one of your other modules will make a request to the target and the response will contain a secret. You can use a passive module to detect this secret and report it.

```yaml
info:
  name: Detect AWS keys in response
  severity: informative
  tags:
    - secrets

on-match:
  - report-vulnerability

global-matchers:
  matchers:
    - part: all
      type: regex
      regex:
        - "AKIA[0-9A-Z]{16}"
      negative: false
      condition: and
  matchers-condition: and
```

# Roadmap

Our team is dedicated to continuously improving and providing the best user experience possible. We are working on a lot of new features and improvements.



If you like our project, please let us know on https://www.vidocsecurity.com/contact or use contact@vidocsecurity.com.