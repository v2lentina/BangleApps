const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

function startAdvertising() {
  NRF.setServices({
    [SERVICE_UUID]: {
      [CHARACTERISTIC_UUID]: {
        writable: true,
        notify: true,
        onWrite: function(evt) {
          let value = evt.data[0];
          print("Empfangen:", value);
          if (value === 1) {
            Bangle.buzz(500);
            g.clear(); g.drawString("Buzz!", 10, 30);
            NRF.updateServices({
              [SERVICE_UUID]: {
                [CHARACTERISTIC_UUID]: {
                  value: E.toUTF8("OK"),
                  notify: true
                }
              }
            });
          }
        }
      }
    }
  }, { advertise: [SERVICE_UUID] });
  NRF.setAdvertising({}, { name: "Bangle.js VibTimer", connectable: true });
  print("Werbung & Service aktiv");
}

g.clear();
g.setFont("6x8", 2);
g.drawString("VibTimer bereit", 10, 60);
Bangle.setLCDTimeout(0);
Bangle.setPowerSave(false);

startAdvertising();

NRF.on('disconnect', () => {
  print("BLE getrennt – Starte neu...");
  startAdvertising(); 
});
