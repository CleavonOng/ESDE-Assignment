config = require('../config/config');
const pool = require('../config/database')
exports.handler = function(event, context, callback){
    var
        AWS = require("aws-sdk"),                        	
        DDB = new AWS.DynamoDB({
            apiVersion: "2012-08-10",
            region: "us-east-1"
        });                                                  
   
    function queryIndex(title_str, cb){
        var
            params = {
                ExpressionAttributeValues: {
                    ":title": {
                        S: title_str
                    }
                },
                KeyConditionExpression: "title = :title",
                TableName: "file",
                IndexName: "file_id"
            };
         DDB.query(params, function(err, data){
             var
                cat_reply_arr = [];
             if(err){
                 throw err;
             }
             if(data.Items.length === 0){
                return cb(null, []);
            }
            for(var i_int = 0; i_int < data.Items.length; i_int += 1){
               cat_reply_arr.push(data.Items[i_int]);
            }
            cb(null, cat_reply_arr);
        });
   }
  
   function scanTable(cb){
        var
           params = {
               TableName: "file"
           };
        DDB.scan(params, function(err, data){
            if(err){
                throw err;
            }
            cb(null, data.Items);
        });
   }
  
   (function init(){var
    title_str = "all",
    cb = null;
if(process.argv[2] !== undefined){
    console.log("Local test for " + process.argv[2]);
    title_str = process.argv[2];
    cb = console.log;
}else{
    console.log("Running in lambda");
    console.log(event);
    cb = callback; //becomes available in lambda
    title_str = event.title_str;
}
if(title_str === "All"){
    scanTable(cb);
}else{
    queryIndex(title_str, cb);
}
})();
};
