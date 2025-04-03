Bluetooth.setConsole(false);
Bluetooth.on('data', function(data) {
  print("Empfangen:", data);
  let cmd = data.trim();
  if (cmd.startsWith("VIB:")) {
    let ms = parseInt(cmd.slice(4));
    Bangle.buzz(ms);
    print("Vibriere für " + ms + " ms");
  }
});
