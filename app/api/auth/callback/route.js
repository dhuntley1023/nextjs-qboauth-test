import { callback } from '@/app/actions/authenticate';

export async function GET(request) {
  return await callback(request.url);
}