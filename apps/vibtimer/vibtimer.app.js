g.clear();
g.setFont("4x6", 2);
g.drawString("VibTimer ready", 40, 60);

Bangle.setLCDTimeout(0);
Bangle.setPowerSave(false);

const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

NRF.setServices({
  [SERVICE_UUID]: {
    [CHARACTERISTIC_UUID]: {
      writable: true,
      onWrite: function(evt) {
        let data = evt.data;
        let value = data[0];
        print("Empfangen:", value);

        if (value === 1) {
          Bangle.buzz(500);
          g.clear(); g.drawString("Buzz!", 10, 30);
        } else {
          g.clear(); g.drawString("Waiting", 10, 30);
        }
      }
    }
  }
}, { advertise: [SERVICE_UUID] });

NRF.on('disconnect', () => {
  g.clear();
  g.drawString("BLE getrennt", 10, 30);
  print("BLE getrennt");
});

Bangle.on('kill', () => {
  Bangle.setLCDBrightness(1);    
  Bangle.setLCDTimeout(10);     
  Bangle.removeAllListeners('lcdPower'); 
});
