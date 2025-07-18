import { NextResponse } from 'next/server';
import OAuthClient from 'intuit-oauth';

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
  environment: 'sandbox',
  redirectUri: `${process.env.BASE_CALLBACK_URL}/api/auth/callback`
});

export async function GET() {
  // request Accounting scope and pass a CSRF-safe state
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: 'secureRandomState123'
  });

  return NextResponse.redirect(authUri);
}
