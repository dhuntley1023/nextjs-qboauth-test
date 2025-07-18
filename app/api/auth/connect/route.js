import { authenticate } from '@/app/actions/authenticate';

export async function GET() {
  return await authenticate();
}
