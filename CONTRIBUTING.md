# Contributing

Jump in the pit and add something new!

## Getting Started

1. Fork Prismaek and run

   ```
   npm install
   ```

2. On your fork, create a new branch named:

   ```
   username/work-description
   ```

- Where **username** is your GitHub username and **work-description** is a short description of your contribution.

  For example: `mster/support-CMYK`

3. Complete your contribution and commit your work to the branch you created.

4. When you're ready for review or to submit your contribution, double check a few things.

- ✓ First, make sure your fork is up to date. If your fork is out of date, you will need to rebase.

- ✓ Next, assure that your code pases all tests.
  ```
  npm test
  ```
  See [Testing](#testing) for more information.

5. If your contribution is more than a single commit, squash all commits into one. Provide a brief description of your work inside the commit message.

6. Open a pull request to `main` and request review from user `@mster`.

7. Make any changes suggested during review.

8. You will be added to the list of contributors and have your code merged.

## Features

Have an feature in mind? Go for it -- if we like it, we will add it. You can always open a "Work in Progress" pull request.

Follow the [Getting Started](#getting-started) guide if you're new to this.

## Code Style

Prismaek uses [Prettier](https://prettier.io/). To have your contributions accepted, they must also be in this style.

To test if your code passes, run the test command:

```
npm run lint
```

To auto-fix any linting issues, use the command:

```
npm run lint-fix
```

## Testing

Prismaek uses [Jest](https://jestjs.io/) as our testing framework. To run these tests use the command:

```
npm run jest
```

## Need Help?

We're happy to help out, no matter how small the issue.

Open an issue, ping the author (@mster), or join the Discord.
