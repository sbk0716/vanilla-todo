# vanilla-todo

## Project structure

```sh
admin@gw-mac vanilla-todo % tree
.
├── README.md
├── index.css
├── index.html
├── index.js
└── src
    ├── App.js
    ├── EventEmitter.js
    ├── model
    │   ├── TodoItemModel.js
    │   └── TodoListModel.js
    └── view
        ├── TodoItemView.js
        ├── TodoListView.js
        └── html-util.js

3 directories, 11 files
admin@gw-mac vanilla-todo % 
```

## Usage



In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```sh
admin@gw-mac vanilla-todo % yarn
yarn install v1.22.17
[1/4] 🔍  Resolving packages...
success Already up-to-date.
✨  Done in 0.05s.
admin@gw-mac vanilla-todo % yarn start
yarn run v1.22.17
$ yarn serve -p 3000
$ /Users/admin/Desktop/vanilla-todo/node_modules/.bin/serve -p 3000

   ┌──────────────────────────────────────────────────┐
   │                                                  │
   │   Serving!                                       │
   │                                                  │
   │   - Local:            http://localhost:3000      │
   │   - On Your Network:  http://192.168.0.13:3000   │
   │                                                  │
   │   Copied local address to clipboard!             │
   │                                                  │
   └──────────────────────────────────────────────────┘

^C
INFO: Gracefully shutting down. Please wait...

admin@gw-mac vanilla-todo % 
```


## Reference

[JavaScript Primer](https://jsprimer.net/use-case/todoapp/)
