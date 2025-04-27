import { test, expect, APIRequestContext } from '@playwright/test';

test('API GET request check', async ({ request }: { request: APIRequestContext }) => {
  const response = await request.get('https://qa1.chat-api.intaker.xyz/api/v2/Chat/countries-v2?directLink=demoorg', {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  expect(response.ok(), 'Response was not OK').toBeTruthy();
  expect(response.status(), 'Unexpected response status').toBe(200);

  const responseJson = await response.json();
  expect(Array.isArray(responseJson)).toBeTruthy();
  expect(responseJson.length).toBe(250);
});
