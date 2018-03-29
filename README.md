### Journal

**Step 1) brain storm the problem**

* Server side rendering
* Need a way to cancel requests/data base writing (submit should override, blur updates)
* Have a way to remember session
* Try to do the avatar image uploading too I guess (Wats the payload for the image???)

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
