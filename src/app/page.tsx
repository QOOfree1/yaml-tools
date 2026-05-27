"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BASE_PATH = "/yaml-tools";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`${BASE_PATH}/en`);
  }, [router]);

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=${BASE_PATH}/en`} />
      </head>
      <body>
        <p>Redirecting to <a href={`${BASE_PATH}/en`}>YAML Tools</a>...</p>
      </body>
    </html>
  );
}
