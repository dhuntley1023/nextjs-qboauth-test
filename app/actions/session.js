import { cookies } from 'next/headers';

// export const Session = {
//     userEmail: null,
//     accessToken: null,
//     refreshToken: null,
//     realmId: null
// };

export async function setSessionCookie(session) {
    console.log('Setting session cookie:', session);
    const cookieStore = await cookies();
    cookieStore.set(
        process.env.SESSION_COOKIE_NAME, JSON.stringify(session), 
        { httpOnly: true }
        );
}

export async function getSessionCookie() {
    const cookieStore = await cookies();
    const sessionJson = cookieStore.get(process.env.SESSION_COOKIE_NAME);
    console.log('Getting session cookie:', sessionJson);
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
        const sessionData = {
            accessToken: this._accessToken,
            refreshToken: this._refreshToken,
            realmId: this._realmId,
        };
        await setSessionCookie(sessionData);
    }
}