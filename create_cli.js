var generateFiles = require('./generate_files');
var k8s = require('k8s');

var kubectl = k8s.kubectl({
    endpoint:  'https://192.168.42.22:8443',
    binary: '/usr/local/bin/kubectl'
});

let domainName = process.argv[2];

generateFiles.createNamespace(domainName);

function successPromise(data){

    console.log('success!')
    console.log(`
                success result: ${data}
                `);

}

function failerPromise(error){
    
    console.log('failer!');
    console.log(`
                error is:  ${error}
                `);
}




var kubectl2 = k8s.kubectl({
    endpoint:  'https://192.168.42.22:8443',
    namespace: `${domainName}`,
    binary: '/usr/local/bin/kubectl'
});

// //print hpa horizontall pod autosaler info
// kubectl2
// .command('get hpa')
// .then(function(data){

//     let extractedData = data.split('\n')[1].split(' ').filter((item) => item.length > 0);

//     let hpaInfo = {
//         name: extractedData[0],
//         refernce: extractedData[1],
//         load: extractedData[5],
//         targets: `${extractedData[2]} ${extractedData[3]} ${extractedData[4]} ${extractedData[5]} ${extractedData[6]} ${extractedData[7]}`,
//         minpods: extractedData[8],
//         maxpods: extractedData[9],
//         replicas: extractedData[10],
//         age: extractedData[11]
//     }

//     console.log(`
//                  replicas: ${hpaInfo.replicas}
//                  loads:    ${hpaInfo.load}
//                  targets:  ${hpaInfo.targets}
//                 `)

// })
// .catch(failerPromise);


// kubectl2.service.list(function(err, serviceInfo){
//     //return the Service ip for the user
//     console.log(`192.168.42.22/${serviceInfo.items[1].spec.ports[0].nodePort}`);

//     //return the service name
//     console.log(`mysql service name:     ${serviceInfo.items[0].metadata.name}`)
//     console.log(`wordpress service name: ${serviceInfo.items[1].metadata.name}`)
// });


// //print pods containers names and their restart counts
// kubectl2.pod.list(function(err, podsInfo){

//     for(let i=0; i< podsInfo.items.length; i++)
//         console.log(`container name: ${podsInfo.items[i].metadata.generateName} 
//                      restart:        ${podsInfo.items[i].status.containerStatuses[0].restartCount}
//                      status:         ${podsInfo.items[i].status.phase}
//                      `)
// }) 

/*

//creat new namespace
kubectl
.command(`create namespace ${domainName}`)
.then(successPromise, failerPromise);

  
let base=`/home/moaaz/k8s-SaaS-master/server/express-test/namespaces/${domainName}/`;
  

kubectl
.command(`create -f ${base}001-local-volumes.yaml`)
.then(successPromise, failerPromise);


kubectl
.command(`create -f ${base}002-mysql-credentials.yaml`)
.then(successPromise, failerPromise);

kubectl
.command(`create -f ${base}003-mysql/001-mysql-volume.yaml`)
.then(successPromise, failerPromise);
   
   
kubectl
.command(`create -f ${base}003-mysql/002-mysql-deployment.yaml`)
.then(successPromise, failerPromise);


kubectl
.command(`create -f ${base}003-mysql/003-mysql-service.yaml`)
.then(successPromise, failerPromise);


kubectl
.command(`create -f ${base}004-wordpress/001-wordpress-volume.yaml`)
.then(successPromise, failerPromise);

kubectl
.command(`create -f ${base}004-wordpress/002-wordpress-deployment.yaml`)
.then(successPromise, failerPromise);

kubectl
.command(`create -f ${base}004-wordpress/003-wordpress-service.yaml`)
.then(successPromise, failerPromise);
    

*/