# Contributing to Ngtw-Kit

## <a name="request"></a> Request a Feature

## <a name="coding"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as
you are working:

- All features or bug fixes **must be tested** by one or more specs
  (unit-tests).
- All public API methods **must be documented**.
- We wrap all code at **80 characters**.

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our Git commit messages must be formatted.
This format leads to **easier to read commit history** and makes it analyzable
for changelog generation.

## <a name="commit-header"></a>Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: changelog|common|components|directives|docs-infra|packaging|upgrade
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is
optional.

### <a name="type"></a> Type

Must be one of the following:

| Type         | Description                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------- |
| **build**    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| **ci**       | Changes to our CI configuration files and scripts (examples: Github Actions, SauceLabs)             |
| **docs**     | Documentation only changes                                                                          |
| **feat**     | A new feature                                                                                       |
| **fix**      | A bug fix                                                                                           |
| **perf**     | A code change that improves performance                                                             |
| **refactor** | A code change that neither fixes a bug nor adds a feature                                           |
| **test**     | Adding missing tests or correcting existing tests                                                   |

### <a name="scope"></a> Scope

The scope should be the name of the npm package affected (as perceived by the
person reading the changelog generated from commit messages).

The following is the list of supported scopes:

| Scope          | Description                                                                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **changelog**  | used for updating the release notes in CHANGELOG.md                                                                                                                                                 |
| **common**     | used for changes in common library.                                                                                                                                                                 |
| **components** | used for changes in components library.                                                                                                                                                             |
| **directives** | used for changes in directives library.                                                                                                                                                             |
| **docs-infra** | used for changes in directory and tools.                                                                                                                                                            |
| **packaging**  | used for changes that change the npm package layout in all of our packages, e.g. public path changes, package.json changes done to all packages, d.ts file/format changes, changes to bundles, etc. |
| **upgrade**    | used for updates in dependencies, and changes caused by updates as well.                                                                                                                            |

---

<a name="home" href="README.md" style="display:flex; justify-content: flex-end">
  Back to home
</a>
