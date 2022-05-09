# openweathermap-graphql-api

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See usage notes on how to
consume this package in your project.

### Prerequisites

Minimal requirements to set up the project:

- [Node.js](https://nodejs.org/en) v14, installation instructions can be found
  on the official website
- A package manager [yarn](https://yarnpkg.com). All instructions in the
  documentation will follow the yarn syntax.
- [Docker](https://docker.com) for mocking the API server
- Optionally a [Git](https://git-scm.com) client.

### Installing

Start by cloning the repository:

```bash
git clone git@github.com:nozgurozturk/openweather-graphql.git
```

In case you don't have a git client, you can get the latest version directly by
using
[this link](https://github.com/nozgurozturk/openweather-graphql/archive/main.zip)
and extracting the downloaded archive.

Go the the right directory and install dependencies:

```bash
cd openweather-graphql
yarn install
```

That's it! You can now go to the next step.

## Tests

All tests are being executed using [Jest](https://jestjs.io). All tests files
live side-to-side with a source code and have a common suffix: `.test.ts`. Some
helper methods can be stored in the `test` directory.

There are three helper scripts to run tests in the most common scenarios:

```bash
yarn test
yarn test:e2e
yarn test:coverage
```

## Formatting

This project uses [Prettier](https://prettier.io) to automate formatting. All
supported files are being reformatted in a pre-commit hook. You can also use one
of the two scripts to validate and optionally fix all of the files:

```bash
yarn format
yarn format:fix
```

## Linting

This project uses [ESLint](https://eslint.org) to enable static analysis.
TypeScript files are linted using a [custom configuration](./.eslintrc). You can
use one of the following scripts to validate and optionally fix all of the
files:

```bash
yarn lint
yarn lint:fix
```

## Spell checking

This project uses [CSpell](https://cspell.org) to enable spell checking. All
supported files are being spell checked in
[custom configuration](./.cSpell.json).

```bash
yarn spellcheck
```

## Running

You can run the project in local environment using the following command:

```bash
    yarn dev
```

You can also run the project in serverless mode using the following command:

```bash
    yarn serverless offline
```

Compiling tools that are used in the project is [SWC](https://swc.rs/)

You can find required environment variables in the [env.example](.env.example)
file.

GraphQL API schema is available in the [schema](./api/graphql/forecast.graphql)
file. You can use it to query the API.

```graphql
query {
    	forecast(
		location: String!
		interval: ForecastInterval
		units: ForecastUnits
	): ForecastResult
}
```

OpenWeatherMap API key is required to run the project. `OneCall` and `Geocoding`
APIs are supported by this project.

## CI/CD

You can use [Github Actions](.github/workflows/) to run the project in a
continuous integration.

You need to add secrets to your repository to run the project in CI/CD.

```
AWS_ACCESS_KEY_ID=<your-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
```

Project is automatically deployed to AWS Lambda after successful CI.

Also you can manually deploy the project to AWS Lambda using the following.

```
    yarn deploy
```

Project deployed on AWS with `serverless` framework you can find configuration
in [.serverless.yml](.serverless.yml)

---

You can access the project via
[https://293j0vuo3a.execute-api.eu-central-1.amazonaws.com/prod/graphql](https://293j0vuo3a.execute-api.eu-central-1.amazonaws.com/prod/graphql)

---

### TODOs

- [ ] Better config and logging implementation
- [ ] Better error handling
- [ ] More structured e2e test cases
- [ ] Package releases
- [ ] API extensions (city search, weather forecast, etc.)
- [ ] Caching for reduced 3rd Party API calls
- [ ] Unit tests for logical parts of the project (don't have yet)
