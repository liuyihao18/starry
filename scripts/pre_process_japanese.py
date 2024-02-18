import re

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

def on_page_markdown(markdown, **kwargs):
    return re.sub(pattern, replace, markdown)
    