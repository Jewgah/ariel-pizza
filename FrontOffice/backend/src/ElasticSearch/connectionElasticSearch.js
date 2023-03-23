import {Client}  from '@elastic/elasticsearch';
// import cron from 'node-cron';

// Create an elasticSearch client
const elastic = "elastic";
const password = "changeme";


export const client = new Client({
    node: 'http://localhost:9200',
    auth: {
      username: elastic,
      password: password,
    },
  });

