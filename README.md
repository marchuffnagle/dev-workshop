# dev-workshop

## Async Disposer Pattern

The async disposer pattern is a useful abstraction when there is a resource that needs cleaning up after usage. Using a function that handles the lifecycle of the resource and separates it from the logic that uses the resource makes sure that the cleanup is run.

Note: A potential problem is when there is some task is running in the argument function when it returns. This can happen when it starts an asynchronous task and does not wait for it to finish. In this case, the cleanup logic runs and closes the browser instance that can cause an error. It is usually the sign that an await is missing.

From <https://advancedweb.hu/what-is-the-async-disposer-pattern-in-javascript/>

```js
const { Client } = require('pg');

const withPgClient = async (fn) => {
  const client = new Client();

  await client.connect();

  try {
    return await fn(client);
  } finally {
    await client.end();
  }
};

const now = await withPgClient(
  (client) => client.query('SELECT NOW()');
);
```
