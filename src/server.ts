import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  
  app.get("/filteredimage", async (req, res) => {
    const { image_url } = req.query;

    if(!image_url) {
      return res.status(400).send('"image_url" query param must exist.');
    }

    let filePath: string;
    try {
      await filterImageFromURL(image_url).then((path: string) => {
        filePath = path;
      })
      
      return res.status(200).sendFile(filePath, () => {
        deleteLocalFiles([filePath]);
      });
    }
    catch(e) {
      console.log(e);
      return res.status(500).send('error filtering the image.');
    }
  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();