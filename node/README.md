###TCC Node.js API

---

- Instal dependences

```bash
$ sudo npm install
```

- Run app.js

```bash
$ node app.js
```

- To test the api, use cURL
	- Exemples:

```bash
$ curl -i http://localhost:3000/user
$ curl -i -X POST -d 'param=value' http://localhost:3000/page
```

- For run the tests, use mocha

```bash
$ cd test
$ mocha
```
