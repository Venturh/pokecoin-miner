import crypto from 'crypto'




export const calculateBlock = (prevhash, timestamp, data, nonce, diff) => {
  let i = 0;
  let difficulty = "";
  for (let i = 0; i < diff; i++) {
    difficulty += "0"
  }
  
  while(true)  {
      const information = (
        prevhash +
        String(timestamp) +
        data +
        String(nonce)
      )
      const hash = crypto.createHash('sha256').update(information).digest('hex');
      if(hash.startsWith("000000")){
        postMessage({
          type: "blockfound",
          timestamp: timestamp,
          nonce: nonce,
          hash: hash});
      }
      if(i%999999 == 0){
        postMessage({
          type: "info",
          nonce : nonce,
          timestamp: timestamp})
      }
      i+=1;
      nonce+=1;
    }
  }