# Packages requiring flat compat for configs (@eslint/eslintrc's FlatCompat)

- `eslint-plugin-react-hooks` - Should have a new version that has a flat config soon.
- `eslint-plugin-import` - Currently does not have a flat config.

# What is preventing us to work with ESLint 9

- TODO

# Pinned dependencies

- `eslint` pinned to `8.57.1` because some plugins don't work work `v9`. See section above.

- `eslint-plugin-unused-imports` pinned to `3.2.0` because `v4` requires ESLint `v9`.

- `typescript-eslint` pinned to `~8.14.0` because of a peer dependency from `eslint-plugin-unused-imports`

- `typescript` is (almost always) pinned to whatever version is supported by `@typescript-eslint/typescript-estree`

# Tasks

- Look through the non-configured and disabled rules and see which ones do we need to enable.

- Setup a system for generating changelogs
