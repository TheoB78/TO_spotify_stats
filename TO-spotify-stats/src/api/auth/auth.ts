const clientId = '16dc2375b35a42afa791924a4e4eaa5d';
const redirectUri = 'http://localhost:8100/login';

export default {
    generateRandomString: function (length: number) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },

    generateCodeChallenge: async function (codeVerifier: string) {
        function base64encode(string: any) {
            let byteArray = new Uint8Array(string);
            let dataView = new DataView(byteArray.buffer);
            const number = dataView.getInt32(0, false);
            return btoa(string)
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);

        return base64encode(digest);
    },

    requestUserAuth: function () {
        let codeVerifier = this.generateRandomString(128);

        this.generateCodeChallenge(codeVerifier).then(codeChallenge => {
            let state = this.generateRandomString(16);
            let scope = 'user-read-private user-read-email';

            localStorage.setItem('code_verifier', codeVerifier);

            let args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });

            window.location.href = 'https://accounts.spotify.com/authorize?' + args;
        });
    },

    getCodeFromUrl: function () {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('code');
    },

    requestAccessToken: function() {

    }
}
