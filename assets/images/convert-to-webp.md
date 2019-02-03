You will need to install the GNU's parallel program to run this line

```shell<
parallel -eta cwebp -q 90 -lossless -m 6 {} -o {.}.webp ::: *.png
```

# Disecting the command
-q 90 is quality of the compression. 100 is lossless and everything other than that is lossy.

-m 6 is the level of inspection that cwebp will do to save your bytes. Default is 4 and the range is 1 - 6.
