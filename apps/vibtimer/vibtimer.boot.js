const SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const CHAR    = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

NRF.setServices({
  [SERVICE]: {
    [CHAR]: {
      writable : true,
      maxLen   : 1,
      onWrite(evt) {
        if (evt.data[0] === 1) Bangle.buzz(500);
      }
    }
  }
}, {
  advertise   : [SERVICE], 
  uart        : false,  
  connectable : true
});

NRF.setTxPower(4);
NRF.on("disconnect", ()=>NRF.restart());
