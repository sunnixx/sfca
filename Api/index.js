import shared from './Shared';

const api = {}

// api.login = async function(email, password) {
//     await fetch(`${shared.url}/api/login`,{
//         method: 'post',
//         headers: {
//             'Content-Type' : 'Application/json'
//         },
//         body: JSON.stringify({email, password})
//     }).then(response => {
//         response.json().then(message => {
//             if(message.isLogged == true) {
//                 AsyncStorage.setItem('token',message.token)
//             }
//         }).catch(err => {if(err) throw new Error(err)})
//     }).catch(err => {
//         if(err) throw new Error(err);
//     })
// }

api.addParent = async function(name,email,title,cb) {
    await fetch(`${shared.url}/api/signup`,{
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({name,email,title})
    }).then(response => {
        response.json().then(message => {
            if(message.msg === true) {
                return cb('Information Added, Thank You!');
            } else {
                return cb('Something went wrong! Try again later')
            }
        })
    })
}

api.addStudents = async function(fname, lname, grade,cb) {
    await fetch(`${shared.url}/api/addstudents`,{
        method: 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify({fname, lname, grade})
    }).then(response => {
        response.json().then(message => {
            if(message.msg === true) {
                return cb('student added'); //Call this call back
            } else {
                return cb('something went wrong!')
            }
        })
    })
}

export default api;