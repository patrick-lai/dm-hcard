### Usage

* Set `SESSION_SECRET` in your environment.
* Run `npm start`

### Development

* Step 1) `npm i`
* Step 2) Copy `.env.example` into `.env`
* Step 3) `npm start` to start or `npm run watch` for live reload

### Testing

* `npm run test` - Runs tests once and generates coverage report
* `npm run watch:test` - Live reload tests (does not update report)

### Journal

**Step 1) brain storm the problem**

* Server side rendering
* Need a way to cancel requests/data base writing (take latest request)
* Have a way to remember session
* Try to do the avatar image uploading too I guess (seems like front end not hooked up)

**Step 2) Design**

* Express, express session
* save data against the session key
* Maybe try generator on update/submit for each session to take latest requests (cancel the rest)
* Cheat the store and just base 64 the avatar
* Use a templating engine for the markup

**Step 3) Test cases (and some invariants/edge cases)**

* Update/deletes correctly stores the data
* server correctly renders the page (some JS is executed)
* React is in the global scope
* Submit overrides any pending requests

**Step 4) Build**

* 1st Session ~ 1.5 hours
* 2nd Session ~ 2 hours
* 3rd Session ~ .5 hours (confused with UI not posting withCredentials for persisting data)
* 4th Session ~ 1 hour

total = 4 hours

### Notes

* It seems like the fetch in the `main.js` does not use `withCredentials` so I am unable to make saving the payload session based...
* In production we will probably build a dist instead of using `babel-node` but I think for the purpose of the exercise lets just leave it.
