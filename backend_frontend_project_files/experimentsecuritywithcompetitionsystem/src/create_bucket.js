var
	AWS = require("aws-sdk"),
	S3API = new AWS.S3({
    	apiVersion: "2006-03-01",
    	region: "us-east-1"
	});
 
(function createBucket(){
	var
    	params = {
        	Bucket: "nodejs-kw", //bucket name
    	};
    	S3API.createBucket(params, function(error, data){
        	console.log(error, data);
    	});
})();
