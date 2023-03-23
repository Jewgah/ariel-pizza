import {client} from './connectionElasticSearch.js';

export async function searchDocument() {
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
      //console.error(err);
      return null;
    }
  }

  export async function indexDocument(branch, date, toppings, timeDifference, hour) {
    console.log("timeDifference: " + timeDifference);
    console.log('toppings = ', toppings)
  
    // Convert the toppings array to an object with boolean values for each topping
  
    try {
      const uniqueId = uuidv4(); // Generate a unique ID
   
      const response = await client.index({
        index: "orders",
        id: uniqueId,
        document: {
          branch: branch,
          date: date,
          toppings: toppings,
          timeDifference: timeDifference,
          hour: hour,
        },
      });
  
      if (response.result == "created") {
        console.log("Document Indexed Successfully");
      } else {
        console.log("Document Index FAILED");
      }
  
    } catch (err) {
      console.error(err);
      return null;
    }
  }

//   searchDocument();