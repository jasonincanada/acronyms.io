## TODO

- [ ] do we still need ActiveGame's uniqueness constraint on Room
- [ ] authorization checks for:
  - [ ] api.new_game
  - [ ] api.get_room
  - [ ] api.post_phrase
  - [ ] api.vote (can only vote on games you took part in)
- [ ] better error messages
  - [ ] show /signup errors
- [x] consolidate createAsyncThunk repetition
- [ ] api.get_activegame shouldn't check for phrase if user not logged in
- [ ] normalize finishedgames on client-side
  - [ ] only request finishedgames greater than the last known pk

