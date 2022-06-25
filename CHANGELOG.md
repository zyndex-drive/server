# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0-60](https://github.com/zyndex-drive/server/compare/v0.2.0-59...v0.2.0-60) (2022-06-25)


### Build System 🏗

* **config:** change node engine version and target version to use more advanced features ([ff21fce](https://github.com/zyndex-drive/server/commit/ff21fce18b8c5db6b2555f579f9eb2a09d68c298))


### Features 🔥

* **plugins/auth/helpers:** return database result type instead of boolean for more meaningfull res ([709260b](https://github.com/zyndex-drive/server/commit/709260bd9001d03cb15c7781a4c5f6ef1cc7a3a1))
* **plugins/auth/methods:** implement database result in all model methods ([bf4c851](https://github.com/zyndex-drive/server/commit/bf4c851db1b2d59cb9a2ec2ff5de1436c3759cd4))
* **plugins/auth:** add new type for database edit results ([e755e50](https://github.com/zyndex-drive/server/commit/e755e50b498c41028998d9ca71b86587b2796f3e))
* **plugins/server:** add a common express handler to handle database edit requests ([2c84f1c](https://github.com/zyndex-drive/server/commit/2c84f1c84ca3138af36f2f32eb7a2d8d627fd37f))
* **routes/auth/policies:** add new route for editing policy model with the new express handler ([e204294](https://github.com/zyndex-drive/server/commit/e20429492f43ebb92d6c51439b822a0463d83881))
* **routes/auth/roles:** add new route for editing roles model using new express handler ([fe99bb3](https://github.com/zyndex-drive/server/commit/fe99bb3b88c9cf92c5baea92db94b81796b0f452))


### Bug Fixes 🛠

* **models/frontend:** add new property to frontend schema to have more control over scopes ([6dd55a7](https://github.com/zyndex-drive/server/commit/6dd55a7be1ea606dfc254e8208bc09b5436e46b0))
* **plugins/server:** add data property to send data in error responses ([cdff2b8](https://github.com/zyndex-drive/server/commit/cdff2b84ab4be190cdcd7fa336f7461a4ac7efce))

## [0.2.0-59](https://github.com/zyndex-drive/server/compare/v0.2.0-58...v0.2.0-59) (2022-06-23)


### Features 🔥

* **plugins/auth/helpers:** write a asyncwhileloop function for use in auth helper functions ([332518b](https://github.com/zyndex-drive/server/commit/332518b5afcc6a0a2ecd10bdbef1954bd9264624))
* **plugins/errors:** add a new not allowed error response class ([b6f415c](https://github.com/zyndex-drive/server/commit/b6f415cf17a03024c469fcdeeab8ec8d59c2272c))


### Others 🔧

* **types/express:** add express header types for x-session-id and x-session-token ([71c88c0](https://github.com/zyndex-drive/server/commit/71c88c008f15b9aa2eb70e6492181f447be81b49))


### Code Refactoring 🖌

* **plugins/server/middleware:** update session checker function to use the new session headers ([e995941](https://github.com/zyndex-drive/server/commit/e995941e35166606121d967cd01403529d977de2))


### Bug Fixes 🛠

* **plugins/auth/helper:** fix mathjs module import line, add owner to heirarchy ([92f0490](https://github.com/zyndex-drive/server/commit/92f0490968481239b469e863763e5234453f111e))
* **plugins/auth/helpers:** remove existing while loop and use asyncwhileloop function ([ef3c1ad](https://github.com/zyndex-drive/server/commit/ef3c1adef73b06420951cafbfc5608dd5cf48f8f))
* **plugins/auth/policy:** restrict editing 'code' prop in policy document ([386af4c](https://github.com/zyndex-drive/server/commit/386af4c49821cdd608baf26fed632ac4c93339c0))
* **plugins/cors:** allow x-session-id & x-session-token to be allowed in cors requests ([f3b6ee7](https://github.com/zyndex-drive/server/commit/f3b6ee72372ce05138c1c76182eb7f017a2c6608))
* **plugins/session-manager:** use updated error classes for more proper responses to user ([cb5d02f](https://github.com/zyndex-drive/server/commit/cb5d02f5e9934bf1e674c5a77892fad0745494c2))

## [0.2.0-58](https://github.com/zyndex-drive/server/compare/v0.2.0-57...v0.2.0-58) (2022-06-22)


### Bug Fixes 🛠

* **models:** use lean method for applicable models for faster db queries ([68c7c4c](https://github.com/zyndex-drive/server/commit/68c7c4cd4e749800eb579d1a6e59e81d99cd427e))
* **plugins/auth:** fix editdatabase function modification type ([a1e483d](https://github.com/zyndex-drive/server/commit/a1e483de607b8894784b457f9d7975af0f831d2a))
* **plugins/session:** pass userid down the response context ([897e440](https://github.com/zyndex-drive/server/commit/897e44066876b9b3dcf0482ae18e3b46c9f9f254))


### Features 🔥

* **error class:** introduce too many request error class for rate limiting responses ([60b76da](https://github.com/zyndex-drive/server/commit/60b76daf6de59aa023cdf2c6829dfc6d8e9a57bd))
* **middleware:** introduce global, user & other rate limiters in the application ([7f8fcfe](https://github.com/zyndex-drive/server/commit/7f8fcfec92bd14bb9d7845d998c9d580aabbf475))
* **plugins/sessions:** create user document and pass it down the response context ([6ad7255](https://github.com/zyndex-drive/server/commit/6ad72557a5a1bfa70d76a3fee6a2e3ce4e743516))
* **routes/auth/policy:** implement auth plugin in the auth/policy/modify route ([95e783b](https://github.com/zyndex-drive/server/commit/95e783b3b0ab1a959d3a38e01cb4f548b419d77f))
* **routes:** add setup route for adding global, user & other rate limiter settings ([81a90c9](https://github.com/zyndex-drive/server/commit/81a90c950279e43a02be2ba68d644556f2e8b904))
* **templates:** add setup template for rate limiter settings ([15e5955](https://github.com/zyndex-drive/server/commit/15e5955e2d8ddde2056ff468f2f9c7d2e4edf69a))

## [0.2.0-57](https://github.com/zyndex-drive/server/compare/v0.2.0-56...v0.2.0-57) (2022-06-11)


### Others 🔧

* pushing changes after a long time ([d79761e](https://github.com/zyndex-drive/server/commit/d79761eba6d89a38da255ecbf3e6f958461aa52f))

## [0.2.0-56](https://github.com/zyndex-drive/server/compare/v0.2.0-55...v0.2.0-56) (2022-04-30)


### Bug Fixes 🛠

* **oauth:** remove twitter oauth login client as it cannot be implemented ([90d4938](https://github.com/zyndex-drive/server/commit/90d4938a8368cfbb2fae0df2b39b7d28f523799c))


### Build System 🏗

* **docker:** add docker-compose & dockerfile for production build ([2670227](https://github.com/zyndex-drive/server/commit/26702270705cff762a40de1fe1efdd1670d77fd3))

## [0.2.0-55](https://github.com/zyndex-drive/server/compare/v0.2.0-54...v0.2.0-55) (2022-03-19)


### Bug Fixes 🛠

* **views:** fix paths, fix router not rendering index.html ([d79eb93](https://github.com/zyndex-drive/server/commit/d79eb93dd3cdf9731feb72f72a9bcfb2c6ecae75))

## [0.2.0-54](https://github.com/zyndex-drive/server/compare/v0.2.0-53...v0.2.0-54) (2022-03-19)


### Features 🔥

* **plugins/oauth:** add more oauth2.0 clients - facebook, twitter, github ([11b1d58](https://github.com/zyndex-drive/server/commit/11b1d583787345e8a80faa52eb7751551eac3c57))


### Tests 🧪

* **tests:** correct all tests to implement local dev password ([43605a0](https://github.com/zyndex-drive/server/commit/43605a0170bc595df0b249079ea4d1a814bca6d7))


### Build System 🏗

* **packages:** add passport oauth client packages ([50adcc8](https://github.com/zyndex-drive/server/commit/50adcc899051790adaecd9d641b4f0a614dc1e3f))
* **packages:** add passport oauth packages ([ec0c9ef](https://github.com/zyndex-drive/server/commit/ec0c9ef9aa02571d6c9c445906404dfc1ddfeb94))

## [0.2.0-53](https://github.com/zyndex-drive/server/compare/v0.2.0-52...v0.2.0-53) (2022-02-10)


### Code Refactoring 🖌

* move to a proper project folder structure ([a9f3d83](https://github.com/zyndex-drive/server/commit/a9f3d83404e713cca2362436abd1b89cb68b3abe))

## [0.2.0-52](https://github.com/zyndex-drive/server/compare/v0.2.0-51...v0.2.0-52) (2022-02-09)


### Bug Fixes 🛠

* **plugins/db:** fix db-hash plugin which hangs the server which using plugin ([a152836](https://github.com/zyndex-drive/server/commit/a15283667de967e56d8c053124b93724c65aeb3f))
* **plugins/sessionmanager:** move more redundant tasks to the main create session function ([386c928](https://github.com/zyndex-drive/server/commit/386c928665d187b64775dd8af2d9bc57e5fdde43))


### Code Refactoring 🖌

* **plugins/google:** fix google oauth helpers to update to latest changes ([1ed3083](https://github.com/zyndex-drive/server/commit/1ed308385727ddba568215a047805b66b703bfb1))
* **plugins/healthcheck:** refactor health-check.ts file ([ee8e594](https://github.com/zyndex-drive/server/commit/ee8e5943516bb45ed7d56c69b39528f568a59314))
* **routes/setup:** refactor all routes which require changes as per latest updates ([556c88e](https://github.com/zyndex-drive/server/commit/556c88e807c9d0a76275ce45ef5395b8f79e290b))
* **types:** move files inside types to a proper folder structure ([4492166](https://github.com/zyndex-drive/server/commit/4492166449f2e020dcf02ede2bc4c9cfefd098c1))


### Build System 🏗

* **packages:** add passport,google-oauth,twitter-oauth packages ([735b5a0](https://github.com/zyndex-drive/server/commit/735b5a062d65a2b26cd87cc4b26f1fb9d4b27aec))


### Tests 🧪

* **tests/rest:** add latest routes rest based tests ([05a4de1](https://github.com/zyndex-drive/server/commit/05a4de1b30538cbfe5b7d36e9e2c5e29658d8bbc))


### Features 🔥

* **app.ts:** add passport initialize function after db connects ([55fcb37](https://github.com/zyndex-drive/server/commit/55fcb37afbfeb4bb0860f2bb69e48d27a3659fa0))
* **model/credentials:** change credential schema to support more oauth features ([1f2b68f](https://github.com/zyndex-drive/server/commit/1f2b68f76aba3407509d751225e6b84807fa388a))
* **models/user:** change user schema to support oauth based logins ([cf13987](https://github.com/zyndex-drive/server/commit/cf13987a364cd5d2109192ebffd248cdf0412193))
* **oauth/google:** write oauth authenticate action for login with google function ([21b269a](https://github.com/zyndex-drive/server/commit/21b269a645c36e46ccd971bafdd1ad3fa51972e6))
* **oauth/helpers:** write passport authenticate tranform function for proper error handling ([79a1aff](https://github.com/zyndex-drive/server/commit/79a1affa1d0672af5f748098ca7e23da7f0b5fe0))
* **oauth/helpers:** write passport function for oauth user verification ([ab8921e](https://github.com/zyndex-drive/server/commit/ab8921ec107d1b9cfcd82a8853b4dc468eba0dfc))
* **oauth/helpers:** write passport initialize function that initializes all the clients ([78fab85](https://github.com/zyndex-drive/server/commit/78fab8529fab57c6d88b4f4948ab6a70f7f0a79d))
* **oauth/twitter:** write oauth authenticate action for login with twitter function ([c9f2172](https://github.com/zyndex-drive/server/commit/c9f2172f3c8355bf19dad97bab23ca68fe8096f8))
* **routes/login:** write router for google oauth login ([dffefe1](https://github.com/zyndex-drive/server/commit/dffefe179f3c8748d94567873fe66caee3c2bf08))
* **routes/login:** write router for twitter oauth login ([95cc509](https://github.com/zyndex-drive/server/commit/95cc5095e07f0f02087d3e87322928fb4a7a83d0))

## [0.2.0-51](https://github.com/zyndex-drive/server/compare/v0.2.0-50...v0.2.0-51) (2022-02-04)


### Bug Fixes 🛠

* **models/credentials:** use correct encrypt plugin and change corresponding option ([d8eec82](https://github.com/zyndex-drive/server/commit/d8eec82bbcb0b399bd06f137461d11ff78d3affd))
* **models/global-settings:** fix flag type casting with mixed type ([f088fcf](https://github.com/zyndex-drive/server/commit/f088fcf13b9ac7df475f3e3ccff1be46496c5bac))
* **plugins/auth:** remove parameter requirement for objectid function ([79f9ad1](https://github.com/zyndex-drive/server/commit/79f9ad1c065a8f03028a0651013d2b36a485d533))
* **plugins/db:** fix encryption helper for db to always encrypt with object ([a5e4287](https://github.com/zyndex-drive/server/commit/a5e42872bce14fbe33de26b6a0f3c4459260d5b2))
* **plugins/otp:** fix objectid function ([0450158](https://github.com/zyndex-drive/server/commit/045015871321d95cfc9aff50c196b46b2c83dd6c))
* **plugins/server/gen:** fix endpoints generator class to properly handle errors ([79c76f0](https://github.com/zyndex-drive/server/commit/79c76f0ca89131f6a94421e09fb17a8e089b7ece))
* **plugins/server/middlewares:** fix cors middleware to properly send response headers ([d939d58](https://github.com/zyndex-drive/server/commit/d939d582bf804109820e20df1f5f99974a806b41))
* **plugins/server/middlewares:** remove first-setup middleware as it is not working as expected ([8d4f7e8](https://github.com/zyndex-drive/server/commit/8d4f7e80d4ff6a893d90df2aab6328dfadf2e32d))
* **plugins/session-manager:** fix objectid function ([d4a0ff0](https://github.com/zyndex-drive/server/commit/d4a0ff04168b208d5727b1a8e655e922979e7af8))
* **plugins/templates:** fix objectid function ([706ec25](https://github.com/zyndex-drive/server/commit/706ec2554b2a9c2e59c78cf5da421b7a485c1df0))
* **plugins/uid:** fix objectid function - now requires no parameter ([31540a7](https://github.com/zyndex-drive/server/commit/31540a7d9aa64a82d65f7d5733ead0b78fa93e8a))
* **routes/login:** fix login response, properly handle errors ([76d86a8](https://github.com/zyndex-drive/server/commit/76d86a8cca100721bb0a6d54b729c54b2fd7e76a))


### Code Refactoring 🖌

* **plugins/db/helpers:** refactor db hash plugin from promises to async/await ([824975e](https://github.com/zyndex-drive/server/commit/824975eee756ff3320cc9fac39a90d71929b3bc9))
* **plugins/google/helpers:** refactor google oauth helper function to async/await ([e2eb99c](https://github.com/zyndex-drive/server/commit/e2eb99c76e76a98903b81622f9e4790ca9102c15))
* **plugins/google/helpers:** refactor google service account handlers ([bd061ef](https://github.com/zyndex-drive/server/commit/bd061ef093859e8bb5f921fab6d2e71adaac8476))
* **plugins/google/helpers:** refactor google token resolver functions ([fc1f4a7](https://github.com/zyndex-drive/server/commit/fc1f4a74cd123d5a0986a9478a41ef0b73525b3c))
* **plugins/google:** refactor every promise function to use async/await ([303ab8b](https://github.com/zyndex-drive/server/commit/303ab8bd4bbb85a888d0015ad7765a8a19cd4923))
* **plugins/server/middlewares:** add named exports ([9cc6329](https://github.com/zyndex-drive/server/commit/9cc6329683e76e565c8d5dc0fb3662d5d5fc98c8))
* **routes/setup:** refactor every under setup route to reduce duplication ([bddfe23](https://github.com/zyndex-drive/server/commit/bddfe235239eba18ac991a39bbcc5b46ea2d9811))


### Features 🔥

* **models:** introduce new model to store server private, public and secret keys ([3f08cb3](https://github.com/zyndex-drive/server/commit/3f08cb3c4e1de093f790dc90adde3b947eba1324))
* **plugins/crypto:** add new function for generating random bytes ([57f6cc8](https://github.com/zyndex-drive/server/commit/57f6cc865da39be8fa1dd2001019b2c1bbd1e96b))
* **plugins/crypto:** enable support for decrypting with rsa algorithm ([5037369](https://github.com/zyndex-drive/server/commit/5037369ddb1d3e34e70e2633113454016138ca2d))
* **plugins/crypto:** enable support for encrypting with rsa algorithm ([f7c968b](https://github.com/zyndex-drive/server/commit/f7c968bfef578b871ea16d983ac618382151c9ba))
* **plugins/jwt:** use jose to generate rsa and es256 keys ([df311c8](https://github.com/zyndex-drive/server/commit/df311c80518c0c6734144a5ec46752d4e919d6ef))
* **plugins/jwt:** use the new keys database and use es256 keys to generate jwt ([c35dfb3](https://github.com/zyndex-drive/server/commit/c35dfb381e1f9845370a22a9bbc609a81c1b3f6d))
* **plugins/server/gen:** use header param to enable lean document request ([7744782](https://github.com/zyndex-drive/server/commit/7744782eaf28e4cc89df2b6cc6e8532e0a9d0d82))
* **plugins/server/middlewares:** add secret check and setup check middlewares ([2e7a710](https://github.com/zyndex-drive/server/commit/2e7a710ba0725538ae06b8779bef8db2a8c72325))
* **routes/setup:** add route for generating random bytes, random rsa & es256 keys ([41402e0](https://github.com/zyndex-drive/server/commit/41402e0a0fba7bf185cd923997079777f98aaeb3))
* **routes:** use the new setup and secret check middlewares ([ac3498a](https://github.com/zyndex-drive/server/commit/ac3498a83e11f240ea3682a749808ca9dd576ba9))


### Tests 🧪

* **rest/login:** write rest test case login/user route ([82e3e33](https://github.com/zyndex-drive/server/commit/82e3e3348fc410e71d4d8a2faa136eccc700a165))
* **rest/setup:** add rest test cases for setup routes ([c14d172](https://github.com/zyndex-drive/server/commit/c14d1724225abc5eee6a0d672b1ce37709aff50b))


### Others 🔧

* **ignore:** fix ignore files to properly ignore unnecessary files ([34b7927](https://github.com/zyndex-drive/server/commit/34b79270987410c695a06b17fdf0519a35916cba))
* **types:** declare lean-doc-request header to express types ([924478b](https://github.com/zyndex-drive/server/commit/924478b3fd208ce990da18be5291f830922c3e30))


### Build System 🏗

* **packages:** remove crypto-js module, use native nodejs crypto module ([a803618](https://github.com/zyndex-drive/server/commit/a803618129e08f57f3942d6962e0d74595f3ec42))

## [0.2.0-50](https://github.com/zyndex-drive/server/compare/v0.2.0-49...v0.2.0-50) (2022-01-30)


### Code Refactoring 🖌

* **plugins:** completely refactor all the plugins to async/await from promises' ([d417cfe](https://github.com/zyndex-drive/server/commit/d417cfe0a151eedc9033cbf87f5a3765072044ef))

## [0.2.0-49](https://github.com/zyndex-drive/server/compare/v0.2.0-48...v0.2.0-49) (2022-01-18)


### Bug Fixes 🛠

* **auth/helpers:** fix model helper for retreiving role docs ([d111d44](https://github.com/zyndex-drive/server/commit/d111d44ceb4da59478e642f5ef7c0c6ecf6ebd6a))


### Features 🔥

* **db:** add support for test database ([cb84d8d](https://github.com/zyndex-drive/server/commit/cb84d8d9670bef8791b347a0c7316426a038b322))
* **errors:** introduce http error classes ([cf06b81](https://github.com/zyndex-drive/server/commit/cf06b8121345095a27f9b56e8a5dcb79ca2b1df5))
* **plugins/server:** add a setup route generator for redundant routes ([f5130ba](https://github.com/zyndex-drive/server/commit/f5130ba3c13f727a42ea5faa39f7bd873a4080fc))


### Code Refactoring 🖌

* **google:** refactor google helper methods to use new http Error classes ([aab63c5](https://github.com/zyndex-drive/server/commit/aab63c51afc8dc3e137fb61ab7a134e67581499e))
* **middlewares:** refactor promises to async/await and use new Error Classes ([f643aef](https://github.com/zyndex-drive/server/commit/f643aef7853d85c0204647fb8997eca556b7ed21))
* **responses:** refactor responses and remove all error methods ([1cc29e7](https://github.com/zyndex-drive/server/commit/1cc29e73caa3e1e6d09d42a52dbcf1950e37d276))
* **routes:** remove massive redundant code and use new Error Classes ([1539e8e](https://github.com/zyndex-drive/server/commit/1539e8e6716a41225aacab8095dbf6e781d2a79b))


### Tests 🧪

* **rest-test:** move rest tests to a seperate folder ([2887a9f](https://github.com/zyndex-drive/server/commit/2887a9f0eb9d597364f424ee08a20ee4275246ee))

## [0.2.0-48](https://github.com/zyndex-drive/server/compare/v0.2.0-47...v0.2.0-48) (2022-01-12)


### Docs 📃

* **models:** add a readme for models for future reference ([99c6db7](https://github.com/zyndex-drive/server/commit/99c6db73c806be77ed0008f261e4a5a049b20c0f))


### Bug Fixes 🛠

* **plugins/server:** remove type parameters for response handlers ([5b56232](https://github.com/zyndex-drive/server/commit/5b56232c5ea19d7b1924e75e30ecfb6fc0374f4f))
* **plugins:** remove lean methods for some models as it creates problems ([5bb234e](https://github.com/zyndex-drive/server/commit/5bb234ed917e5b591c859abf31f2877540000df2))
* **routes:** remove lean methods for some models ([b1c1104](https://github.com/zyndex-drive/server/commit/b1c11044dd3705dfccb4d0c7234f0069a87d444a))


### Build System 🏗

* **package:** add morgan package for rest logger ([3de1f45](https://github.com/zyndex-drive/server/commit/3de1f452d0c0d4d937152da88c57d77a02bf3eec))


### Tests 🧪

* **routes/setup:** add rest based tests for route - setup/credentials ([1774df7](https://github.com/zyndex-drive/server/commit/1774df75809ac89205999ac84252552351ea5ca4))

## [0.2.0-47](https://github.com/zyndex-drive/server/compare/v0.2.0-46...v0.2.0-47) (2022-01-09)


### Features 🔥

* **models:** introduce lean document types for all models ([4f34628](https://github.com/zyndex-drive/server/commit/4f346289547c82929db3f3b4a5ee8cbb9a340c25))
* **plugins:** use lean based mongo queries for faster performance ([e7c563e](https://github.com/zyndex-drive/server/commit/e7c563ed05b74f079c57e19ef44e6c432d22f249))
* **routes/login:** write user login route ([be12108](https://github.com/zyndex-drive/server/commit/be12108406786adc9d9edb2ce9c0501d1b59ceb6))
* **routes:** use lean queries for faster performance ([85f1b58](https://github.com/zyndex-drive/server/commit/85f1b584ccd4b1e3f1675dcaa391f91b7c286d03))


### Code Refactoring 🖌

* **app:** change misc console.logs ([fbda11d](https://github.com/zyndex-drive/server/commit/fbda11da5a194064d81b812a539f1d842b280c75))
* **routes:** rename first-setup folder to setup ([c0c0e48](https://github.com/zyndex-drive/server/commit/c0c0e4895613d67486d4ec6469487e2795e44b8e))

## [0.2.0-46](https://github.com/zyndex-drive/server/compare/v0.2.0-45...v0.2.0-46) (2022-01-08)


### Features 🔥

* **routes/setup:** completely scaffold setup api routes ([9d17424](https://github.com/zyndex-drive/server/commit/9d174246fec9115d29dc6197580b2e19a8fd4774))


### Code Refactoring 🖌

* **app:** refactor imports ([988d62e](https://github.com/zyndex-drive/server/commit/988d62ea61cb145619455ecd09376b090a45f39f))
* **models:** fix every models's type imports ([37f4e8a](https://github.com/zyndex-drive/server/commit/37f4e8a7a8e5e7778b6a8e19615480c2ad48aced))
* **plugins:** add default imports and exports for many plugins ([e316646](https://github.com/zyndex-drive/server/commit/e316646244e6c920bd730ae214aac1931207cfba))
* **plugins:** fix every plugin's model type imports ([4094721](https://github.com/zyndex-drive/server/commit/4094721d903e094ba8be47c6df99c1b2ffa690a1))
* **routes:** fix model type imports ([3dbe285](https://github.com/zyndex-drive/server/commit/3dbe285e0a7939c0196508cef371e9cac358db03))

## [0.2.0-45](https://github.com/zyndex-drive/server/compare/v0.2.0-44...v0.2.0-45) (2022-01-06)


### Build System 🏗

* **package:** remove unused packages ([b1c1b6f](https://github.com/zyndex-drive/server/commit/b1c1b6fdba140bf074245fc6f835f4092d1125c6))


### Bug Fixes 🛠

* **models:** fix session model schema ([d743cb8](https://github.com/zyndex-drive/server/commit/d743cb8d93777321ed78ac4ef1ee729155686104))
* **plugins/google:** fix function overloading typescript ([7217df1](https://github.com/zyndex-drive/server/commit/7217df1373e9da53c6780d7ebc0a496bc564c9d3))
* **plugins/mail:** add default exports for mail plugin ([2476dab](https://github.com/zyndex-drive/server/commit/2476dab341626277261eaad8ed51e667527313ec))


### Features 🔥

* **plugins/jwt:** write jwt plugin for signing json web tokens ([80dde12](https://github.com/zyndex-drive/server/commit/80dde12e822dd267374ac21ae63c5795155fabe4))
* **plugins/jwt:** write verify jwt function for decrypting and verifying jwts ([c7976ff](https://github.com/zyndex-drive/server/commit/c7976ff4892e446ec6c74318545306e2335529f5))
* **plugins/session-manager:** write methods and function for session-manager plugin ([f886692](https://github.com/zyndex-drive/server/commit/f886692bd0e1cbd9a7ad0293bdbcfbab4dccbbb6))

## [0.2.0-44](https://github.com/zyndex-drive/server/compare/v0.2.0-43...v0.2.0-44) (2022-01-05)


### Bug Fixes 🛠

* **models:** fix smtp provider schema by adding dkim details ([4f10408](https://github.com/zyndex-drive/server/commit/4f10408e2147cf79582cd2a5c37541107bf62134))
* **plugins/google:** add more google api scopes for more control over api ([83f7e3a](https://github.com/zyndex-drive/server/commit/83f7e3a02ddbc1e2bb7d0c1ecc5fc359e400e5b7))


### Features 🔥

* **plugins/google:** refactor and introduce function overloads for solving conditional return types ([7406494](https://github.com/zyndex-drive/server/commit/7406494cb0f6eed25164bdb0a06d5f6b047714ad))
* **plugins/mail:** add functions for mail-transporter plugin with nodemailer ([7f3da72](https://github.com/zyndex-drive/server/commit/7f3da7287d946c2e50ddd4304adac8ad2a3ac6e6))


### Build System 🏗

* **eslint:** add support for function overloading in ts ([751df21](https://github.com/zyndex-drive/server/commit/751df21b5ec72e51445c94e4f4a06bb1b367b939))

## [0.2.0-43](https://github.com/zyndex-drive/server/compare/v0.2.0-42...v0.2.0-43) (2022-01-04)


### Code Refactoring 🖌

* **plugins:** add default model import and exports ([1daceae](https://github.com/zyndex-drive/server/commit/1daceaecfc56344364bee288e0bc85f0eda21050))


### Features 🔥

* **models:** add otp model to verify users using otp ([7272e24](https://github.com/zyndex-drive/server/commit/7272e24ac6d9091c1cfce26f4e0247bb6097d3cc))
* **plugins/mail-transporter:** write mail transporter plugin ([b946374](https://github.com/zyndex-drive/server/commit/b9463744449f8c5ca96d1cf985ba914a700d9154))
* **plugins/otp:** write otp generator plugins ([0de1f94](https://github.com/zyndex-drive/server/commit/0de1f940f25df60c1c8c34f7b97b2f2a1728db49))

## [0.2.0-42](https://github.com/zyndex-drive/server/compare/v0.2.0-41...v0.2.0-42) (2022-01-04)


### Code Refactoring 🖌

* **models:** add template model exports ([77d45eb](https://github.com/zyndex-drive/server/commit/77d45eba584e1a555acb138f3cd8e93058da7090))


### Features 🔥

* **plugins/auth:** write auth functions for all the policies ([7faf8b4](https://github.com/zyndex-drive/server/commit/7faf8b4d40f680b082d7d3bfada8fc27850f6b8e))
* **plugins/templates:** add policies for templates ([a147255](https://github.com/zyndex-drive/server/commit/a147255431952a3853bf5da25f3b83d75670fcca))

## [0.2.0-41](https://github.com/zyndex-drive/server/compare/v0.2.0-40...v0.2.0-41) (2021-12-31)


### Features 🔥

* **plugins/auth:** add model method helper functions ([2e19168](https://github.com/zyndex-drive/server/commit/2e191681859a4767820d7a0c369ff57a4d51684d))
* **plugins/auth:** move user functions to seperate folder ([237015b](https://github.com/zyndex-drive/server/commit/237015b67d1dc6f1c89c7ae19e45e0a70bfba9bb))
* **plugins/auth:** write auth policy functions for credential functions ([3354865](https://github.com/zyndex-drive/server/commit/3354865b050f072aa47626b9ffcefea82bbdd662))

## [0.2.0-40](https://github.com/zyndex-drive/server/compare/v0.2.0-39...v0.2.0-40) (2021-12-30)


### Bug Fixes 🛠

* **models/user:** fix model user types ([606cd88](https://github.com/zyndex-drive/server/commit/606cd8853b7e3e8fecd6b25cea26124ce4fedb29))
* **plugins/google:** fix google requester function to throw errors ([6ea6889](https://github.com/zyndex-drive/server/commit/6ea688930a67145ec54746b9f6f7e211d79ef95b))


### Features 🔥

* **plugins/auth:** fix auth policy checker to check for policy when no scope is passed ([457847d](https://github.com/zyndex-drive/server/commit/457847d1e1c9c50491c37d69cb7ee263bf086a9b))
* **plugins/auth:** write a function to check policy and modify user object ([515d9b4](https://github.com/zyndex-drive/server/commit/515d9b48530d334aa02253889c749d7e013032e7))
* **plugins/auth:** write auth function - user/policies ([47bf3e9](https://github.com/zyndex-drive/server/commit/47bf3e9020e2402069a46818b90fd05251468b23))
* **plugins/auth:** write auth function - user/remove ([47fd81e](https://github.com/zyndex-drive/server/commit/47fd81e43c84ee8923da1ea32fc0628742a58b28))
* **plugins/auth:** write auth function - user/restrict ([556b933](https://github.com/zyndex-drive/server/commit/556b933dde8fe994a4ff06026326699c89ad380b))
* **plugins/auth:** write auth function - user/scope ([d899685](https://github.com/zyndex-drive/server/commit/d899685ddc6d6573787d4dc8c225d279394cc709))

## [0.2.0-39](https://github.com/zyndex-drive/server/compare/v0.2.0-38...v0.2.0-39) (2021-12-29)


### Features 🔥

* **plugins/auth:** some misc helper functions for policy check ([b632972](https://github.com/zyndex-drive/server/commit/b632972528619ebcae0d8451d77d21b681514629))
* **plugins/auth:** write a complete function to check policies and authorize the user ([2e4f146](https://github.com/zyndex-drive/server/commit/2e4f146b1f063e5034d471a24031299e1854b1d9))
* **plugins/auth:** write a function to check the heirarchy of the user and admins ([c99f8ad](https://github.com/zyndex-drive/server/commit/c99f8ad75d43c9b04dfc1dd0ef7655c5650aba8f))


### Build System 🏗

* **packages:** add mathjs package ([eaa560c](https://github.com/zyndex-drive/server/commit/eaa560cd22061d0e6c33fd1788a471e1de7fda6f))

## [0.2.0-38](https://github.com/zyndex-drive/server/compare/v0.2.0-37...v0.2.0-38) (2021-12-29)


### Bug Fixes 🛠

* **models:** fix bad schema in pending-user and user models ([e858dc5](https://github.com/zyndex-drive/server/commit/e858dc58978d5df4ce1d5c3dbad7698cc0cf4026))


### Features 🔥

* **plugins/auth:** refactor auth helpers, write function to support policy check for pending users ([3977dc2](https://github.com/zyndex-drive/server/commit/3977dc2b428d8a967ab7c5a0c56aedb83882fb33))
* **plugins/auth:** refactor user auth policies and write auth policies for blacklist function ([36a4ca6](https://github.com/zyndex-drive/server/commit/36a4ca67fddbc52ed1893a6cd232fd7cab229d58))
* **plugins/auth:** write auth policies for user/blacklist function ([e1eabd6](https://github.com/zyndex-drive/server/commit/e1eabd6a54874df10b5c57dd13da1a8cb8e9b733))
* **plugins/auth:** write auth policies for user/promote functions ([e1a8f00](https://github.com/zyndex-drive/server/commit/e1a8f0014fb148f153bfb85f1bb50b0989f36ca4))
* **views:** add backend dashboard html files ([5f4716c](https://github.com/zyndex-drive/server/commit/5f4716cbcaf3a789b4d220c432d81827219a5f40))


### Others 🔧

* add some misc index.ts files for easy imports ([4eda2b4](https://github.com/zyndex-drive/server/commit/4eda2b4f328fee7a60600f8fdcd16cbcfc82c646))

## [0.2.0-37](https://github.com/zyndex-drive/server/compare/v0.2.0-36...v0.2.0-37) (2021-12-25)


### Code Refactoring 🖌

* fix callback hell by using function chaining ([37719d8](https://github.com/zyndex-drive/server/commit/37719d87e97a9029f83742b9ee209ceaa3f3d750))
* **plugins:** refactor auth files to use promise chaining ([929fb62](https://github.com/zyndex-drive/server/commit/929fb622cd339a0c1a1134dfbc510314ed46571a))


### Features 🔥

* **routes:** serve index file to get request ([2f2dddb](https://github.com/zyndex-drive/server/commit/2f2dddb98fa680ec45b4e7a98cb5af4b6c682193))
* **views:** add html files ([52a2b4c](https://github.com/zyndex-drive/server/commit/52a2b4c985fab89d747a4ddcfafd9ae6d8e42c35))

## [0.2.0-36](https://github.com/zyndex-drive/server/compare/v0.2.0-35...v0.2.0-36) (2021-12-21)


### Bug Fixes 🛠

* **models/policy:** fix policy model schema ([856923a](https://github.com/zyndex-drive/server/commit/856923a6922a8bd635a4c32cf0747567888bb0e1))


### Features 🔥

* **plugins/auth:** use policy documents from the database to check policies ([4ff04f8](https://github.com/zyndex-drive/server/commit/4ff04f8b18a407b31beacaa36fb86f693e91aed7))


### Code Refactoring 🖌

* **plugins/google:** fix the callback hell with .then chaining ([c614139](https://github.com/zyndex-drive/server/commit/c614139bd77d1a2ba93a3406f5f9ef7447cc8c60))

## [0.2.0-35](https://github.com/zyndex-drive/server/compare/v0.2.0-34...v0.2.0-35) (2021-12-20)


### Code Refactoring 🖌

* **templates:** refactor policy, role templates to use the new objectid function ([05c86ce](https://github.com/zyndex-drive/server/commit/05c86cecfcf51a487455b6f372277307f2abd283))


### Bug Fixes 🛠

* **models:** update some model type configurations ([361ea6b](https://github.com/zyndex-drive/server/commit/361ea6b8d9baccf44aad0a87e0336d074939afc6))


### Features 🔥

* **auth:** auth plugin - viewer accept function ([ca80236](https://github.com/zyndex-drive/server/commit/ca802369abb430e0df32a48e3c31dbbdc42fc3b1))
* **auth:** auth plugin - viewer blacklist function ([90c3a02](https://github.com/zyndex-drive/server/commit/90c3a024f1c58bbd84f9d512783faa8f72b774c6))
* **auth:** update policy-checker function to use heirarchy checker ([627eccd](https://github.com/zyndex-drive/server/commit/627eccd20fdde69d9030aa78dcb6028cb006b0aa))
* **plugins/auth:** write a new heirarchy checker for auth plugin ([712e655](https://github.com/zyndex-drive/server/commit/712e655c061c77d90efb2bd087e0f870eb2bea1e))

## [0.2.0-34](https://github.com/zyndex-drive/server/compare/v0.2.0-33...v0.2.0-34) (2021-12-20)


### Build System 🏗

* fix build script to remove obfuscation ([a009ac3](https://github.com/zyndex-drive/server/commit/a009ac3096093a92c0280e97df523d2decee0b5c))
* update build script ([d076707](https://github.com/zyndex-drive/server/commit/d0767075b496af4c92e0ba383e0bd68e7fca5c57))


### Features 🔥

* **models:** update pending-user schema type ([443754f](https://github.com/zyndex-drive/server/commit/443754f4a349e2b91a06b706b1cee1db10418136))
* **plugins/auth:** auth plugin - viewer accept function ([d214c99](https://github.com/zyndex-drive/server/commit/d214c99416ddd7258b7e5c3805dac183c4549846))
* **plugins/auth:** create a helper function for checking user policies ([4d9c32c](https://github.com/zyndex-drive/server/commit/4d9c32c1b454881ce3c1e8ec502b0f9ae8046180))


### Code Refactoring 🖌

* **templates:** fix objectid in role templates ([eb84cb9](https://github.com/zyndex-drive/server/commit/eb84cb90f4b461257620652aa770198d0f28e81f))


### Bug Fixes 🛠

* **models:** fix user types ([03297cc](https://github.com/zyndex-drive/server/commit/03297cc36ad6bbe1d9b9a8b8221531ec1a656ec7))
* **types:** fix object id type ([13b5a00](https://github.com/zyndex-drive/server/commit/13b5a00350c0b44e786d4cae54aedd2b7dc7481c))

## [0.2.0-33](https://github.com/zyndex-drive/server/compare/v0.2.0-32...v0.2.0-33) (2021-11-30)


### Build System 🏗

* remove obfuscation ([2f7716c](https://github.com/zyndex-drive/server/commit/2f7716c9ab7d7898968be85e6ada7e1f45055803))

## [0.2.0-32](https://github.com/zyndex-drive/server/compare/v0.2.0-31...v0.2.0-32) (2021-11-30)


### CI 🛠

* **build:** update build script ([6ad0e4a](https://github.com/zyndex-drive/server/commit/6ad0e4a757e3e8130d3af2c683642e553cb3c4ab))


### Build System 🏗

* **webpack:** add webpack to bundle all the files to a single file ([d6ae2d9](https://github.com/zyndex-drive/server/commit/d6ae2d9854f98086c1b5d43f43c52b3b451ead2f))

## [0.2.0-31](https://github.com/zyndex-drive/server/compare/v0.2.0-30...v0.2.0-31) (2021-11-30)


### CI 🛠

* **build:** add support for minification for final code ([9c993dd](https://github.com/zyndex-drive/server/commit/9c993dd465fe45d917724a5be3162a9c81f3ef59))
* **scripts:** update build and deploy scripts ([836d93d](https://github.com/zyndex-drive/server/commit/836d93d185765d062b70d0eb4e090a131b0919e2))
* **scripts:** update deploy script ([a8de306](https://github.com/zyndex-drive/server/commit/a8de306e812ba370256ea5bf1203238aff9be87a))

## [0.2.0-30](https://github.com/zyndex-drive/server/compare/v0.2.0-29...v0.2.0-30) (2021-11-27)


### Bug Fixes 🛠

* **models:** fix encrypt settings for some models ([59b59d4](https://github.com/zyndex-drive/server/commit/59b59d4be973d41ebd71330c69f4b5e71f6323b8))


### Others 🔧

* **vscode:** add vscode build and test tasks ([9a5c047](https://github.com/zyndex-drive/server/commit/9a5c047085eab195bc550d58cd31291411c6b4b6))


### CI 🛠

* **scripts:** update build scripts, remove travis-ci ([11edd05](https://github.com/zyndex-drive/server/commit/11edd05d31221d53ef6d87add5a58cc64ae46e55))

## [0.2.0-29](https://github.com/zyndex-drive/server/compare/v0.2.0-28...v0.2.0-29) (2021-11-27)


### Others 🔧

* **vscode:** add vscode launch configurations ([1acd7a8](https://github.com/zyndex-drive/server/commit/1acd7a8ba282b5669516101a22e16ce2b7fc518c))


### CI 🛠

* **scripts:** add deploy and build scripts for ci ([7b7b8a5](https://github.com/zyndex-drive/server/commit/7b7b8a5ff939d42486b9fa54ab884cd2281a74cc))
* **travis:** add travis-ci configuration ([cedea5c](https://github.com/zyndex-drive/server/commit/cedea5c322bd60ab75528f4c1dcad763d95e001f))
* **yarn:** add yarn workspace and version plugins, update package.json script ([23116de](https://github.com/zyndex-drive/server/commit/23116de666c8f27dc669f3e2c9c5045720e90f1a))

## [0.2.0-28](https://github.com/zyndex-drive/server/compare/v0.2.0-27...v0.2.0-28) (2021-11-26)


### Tests 🧪

* refactor all tests to seperate files and seperate api and unit tests ([0875840](https://github.com/zyndex-drive/server/commit/0875840b126172269af90e1e2ff217e5c3599166))
* **tests:** add chai-each package ([e9ad014](https://github.com/zyndex-drive/server/commit/e9ad01485f5755d2766973763a0e94837b6ae373))


### Bug Fixes 🛠

* **setup/roles:** fix redundant respose which crashed server ([dae65a6](https://github.com/zyndex-drive/server/commit/dae65a6880c53394c1ad3b698a0533cbcd7f0de4))

## [0.2.0-27](https://github.com/zyndex-drive/server/compare/v0.2.0-26...v0.2.0-27) (2021-11-25)


### Features 🔥

* **models:** add a new model - templates for managing email templates ([4b33fe9](https://github.com/zyndex-drive/server/commit/4b33fe91140f10c996a67d34b09af68bc5edaada))
* **plugins/db:** write a base64 encode plugin for mongoose ([d07a652](https://github.com/zyndex-drive/server/commit/d07a652de61776091dc97cddd670164172c90927))


### Bug Fixes 🛠

* **models:** fix types for various models ([17919b2](https://github.com/zyndex-drive/server/commit/17919b2f5f79fd1b05b2296fa808a5e6bfabbd0e))

## [0.2.0-26](https://github.com/zyndex-drive/server/compare/v0.2.0-25...v0.2.0-26) (2021-11-25)


### Code Refactoring 🖌

* **db/statics:** remove static helpers as it is implemented in plugin ([58328d9](https://github.com/zyndex-drive/server/commit/58328d9daa4203db1d00b07923a39e0d3b11a0d8))
* **plugins/google:** refactor to latest changes in models ([a870db9](https://github.com/zyndex-drive/server/commit/a870db9401fab961c55d20ffb9f856de5addc093))
* **routes:** refactor to reflect latest changes in models ([8dad14b](https://github.com/zyndex-drive/server/commit/8dad14b80ba9ce60d6ccdf80ba56b304d760b2d0))


### Features 🔥

* **db/helpers:** write a bcrypt hasher for helping db functions ([0b66cb3](https://github.com/zyndex-drive/server/commit/0b66cb35c93d9709940806893ccf2491cee7db45))
* **db/plugins:** write a crypto mongoose plugin ([b3292fb](https://github.com/zyndex-drive/server/commit/b3292fb5971822975aaf119763dd13d6284b9dad))
* **db/plugins:** write a hash mongoose plugin ([254dad7](https://github.com/zyndex-drive/server/commit/254dad7f5e8846c4bdcb0ca40c46e7ca0b7fdd79))
* **db/plugins:** write a schema parser for parsing schemas from mongoose ([d4a91eb](https://github.com/zyndex-drive/server/commit/d4a91eb55a3f14a0d23025e2642a16860fa4df7f))
* **models:** use the new crypto and hash plugin ([b32d483](https://github.com/zyndex-drive/server/commit/b32d483f451534cb6867447ecf84bd3af20b5764))

## [0.2.0-25](https://github.com/zyndex-drive/server/compare/v0.2.0-24...v0.2.0-25) (2021-11-23)


### CI 🛠

* **deepsource:** remove deepsource pipeline ([188bfea](https://github.com/zyndex-drive/server/commit/188bfea8ed318df15a30e8868af8cbe31518a403))

## [0.2.0-24](https://github.com/zyndex-drive/server/compare/v0.2.0-23...v0.2.0-24) (2021-11-23)


### Docs 📃

* **types:** document model static function types ([d6d07a0](https://github.com/zyndex-drive/server/commit/d6d07a087170cb7766eda6503f2268e17677bcaa))

## [0.2.0-23](https://github.com/zyndex-drive/server/compare/v0.2.0-22...v0.2.0-23) (2021-11-22)


### Build System 🏗

* **packages:** update packages to latest versions ([caa6167](https://github.com/zyndex-drive/server/commit/caa6167310a8879a3d59565a2bae1d4da1ec67e6))


### Styling 🎨

* **changelog:** add emoji headlines for automated changelogs ([a409941](https://github.com/zyndex-drive/server/commit/a409941cdea28ab906620ba6c7843a40d2a9bc96))


### Features 🔥

* **db/encrypt:** add support for multi-level encryption of objects in database ([dfda3c0](https://github.com/zyndex-drive/server/commit/dfda3c0b1f470a6d9f55d1c18e432fe4fa50d73a))
* **models:** add encrypted fields for models ([b16ec6b](https://github.com/zyndex-drive/server/commit/b16ec6bae4f443f41d9a55c5d45c7f2db949b708))

## [0.2.0-22](https://github.com/zyndex-drive/server/compare/v0.2.0-21...v0.2.0-22) (2021-11-22)


### Bug Fixes

* **typos:** fix import typos to various files ([f30006f](https://github.com/zyndex-drive/server/commit/f30006ffec7b7ebe5b02d87ea8646bdc1f895fd0))


### Build System

* **manager:** move to yarn v2 package manager for better management ([4333235](https://github.com/zyndex-drive/server/commit/4333235ce3b2a64d40b36a55a200b3d08299d0c1))
* **yarn:** add plugins for updating packages and installing typescript packagex ([a044923](https://github.com/zyndex-drive/server/commit/a044923070b25c259932a518e7c7bbd8777fea67))

## [0.2.0-21](https://github.com/zyndex-drive/server/compare/v0.2.0-20...v0.2.0-21) (2021-11-20)


### Features

* **crypto:** add functions for encrypt/decrypt objects and strings ([55a99cd](https://github.com/zyndex-drive/server/commit/55a99cdf313187352b6a1c2fd9e49d8f36e95e81))
* **models:** add more static functions to all models, use base types for easy workflow ([646ac44](https://github.com/zyndex-drive/server/commit/646ac449216ed4ecf20e2e1623c9128db44e214d))
* **plugins/db:** enable support for encrypting and decrypting fields in the database ([84ca98d](https://github.com/zyndex-drive/server/commit/84ca98d3efe786e2095423074f72d07d46e81f71))


### Code Refactoring

* **models:** create a base model type ([206c3fc](https://github.com/zyndex-drive/server/commit/206c3fcf65097129a5f1e987b867532652d4a07d))
* **plugins/db/statics:** move db static functions to seperate statics folder ([9da4254](https://github.com/zyndex-drive/server/commit/9da4254f4f2bf46c94f99f3dc45550f2e539b612))
* **plugins/google:** refactor encrypt and decrypt functions ([bc4512a](https://github.com/zyndex-drive/server/commit/bc4512aecfc358ea0eb77b6956d2e783a2dcd6cf))
* **plugins/server:** refactor endpoint generator to a class ([28569fe](https://github.com/zyndex-drive/server/commit/28569fe6378c94d8b742f1e320ff91ab75ca7759))
* **routes:** update all routes to use the new endpointgenerator class ([df5684c](https://github.com/zyndex-drive/server/commit/df5684ca1d9d2ec799bc6a73e82cae018b7034de))

## [0.2.0-20](https://github.com/zyndex-drive/server/compare/v0.2.0-19...v0.2.0-20) (2021-11-17)


### Features

* **plugins/crypto:** add function for encrypting strings ([598397f](https://github.com/zyndex-drive/server/commit/598397f29d837c28671e86f6496c3c5b456702cd))
* **plugins/db:** write function to encrypt particular fields before saving to database ([eb38db9](https://github.com/zyndex-drive/server/commit/eb38db931eb666c0102efa159f2951796029cd1e))


### Bug Fixes

* **server:** connect to database only when server is live ([7e9e50a](https://github.com/zyndex-drive/server/commit/7e9e50aa4a0fbd22b24b8c6a13b1d90664b222a2))


### Code Refactoring

* **plugins/templates:** rename variable names to follow camelCasing ([636597f](https://github.com/zyndex-drive/server/commit/636597fb83d430a292fff1c04d23c5998c46257b))
* **server/endpoints:** refactor server/endpoint generator function into a class ([4d339eb](https://github.com/zyndex-drive/server/commit/4d339eb7a3eb7d107acb6b8e2aafb47f101c06ac))

## [0.2.0-19](https://github.com/zyndex-drive/server/compare/v0.2.0-18...v0.2.0-19) (2021-11-01)


### Code Refactoring

* massive refactor of entire folder structure of the project ([8142533](https://github.com/zyndex-drive/server/commit/8142533296e6bc34e1c89458238ca5b231b03509))

## [0.2.0-18](https://github.com/zyndex-drive/server/compare/v0.2.0-17...v0.2.0-18) (2021-10-14)


### Features

* **google/drive:** implement download method for drive/files ([fadfdc7](https://github.com/zyndex-drive/server/commit/fadfdc79ccce36411e413855661659215d8c9818))
* **google/misc:** add mimetypes, consolidated scopes, other miscs ([3be9cc7](https://github.com/zyndex-drive/server/commit/3be9cc7dbcae3a99995835205b0b175e66b54dcc))
* **google/requester:** implement stream method for google requester ([3fbe000](https://github.com/zyndex-drive/server/commit/3fbe000c95ae56f3dec2cca93b95a14dc61d8095))

## [0.2.0-17](https://github.com/zyndex-drive/server/compare/v0.2.0-16...v0.2.0-17) (2021-10-10)


### Features

* **google/files:** add more advanced options for searching files in google/drive api ([c7b381d](https://github.com/zyndex-drive/server/commit/c7b381d935cd685c0afa2a8c10bbaf82a462efc4))

## [0.2.0-16](https://github.com/zyndex-drive/server/compare/v0.2.0-15...v0.2.0-16) (2021-10-09)


### Features

* **google/drive:** implement search in google/drive/files api ([179b4f7](https://github.com/zyndex-drive/server/commit/179b4f76608ad09d938fba348329e6097973c557))

## [0.2.0-15](https://github.com/zyndex-drive/server/compare/v0.2.0-14...v0.2.0-15) (2021-10-09)


### Features

* **google/drive:** add api methods for drive/files route ([a6a7bd2](https://github.com/zyndex-drive/server/commit/a6a7bd250545d3c01b55d8be80d891a7c1135a84))
* **google/helpers:** add function to construct google fields parameter ([5402fd1](https://github.com/zyndex-drive/server/commit/5402fd11719d59205682d26c0c4b9bf71808e3dd))


### Docs

* **readme:** add code quality badges ([464cf0b](https://github.com/zyndex-drive/server/commit/464cf0bd12d5cf77d67af4ffd0ec46d7c3c72d49))


### Build System

* **package:** add got package for managing streaming requests ([b52c80c](https://github.com/zyndex-drive/server/commit/b52c80c5044b834ca3c1a691cf267ffe6ee52513))

## [0.2.0-14](https://github.com/zyndex-drive/server/compare/v0.2.0-13...v0.2.0-14) (2021-10-09)


### Features

* **google/api:** add api doc for google/drive/files and fix google requester ([c5291bb](https://github.com/zyndex-drive/server/commit/c5291bb9263f428cac12810007f66d047aea740d))

## [0.2.0-13](https://github.com/zyndex-drive/server/compare/v0.2.0-12...v0.2.0-13) (2021-10-06)


### Features

* **google/drive:** add method exports for google/drive ([ae104bc](https://github.com/zyndex-drive/server/commit/ae104bca3c08477f9261cd8ada4f536e61f0c423))
* **google/drives:** add api methods for drive/drives ([479faab](https://github.com/zyndex-drive/server/commit/479faabe02f852fba83b519e6fd08cfa4816e9e3))
* **google/drives:** add api methods for drive/permissions ([46f2505](https://github.com/zyndex-drive/server/commit/46f25053a5e92f28c95a8f7d30f3104f3b5c0d5e))
* **google/requester:** add patch request method for google/requester function ([59af9c5](https://github.com/zyndex-drive/server/commit/59af9c51a8f5f9054be96a8265e5882652a674bf))


### Others

* **google/iam:** add scope exports ([e92534a](https://github.com/zyndex-drive/server/commit/e92534a9d3e300c9a73cdd28374ccfdab8f61c99))


### Docs

* **google/drive:** add api documentation for drive/files ([b30bd10](https://github.com/zyndex-drive/server/commit/b30bd104bbc365dea4a999eb68bca7c928ae56fd))


### Code Refactoring

* **google/api:** add default exports ([4c985ba](https://github.com/zyndex-drive/server/commit/4c985ba1851deb003647d92ff9ce82ecd8275c5a))

## [0.2.0-12](https://github.com/zyndex-drive/server/compare/v0.2.0-11...v0.2.0-12) (2021-10-05)


### Features

* **google/api:** update existing methods to new requester type hintings ([4f23dd0](https://github.com/zyndex-drive/server/commit/4f23dd02a1c2dc333100c1c216271c0b5b8a8ca7))
* **google/requester:** add complete type hintings for requester ([2155e16](https://github.com/zyndex-drive/server/commit/2155e16925a86a5dc3022c85c44a4e2ae7d5162c))

## [0.2.0-11](https://github.com/zyndex-drive/server/compare/v0.2.0-10...v0.2.0-11) (2021-10-04)


### Features

* **google/drives:** add api methods for google/drive/drives and about routes ([994f4bd](https://github.com/zyndex-drive/server/commit/994f4bd836b8925a226587e428ca604a8634b874))
* **google/requester:** add type hintings for google request and response ([d3fb195](https://github.com/zyndex-drive/server/commit/d3fb195221ff1c6e4f2b4d8eaae930c0af89807d))


### Build System

* **package:** add uuid package ([ec92b2c](https://github.com/zyndex-drive/server/commit/ec92b2c3d326785e51acfe27635c83a9105839e1))

## [0.2.0-10](https://github.com/zyndex-drive/server/compare/v0.2.0-9...v0.2.0-10) (2021-10-02)


### Features

* **google/iam:** add iam - service account methods ([49e2e3f](https://github.com/zyndex-drive/server/commit/49e2e3fbceea3e4230f88461b29ec2f3ea511c15))
* **google/iam:** append iam api methods to main API Array ([0c7ea84](https://github.com/zyndex-drive/server/commit/0c7ea8451145d3e15c8395dd2d7745cf6ded0ec9))
* **google/requester:** add delete request method for google api requester ([b473c53](https://github.com/zyndex-drive/server/commit/b473c5397393697c1642998322dc44571f3334c0))


### Bug Fixes

* **models/service-account:** add unique id prop for service account model ([504567d](https://github.com/zyndex-drive/server/commit/504567d2cdea57c2adef2cf809af732fd2d5d93b))


### Code Refactoring

* **google/api:** append api methods to main api array ([0e81661](https://github.com/zyndex-drive/server/commit/0e816618b9ea773e818f615ebc2bc282f6830d70))
* **google/routes:** rename api.ts to routes.ts for name conflict ([e4aefba](https://github.com/zyndex-drive/server/commit/e4aefba8a3307446312a03fc7d31c77192149e68))
* **routes/login:** use the refactor google api methods ([b8613a1](https://github.com/zyndex-drive/server/commit/b8613a10853a0761ca3fedfdbf01dd6d7fa15829))

## [0.2.0-9](https://github.com/zyndex-drive/server/compare/v0.2.0-8...v0.2.0-9) (2021-10-02)


### Bug Fixes

* **google/jwt:** fix jwt - add crypto module ([1cf09c5](https://github.com/zyndex-drive/server/commit/1cf09c55cddea0f9396406c3fcb3b801ac0596ac))


### Build System

* **crypto:** add node-webcrypto module for cryptographic function ([10c0fca](https://github.com/zyndex-drive/server/commit/10c0fca283bade027810e68a9455fac978b54edb))

## [0.2.0-8](https://github.com/zyndex-drive/server/compare/v0.2.0-7...v0.2.0-8) (2021-10-02)


### Features

* **google/resolve-token:** add service account token resolver to google oauth helpers ([422de8a](https://github.com/zyndex-drive/server/commit/422de8a9e72059136c27f4a70594d3db112616ba))


### Code Refactoring

* **google/jwt:** rename jwt file ([fb1c778](https://github.com/zyndex-drive/server/commit/fb1c778161e42064224780125b813b56ead4ce42))

## [0.2.0-7](https://github.com/zyndex-drive/server/compare/v0.2.0-6...v0.2.0-7) (2021-10-01)


### Features

* **google/service-account:** add access token generation method for service account ([6716569](https://github.com/zyndex-drive/server/commit/671656973122a3b6bbc00054a389380f729fc27a))
* **google/service-account:** handler for saving checking and saving service account token ([5d0ae5b](https://github.com/zyndex-drive/server/commit/5d0ae5bcb0b9832d6bc2cc05385f38a6ea4ad871))


### Bug Fixes

* **google/signjwt:** fix jwt signature method to use scopes provided ([9dd9661](https://github.com/zyndex-drive/server/commit/9dd96617b8f248d583b6203fc29696cca7369e3f))


### Docs

* **google/handlers:** document google oauth method handlers ([fb6270d](https://github.com/zyndex-drive/server/commit/fb6270d58c443909ec1785cf0cff341c0242b345))

## [0.2.0-6](https://github.com/zyndex-drive/server/compare/v0.2.0-5...v0.2.0-6) (2021-10-01)


### Features

* **google/api/iam:** add api methods for iam projects ([eae25e4](https://github.com/zyndex-drive/server/commit/eae25e42a507230e3e5da4f39c2f170b3bfbe3c4))
* **google/iam/service-acc:** add api methods for iam - service account ([c17a437](https://github.com/zyndex-drive/server/commit/c17a4377b3057044fd10755aaa0490d15416da46))
* **google/iam:** consolidate api methods and api routes for google iam ([0add635](https://github.com/zyndex-drive/server/commit/0add6353d467c7d45f119ce9275f4e28c9f2e11e))
* **google/jwt:** add helpers, methods and functions for generating a service account jwt signature ([d190854](https://github.com/zyndex-drive/server/commit/d190854e5eefef41994cb241feacd8c8eae20fab))


### Others

* **middlewares:** change comments ([8e7860b](https://github.com/zyndex-drive/server/commit/8e7860b54a473dd719fd679315cac27353f93623))


### Code Refactoring

* **google/drives:** move request method to global scope to use by all apis ([0a3a450](https://github.com/zyndex-drive/server/commit/0a3a4506681d763f25d7d941b84f6198cf33c5e1))
* **google/helpers:** add google api requester and other misc oauth helpers ([6b92b80](https://github.com/zyndex-drive/server/commit/6b92b80fadc3cab006b6eb5a66e6f25c1fef58fb))
* **google/oauth-helper:** refactor oauth generate method to use latest changes ([5fd58fc](https://github.com/zyndex-drive/server/commit/5fd58fc05000f2ea511566cf3315b943db038e53))
* **routes/login:** refactor to use new changes ([94aaf60](https://github.com/zyndex-drive/server/commit/94aaf607083b0230c3eb31a2834658aa94d53518))

## [0.2.0-5](https://github.com/zyndex-drive/server/compare/v0.2.0-4...v0.2.0-5) (2021-09-27)


### Docs

* **google:** completely document every google api used ([e4f2633](https://github.com/zyndex-drive/server/commit/e4f2633ff98f889f1825e8e79665f1ecfc2843e3))

## [0.2.0-4](https://github.com/zyndex-drive/server/compare/v0.2.0-3...v0.2.0-4) (2021-09-26)


### Docs

* **google:** document Every google API Route Used properly ([c1f4ebf](https://github.com/zyndex-drive/server/commit/c1f4ebf881120e3b4d48e444e727d6e2e33bed6d))

## [0.2.0-3](https://github.com/zyndex-drive/server/compare/v0.2.0-2...v0.2.0-3) (2021-09-25)


### Bug Fixes

* **middlewares/first-setup:** fix changes to type related to models ([27c5442](https://github.com/zyndex-drive/server/commit/27c54427596eef9d3910b7de53a0f0df7fc2c435))


### Others

* **environment:** changes required for linux dev ([d9d642d](https://github.com/zyndex-drive/server/commit/d9d642d00c4c35f67488d67efda82782122f0b45))
* **environment:** move back to windows env ([2b8f159](https://github.com/zyndex-drive/server/commit/2b8f159199a86c5476f99f9332ff5aaa7bf2dbda))
* **environment:** move to linux environment from windows ([cb665d2](https://github.com/zyndex-drive/server/commit/cb665d23b9324670776626e9d4ccdaa291c50d1b))


### CI

* **tsconfig:** fix resolvers ([057baaf](https://github.com/zyndex-drive/server/commit/057baaf51d633eb58a7cb563f2ca8344683df0f2))


### Code Refactoring

* **externals/google:** move google to a proper folder structure(to root) ([90869d2](https://github.com/zyndex-drive/server/commit/90869d23bd6fc4990daac79e35b3a8bf8af9f024))
* **google/auth:** fix google auth route to use the refactored structure ([415d851](https://github.com/zyndex-drive/server/commit/415d8511fc6bb6ca2a0b1b0d110fcf5865020ecc))
* **google:** completely refactor google related files for proper project structure ([ffb0e1b](https://github.com/zyndex-drive/server/commit/ffb0e1b9299f5f03463851edc4ed393d2009046b))
* **models:** fix typescript document models ([17b4ed8](https://github.com/zyndex-drive/server/commit/17b4ed8ccccec773b0b877a00fd869e2d191c4d7))

## [0.2.0-2](https://github.com/zyndex-drive/server/compare/v0.2.0-1...v0.2.0-2) (2021-09-10)

### Features

- **crypto:** add crypto helpers for passing state between apis ([ae5efa7](https://github.com/zyndex-drive/server/commit/ae5efa7a0545e7357db0a678e2caf91d2103beb9))
- **google/drive/drives:** add method for listing drives ([feb4211](https://github.com/zyndex-drive/server/commit/feb421140f965d61dc612c5bd0ae0434790e2bdd))
- **google/drive/files:** add methods for listing files (wip) ([1b00651](https://github.com/zyndex-drive/server/commit/1b006516facaa78260e3c29db6c9d2beeeeaae57))
- **google/drive:** implement global drive api request methods ([33a24ac](https://github.com/zyndex-drive/server/commit/33a24ac356c0935bc50cc0a86d6651ca3755ecec))
- **google/oauth:** implement google oauth route ([90596e4](https://github.com/zyndex-drive/server/commit/90596e422852d8ce96cfbee0ddbc9aa476c8e404))
- **google/oauth:** implement passing of states between calls ([3f5f692](https://github.com/zyndex-drive/server/commit/3f5f692c36510bc21a0aeb71235db7e09e4794c0))
- **google/token-resolver:** implement token resolver for google oauth to fetch tokens ([7483c74](https://github.com/zyndex-drive/server/commit/7483c74f7a333d96910f302f7b3900fb50b5bee0))
- **routes/auth:** add credentials route for accessing and updating credentials ([48563b3](https://github.com/zyndex-drive/server/commit/48563b381e97a162293fbf576de9d5ed833466e1))

### Build System

- **package.json:** add query-string for parsing query parameters ([b9dab1e](https://github.com/zyndex-drive/server/commit/b9dab1eb84fdec8018a94e45f42c96fbaec2d001))
- **tsconfig.json:** add more path resolvers ([1ca9e40](https://github.com/zyndex-drive/server/commit/1ca9e40f9c178e9edc36228f60d2471b8320ed7c))

### Code Refactoring

- **routes/auth:** move policies and roles inside auth route ([a332ed3](https://github.com/zyndex-drive/server/commit/a332ed3f84be5964752d8e17c547d9bcc9bd7e77))
- **routes/tokens:** move tokens route to login route ([32f7848](https://github.com/zyndex-drive/server/commit/32f7848fcc6e8f8cf43d61688e2b8fbdb2756801))
- **routes:** move roles and policies routes inside auth route ([7fc965e](https://github.com/zyndex-drive/server/commit/7fc965e16c2828873b53197b06176e5d3ed3ede5))

## [0.2.0-1](https://github.com/zyndex-drive/server/compare/v0.2.0-0...v0.2.0-1) (2021-08-22)

### Features

- **google-oauth:** finish google oauth setup completely ([a39ca10](https://github.com/zyndex-drive/server/commit/a39ca109556acc69c520f19b7ca9e5bc8bb20756))
- **helpers/uid:** add method for generating mongodb reference ids ([ab6d10e](https://github.com/zyndex-drive/server/commit/ab6d10efd850c88e3dfc59fd4dc091bb8b6a818e))

### Bug Fixes

- **models:** fix models schema from mongo error for \_id ([7de01a1](https://github.com/zyndex-drive/server/commit/7de01a150c6b6d5aa09611323317169ef447e4da))
- **types/objectid:** fix objectid ([80bfc48](https://github.com/zyndex-drive/server/commit/80bfc485ff1fc4d2b59ff53b9eaaf76276b1ddf2))

### Code Refactoring

- **routes:** refactor all routes to use new mongo id generator ([9ec17da](https://github.com/zyndex-drive/server/commit/9ec17da5295d899d5086001801a5969708a6afdf))
- **setup-files:** refactor all setup objects to use mongo id generator ([c5f2cfc](https://github.com/zyndex-drive/server/commit/c5f2cfc2b52d6976010a0f0797e385e3dfd0f1f7))

## [0.2.0-0](https://github.com/zyndex-drive/server/compare/v0.1.6-2...v0.2.0-0) (2021-08-15)

### ⚠ BREAKING CHANGES

- **models/tokens:** This Commit Changes the way of handling models

### Features

- **drive/scopes:** add drive scopes ([e1ce604](https://github.com/zyndex-drive/server/commit/e1ce604709a7f0ceccd564a780c7b30395dc30c4))
- **google/api:** add api.ts for centrally handling api routes ([72a4909](https://github.com/zyndex-drive/server/commit/72a49097d006257c66e0907a64145301b750983b))
- **google:** add function for revoking google oauth token ([8e93b7d](https://github.com/zyndex-drive/server/commit/8e93b7dcae997114e1a5ebb41b7897006664b7e6))
- **google:** add function for validating oauth token (to be done) ([6ec5e22](https://github.com/zyndex-drive/server/commit/6ec5e220008f56c37a9454471ed2cc9f38e01328))
- **google:** introduce complete google oauth flow ([0a6d8d8](https://github.com/zyndex-drive/server/commit/0a6d8d872fe0f5158c50eb0c8061a46a0d76f735))
- **google:** introduce refresh and access token generation helpers ([1b344bd](https://github.com/zyndex-drive/server/commit/1b344bd8e54950d17ba8f5e70a7c367f838cbcd2))
- **google:** write types for google oauth functions ([8ac4f78](https://github.com/zyndex-drive/server/commit/8ac4f78589e61b9b0d24c43232bfc8120be9eff6))
- **models/tokens:** introduce token collection ([e8c3344](https://github.com/zyndex-drive/server/commit/e8c3344217396d20ade6bd3cdbb18f79850b91a4))
- **routes/tokens:** introducing token endpoint for token operations ([3bdcf6f](https://github.com/zyndex-drive/server/commit/3bdcf6ffcaafad74c8e93637f897cdfe2a10984d))

### Others

- **package:** add scripts for major, minor and patch releases ([7ea2b16](https://github.com/zyndex-drive/server/commit/7ea2b1690588ffac91f700e9cdaa6f9b8baf31d9))

### Code Refactoring

- **google/endpoints:** remove google endpoints file ([5d63ea8](https://github.com/zyndex-drive/server/commit/5d63ea848745442aea52320ef33da93efcb7a18d))
- **routes/first-setup:** move tokens endpoint to main route ([ed3a25f](https://github.com/zyndex-drive/server/commit/ed3a25ff17aefdfe4f8799fb567829933a37a158))

### [0.1.6-2](https://github.com/zyndex-drive/server/compare/v0.1.6-1...v0.1.6-2) (2021-08-11)

### Features

- **google-oauth:** add google oauth generator handler for express ([e8a1b74](https://github.com/zyndex-drive/server/commit/e8a1b7455945f4937d1134010b5a3cc9a744f435))
- **routes/setup/token:** add router for first-setup/token routes ([f65ac4b](https://github.com/zyndex-drive/server/commit/f65ac4b7395efcb28dfeffcf83e570c523c2c6a0))
- **routes/setup:** add scope, token to main router config ([6983373](https://github.com/zyndex-drive/server/commit/6983373fa4b66dab3b18a552d366cbb7fb96b19f))

### Bug Fixes

- **models/credentials:** fix credentials type, add redirect_uri as required ([cac81dc](https://github.com/zyndex-drive/server/commit/cac81dc3e0692c36a03f5daaa590f18ee3e6d325))
- **package:** fix prepare script ([c4a5064](https://github.com/zyndex-drive/server/commit/c4a5064de92fe99b5ab31e20dc0c216f8747729d))

### CI

- **husky:** add linting for commit message ([80e4f05](https://github.com/zyndex-drive/server/commit/80e4f0555f7b111a2c4276d291f587d00c045c69))

### Code Refactoring

- **helpers/axios:** refactor axios export command to a single line ([1eaf420](https://github.com/zyndex-drive/server/commit/1eaf420c70975dc9213442de11b5ebc3ac2052dc))

### Others

- **tsconfig.json:** fix directory paths for module resolution ([1976f95](https://github.com/zyndex-drive/server/commit/1976f95765ee1d29a3d85bde47227614dd5bb9f2))

### [0.1.6-1](https://github.com/zyndex-drive/server/compare/v0.1.6-0...v0.1.6-1) (2021-08-06)

### Features

- **models/tokens:** introduce tokens collection for managing auth tokens ([fdfa176](https://github.com/zyndex-drive/server/commit/fdfa1764fb448729b5e23d8fb247c467bf00a010))

### Bug Fixes

- **models/serviceaccounts:** fix type ([4bd4a67](https://github.com/zyndex-drive/server/commit/4bd4a676fc0dd34e10ebc890191ef04da8d2a099))

### Others

- **verionrc:** change versionrc file to json file type ([2b551a3](https://github.com/zyndex-drive/server/commit/2b551a367721a5b2b2a08bba2ac9459c943a09ac))

### Code Refactoring

- **helpers/classes:** remove class based helpers ([0b3040e](https://github.com/zyndex-drive/server/commit/0b3040e8b48a442a645f2d4d9c7993196acece80))

### [0.1.6-0](https://github.com/zyndex-drive/server/compare/v0.1.5...v0.1.6-0) (2021-08-06)

### [0.1.5](https://github.com/zyndex-drive/server/compare/v0.1.4...v0.1.5) (2021-08-05)

### Others

- **package.json:** add mocha-html-writer ([5ed22e0](https://github.com/zyndex-drive/server/commit/5ed22e00ccc5c02724897a76b9457d2c88015d8c))

### Tests

- **test-report:** add a test report generator with mocha ([9af6f03](https://github.com/zyndex-drive/server/commit/9af6f0335d34ee2f23a45b834891c061d86a7816))

### [0.1.4](https://github.com/zyndex-drive/server/compare/v0.1.3...v0.1.4) (2021-08-03)

### Features

- **express:** write a 404 Response Handler ([ef16534](https://github.com/zyndex-drive/server/commit/ef16534191faa72eaade32605617d368a669fccf))
- **middlewares/cors.ts:** add Support for Local Development with respect to cors issue ([4363992](https://github.com/zyndex-drive/server/commit/4363992f262c26b9e5181c5d95bca97ad1ab2896))
- **models/credential:** write a new function for handling id checks ([35ebb5d](https://github.com/zyndex-drive/server/commit/35ebb5d94ca420e63de89551cc5d0f98affda706))
- **routes/first-setup:** add credentials and scope route handlers for first setup ([0a21cc0](https://github.com/zyndex-drive/server/commit/0a21cc0ee24599d480f8c3d4a1d4ad50693459d9))

### Bug Fixes

- **express.d.ts:** fix case in extended express type ([83b7b74](https://github.com/zyndex-drive/server/commit/83b7b747839547a6ad7346179ff5f3f05189e041))
- **models/scopes:** fix type for static method in scopes ([b462c0a](https://github.com/zyndex-drive/server/commit/b462c0aa3e72c2d97cd5be5f06889dcb5ec5407f))

### Others

- **.versionrc:** introduce .versionrc for changelogs ([ca05127](https://github.com/zyndex-drive/server/commit/ca05127b4997b420ef83eea15e437e8f2cc34578))
- **package.json:** fix single test script with proper requore ([8e3c38f](https://github.com/zyndex-drive/server/commit/8e3c38fddc45a64bf73a21b7a54d0805ba712eb8))
- **readme.md:** update Readme to add commitizen badge ([23711d9](https://github.com/zyndex-drive/server/commit/23711d96eddb3001418289e33108b0a5f75e36bf))

### Tests

- **first-setup:** fix test helpers and add new tests ([79a2830](https://github.com/zyndex-drive/server/commit/79a2830825d180aeffa2d824afa58c51aedd577f))
- **first-setup:** write tests for policies, roles, credentials route tests for first-setup ([8698bf9](https://github.com/zyndex-drive/server/commit/8698bf9ad9c1924c5c7d0c4011d9dc1ea7bf3840))

### [0.1.3](https://github.com/zyndex-drive/server/compare/v0.1.2...v0.1.3) (2021-08-02)

### Docs

- **readme.md:** update Readme ([b1187a2](https://github.com/zyndex-drive/server/commit/b1187a29d436a614b49a8fb3d3955b24d85f9dbd))
- **readme:** update Readme ([b6d7d18](https://github.com/zyndex-drive/server/commit/b6d7d18473d794deb8fae8d3d4cc813503838856))

### Others

- **package.json:** add a Stage Script ([e4098f4](https://github.com/zyndex-drive/server/commit/e4098f410ced939e04c512a533585b1b8f93cfd5))

### [0.1.2](https://github.com/zyndex-drive/server/compare/v0.1.1...v0.1.2) (2021-07-31)

### Features

- **changelog.md:** automate Changelog and Commit workflow ([956c28d](https://github.com/zyndex-drive/server/commit/956c28d2c2416afebecd456c716f06720e73b591))

### 0.1.1 (2021-07-31)

### Features

- **new-feature:** add a new-feature to our project ([c0f6fd7](https://github.com/zyndex-drive/server/commit/c0f6fd7d07f079b552e603760dd92dc8de33ce95))
