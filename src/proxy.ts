import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// We have migrated the backend to the Express server in the /server directory.
// This is a dummy proxy to satisfy Next.js 16 requirements if the file exists.
export default async function proxy(request: NextRequest) {
  return NextResponse.next();
}
