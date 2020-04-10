# Verdikto on next.js

## Cheatsheet

You'll have to copy `.env.development` to a local `.env` on first run. Configure it to your liking.

_Sensitive information which is not stored in `.env.development` can be found in heroku secrets. If you do not have access to heroku and need these, ask around_

To install

```
yarn
```

To run

```
yarn dev
```

When you create/edit gql queries or server schema

```
yarn generate
```

To access the Hasura console (to edit the database) run

```
npx hasura console
```

### Editor setup

You'll need `eslint` and `prettier` plugins in your editor of choice. If using VS Code, automatic `import` organisation is turned on as well through `.vscode/settings.json` file, which is part of this repository.

## Deployment

Everything lives on `Heroku`. There's a `verdikto` pipeline which builds us review application for each opened PR - _these last for 1 day only, but you can redeploy them manually from the pipeline._ Production build of the app is updated with each merge into master (TODO maybe add staging that deploys from master and deploy to production manually ?).

### Database

While we're using Hasura to access the db (see next section), the Postres addon lives on the `verdikto` instance.

This is the basic free db addon - if you need rollbacks or automatic backups (recommended once in production), please up uprage to payed version or roll your own automation on top of current solution.

### Logging

You can see all the logs piped into `Papertrail` addon on Heroku instance.

These are searchable for 1 day and retained for 7 days in the free version.

Please, either back the archived logs up to S3 or upgrade to payed version of Papertrail if you need more (it's rather reasonably priced).

## High level overview

_The "Why the hell is this split into 2 Heroku apps?" explanation._

TLDR: ease of building the admin part and typesafety against db for backend.

We use [Next.js](https://nextjs.org/) to serve static pages & SSR content, while still writing just a (mostly) React app (and using React to handle the dynamic content) - this is the app where all bussiness logic resides.

We use [Hasura](https://hasura.io/) to access Postgress in a typesafe way, as a shortcut to easily access db data with [React-Admin](https://marmelab.com/react-admin/), and also as a database-migrations tool - this is the second 'app', but feel free to think of it as of 'posgres on steroids', or more accurately 'postgres with a graphql interface'.

Hasura needs to run as it's own service/container - and even if we were to integrate it as a middleware (like [Postgraphile](https://www.graphile.org/postgraphile/), a similar service, allows you to do), this would mean we'd lose some of the bells and whistles of next.js (like automatic static optimization).

This means that from 'server side' (either from `getInitialProps` SSR functions, or from api functions) we access the db through remote GraphQL queries _which are typesafe_. The fact this is a request to another server is of course a drawback, but shouldn't be to big of a hurdle currently.

## DB access through Hasura

Hasura has tools to manage access by users directly into database column. We don't use that for now - the only "direct" access to Hasura from frontend is from the admin page.

That means that when user needs to access or modify some database record, he needs to call one of the endpoints from `pages/api`. These have full admin access to hasura.

TODO in the future, we might need to dynamically load data from database directly from react app (not in the SSR/static phase) - when this happens, we'll have to configure unauthorized Hasura accesses
TODO more

### Hasura console and environments

_We're disabling the remote console endpoint to track migration files in git - read more in [this section of the documentation](https://hasura.io/docs/1.0/graphql/manual/migrations/index.html)_. Therefore, you need the [hasura console](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/install-hasura-cli.html#install-hasura-cli) installed locally to manage our hasura instances. Existing instances to play with:

Dev endpoint - https://verdikto-hasura-dev.herokuapp.com/

Production endpoint - https://verdikto-hasura.herokuapp.com/

Currently passphrase to both is a base64 encoded `admin:admin` - that is: `YWRtaW46YWRtaW4=`. (TODO change on production before real data start arriving).

You should set up your own instance to write and test migrations, but feel free to use the https://verdikto-hasura-dev.herokuapp.com/ otherwise.

To open console, edit the `config.yaml` to match your configuration (or pass in the `--endpoint` and `--admin-secret` on the CLI)

```
hasura console
```

### Setting up your own hasura environment

Start by deploying a new hasura instance to heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)

Disable the remote console, optionally set the admin password by setting the following heroku env vars:

```
HASURA_GRAPHQL_ENABLE_CONSOLE false
HASURA_GRAPHQL_ADMIN_SECRET yoursecret
```

Create a local `config.yaml` (.gitignored) - you can change the `config.yaml.development` appropriately to fit your setup. Then apply all the missing migrations to your db:

```
hasura migrate apply
```

Read more on migrate command [here](https://hasura.io/docs/1.0/graphql/manual/hasura-cli/hasura_migrate_apply.html).

(You can also just sync your db state with current migrations by providing params directly on command line, i.e. `hasura migrate apply --endpoint http://your-hasura-instance.herokuapp.com`, without setting up `config.yaml`)

### Migrations and console

By default, when you create a new Hasura instance, it will spin up with an admin console on the `/console` endpoint. This allows you to create and modify tables through it's UI, each of the changes generating a new migrations. If we want to record these migrations in git, we need to run this console locally from this directory.

Read more in the hasura docs (i.e. here https://hasura.io/docs/1.0/graphql/manual/migrations/reference/how-it-works.html#migrations) Same if you want to write the migrations by hand.

### Writing DB queries in GraphQL

Recommended workflow when creating a new query against database is to use the GraphiQL Explorer from the `hasura console` dashboard - use checkboxes to select what you need, then copy over to a `.graphql` file and parametrize to your liking.

Afterwards run `yarn generate` - you will find your query exported as a function on `client` object in `utils/gql` - use it to access db data in a typesafe way.

## Validations

Check out [yup](https://github.com/jquense/yup). Import the same validation schemas on frontend and backend, types will get inferred automatically.

## Flexsearch

We're using [flexsearch](https://github.com/nextapps-de/flexsearch) to do frontend full-text search on top of categories (services) and sub-categories in which trademark can be registered.

This works by associating an `id` with each record (be it category or subcategory name) and building an index to quickly search on top of these `id: string` pairs (see flexsearch docs for details and more info on what can actually be searched).

### Generating the ids

The search algorithm returns only an array of matched ids.

Thus, we need unique identificators for each string that we can match easily back into our categories and subcategories - these are stored in arrays so what we need is the ability to index into these arrays just by reading the id.

The indexes are stored into ids the following way

```
id = categoryId * 10000 // for categories
id = (categoryId * 10000) + (subcategoryId + 1) // for subcategories
```

You can reverse this process to get to correct (sub)category as `categories[categoryId].categories[subcategoryId]`.

**If you edit categories in `categories.ts`, you will also have re-generate the `flexsearchCategoriesIndex.json` file to match the changes. Code to do that can be found commented out on top of `categories.ts`.**

`latinize` fn is ran before indexing so that we work without accents and diacritics - same function should be run on the search query itself.

#### Index file

`public/flexsearchCategoriesIndex.json` is rather large (1.8mb) and currently a part fo the app package. This can be improved upon by tweaking flexsearch, and removing it from the package :).

---

Forked from here https://github.com/mpinter/nextjs-wordpress, check it out if you need wordpress integration.
