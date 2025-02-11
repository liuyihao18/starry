# 傅里叶分析

让我们一起进入傅里叶分析的世界吧！

👇👇👇

## 傅里叶级数（FS）

任何连续的周期信号都可以写作可数个三角函数之和的形式，亦即傅里叶级数。

实数形式：

$$
\frac{a_0}{2}+\sum_{n=1}^{\infty}(a_n\cos(nx) + b_n\sin(nx))
$$

复数形式：

$$
\sum_{n=-\infty}^{+\infty}c_ne^{jnx}
$$

如果定义两个函数之间的内积为：

$$
\langle f(x), g(x) \rangle = \frac{1}{2}\int_{0}^{2\pi}f(x)\overline{g(x)}\ \mathrm{d}x
$$

则求解系数：

$$
c_n = \langle f(x), e^{jnx} \rangle = \frac{1}{2\pi} \int_0^{2\pi} f(x)e^{-jnx}\ \mathrm{d}x
$$

> 从线性变换的角度，可以看作从基$(1, x, x^2, ...)$变换到了基$(1, e^{jx}, e^{2jx}, ...)$。

## 傅里叶变换（FT）

如果是连续的非周期信号，那么这个信号就不能表示成可数个三角函数之和的形式。但是，这个信号仍然可以被无穷多个（不可数）周期函数的线性组合来逼近。

设：

$$
g(t) = \int_{-\infty}^{+\infty} \left ( \int_{-\infty}^{+\infty}g{(\xi)e^{-j2\pi f\xi}\ \mathrm{d}\xi} \right ) e^{j2\pi ft}\ \mathrm{d}f
$$

那么：

$$
\hat{g}(f) = \mathscr{F}(g(t)) = \int_{-\infty}^{+\infty}g{(t)e^{-j2\pi ft}\ \mathrm{d}t}
$$

$$
g(t) = \mathscr{F}^{-1}(\hat{g}(f)) = \int_{-\infty}^{+\infty} \hat{g}(f) e^{j2\pi ft}\ \mathrm{d}f
$$

## 离散傅里叶级数（DFS）

现实中遇到的信号并不是连续信号，连续信号通常都会经过采样、量化等过程变成存储在计算机中的离散信号。

将离散的周期信号定义为：

$$
\vec{x} = \sum_{k=0}^{N-1}c_k\vec{e}_k
$$

定义内积：

$$
\langle \vec{a}, \vec{b} \rangle = N\sum_{n=0}^{N-1}a_n\overline{b_n}
$$

定义单位正交基向量：

$$
\vec{e}_k=(\frac{1}{N}e^{j2\pi\frac{k}{N}\cdot 0}, \frac{1}{N}e^{j2\pi\frac{k}{N}\cdot 1}, ..., \frac{1}{N}e^{j2\pi\frac{k}{N}\cdot (N-1)}),\ k = 0, 1, ..., N-1
$$

故：

$$
x[n] = \frac{1}{N}\sum_{k=0}^{N-1}c_ke^{j2\pi \frac{k}{N}n}
$$

求解系数：

$$
c_k=\langle \vec{x}, \vec{e}_k \rangle = \sum_{n=0}^{N-1}x[n]e^{-j2\pi \frac{k}{N}n}
$$

> 这种方式定义了一个希尔伯特空间。

## 离散时间傅里叶变换（DTFT）

如果是离散的非周期信号，类似傅里叶级数和傅里叶变换的关系，我们有离散时间傅里叶变换。

令$\omega=2\pi\frac{k}{N}$，有：

$$
X(\omega) = \sum_{n=-\infty}^{+\infty}x[n]e^{-jwn}
$$
逆离散傅里叶变换：

$$
x[n] = \frac{1}{2\pi}\int_{0}^{2\pi}X(\omega)e^{jwn}\ \mathrm{d}\omega
$$

## 离散傅里叶变换（DFT）

对于真实信号，有以下三种情况：

1. 真实信号是周期的，有限长信号恰好截断了整数个周期 - DFT就是DFS中的系数公式，IDFT就是DFS展开式；
2. 真实信号是周期的，有限长信号并非截断了整数个周期 - 只能认为同1种情况；
3. 真实信号是非周期的 - DFT是对DTFT的一个抽样；

但是无论如何，离散傅里叶变换都可以写作下面的形式，也是我们实际会使用的形式。

$$
X[k] = \sum_{n = 0}^{N - 1}x[n]e^{-j2\pi\frac{k}{N}n},\ k=0,1,...,N-1
$$

$$
x[n] = \frac{1}{N}\sum_{k=0}^{N-1}X[k]e^{j2\pi\frac{k}{N}n},\ n = 0,1,...,N-1
$$

## 补零

时域补零可以得到更细粒度的频域信息，频域补零可以得到更细粒度的时域信息。
$$
\Delta f = \frac{1}{T},\ B = \frac{1}{\Delta t}
$$

