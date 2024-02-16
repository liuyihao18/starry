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
