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
