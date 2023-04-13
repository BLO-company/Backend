const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '685194263082-d7ijcs1npvuvptg6g8mgcn4p0jl214jb.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

const validarGoogleIdToken = async (token) => {

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [
                CLIENT_ID,
                '685194263082-uu5pm5rj827tvsjelaoah4cdhuee6p54.apps.googleusercontent.com',
                '685194263082-guqdikbtvef4v3ii9uc3q0ct6lb6iksv.apps.googleusercontent.com',
            ],
            // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
    
        console.log(payload);
        
        // const userid = payload['sub'];
        // // If request specified a G Suite domain:
        // // const domain = payload['hd'];
    
        return {
            name: payload['name'],
            picture: payload['picture'],
            email: payload['email'],
        }
    } catch (error) {
        return null;
    }

}

module.exports = {
    validarGoogleIdToken
}