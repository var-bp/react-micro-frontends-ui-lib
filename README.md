# React UI Library Template

This is a ReactJS UI Library built to provide custom elements. Small UI building blocks that are assembled in order to create the UX.

## Installation
To add to project:
```
$ npm i react-micro-frontends-ui-lib
```
Install the project dependencies.
```bash
$ npm i
```
Install the `.storybook` dependencies.
```bash
.storybook $ npm i
```

## Import Into Project
If you encounter 'Invalid hook call' error after importing 'react-micro-frontends-ui-lib' for local development (npm link) please see [this](https://github.com/facebook/react/issues/15315#issuecomment-479802153).
```
import { Button } from "react-micro-frontends-ui-lib";
import { Black } from "react-micro-frontends-ui-lib/colors";
import { imgFluid } from "react-micro-frontends-ui-lib/helpers";
import { FontFamily } from react-micro-frontends-ui-lib/typo";
```

## Important note
All your npm packages from `dependencies` must be the same version across all you repositories.


## Manual DEV Testing of Feature Updates
Creating a new feature that you would like to verify. We can directly link the projects using __NPM Link__.
You can read about the magic behind npm link [here](https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af)

From Component Library project (For dev mode only) run the following:
```bash
$ npm link
$ npm run start
```
In another project to test new feature run:
```bash
$ npm link ui-component-library
```

While developing, you will probably rely mostly on `npm run start` however, there are additional scripts at your disposal:

|`npm run <script>` |Description|
|-------------------|-----------|
|`build`            |Build prod app to ./build|
|`lint:css`         |Lint the project for potential errors|
|`lint:css:fix`      |Lint the project and fixes all correctable errors|
|`lint:js`          |Lint the project for potential errors|
|`lint:js:fix`       |Lint the project and fixes all correctable errors|
|`start`            |Build and watch dev app to ./build|
|`storybook`        |Run storybook|
|`test`             |Run unit tests with Jest|
|`test:watch`       |Run `test` in watch mode to re-run tests when changed|
|`test:coverage`    |Generate information about coverage to ./coverage|

## Semantic versioning
Semantic versioning is way to specify software features and compatibility with a three part version number. There are [specifications](https://jontejada.com/blog/galvanize/talk/2016/01/18/semver/) for each of the three numbers.
If you add new feature then update minor value 1.0.0 -> 1.1.0.
If you fix some problem then update patch value 1.0.0 -> 1.0.1.

## Publish to npm registry
When you finished working:
1. add semantic version to package.json
2. add git tag and commit changes
    i.  `git tag -a <version> -m "message"`
    ii. `git push -u origin <version>`
3. run `npm run build`
4. run `npm publish`

## Testing
To add a unit test, create a `.spec.tsx` or `.test.tsx` file anywhere inside of `./src`. Jest and webpack will automatically find these files.
