// Password generator based on the original passgen.py rules.
// No network, storage, or server-side generation. Uses unbiased Web Crypto sampling.
(function(global){
  'use strict';
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LETTERS = UPPER + LOWER;
  const DIGITS = '0123456789';
  const SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  const MAX_RANDOM = 0x100000000;
  function choice(chars){
    if (!global.crypto || typeof global.crypto.getRandomValues !== 'function') throw new Error('Secure random generation is unavailable');
    const limit = Math.floor(MAX_RANDOM / chars.length) * chars.length;
    const rand = new Uint32Array(1);
    let n;
    do { global.crypto.getRandomValues(rand); n = rand[0]; } while(n >= limit);
    return chars[n % chars.length];
  }
  function shuffle(chars){
    for(let i=chars.length-1;i>0;i--){
      const n=0x100000000;const limit=Math.floor(n/(i+1))*(i+1);
      const rand=new Uint32Array(1);let j;
      do {global.crypto.getRandomValues(rand);j=rand[0]}while(j>=limit);
      j%=i+1;[chars[i],chars[j]]=[chars[j],chars[i]];
    }
  }
  function generatePassword(level='Strong', length=16){
    if (!Number.isInteger(length) || length<6 || length>64) throw new RangeError('Password length must be an integer from 6 to 64');
    let chars;const output=[];
    if(level==='Weak'){chars=LETTERS;}
    else if(level==='Medium'){chars=LETTERS + DIGITS;output.push(choice(LETTERS),choice(DIGITS));}
    else if(level==='Strong'){chars=LETTERS+DIGITS+SYMBOLS;output.push(choice(LOWER),choice(UPPER),choice(DIGITS),choice(SYMBOLS));}
    else throw new RangeError('Unknown strength level');
    while(output.length<length) output.push(choice(chars));
    shuffle(output);
    return output.join('');
  }
  global.XsociumPassword = Object.freeze({generatePassword, LOWER, UPPER, LETTERS, DIGITS, SYMBOLS});
})(typeof window === 'undefined' ? globalThis : window);
