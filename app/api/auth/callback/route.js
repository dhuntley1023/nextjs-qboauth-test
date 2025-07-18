import { NextResponse } from 'next/server';
import OAuthClient from 'intuit-oauth';

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: 'sandbox',
  redirectUri: `${process.env.BASE_CALLBACK_URL}/api/auth/callback`
});

export async function GET(request) {
  const url = new URL(request.url);

  try {
    // Exchange authorization code for tokens
    await oauthClient.createToken(request.url);

    // Extract realmId (company ID) for API calls
    const realmId = url.searchParams.get('realmId');

    // Persist tokens & realmId in a secure store (DB, encrypted cookie, etc.)
    // e.g., setCookie('qb_tokens', JSON.stringify(oauthClient.getToken()), { httpOnly: true })

    console.log('Token:', oauthClient.getToken().getToken());

    return NextResponse.json({
      success: true,
      realmId,
      token: oauthClient.getToken().getToken() 
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}