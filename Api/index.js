import shared from './Shared';

const api = {}

api.addParent = async function (name, email, title, cb) {
    await fetch(`${shared.url}/api/signup`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ name, email, title })
    }).then(response => {
        response.json().then(message => {
            if (message.msg === true) {
                return cb('Information Added, Thank You!', true, message.user);
            } else {
                return cb('Something went wrong! Try again later', false)
            }
        })
    })
}

api.addStudents = async function (fname, lname, grade, email, cb) {
    await fetch(`${shared.url}/api/addstudents`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ fname, lname, grade, email })
    }).then(response => {
        response.json().then(message => {
            if (message.msg === true) {
                return cb('student added'); //Call this call back
            } else {
                return cb('something went wrong!')
            }
        })
    })
}

api.existingAccount = async function (email, cb) {
    await fetch(`${shared.url}/api/existingemail`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email })
    }).then(response => {
        response.json().then(message => {
            if (message.msg == true) {
                return cb(true)
            } else {
                return cb(false, message.user);
            }
        })
    })
}

export default api;