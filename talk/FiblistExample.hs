import Debug.Hood.Observe

main = runO ex1

ex1 :: IO ()
ex1 = print ((observe "fiblist" :: Observing [Integer]) $ take 20 fiblist)

fiblist = 0 : 1 : zipWith (+) fiblist (tail fiblist)