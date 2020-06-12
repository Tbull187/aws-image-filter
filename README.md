# Image Filtering Service

aws-image-filter is a simple Node-Express application that runs a scrip to process an image.

### Setup

After cloning this repo, install dependencies: 
`npm i`

Run the development server:
`npm run dev`

Build the project:
`npm run build`

### Deploying to AWS

Project uses the AWS ElasticBeanstalk CLI for deployment.

To push changes, build the project and run:
`eb deploy`

### TODO 

Add a required authentication header to block public requests