$$
\Delta t = \frac{1}{B}, T = \frac{1}{\Delta f}
$$

> 但是频域或时域分辨率是有限的，补零并不会无限制提高精度。

## 离散傅里叶变换矩阵

离散傅里叶变换可以写成矩阵形式：

$$
[F]_{kn} = e^{-j2\pi \frac{k}{N} n}
$$

或：

$$
F = 
\begin{bmatrix}
1 & 1 & 1 & \cdots & 1\\
1 & \omega & \omega^2 & \cdots & \omega^{N-1} \\
1 & \omega^2 & \omega^4 & \cdots &\omega^{N-2} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & \omega^{n-1} & \omega^{n-2} & \cdots & \omega
\end{bmatrix}
$$

$$
\vec{X} = \textbf{F} \cdot \vec{x}
$$

于是，逆离散傅里叶变换矩阵：

$$
\textbf{F}^{-1} = \frac{1}{N}\textbf{F}^*
$$

$$
\vec{x} = \textbf{F}^{-1} \cdot \vec{X}
$$

## 非一致离散傅里叶变换（NDFT）

如果时域数据的采样或频域数据的采样是非均匀的，就需要进行特殊处理，这里主要使用优化目标函数的方法。

非一致离散傅里叶变换可以写作：

$$
X[m] = \sum_{n = 0}^{N - 1}x[n]e^{-j2\pi f_m \tau_n},\ k=0,1,...,M
$$

写成矩阵形式：

$$
[F]_{mn} = e^{-j2\pi f_m \tau_n}
$$

若$M = N$，该矩阵是方阵且存在逆矩阵，有唯一解：

$$
\vec{x} = \textbf{F}^{-1}\cdot\vec{X}
$$

若$M \neq N$，该矩阵不是方阵，所以不存在逆矩阵，可以采用优化的方法求解：

$$
\min_{\vec{x}} || \vec{X} - \textbf{F} \vec{x} ||_2^2
$$

加入L1正则项以获取稀疏解：

$$
\min_{\vec{x}} || \vec{X} - \textbf{F} \vec{x} ||_2^2 + \alpha||\vec{x}||_1
$$

> 其实INDFT就是对未知频点补零后的IFFT的结果采样，如果$\alpha = 0$，那么NDFT的结果就是对应IFFT的结果。

## 附录1：单位正交基证明

### 引理

引理：若一组向量模长相等，幅角为$(0, \frac{1}{N}\cdot2\pi, \frac{2}{N}\cdot2\pi,...,\frac{N-1}{N}\cdot2\pi)$，则这组向量相加和为$0$。

证明：该组向量构成一个正N边形，从原点出发，最后回到原点。

### 证明

我们有：

$$
\vec{e}_k=(\frac{1}{N}e^{j2\pi\frac{k}{N}\cdot 0}, \frac{1}{N}e^{j2\pi\frac{k}{N}\cdot 1}, ..., \frac{1}{N}e^{j2\pi\frac{k}{N}\cdot (N-1)}),\ k = 0, 1, ..., N-1
$$

计算内积：

$$
\begin{align*}
\langle \vec{e}_i, \vec{e}_j \rangle & = N\sum_{n=0}^{N-1}\left(\frac{1}{N}e^{j2\pi\frac{i}{N}n}\right)\overline{\left(\frac{1}{N}e^{j2\pi\frac{j}{N}n}\right)} \\
& = N\sum_{n=0}^{N-1}\left(\frac{1}{N}e^{j2\pi\frac{i}{N}n}\right)\left(\frac{1}{N}e^{-j2\pi\frac{j}{N}n}\right) \\
& = \frac{1}{N} \sum_{n=0}^{N-1}e^{j2\pi \frac{(i-j)}{N}n}
\end{align*}
$$

当$i=j$时：

$$
\begin{align*}
\langle \vec{e}_i, \vec{e}_i \rangle & = \frac{1}{N} \sum_{n=0}^{N-1}e^{j2\pi \frac{(i-i)}{N}n} \\
& = \frac{1}{N} \sum_{n=0}^{N-1}1 \\
& = \frac{1}{N} \cdot N \\
& = 1
\end{align*}
$$

当$i \neq j$时，不失一般性，假设$i > j$：

$$
\langle \vec{e}_i, \vec{e}_j \rangle = \frac{1}{N} \sum_{n=0}^{N-1}e^{j2\pi \frac{(i-j)}{N}n}
$$

若$i-j$与$N$互素，那么$(i-j)n \% N$遍布所有$0,1,...,N-1$，内积等价于：

$$
\langle \vec{e}_i, \vec{e}_j \rangle = \frac{1}{N} \sum_{n=0}^{N-1}e^{j2\pi \frac{1}{N}n}
$$

