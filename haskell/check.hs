{-# Language ViewPatterns #-}

-- check.hs
--
-- a basic functional solution to verify a match of a phrase against an acronym

import Data.Char (toLower)


check :: String -> String -> Bool
check acro (words -> phrase)

  -- the empty phrase is always invalid
  | null phrase                     = False   

  -- if the number of words in the phrase doesn't match the number of characters
  -- in the acronym, it can't be valid
  | length acro /= length phrase    = False

  |  (toLower <$> acro)
  == (toLower <$> map head phrase)  = True


-- tests
main = do
  putStrLn "Should pass"
  print $ check "abc" "a b c"
  print $ check "abc" "aaa bbb ccc"
  print $ check "abc" "abc bca cab"
  print $ check "abc" "A B C"
  print $ check "abc" "AA BB CC"
  print $ check "abc" "Aa Bb Cc"

  putStrLn "Should fail"
  print $ check "abc" ""
  print $ check "abc" "abcdef"
  print $ check "abc" "a b c d e"
  print $ check "abc" "b a c d e f"

{-
    acronyms.io/haskell$ runhaskell check.hs

    Should pass
    True
    True
    True
    True
    True
    True
    Should fail
    False
    False
    False
    False
-}
