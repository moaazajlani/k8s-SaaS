var k8s = require('k8s');

var kubectl = k8s.kubectl({
    endpoint:  'https://192.168.42.22:8443'
    /*, namespace: 'wordpress'*/
    , binary: '/usr/local/bin/kubectl'
})

/*
kubectl.pod.list({ app: 'kube-system' },function(err, pods){

console.log(pods);

})
*/
/*
kubectl.service.get('kube-system', function(err, pod){

	if(err) console.log(err);
	
	console.log('---------------');
	//console.log(pod);

})
*/
/*
kubectl.command('get --raw /apis/metrics.k8s.io/v1beta1/pods')
.then(function (result){
	console.log('results ----');
	console.log(result)
	var jsonobj = JSON.stringify(result);
	console.log(jsonobj["apiVersion"]);
},
function(error){
	console.log(error);
});
*/

kubectl.service.get('wordpress', function(err, pod){
	console.log(pod.spec.ports[0].nodePort);
})

/*
kubectl.service.delete('wordpress', function(err, data){

	if(err) console.log(err);
	console.log(data);
})

*/

/*
kubectl.service.create('/home/moaaz/Downloads/minikube-wordpress-mysql-single-instance-master/004-wordpress/003-wordpress-service.yaml', 
	function(err, data){

		if(err) console.log(err);
		console.log(data);

	}
)
*/
/*
kubectl.service.list(function(err, pods){


		if(err) console.log(err);
		console.log(pods);

})


kubectl.pod.list({ app: 'wordpress' }, function(err, pods){

		console.log('=============');	
		if(err) console.log(err);
		console.log(pods.items.status);		
}) 

*/
//console.log(kubectl);
//console.log(kubectl);

let base="/home/moaaz/mini/";

kubectl.command("create namespace sth");

kubectl.command("create -f "+base+"001-local-volumes.yaml");

kubectl.command("create -f "+base+"002-mysql-credentials.yaml");

kubectl.command("create -f "+base+"003-mysql/001-mysql-volume.yaml");
kubectl.command("create -f "+base+"003-mysql/002-mysql-deployment.yaml");
kubectl.command("create -f "+base+"003-mysql/003-mysql-service.yaml");

kubectl.command("create -f "+base+"004-wordpress/001-wordpress-volume.yaml");
kubectl.command("create -f "+base+"004-wordpress/002-wordpress-deployment.yaml");
kubectl.command("create -f "+base+"004-wordpress/003-wordpress-service.yaml");



var kubectl2 = k8s.kubectl({
    endpoint:  'https://192.168.42.22:8443'
    , namespace: 'sth'
    , binary: '/usr/local/bin/kubectl'
})

kubectl2.command('get --raw /apis/metrics.k8s.io/v1beta1/pods')
.then(function (result){
	console.log('results ----');
	console.log(result)
	var jsonobj = JSON.stringify(result);
	console.log(jsonobj["apiVersion"]);
},
function(error){
	console.log(error);
});

