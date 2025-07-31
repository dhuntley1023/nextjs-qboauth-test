import { cookies } from 'next/headers';
import QuickBooks from 'node-quickbooks';

// export const Session = {
//     userEmail: null,
//     accessToken: null,
//     refreshToken: null,
//     realmId: null
// };

export async function setSessionCookie(session) {
    //console.log('Setting session cookie:', session);
    const cookieStore = await cookies();
    cookieStore.set(
        process.env.SESSION_COOKIE_NAME, JSON.stringify(session), 
        { httpOnly: true }
        );
}

export async function getSessionCookie() {
    const cookieStore = await cookies();
    const sessionJson = cookieStore.get(process.env.SESSION_COOKIE_NAME);
    //console.log('Getting session cookie:', sessionJson);
    if (sessionJson) {
        return JSON.parse(sessionJson.value);
    }
    return null;
}

const SessionState = {
    UNINITIALIZED: 'UNINITIALIZED',
    READY: 'READY',
}

export class Session {
    constructor() {
        this._accessToken = null;
        this._refreshToken = null; 
        this._realmId = null;
        this.sessionState = SessionState.UNINITIALIZED;
        }

    _getter(value) {
        if (this.sessionState == SessionState.READY) {
            return value;
        } else {
            throw new Error('Must fetch session before use');
        }
    }

    get accessToken() { return this._getter(this._accessToken); }
    set accessToken(value) { this._accessToken = value; }

    get refreshToken() { return this._getter(this._refreshToken); }
    set refreshToken(value) { this._refreshToken = value; }

    get realmId() { return this._getter(this._realmId); }
    set realmId(value) { this._realmId = value; }

    get qbo() { 
        const qbo = new QuickBooks(process.env.QUICKBOOKS_CLIENT_ID,
                                   process.env.QUICKBOOKS_CLIENT_SECRET,
                                   this._accessToken,
                                   false, // no token secret for oAuth 2.0
                                   this._realmId,
                                   true, // use the sandbox?
                                   false, // enable debugging?
                                   null, // set minorversion, or null for the latest version
                                   '2.0', //oAuth version
                                   this._refreshToken);
        return this._getter(qbo); 
    }
    
    async fetch() {
        const sessionData = await getSessionCookie();
        if (sessionData) {
            this._accessToken = sessionData.accessToken;
            this._refreshToken = sessionData.refreshToken;
            this._realmId = sessionData.realmId;
        }   
        this.sessionState = SessionState.READY;
    }


    async update() {
        console.log('Updating session cookie');
        const sessionData = {
            accessToken: this._accessToken,
            refreshToken: this._refreshToken,
            realmId: this._realmId,
        };
        await setSessionCookie(sessionData);
    }

    isReady = () => this.sessionState === SessionState.READY;
}