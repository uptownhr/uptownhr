Deno.serve({ port: 8000 }, (): Response => {
  const body = `hello world`;

  console.log('body', body);

  return new Response(body, { status: 200 });
});
