const {test}=require('node:test');const assert=require('node:assert/strict');
require('../js/password.js');require('../vendor/qrcode.js');
const p=globalThis.XsociumPassword;
for(const level of ['Weak','Medium','Strong'])for(const n of [6,16,64])test(`${level} ${n} length and charset`,()=>{
  for(let i=0;i<150;i++){
    const value=p.generatePassword(level,n);assert.equal(value.length,n);
    if(level==='Weak')assert.match(value,/^[a-zA-Z]+$/);
    if(level==='Medium'){assert.match(value,/^[a-zA-Z0-9]+$/);assert.match(value,/[a-zA-Z]/);assert.match(value,/[0-9]/)}
    if(level==='Strong'){assert.match(value,/[a-z]/);assert.match(value,/[A-Z]/);assert.match(value,/[0-9]/);assert.ok([...value].some(c=>p.SYMBOLS.includes(c)))}
  }
});
test('validation',()=>{for(const length of [-1,0,5,65,1.5,NaN])assert.throws(()=>p.generatePassword('Strong',length),RangeError);assert.throws(()=>p.generatePassword('Nope',12),RangeError)});
test('non-determinism',()=>{assert.ok(new Set(Array.from({length:70},()=>p.generatePassword('Strong',16))).size===70)});
test('QR matrix',()=>{for(let n of [6,16,64]){const value=p.generatePassword('Strong',n);const qr=globalThis.XsociumQRCode.create(value);assert.ok(qr.getModuleCount()>0);assert.equal(typeof qr.isDark(0,0),'boolean')}});