import Control.Monad
import Control.Concurrent.STM

type Account = TVar Int

credit :: Int -> Account -> STM ()
credit amount account = do
    current <- readTVar account
    writeTVar account (current + amount)

debit :: Int -> Account -> STM ()
debit amount account = do
    current <- readTVar account
    writeTVar account (current - amount)

transfer :: Int -> Account -> Account -> STM ()
transfer amount from to = do
    fromVal <- readTVar from
    if (fromVal - amount) >= 0
       then do
             debit amount from
             credit amount to
       else retry  -- in real life, we'd wrap a 
                   -- timeout around this

newAccount :: Int -> STM Account
newAccount balance = newTVar balance

transferTest :: STM (Int, Int)
transferTest = do
    ac1 <- newAccount 20
    ac2 <- newAccount 30
    transfer 5 ac1 ac2
    liftM2 (,) (readTVar ac1) (readTVar ac2)


main :: IO ()
main = do
    (amt1, amt2) <- atomically transferTest
    putStrLn $ (show amt1) ++ ", " ++ (show amt2)