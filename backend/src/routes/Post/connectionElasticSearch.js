import {Client}  from '@elastic/elasticsearch';
// import cron from 'node-cron';

// Create an elasticSearch client
const elastic = "elastic";
const password = "changeme";


export const client = new Client({
    node: 'http://localhost:9200'});

    //const result = await client.search({index:"orders",query:{match:{id:"1"}}});
    //console.log(result);
    // async function searchDocuments(query = { match_all: {} }) {
    //   if (query.hasOwnProperty("branch") && query.branch !== "") {
    //     query = {
    //       bool: {
    //         must: Object.entries(query).map(([field, value]) => ({
    //           match: { [field]: value },
    //         })),
    //       },
    //     };
    //   }
    //   try {
    //     const response = await client.search({
    //       index: "orders",
    //       size: 1000,
    //       query: query,
    //     });
    //     console.log(response);
    //     return response?.hits.hits.map((hit) => hit._region);
    //   } catch (err) {
    //     console.error("error : " + err);
    //     return null;
    //   }
    // }
    // const d = searchDocuments();
    // console.log(d)

    // async function searchDocument() {
    //   try {
    //     const { body } = await client.search({
    //       index: "orders",
    //       body: {
    //         query: {
    //           match: { id: "1" },
    //         },
    //       },
    //     });
    
    //     if (!body || !body.hits || !body.hits.total) {
    //       console.log("No search results found.");
    //       return null;
    //     }
    
    //     console.log("Number of Hits:", body.hits.total.value);
    //     console.log("Document found:");
    //     console.log(body.hits.hits[0]._source);
    //   } catch (err) {
    //     console.error(err);
    //     return null;
    //   }
    // }
    // searchDocument();
    // async function searchDocuments(query = { match_all: {} }) {
    //   if (query.hasOwnProperty("branch") && query.branch !== "") {
    //     query = {
    //       bool: {
    //         must: Object.entries(query).map(([field, value]) => ({
    //           match: { [field]: value },
    //         })),
    //       },
    //     };
    //   }
    //   try {
    //     const response = await client.search({
    //       index: "orders",
    //       size: 1000,
    //       query: query,
    //     });
    //     return response?.hits.hits.map((hit) => hit._source);
    //   } catch (err) {
    //     console.error(err);
    //     return null;
    //   }
    // }
    


// const exists = client.exists({
//       index: 'haifa1'});


//   if(exists)
//   {
//     console.log(exists);
//   }
//   else
//   {
 
//   }
async function searchDocument() {
  try {
    const body = await client.search({
      index: "orders",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    console.log("Number of Hits:", body);
    console.log("Documents found:");
    console.log(body.hits.hits);
  } catch (err) {
    console.error(err);
    return null;
  }
}

searchDocument();

  // try {
  //   const { body } = await client.search({
  //     index: 'haifa1',
  //     body: {
  //       query: {
  //         match_all: {}
  //       }
  //     }
  //   });

  //   if (body && body.hits && body.hits.hits.length > 0) {
  //     console.log(body.hits.hits[0]);
  //   } else {
  //     console.log('No search hits found.');
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
  // console.log(body.hits.hits[0]);
// async function createIndex() {
//   const indexName = 'my_index1';

//   try {
//     const response = await client.indices.create({
//       index: indexName,
//       body: {
//         // define the index settings and mappings here
//       }
//     });
//     console.log(`Index "${indexName}" created successfully:`, response);
//   } catch (err) {
//     console.error(`Failed to create index "${indexName}":`, err);
//   }


// createIndex(); 