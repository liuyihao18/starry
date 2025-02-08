const Base = {
  name: 'Base',
  japanese: '/japanese',
  gojyuuon: '/japanese/gojyuuon',
  tango: '/japanese/tango',
  bunpou: '/japanese/bunpou',
  bunkei: '/japanese/bunkei',
  kashi: '/japanese/kashi',
  gochiusa: '/japanese/gochiusa'
}

const GoJyuuOn = {
  name: 'GoJyuOn',
  link: `${Base.gojyuuon}/`,
  sidebar: {
    text: '五十音',
    link: `${Base.gojyuuon}/`,
    items: []
  }
}

const Tango = {
  name: 'Tango',
  link: `${Base.tango}/`,
  sidebar: {
    text: '单词',
    link: `${Base.tango}/`,
    collapsed: false,
    items: [
      {
        text: '人',
        collapsed: true,
        items: [
          {
            text: '亲属、朋友和熟人',
            link: `${Base.tango}/ningen/ningen1`,
          },
          {
            text: '人的性格和特征',
            link: `${Base.tango}/ningen/ningen2`,
          },
          {
            text: '对他人的感情和行动',
            link: `${Base.tango}/ningen/ningen3`,
          }
        ]
      },
      {
        text: '生活',
        collapsed: true,
        items: [
          {
            text: '吃食',
            link: `${Base.tango}/seikatsu/seikatsu1`,
          },
          {
            text: '家务',
            link: `${Base.tango}/seikatsu/seikatsu2`,
          },
          {
            text: '健康',
            link: `${Base.tango}/seikatsu/seikatsu3`,
          }
        ]
      }
    ]
  }
}

const Bunpou = {
  name: 'Bunpou',
  link: `${Base.bunpou}/`,
  sidebar: {
    text: '语法',
    link: `${Base.bunpou}/`,
    collapsed: false,
    items: [
      {
        text: '体言',
        collapsed: true,
        items: [
          {
            text: '代词',
            link: `${Base.bunpou}/taigen/taigen1`,
          },
          {
            text: '数量词',
            link: `${Base.bunpou}/taigen/taigen2`,
          },
          {
            text: '形式体言',
            link: `${Base.bunpou}/taigen/taigen3`,
          },
          {
            text: '常用的体言',
            link: `${Base.bunpou}/taigen/taigen4`,
          }
        ]
      },
      {
        text: '用言',
        collapsed: true,
        items: [
          {
            text: '动词',
            link: `${Base.bunpou}/yougen/doushi/doushi`,
            collapsed: true,
            items: [
              {
                text: '动词未然形',
                link: `${Base.bunpou}/yougen/doushi/doushi1`,
              },
              {
                text: '动词（第一）连用形',
                link: `${Base.bunpou}/yougen/doushi/doushi2`,
              },
              {
                text: '动词（第二）连用形',
                link: `${Base.bunpou}/yougen/doushi/doushi3`,
              },
              {
                text: '动词终止形',
                link: `${Base.bunpou}/yougen/doushi/doushi4`,
              },
              {
                text: '动词连体形',
                link: `${Base.bunpou}/yougen/doushi/doushi5`,
              },
              {
                text: '动词假定形',
                link: `${Base.bunpou}/yougen/doushi/doushi6`,
              },
              {
                text: '动词命令形',
                link: `${Base.bunpou}/yougen/doushi/doushi7`,
              },
              {
                text: '动词推量形',
                link: `${Base.bunpou}/yougen/doushi/doushi8`,
              },
              {
                text: '可能动词',
                link: `${Base.bunpou}/yougen/doushi/doushi9`,
              },
              {
                text: '授受动词',
                link: `${Base.bunpou}/yougen/doushi/doushi10`,
              },
              {
                text: '敬语动词',
                link: `${Base.bunpou}/yougen/doushi/doushi11`,
              }
            ]
          },
          {
            text: '形容词',
            link: `${Base.bunpou}/yougen/keiyoushi`,
          },
          {
            text: '形容动词',
            link: `${Base.bunpou}/yougen/keiyoudoushi`,
          }
        ]
      },
      {
        text: '附属词',
        collapsed: true,
        items: [
          {
            text: '助词',
            collapsed: true,
            items: [
              {
                text: '格助词',
                link: `${Base.bunpou}/accessory/jyoshi/kakujyoshi`,
              },
              {
                text: '终助词',
                link: `${Base.bunpou}/accessory/jyoshi/shuujyoshi`,
              },
              {
                text: '副助词',
                link: `${Base.bunpou}/accessory/jyoshi/fukujyoshi`,
              },
              {
                text: '接续助词',
                link: `${Base.bunpou}/accessory/jyoshi/setsuzokujyoshi`,
              }
            ]
          }
        ]
      },
      {
        text: '文体',
        collapsed: true,
        items: [
          {
            text: '敬体与简体',
            link: `${Base.bunpou}/buntai/buntai1`,
          },
          {
            text: '接头词',
            link: `${Base.bunpou}/buntai/buntai2`,
          },
          {
            text: '接尾词',
            link: `${Base.bunpou}/buntai/buntai3`,
          },
          {
            text: '其他',
            link: `${Base.bunpou}/buntai/buntai4`,
          },
        ]
      }
    ]
  }
}

