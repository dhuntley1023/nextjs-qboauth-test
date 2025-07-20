'use server'

import { NextResponse } from 'next/server';
import OAuthClient from 'intuit-oauth';
//import { cookies } from 'next/headers';
import { setSession, Session } from './session';

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: 'sandbox',
  redirectUri: `${process.env.BASE_CALLBACK_URL}/api/auth/callback`,
  logging: true,
});

export async function callback(requestUrl) {
      try {
        // Exchange authorization code for tokens
        await oauthClient.createToken(requestUrl);

        // Persist tokens & realmId in a secure store (DB, encrypted cookie, etc.)
        // e.g., setCookie('qb_tokens', JSON.stringify(oauthClient.getToken()), { httpOnly: true })
    
        //console.log('Token:', oauthClient.getToken());
        const token = oauthClient.getToken().getToken();
        const session = { ...Session };
        session.accessToken = token.access_token;
        session.refreshToken = token.refresh_token;
        session.realmId = token.realmId;

        await setSession(session);
    
        return NextResponse.redirect(`${process.env.BASE_CALLBACK_URL}/home`);
      } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
      }
    
}

export async function authenticate() {
  // request Accounting scope and pass a CSRF-safe state
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: 'secureRandomState123'
  });

     return authUri;
  //return NextResponse.redirect(authUri);
}
