import { cookies } from 'next/headers'

export const Session = {
    userEmail: null,
    accessToken: null,
    refreshToken: null,
    realmId: null
};

export async function setSession(session) {
  await cookies().set(
    process.env.SESSION_COOKIE_NAME, JSON.stringify(session), 
    { httpOnly: true }
    );
}

export async function getSession() {
    const cookieStore = await cookies();
    const sessionJson = cookieStore.get(process.env.SESSION_COOKIE_NAME);
    if (sessionJson) {
        return JSON.parse(sessionJson.value);
    }
    return null;
}