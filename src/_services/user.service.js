export const userService = {
    login,
    logout,
    search
};

function login(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: {}
    };
    const url = 'https://swapi.co/api/people';
    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            let loginFlag = false;
            user.results.forEach(element => {
                if (element.name === username && password === element.birth_year) {
                    loginFlag = element;
                    localStorage.setItem('user', JSON.stringify(element));
                    
                } 
            });
            if (!loginFlag) { 
                return Promise.reject('Invalid Username or Password');
            } else {
                return loginFlag;
            }
        });
}

function logout() {
    localStorage.removeItem('user');
}

function search(keyword) {
    const requestOptions = {
        method: 'GET'
    };
    const url = 'https://swapi.co/api/planets/?search='+keyword;
    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}