const Bunkei = {
  name: 'Bunkei',
  link: `${Base.bunkei}/`,
  sidebar: {
    text: '句型',
    link: `${Base.bunkei}/`,
    collapsed: false,
    items: [
      {
        text: '一般句型',
        link: `${Base.bunkei}/1`,
      },
      {
        text: '比较句型',
        link: `${Base.bunkei}/2`,
      },
      {
        text: '敬语句型',
        link: `${Base.bunkei}/3`,
      },
      {
        text: '五十音分类',
        collapsed: true,
        items: [
          {
            text: 'あ行',
            link: `${Base.bunkei}/a`,
          },
          {
            text: 'か行',
            link: `${Base.bunkei}/ka`,
          },
          {
            text: 'さ行',
            link: `${Base.bunkei}/sa`,
          },
          {
            text: 'た行',
            link: `${Base.bunkei}/ta`,
          },
          {
            text: 'な行',
            link: `${Base.bunkei}/na`,
          },
          {
            text: 'は行',
            link: `${Base.bunkei}/ha`,
          },
          {
            text: 'ま行',
            link: `${Base.bunkei}/ma`,
          },
          {
            text: 'や行',
            link: `${Base.bunkei}/ya`,
          }
        ]
      }
    ]
  }
}

const Kashi = {
  name: 'Kashi',
  link: `${Base.kashi}/`,
  sidebar: {
    text: '歌词',
    link: `${Base.kashi}/`,
    items: [
      {
        text: '收藏夹',
        collapsed: true,
        items: [
          {
            text: 'secret base',
            link: `${Base.kashi}/secret_base`,
          },
          {
            text: 'song for you',
            link: `${Base.kashi}/song_for_you`,
          },
          {
            text: 'アイマイモコ',
            link: `${Base.kashi}/aimaimoko`,
          },
          {
            text: 'あの星の向こうに',
            link: `${Base.kashi}/anohoshinomukouni`,
          },
          {
            text: '色違い翼',
            link: `${Base.kashi}/irochigaitsubasa`,
          },
          {
            text: 'おかえり',
            link: `${Base.kashi}/okaeri`,
          },
          {
            text: '終わらない歌',
            link: `${Base.kashi}/owaranaiuta`,
          },
          {
            text: '木もれび青春譜',
            link: `${Base.kashi}/komorebiseishunfu`,
          },
          {
            text: 'ここから、ここから',
            link: `${Base.kashi}/kokokara`,
          },
          {
            text: 'ココロソマリ',
            link: `${Base.kashi}/kokorosomari`,
          },
          {
            text: 'だんご大家族',
            link: `${Base.kashi}/dangodaikazoku`,
          },
          {
            text: '小さなてのひら',
            link: `${Base.kashi}/chiisanatenohira`,
          },
          {
            text: '月と星空',
            link: `${Base.kashi}/tsukitohoshizora`,
          },
          {
            text: '東京ウインターセッション',
            link: `${Base.kashi}/toukyouuintaasesshon`,
          },
          {
            text: '東京オータムセッション',
            link: `${Base.kashi}/toukyouootamusesshon`,
          },
          {
            text: '東京サマーセッション',
            link: `${Base.kashi}/toukyousamaasesshon`,
          },
          {
            text: '東京スプリングセッション',
            link: `${Base.kashi}/toukyousupuringusesshon`,
          },
          {
            text: '天使にふれたよ！',
            link: `${Base.kashi}/tenshinifuretayo`,
          },
          {
            text: '時を刻む唄',
            link: `${Base.kashi}/tokiwokizamuuta`,
          },
          {
            text: '光るなら',
            link: `${Base.kashi}/hikarunara`,
          },
          {
            text: 'ふゆびより',
            link: `${Base.kashi}/fuyubiyori`,
          },
          {
            text: 'ドラえもんのうた',
            link: `${Base.kashi}/doraemonnouta`,
          },
          {
            text: '鳥の詩',
            link: `${Base.kashi}/torinouta`,
          }
        ]
      }
    ]
  }
}

const Gochiusa = {
  name: 'Gochiusa',
  link: `${Base.gochiusa}/`,
  sidebar: {
    text: 'ごちうさ',
    link: `${Base.gochiusa}/`,
    items: []
  }
}

export const Japanese = {
  name: 'Japanese',
  link: `${Base.japanese}/`,
  sidebar: {
    text: '日本語の勉強',
    link: `${Base.japanese}/`,
    items: [
      GoJyuuOn.sidebar,
      Tango.sidebar,
      Bunpou.sidebar,
      Bunkei.sidebar,
      Kashi.sidebar,
      Gochiusa.sidebar
    ]
  }
}