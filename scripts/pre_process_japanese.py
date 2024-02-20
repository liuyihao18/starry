import re

from mkdocs.structure.toc import AnchorLink

# 定义正则表达式模式
pattern = r'\[(.*?{.*?}.*?)\]'
subpattern = r'(.*?){(.*?)}'
accent_pattern = r'\((\d*?)\);'
toc_pattern = r'\(.*?\)'

# 定义替换函数
def replace_kana(match):
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

def replace_accent(match):
    new_text = '<span class="circled-number">'
    new_text = new_text + match.group(1)
    new_text = new_text + '</span>'
    return new_text

# 递归替换锚点
def replace_toc(toc):
    # TODO: 解决匹配的头部和尾部问题（用替换）
    toc.title = re.sub(toc_pattern, '', toc.title)
    for child in toc.children:
        replace_toc(child)

def on_page_markdown(markdown, **kwargs):
    markdown = re.sub(pattern, replace_kana, markdown)
    markdown = re.sub(accent_pattern, replace_accent, markdown)
    return markdown

def on_page_content(html, page, **kwargs):
    for toc in page.toc:
        replace_toc(toc)
    return html
    