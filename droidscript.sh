#!/data/data/com.termux/files/usr/bin/bash

[ -z "$SDCARD" ] && (
  echo "Error! SDCARD env not exists!"
  exit 1
)

p="$SDCARD/DroidScript/aKoKo"
rm -rf $p
cp -r DroidScript $p

echo "Done!"
exit 0
