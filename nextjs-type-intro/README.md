# nextjs typescript intro

```
$ npm i @reduxjs/toolkit
$ npm i react-redux
$ npm i next-redux-wrapper
$ npm i redux-logger --save-dev # 필요한 경우에 설치

$ npm i @emotion/css
$ npm i @emotion/react
$ npm i -D @emotion/babel-preset-css-prop # storybook/main.js 에서 사용
$ npm i -D @emotion/babel-plugin # 선택



```

## emotion

> "@emotion/babel-plugin": "^11.7.2",

### .babelrc

```js
// @emotion/babel-plugin 를 설치 했을 경우
// import { jsx, css } from "@emotion/react"; 바로 임포트가 되지 않음
{
  "presets":["next/babel"],//기본 넥스트 프리셋
  "plugins":["@emotion"]
}

// @emotion/babel-plugin 를 설치 안했을 경우
// import { jsx, css } from "@emotion/react"; 바로 임포트 할 수 있음
{
  "presets": [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
}
```

### .storybook/main.js

> storybook으로 emotionjs 사용 컴포넌트 접근시 정상적으로 css 추가됨

```js
// .storybook/main.js
const path = require("path");
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: "@storybook/react",
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [require.resolve("@emotion/babel-preset-css-prop")],
      },
    });
    return config;
  },
};
```
