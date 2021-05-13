
This was my first attempt at the SQL query for `api.get_vote` but it doesn't seem to work. It always shows that player 1 voted for phrase 1 even if they switch their vote to phrase 2.  I'm not sure where the issue is

```sql
SELECT    p.id,
          player.id       AS playervoted,
          COUNT(voter.id) AS votes

FROM      acro_finalphrase p

LEFT JOIN acro_vote voter  ON voter .phrase_id = p.id
LEFT JOIN acro_vote player ON player.phrase_id = p.id
                          AND player.id        = 1

WHERE     p.game_id = 1

GROUP BY  p.id,
          player.id
```


```
 id | playervoted | votes
----+-------------+-------
  1 |           1 |     1
  2 |             |     1

acro_dev=# select * from acro_vote;
 id |           voted_on            | game_id | phrase_id | voter_id
----+-------------------------------+---------+-----------+----------
  1 | 2021-05-10 21:27:01.578451+00 |       1 |         1 |        2
  2 | 2021-05-13 19:10:55.993702+00 |       1 |         2 |        1
```

