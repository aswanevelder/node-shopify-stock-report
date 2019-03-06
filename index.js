const AWS = require('aws-sdk');

const sns = new AWS.SNS({apiVersion: '2010-03-31'});

exports.handler = async function (event, context, callback) {
    await sendNotifications();
}

async function sendNotifications() {
    if (!notificationSend) {
        notificationSend = true;
        
        const totalStoreSkus = await storeCollection.countDocuments();
        const totalShopifySkus = await shopifyCollection.countDocuments();
        const totalShopifyUpdated = await shopifyCollection.find({"status":"SHOPIFY_UPDATED"}).count();
        const totalStoreNotFound = await shopifyCollection.find({"status":"NO_RECORD"}).count();
        const totalStoreNoChange = await shopifyCollection.find({"status":"NO_CHANGE"}).count();
        const totalNotChecked = await shopifyCollection.find({"status":"SHOPIFY"}).count();
        
        var params = {
            Message: `Shopify Integration Status\n\nTotal Store SKUs: ${totalStoreSkus}\nTotal Shopify SKUs: ${totalShopifySkus}\nTotal Shopify Updated: ${totalShopifyUpdated}\nTotal No Change: ${totalStoreNoChange}\nTotal Not Checked: ${totalNotChecked}\nTotal Store Records not found: ${totalStoreNotFound}\n\nPlease use the MongoDB interface to do queries on results.\n\nCollection: stock_site\n\nUse these filters:\n{"status":"SHOPIFY_UPDATED"}\n{"status":"NO_CHANGE"}\n{"status":"NO_RECORD"}`,
            Subject: 'Shopify Integration Report',
            TopicArn: environment.SNS_TOPICARN
        };
        await sns.publish(params, function(err, data) {
          if (err) console.log(err, err.stack);
          else console.log(data);
        });
    }
}