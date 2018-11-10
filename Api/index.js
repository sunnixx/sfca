import shared from './Shared';

const api = {}

api.login = async function(email, password) {
    await fetch(`${shared.url}/api/login`,{
        method: 'post',
        headers: {
            'Content-Type' : 'Application/json'
        },
        body: JSON.stringify({email, password})
    }).then(response => {
        response.json().then(message => {
            if(message.isLogged == true) {
                AsyncStorage.setItem('token',message.token)
            }
        }).catch(err => {if(err) throw new Error(err)})
    }).catch(err => {
        if(err) throw new Error(err);
    })
}

export default api;