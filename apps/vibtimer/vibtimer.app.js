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

g.clear();
g.setFont("6x8", 2);
g.drawString("VibTimer ready", 40, 60);
g.flip();
