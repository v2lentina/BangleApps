g.clear();
g.setFont("6x8", 2);
g.drawString("VibTimer bereit yay", 10, 60);
Bangle.setLCDTimeout(0);
Bangle.setPowerSave(false);

const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";

NRF.setServices({
  [SERVICE_UUID]: {
    [CHARACTERISTIC_UUID]: {
      writable: true,
      onWrite: function(evt) {
        let value = evt.data[0];
        print("Empfangen:", value);
        if (value === 1) {
          Bangle.buzz(500);
          g.clear(); g.drawString("Buzz!", 10, 30);
        }
      }
    }
  }
}, { advertise: [SERVICE_UUID] });

NRF.setAdvertising({}, { name: "Bangle.js VibTimer", connectable: true });

NRF.on('disconnect', () => {
  print("BLE getrennt – Starte neu...");
  NRF.setAdvertising({}, { name: "Bangle.js VibTimer", connectable: true });
});
