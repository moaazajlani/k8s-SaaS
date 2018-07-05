const fs = require('fs');


function fetchUsers(){
	try{
		let users = fs.readFileSync('store.json');
		return JSON.parse(users);
	} catch(e){
		return [];
	}
}

function saveUsers(users){
	fs.writeFileSync('store.json',JSON.stringify(users));
}

function addUser(username, email, password){

	let users = fetchUsers();
	let user = {
		username,
		email,
		password
	};

	let duplicateUsers = users.filter((userElement)=> userElement.username === username);

	if(duplicateUsers.length === 0 && username && password && email){
		console.log('duplicateUsers == 0')
		users.push(user);
		saveUsers(users);
		return true;
	} else{
		console.log(`cannot add the user ${username}.. already have an account`);
		return false;
	}
}

function validateUser(email, password){
	
	let users = fetchUsers();

	let duplicateUsers = users.filter(function(user){
		return (user.password === password && user.email === email)
	});

	if(duplicateUsers.length === 1 && email && password ) return true;
	else return false;

	// if(email && password) return true;
	// else return false;
}

module.exports = {
	addUser,
	validateUser,
};