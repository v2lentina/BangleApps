g.clear();
g.setFont("4x6", 2);
g.drawString("VibTimer ready", 40, 60);

Bangle.setLCDTimeout(0);
Bangle.setPowerSave(false);

const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

function startAdvertising() {
  NRF.setAdvertising({}, { name: "Bangle.js VibTimer", connectable: true });
  print("Werbung aktiv...");
}

NRF.setServices({
  [SERVICE_UUID]: {
    [CHARACTERISTIC_UUID]: {
      writable: true,
      notify: true,
      onWrite: function(evt) {
        let data = evt.data;
        let value = data[0];
        print("Empfangen:", value);

        if (value === 1) {
          print("Vibriere jetzt!");
          Bangle.buzz(500);
          g.clear(); g.drawString("Buzz!", 10, 30);

          NRF.updateServices({
            [SERVICE_UUID]: {
              [CHARACTERISTIC_UUID]: {
                value: [66]
              }
            }
          });

        } else {
          print("Kein Buzz");
          g.clear(); g.drawString("Waiting", 10, 30);
        }
      }
    }
  }
}, { advertise: [SERVICE_UUID] });

let advTicker = setInterval(() => {
  NRF.getSecurityStatus((s) => {
    if (!s.connected) startAdvertising();
  });
}, 10000);

setInterval(() => {
  g.setFont("6x8");
  g.clearRect(10, 10, 200, 20); 
  g.drawString("Aktiv: " + new Date().toLocaleTimeString(), 10, 10);
}, 15000);

NRF.on('disconnect', () => {
  g.clear();
  g.drawString("BLE getrennt", 10, 30);
  print("BLE getrennt");
  startAdvertising();
});

Bangle.on('kill', () => {
  Bangle.setLCDBrightness(1);    
  Bangle.setLCDTimeout(10);     
  Bangle.removeAllListeners('lcdPower'); 
});
