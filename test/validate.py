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
