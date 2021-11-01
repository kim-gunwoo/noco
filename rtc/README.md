```
npm init -y
npm i -D @babel/cli @babel/core @babel/node
npm i -D @babel/preset-env
npm i ws
npm i socket.io
npm i @socket.io/admin-ui


npm i -g localtunnel // 로컬서버를 임시 uri를 생성해줌
lt // localtunnel 설치시 사용 가능
lt --port 3000  // 사용하는 포트

```

```
주소 : https://admin.socket.io/#/
서버URL : http://localhost:3000/admin
유저이름 : 설정값
비밀번호 : 설정값
path : 없어도됨
```

```
{
  "name": "rtc",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.15.7",
    "@babel/core": "^7.15.8",
    "@babel/node": "^7.15.8",
    "@babel/preset-env": "^7.15.8",
    "nodemon": "^2.0.14"
  },
  "dependencies": {
    "express": "^4.17.1",
    "pug": "^3.0.2"
  }
}

```

```
{
  "name": "rtc",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "dev": "nodemon"
  },
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.15.7",
    "@babel/core": "^7.15.8",
    "@babel/node": "^7.15.8",
    "@babel/preset-env": "^7.15.8",
    "nodemon": "^2.0.14"
  },
  "dependencies": {
    "express": "^4.17.1",
    "pug": "^3.0.2"
  }
}
```
