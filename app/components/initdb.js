import { initializeDatabase } from "../models/index.js"

export default async function InitDb({children}) {
  await initializeDatabase();
  return <div>{children}</div>;
}