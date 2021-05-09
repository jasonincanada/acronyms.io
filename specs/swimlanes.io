title: acronyms.io - Example Session Traffic

-: User logs in with username/password at /login

Browser -> API: GET /api/csrf/get
API --> API: SQL
API -> Browser: `{token}`
Browser -> Cookies: axios sets `csrftoken`

Browser -> API: POST /api/login `{username, password}`
API --> API: SQL
API -> Browser: `{result: 'ok', displayname}`
Browser -> Cookies: axios sets `sessionid`

note Cookies, API: The user is now logged in. The session ID is stored in cookies as `sessionid` and the CSRF token is stored as `csrftoken`

-: User goes to room r/**test**

note: When the user hits a room, get the room's current description and check for an active game

Browser -> API: GET /api/room/**test**/get

API -> Browser: `{slug, description}`

Browser -> API: GET /api/activegame/**test**/get

API -> Browser: `{id, acronym, myphrase, finishing}`

note API, Cookies: We don't store the room ID because we can always reference it by its slug. But we have to store the game ID because we post a phrase to a specific game, not the room itself, which may have finished up its game or even started a new one in the meantime

order: API, Browser, Cookies
