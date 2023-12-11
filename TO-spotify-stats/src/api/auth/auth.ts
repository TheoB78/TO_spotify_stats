import router from '@/router';
import axios from 'axios';

const clientId = '16dc2375b35a42afa791924a4e4eaa5d';
const clientSecret = '051e53ad68a94602bacf3152c92989fd';
const redirectUri = 'http://localhost:8100/tabs';
const codeVerifier = generateRandomString(64);

function resetToLogin() {
    localStorage.clear();
    router.push('/login');
}

function generateRandomString(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    console.log('text: ' + text)
    
    return text;
};

async function sha256(plain:string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64encode(input: any) {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function getCodeFromUrl() {
    let code = '';
    const urlParams = new URLSearchParams(window.location.search);
    code += urlParams.get('code')
    return code;
};

async function requestUserAuth() {
    console.log("requestuserauth");
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    
    localStorage.setItem('code_verifier', codeVerifier);
    
    let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: 'user-top-read user-read-private user-read-email',
        redirect_uri: redirectUri,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
    });
    
    window.location.href = 'https://accounts.spotify.com/authorize?' + args;
};

async function getAccessToken() {
    console.log("getaccestoken");
    const code = getCodeFromUrl();
    localStorage.setItem('authorization_code', code);
    
    try {
        await axios.post('https://accounts.spotify.com/api/token', 
        {
            grant_type : 'authorization_code',
            code : code,
            redirect_uri : redirectUri,
            code_verifier : localStorage.getItem('code_verifier'),
            client_id : clientId,
        },
        {
            headers : 
            {
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret),
                'Content-Type' : 'application/x-www-form-urlencoded',
            }
        }).then((response) => {
            console.log(response);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
        }).catch((error) => {
            apiCallErrorHandler(error);
        }
        )
    }
    catch (error: any) {
        console.error('Error:', error.message);
    }
};

async function getRefreshToken() {
    console.log("getrefresh");
    const refreshToken = localStorage.getItem('refresh_token')
    
    try {
        await axios.post('https://accounts.spotify.com/api/token', 
        {
            grant_type : 'refresh_token',
            refresh_token : refreshToken,
            client_id : clientId,
        },
        {
            headers : 
            {
                'Content-Type' : 'application/x-www-form-urlencoded',
            }
        }).then((response) => {
            console.log(response);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
        }).catch((error) => {
            apiCallErrorHandler(error);
        })
    }
    catch (error: any) {
        console.error('Error:', error.message);
    }
};

function checkAuthorization() {
    console.log("checkAuthorization");
    if (!localStorage.getItem('authorization_code')) {
        resetToLogin();
    }
    else if (!localStorage.getItem('access_token')) {
        getAccessToken();
    }
}

function apiCallErrorHandler(error: any) {
    console.log(error)
    alert(error.message)
    if (error.response.data.error == 'invalid_grant') {
        resetToLogin();
    }
    else if (error.response.status == 401) {
        getRefreshToken();
    }
    else {
        resetToLogin();
    }
}

export default {
    requestUserAuth,
    getAccessToken,
    getRefreshToken,
    checkAuthorization,
    apiCallErrorHandler,
    resetToLogin,
}
