# handof
[Handof](https://browsee.io/blog/)
A simple script to monitor any process.

### Prerequisites

  * npm
  * NodeJS
  * SES Account. You will need an AWS SES account and the 'from' email should have permissions to send emails via that account.


### Setup

To use simply clone the repo and run

```
npm install
```

To setup email alerts, open config.js and setup your AWS ses credentials, From
and To email accounts.

To monitor MongoDB, add the following cron to the machine hosting MongoDB.

*/2 * * * * handof --checkMongo

Similary for Cassandra you could do

*/2 * * * * handof --checkCassandra
