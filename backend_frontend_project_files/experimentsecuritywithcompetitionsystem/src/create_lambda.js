var
	AWS = require("aws-sdk"),
	LAMBDA = new AWS.Lambda({
    	apiVersion: "2015-03-31",
    	region: "us-east-1"
	});
 
 
function createLambdaFromZip(){
 	var
    	params = {
        	Code: {
                S3Bucket: "nodejs-kw",
                S3Key: "experimentsecuritywithcompetitionsystem.zip"
            },
        	Description: "competition_system_security_concept_db",
        	FunctionName: "getOneDesignData",
        	Handler: "query.handler",
        	MemorySize: 128,
        	Publish: true,
        	Role: "arn:aws:iam::278011394123:role/lambda-role",
        	Runtime: "nodejs12.x",
        	Timeout: 30,
    	};
    	LAMBDA.createFunction(params, function(err, data){
        	console.log(err, data);
    	});
}

(function init(){
	createLambdaFromZip();
})();
