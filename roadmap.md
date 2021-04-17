## Roadmap

- [x] Buy `acronyms.io`

- [ ] python/django version on existing vps
  - [ ] Minimum initial deployment
    - [x] Set up dev environment
    - [ ] User registration / login
    - [ ] Show users in room
    - [ ] Three-phase rounds
      - [ ] User submissions
      - [ ] Voting period
      - [ ] Game finished
    - [ ] Start new game
    - [ ] Styling/graphics
  - [ ] Moderators
  - [ ] New room creation
  - [ ] Room keys for private rooms
  - [ ] User limits in rooms
  - [ ] Configurability
    - [ ] Seconds to auto-start next game
    - [ ] Voting period duration
    - [ ] Acronym min/max lengths

- [ ] Port to Amazon cloud
  - [ ] Set up [virtual private clouds](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) for dev/prod enviros
  - [ ] Game state machine as [Step Functions](https://aws.amazon.com/step-functions/)
  - [ ] Move database to [Amazon RDS](https://aws.amazon.com/rds/)

