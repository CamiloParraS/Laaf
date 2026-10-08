import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.get("/admins", async (req, res) => {
  return { admins : ["Juan Diego", "Juan Camilo", "Jefer"]}
})

app.listen({ port: 5000 }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log(`Server listening at ${address}`);
});
