import { DynamoDB } from 'aws-sdk';

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000'
};

const isOffline = () => {
  return process.env.IS_OFFLINE
};

const document = isOffline()
  ? new DynamoDB.DocumentClient(options) 
  : new DynamoDB.DocumentClient()

export { document }