> 亦即阶数为$N$的群不存在$N / (i-j)$阶循环子群。

由引理可知，该和为$0$。

若$i-j$是$N$的因子，设$M = \frac{N}{i-j}$，那么$(i-j)n\%N$遍布$0,i-j,2\cdot(i-j),...,(M-1)\cdot(i-j)$，内积等价于：

$$
\langle \vec{e}_i, \vec{e}_j \rangle = \frac{1}{N}(i-j)\sum_{m=0}^{M-1}e^{j2\pi \frac{1}{M}m}
$$

> 亦即阶数为$N$的群存在$N/(i-j)$阶循环子群。

由引理可知，该和为0。

所以：

$$
\langle \vec{e}_i, \vec{e}_j \rangle = \delta_{ij} = 
\left \{
\begin{array}{**lr**}
1, & i = j\\
0, & i \neq j\\
\end{array}
\right.
$$

即这是一组单位正交基。

> 也可以用等比求和公式：

> $$
\begin{align*}
\langle \vec{e}_i, \vec{e}_j \rangle 
& = \frac{1}{N} \sum_{n=0}^{N-1}e^{j2\pi \frac{(i-j)}{N}n} \\
& = \frac{1}{N} \frac{1 - e^{j2\pi\frac{(i-j)}{N}N}}{1 - e^{j2\pi(i-j)}} \\
& = \frac{1}{N} \frac{1 - 1}{1 - e^{j2\pi(i-j)}} \\
& = 0
\end{align*}
$$

## 附录2：DFS的正确性

将系数$c_k$表达式代入DFS展开式中，可以得到：

$$
\begin{align*}
x[n] & = \frac{1}{N}\sum_{k=0}^{N-1}\left(\sum_{i=0}^{N-1}x[i]e^{-j2\pi\frac{k}{N}i}\right)e^{j2\pi\frac{k}{N}n} \\
& = \frac{1}{N}\sum_{k=0}^{N-1}\sum_{i=0}^{N-1}x[i]e^{-j2\pi\frac{k}{N}i}e^{j2\pi\frac{k}{N}n} \\
& = \frac{1}{N}\sum_{k=0}^{N-1}\sum_{i=0}^{N-1}x[i]e^{j2\pi\frac{k}{N}(n-i)} \\
& = \frac{1}{N}\sum_{i=0}^{N-1}\sum_{k=0}^{N-1}x[i]e^{j2\pi\frac{k}{N}(n-i)} \\
\end{align*}
$$

当$i \neq n$时，类似附录1中的证明过程，求和为$0$，所以：

$$
\begin{align*}
x[n] & = \frac{1}{N}\sum_{i=0}^{N-1}\sum_{k=0}^{N-1}x[i]e^{j2\pi\frac{k}{N}(n-i)} \\
& = \frac{1}{N}\sum_{k=0}^{N-1}x[n]e^{j2\pi\frac{k}{N}(n-n)} \\
& = \frac{1}{N}\sum_{k=0}^{N-1}x[n] \\
& = \frac{1}{N}\cdot N \cdot x[n] \\
& = x[n]
\end{align*}
$$

## 附录3：相位偏移问题

若频域向量不是从零频率开始，则会产生相位偏移问题。

设频域向量$\vec{X}$，$X[k]$对应频率$f_0 + k\Delta f$，时域向量$\vec{x}$，$x[n]$对应时间$n\Delta t$，有离散傅里叶级数展开式：

$$
X[k] = \sum_{n=0}^{N-1}\hat{x}[n]e^{-j2\pi\frac{k}{N}n}
$$

如果代入频率和时间，离散傅里叶级数实际展开式为：

$$
X[k] = \sum_{n=0}^{N-1}x[n]e^{-j2\pi(f_0+k\Delta f)n\Delta t}
$$

我们已经知道：

$$
N\Delta t = T = \frac{1}{\Delta f}
$$

即：

$$
\Delta t \cdot \Delta f = \frac{1}{N}
$$

对上述实际展开式进行变换：

$$
X[k] = \sum_{n=0}^{N-1}x[n]e^{-j2\pi f_0 n\Delta t} \cdot e^{-j2\pi k\Delta fn\Delta t} 
= \sum_{n=0}^{N-1}x[n]e^{-j2\pi f_0 n\Delta t} \cdot e^{-j2\pi \frac{k}{N}n}
$$

对比离散傅里叶级数的展开式和变换后的实际展开式，可以得到：

$$
\hat{x}[n] = x[n]e^{-j2\pi f_0 n\Delta t}
$$

因此，直接使用逆离散傅里叶变换得到的$\hat{x}[n]$和实际的$x[n]$模长相等，相位差$2\pi f_0n\Delta t$，这个相位可以修正：

$$
x[n] = \hat{x}[n]e^{j2\pi f_0 n\Delta t}
$$
