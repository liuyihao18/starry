# 程序员演奏音乐

来吧，我们来演奏音乐吧！

## 预备知识

### 正弦波

一个最简单的音符是一段正弦波，设这段正弦波持续时间为$t$，频率为$f$，振幅为$A$，那么这段正弦波就是：

$$
y(t) = A \cos(2 \pi f t)
$$

事实上，一段声音是由多个频率正弦波组合起来的，可以表示为：

$$
y(t) = \sum_{i} A_i \cos(2 \pi f_i t)
$$

通过对一段声音进行傅里叶分解，我们可以得到各个频率成分的强度。

### 采样率

程序员自然知道，任何连续的信息在电脑上都是离散存储的，这就引入了采样率的概念。顾名思义，采样率就是采样的频率，即$1\text{s}$采样多少个点，对于声音来说，普遍的采样率都是$44100\text{Hz}$或$48000\text{Hz}$。为什么是这个数字，与人类的听音频率有关，人类的听音频率大概是$20\text{Hz}\sim20000\text{Hz}$，为了还原音频中的信息，采样率至少得是声音频率的$2$倍，于是采样率就设置成了略微超过$20000\text{Hz}$的两倍即$44100\text{Hz}$。

> 关于采样率，这边推荐一[视频系列](https://www.bilibili.com/video/BV1us411W7xN/?share_source=copy_web&vd_source=fb7360a6fc9e876343b86972ff3e60f6)，让你明白相关知识的同时甚至重新认识数学。

### 音符

中国很早就有了十二平均律，即将一个八度音程分成十二个半音，换句话说，也就是钢琴上一个八度之间有十二个键。打个比方，标准$C$调琴键为$440\text{Hz}$，往上一个八度是$880\text{Hz}$，往下一个八度是$220\text{Hz}$，然后相邻两个琴键之间频率比例为$1 : \sqrt[12]{2}$。有了这些知识，程序员就可以生成各种频率的音符，然后演奏自己想演奏的内容啦！

> 虽然没有任何音色，也不一定好听。

## 演奏

大多数编程语言都可以生成正弦波，然后播放出来，这边还是用大众化的Python吧。

```python

```

当然用JavaScript也行，结合CSS，甚至可以写一个简单的钢琴出来，不信你看：

<div class="piano">
  <div class="white-group">
    <div class="key white"></div>
    <div class="key white"></div>
    <div class="key white"></div>
    <div class="key white"></div>
    <div class="key white"></div>
    <div class="key white"></div>
    <div class="key white"></div>
  </div>
  <div class="black-group">
    <div class="key black"></div>
    <div class="key black"></div>
    <div class="key black"></div>
    <div class="key black"></div>
    <div class="key black"></div>
  </div>
</div>
