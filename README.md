# node-shopify-stock-report
Node JS function to retrieve status of updated and send a report using AWS SNS

This is a simple function that will retrieve the status of the node-shopify-stock-update process and send a notification to AWS SNS.

**Environment Variables**

**SHOPIFY_DBURL**: MongoDB Url\
**SHOPIFY_DBNAME**: MongoDB Database name\
**SHOPIFY_COLLECTIONNAME**: MongoDB Database Collection name for Shopify Stock\
**STORE_COLLECTIONNAME**: MongoDB Database Collection name for Store Stock
**SNS_TOPICARN**: SNS ARN for notifications
