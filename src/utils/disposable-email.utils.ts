let cachedDisposableDomains: Set<string> | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 1000 * 60 * 60 * 12;

async function getDisposableDomains(): Promise<Set<string>> {
  const now = Date.now();

  if (cachedDisposableDomains && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedDisposableDomains;
  }

  const url = 'https://raw.githubusercontent.com/FGRibreau/mailchecker/HEAD/list.txt';
  const text = await (await fetch(url)).text();
  cachedDisposableDomains = new Set(
    text
      .split('\n')
      .map((d: string) => d.trim().toLowerCase())
      .filter(Boolean),
  );
  lastFetchTime = now;

  return cachedDisposableDomains;
}

export async function isDisposableEmail(email: string): Promise<boolean> {
  const domains = await getDisposableDomains();
  const emailDomain = email.split('@').pop()?.toLowerCase();
  return domains.has(emailDomain || '');
}
