import crypto from 'crypto'


export const calculateBlock = (prevhash, timestamp, data, nonce, diff) => {
  let i = 0;
  let difficulty = "";
  for (let i = 0; i < diff; i++) {
    difficulty += "0"
    
  }
  while(true)  {
      //timestamp+=1

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
      if(i%100000 == 0){
        postMessage([nonce, timestamp])
      }
      i+=1;
      nonce+=1;
    }
  }