# SSH密钥的使用

SSH密钥是非常好用的一个东西，包括但不限于各种身份认证，彻底摆脱频繁输密码的烦恼。

## 密钥生成

不管是Windows还是Linux，系统都自带一个可执行程序`ssh-keygen`，使用这个程序可以方便地生成新的RSA密钥对。在终端中输入下面的命令：

```shell
$ ssh-keygen -t rsa -c "your email"
```

然后一路回车到底即可。生成的密钥对会保存在你用户目录下名为`.ssh`的文件夹中，如果是第一次使用，里面应该只包含两个文件，分别是`id_rsa`和`id_rsa.pub`。这两个文件分别对应生成的私钥和公钥，你可以随便把你的公钥给任何人，但是请务必保存好自己的私钥，因为私钥在某种意义上就宛如身份证一样。比如下面就是我某台电脑的公钥：

```text
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDaN6T4o4McZoHEFu06ctagcRFgZIlTsSGU1g5cso4jqmngJwmFWf7pDSO/u0q6ttzvrvsOXv70PxtZee7lyhLZC7zA+zQWx7OtVAPs/9Or1nnxHJdTAUnPyGS2fHtRa7S1HnFA0tZab7jsgKc7ICfX0wRb8XbjLhZd9yY6i/j372GRX/OycFRsS5MBT8JLZtU9UNy2Aq8alQsKRiLu+eHkQ5LurDzTv4hRoCnP/x/8pOE7+i3MAQrj72IevAVGgZFumfpEPj78vxjX0mXR/6QJGFRP8jOszFLYnCAg27ApAZ+AxytUrZcTqbp/AhGmzqqlF9qYdC55BhabkNrktq2CVxLyKKa8HifmGkgtHSv8EKfET5cj/+8Jogs/ETGDHnJUyf12z7tXLGp+M8vT4WmxSsFOjEKXFEdAg8GMjVvJ7CiMKtrcul8O+6k5q9kK4W6E3fsgYSP3lrBTlQvaDRhjbN+LanhsU3WMQVKakc0FjGgOWnx1JL6mm7K8UKw5i4E= mildwind2022@gmail.com
```

## 密钥生成之后

密钥生成之后就可以使用了，下面介绍我平常用到的两种使用方式。

### SSH免密登录

如果大家和服务器打过交道，那么一定接触过用来远程登录的SSH和用来传输文件的SCP。正常使用SSH应该是这样子的：

```shell
$ ssh user@ip
```

然后被要求输入密码。如果只是偶尔使用还行，但是如果多次使用或者同时开多个终端，那么就会稍显麻烦。为了解决这个问题，我们仅需要把自己的公钥复制到服务器目录`~/.ssh/`下的文件`authorized_keys`文件中即可，于是我们便可以直接免密登录服务器啦！

> 记得重启SSH服务，然后是有些服务器可能需要进一步设置，这就不在本教程的指导范围内了

### GitHub上使用SSH认证

还在因为GitHub上HTTPS下载/克隆仓库的速度而绝望吗？那么请务必使用SSH方法。GitHub由于国内不可告人的限制而几乎无法使用了，于是中国程序员成了最会保护自己隐私的人。虽然设置代理也可以加速HTTPS，但是不如直接使用SSH绕过去更方便。

方法很简单，把自己的公钥复制到GitHub上相应的设置中即可。点击`Settings`，然后找到`SSH and GPG keys`，进去点击`New SSH Keys`，起个自己能认出来是哪个设备的名字，把公钥复制进去，大功告成。
你可以把自己的设备都这样子添加进去。

使用SSH还有个特别好的地方就是你再也不需要在`push`私有仓库时输入用户名和密码了，因为SSH已经自动完成了这个过程。非常方便！

## 杂谈

讲点有趣的事情。大概是疫情刚开始的时候吧，清华树洞用了几百洞的时间进化出了隔壁几万洞都没有进化出来的功能。众所周知，树洞这种平台，虽然是匿名的，但是发出来的信息是公开的。在这种情况下，要怎么才能做到在公开的平台上进行私密的交互呢？

清华学姐想出了极其牛逼的方法。虽然方法本身很简单，但是其惊人程度世所罕见——将自己的公钥发到树洞上，然后让想要加她QQ好友的人用她的公钥加密QQ号发给她。假设RSA公私钥体系是安全的，那么有且只有学姐能解密出正确的QQ号，然后加这个QQ号的人是且只能是学姐（假设这段时间其他人不会加这个QQ号）。

太惊人了，当真有种我真的在用我学到的知识这种感觉。虽然平常我们上网都在用RSA非对称加密，但此时此刻才有一种我真的在接触它们的感觉。RSA除了解密还有一种身份认证的功能，就是我用我的私钥加密一段信息，然后你们用我的公钥进行解密。因为能进行加密的是只有拥有私钥的我，所以发出这段信息的只能是我，这也是我一开始说私钥宛如身份证一般的意思。于是我在下面用我自己的私钥加密了一段信息，你们看看是什么内容？

```text
 b'\xa5U\x0b\xd2\xca\x05\xad6\x95#\xa0\n\x9c\x82\xda!J\xc9\xaa\x03I\xa7\x96c:Ew\xa2\xf4\x01\x95\xd4A\xac\xf0{TO\x19\x80vg\x9d\x1e\xeb\x84\xb3\xa5\x06\x9fSD\x9a\xd1\xeb\xb1q\x1e\x86\xa0\xa3\xb7\xa0\x82!-\xcca\xcd\xa9\x8d/\xf1\x1d\xab\xe2\xdb}\xe2\x08\xb4\\\xb4>/v\x9e\xae\xb2\xca\xc6\xff*a\xfb\xb4\xf9IOF\xa5\r\xd0(\xebS\x97\x86\x15;i\xac\x0b{1C\xf4\x01\x9b\x96Aa/\xbe\xbb\x91<\xd9\x10b\x0b\x0c\x18\x91\xb6\xf9\x18\x9c\xe4\xd3\x04.$\x19\xc2\xaf\x11\xc5\x13\xd7\xb8\xdaK\xec\xbf\xf2\xdb\xb3w\x1a\xe2\xa6\x1e\x16\x1c\xdc\x94\x0b!\xe2\xf3\xbae\x03\x84-*5\xa4\x99\x1b\xbdq\xa5N\x948-&,h<\xaf\xc34\xc7T\x84\xe7h\xc0{\x97\x07\x81\xdb\xfe\x9e&\xaf\xed\xca_g\xb9)\xe5\x14\xc3\xa2\x82u\xf9\r\xa8\x0e#\xfcA\xee+\xdf%\xa7\xc4z\xbc\x11\x01\xea\x14\xc5v\xf6\xb7\xca+Y\x16\xe8\xd9B*\xe02\'\xdc\xbbyaPc\xed\x04\xb0"\xe0\xeb?*\xaf\x8b\x0b\xa0\xca&T \x9c\x07\xae\x1ea\xc1\xe1KvbK]l\xb1\x97\x018\xd5\x03C-1Z\xe4\x8fMm\x96b\x8e\xaa\x87\\\\\xcat\xf0\xfcnn\x1f<\x02\x88~^4\xd1\xa3\xd1\x85\xa5h\xed\xd7\xb1\x91\x82\x08{\x83=\xb3L\xfc\xc6Uw)\x87\xb1,\x0b\xf0\xe3@\xc7K\x0cd\x82A\xb1\xe5\xcc\xb8\xfd<\x7f$c\x02y:\x15\xfaX{\x93i\x80\xee\xa2u]\x8e'
```



