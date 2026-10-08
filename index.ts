import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.get("/devs", async (req, res) => {
  return { devs : ["Juan Diego", "Juan Camilo", "Jefer"]}
})

app.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server listening at ${address}`);
});
