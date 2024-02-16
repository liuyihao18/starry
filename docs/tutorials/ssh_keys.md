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

> 记得重启SSH服务，然后有些服务器可能需要进一步设置，这就不在本教程的指导范围内咯

### GitHub上使用SSH认证

还在因为GitHub上HTTPS下载/克隆仓库的速度而绝望吗？那么请务必使用SSH方法。GitHub由于国内不可告人的限制而几乎无法使用了，于是中国程序员成了最会保护自己隐私的人。虽然设置代理也可以加速HTTPS，但是不如直接使用SSH绕过去更方便。

方法很简单，把自己的公钥复制到GitHub上相应的设置中即可。点击`Settings`，然后找到`SSH and GPG keys`，进去点击`New SSH Keys`，起个自己能认出来是哪个设备的名字，把公钥复制进去，大功告成。
你可以把自己的设备都像这样添加进去。

使用SSH还有个特别好的地方就是你再也不需要在`push`私有仓库时输入用户名和密码了，因为SSH已经自动完成了这个过程。非常方便！

## 杂谈

讲点有趣的事情。大概是疫情刚开始的时候吧，清华树洞用了几百洞的时间进化出了隔壁几万洞都没有进化出来的功能。众所周知，树洞这种平台，虽然是匿名的，但是发出来的信息是公开的。在这种情况下，要怎么才能做到在公开的平台上进行私密的交互呢？

清华学姐想出了极其牛逼的方法。虽然方法本身很简单，但是其惊人程度世所罕见——将自己的公钥发到树洞上，然后让想要加她QQ好友的人用她的公钥加密QQ号发给她。假设RSA公私钥体系是安全的，那么有且只有学姐能解密出正确的QQ号，然后加这个QQ号的人是且只能是学姐（假设这段时间其他人不会加这个QQ号）。

太惊人了，真的有种我在用我学到的知识这种感觉。虽然平常我们上网都在用RSA非对称加密，但此时此刻才有一种我真的在接触它们的感觉。RSA除了解密还有一种身份认证的功能，就是我用我的私钥签名一段信息，然后你们用我的公钥进行验证。因为能进行签名的只有拥有私钥的我，所以发出这段信息的只能是我，这也是我一开始说私钥宛如身份证一般的意思。

## 小试牛刀

用Python的Crypto库可以方便地进行加解密或者签名操作，安装相应的库：

```shell
$ pip install pycryptodome
```

### 加密

```python
import os

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

user_home_directory = os.path.expanduser('~')

# 读取公钥文件
with open(os.path.join(user_home_directory, '.ssh', 'id_rsa.pub'), 'r') as f:
    public_key = RSA.import_key(f.read())

# 创建加密器
cipher = PKCS1_OAEP.new(public_key)

# 要加密的数据
data = b'Happy Spring Festival'

# 加密数据
encrypted_data = cipher.encrypt(data)

print("Encrypted Data:", encrypted_data)
```

### 解密

```python
import os

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

user_home_directory = os.path.expanduser('~')

# 读取私钥文件
with open(os.path.join(user_home_directory, '.ssh', 'id_rsa'), 'r') as f:
    private_key = RSA.import_key(f.read())

# 创建解密器
decryptor = PKCS1_OAEP.new(private_key)

# 要解密的数据
encrypted_data = b']Ck$\x02Y.\x90k\xa3\xcbn\xb7#\x0e\x95\xab\xca\xb2\xdb\x85)\xdc\x87l\n\xb4\xec\xa9\xcb\xee\xf7\xa8jQ\xa5\x8d\x14\xc1\x98\xcb\xf1,+#\x9b"y\xb9\x8e\xe9:6\xbb\xacN\xe7K\x11\xea\xc6\x81N\xd2k\xc2\x8c\xf5\x9e2\xa7\x8f\xa3\xf7-`5\xc7\x9a)_w\xb3\x86\xc0\x088\xcb\xfc\x96M\xf7\x10\x1d\xa2\x88\x04 \x87<\xa6\xf8\xc3\xaf\x08\x03r\xb3\xa8\xd8\x8bE\xf4\xb8\xeb\x0f/\xcd8\xd7q\xfb\x1a\x82\xb2\xbc\xda\x81\x92v\x1d\xe5\xde\x84-\xc5\xe3\xe5\xd7\x956\xc3\xb6\x94sm\xea\'\x1b\xfc\xcf\x8a\xe44C`\xd5\x0c\xaa\x9d\'\xe7\\\x03\xc2C\xc1\xf2hF\xde\x15\xd3\xb4\x8b\x97\x00"\xd7\xaf\xfc\xbcO\xe8Z\xc6\xfe&\x17\x16\xb8\xe0\x9a\x1f,\x85\\n!K\xe5O\xb1\xe4)}\xbb[\xf7u[0\xa1@t0{e\xb2\xfe8Eqq\xcfZ<g\x9f\x96\xc5\xfa\xb4[\xdf\xb2\xdd\xc2;\xe6\xd0\xc1\x92\xf1\xc1\xf1Y\xbd\x89\x89\x82%bg\xfbXLY\x03\xa5\x8f\xa9\x8e\x9f\xc8\x03\x12L\xb2\x06\xcdu\xb1z\xa6q2\t\xbdYAg\xfe\x81#\xc0\x7f*T\x03n\xcbd\x16\xa0C\xa9\xdf\xf3Um\x93\xfe\xb6EuZV\xb3 P\xe2\x00\xfdL\xb5\xd1\xf0\xc5\x18%\x7f G\xdc\xe1Wp\xc1g\x97GM\xd1\xbc\xc0\xb4\x98]\x81\xb9\xf0\x98\x10Td9\x13\x8c\xbd\x9bj\x9d\x9a\x9e\xbe?\xa6vnd\xdf\x80\xd9\x96\x9d\xf3\x92.\xd7\xef\x7f1S\x06\xf1\x8a\xe9k\xb8z\xb7\xafJ'

# 解密数据
decrypted_data = decryptor.decrypt(encrypted_data)

print("Decrypted Data:", decrypted_data)
```

### 签名

```python
import os

from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256

user_home_directory = os.path.expanduser('~')

# 读取私钥文件
with open(os.path.join(user_home_directory, '.ssh', 'id_rsa'), 'r') as f:
    private_key = RSA.import_key(f.read())

# 要签名的数据
data = b'Happy Spring Festival'

# 计算数据的哈希值
hash_value = SHA256.new(data)

# 创建签名器
signer = PKCS1_v1_5.new(private_key)

# 对数据的哈希值进行签名
signature = signer.sign(hash_value)

# 将签名保存到文件中
with open('signature.bin', 'wb') as f:
    f.write(signature)

print("Signature created and saved to signature.bin")
```

### 验证

```python
import os

from Crypto.PublicKey import RSA
from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256

user_home_directory = os.path.expanduser('~')

# 读取公钥文件
with open(os.path.join(user_home_directory, '.ssh', 'id_rsa.pub'), 'r') as f:
    public_key = RSA.import_key(f.read())

# 读取签名文件
with open('signature.bin', 'rb') as f:
    signature = f.read()

# 要签名的数据
data = b'Happy Spring Festival'

# 计算消息的哈希值
hash_value = SHA256.new(data)

# 创建签名验证器
verifier = PKCS1_v1_5.new(public_key)

# 验证签名
if verifier.verify(hash_value, signature):
    print("Signature is valid.")
else:
    print("Signature is invalid.")
```
