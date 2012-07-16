import Control.Monad
import Control.Concurrent
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

newAccount :: Int -> IO Account
newAccount balance = newTVarIO balance

transferTest :: Account -> Account -> STM (Int, Int)
transferTest from to = do
    transfer 5 from to
    liftM2 (,) (readTVar from) (readTVar to)

    
showBalances :: Account -> Account -> IO ()
showBalances ac1 ac2 = do
    ac1Bal <- atomically $ readTVar ac1
    ac2Bal <- atomically $ readTVar ac2
    putStrLn $ "ac1Bal: " ++ (show ac1Bal) ++ ", ac2Bal: " ++ (show ac2Bal)    

main :: IO ()
main = do
    ac1 <- newAccount 20
    ac2 <- newAccount 30
    ac1Bal <- atomically $ readTVar ac1
    ac2Bal <- atomically $ readTVar ac2
    showBalances ac1 ac2
    putStrLn "******* Transferring 5 dollars ********"
    forkIO $ atomically $ transfer 5 ac1 ac2
    showBalances ac1 ac2
    atomically $ writeTVar ac1 4
    putStrLn "******* Poverty strikes ac1 ********"
    showBalances ac1 ac2
    putStrLn "******* Unable to transfer - will block until credit ********"
    forkIO $ atomically $ transfer 5 ac1 ac2
    threadDelay 4000000
    forkIO $ atomically $ credit 20 ac1
    showBalances ac1 ac2
    threadDelay 4000000
    putStrLn "******* Now the retry can go through ********"
    showBalances ac1 ac2
    