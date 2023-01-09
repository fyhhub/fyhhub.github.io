# adb 使用

## 手机截图并保存到电脑

```
adb exec-out screencap -p > ~/xxx.png
```

## 屏幕录制保存到电脑

```
# 保存到手机
adb shell screenrecord /sdcard/filename.mp4

# 保存到电脑
adb pull /sdcard/filename.mp4
```
