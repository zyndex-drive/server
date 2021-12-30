# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
