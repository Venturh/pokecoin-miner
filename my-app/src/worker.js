import crypto from 'crypto'
export const calculatePrimes = (prevhash, timestamp, data, nonce) => {
  let i = 0;
  while(i<9999999)  {
      nonce+=1;
      timestamp+=1

      const information = (
        prevhash +
        String(timestamp) +
        data +
        String(nonce)
      )
      const hash = crypto.createHash('sha256').update(information).digest('hex');
      if(hash.startsWith("000000")){
        postMessage([timestamp, nonce, hash]);
        return;
      }
      i+=1;
    }
  }