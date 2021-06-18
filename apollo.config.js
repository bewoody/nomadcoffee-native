module.exports = {
  client: {
    includes: ["./**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffeee-backend",
      url: "https://nomadcoffeee-backend.herokuapp.com/graphql",
    },
  },
};
