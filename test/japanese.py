import re

text = "[日(に)本(ほん)語(ご)]の[勉(べん)強(きょう)]"

# 定义正则表达式模式
pattern = r'\[(.*?[\(（].*?[\)）].*?)\]'
subpattern = r'(.*?)[\(（](.*?)[\)）]'

# 定义替换函数
def replace(match):
    subtext = match.group(1)
    new_text = '<ruby>'
    submatches = re.finditer(subpattern, subtext)
    for submatch in submatches:
        kanji = submatch.group(1)
        kana = submatch.group(2)
        new_text = new_text + kanji
        new_text = new_text + '<rp>(</rp>'
        new_text = new_text + '<rt>' + kana + '</rt>'
        new_text = new_text + '<rp>)</rp>'
    new_text = new_text + '</ruby>'
    return new_text

# 使用re.sub()函数进行替换
result = re.sub(pattern, replace, text)

# 打印替换后的结果
print(result)

    
    
    