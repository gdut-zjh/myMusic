//index.js
//获取应用实例
Page({
  data: {
    cur_nav_index: 2,
    menu_data: ['推荐', '排行榜', '搜索'],
    recommend_data: [],
    rankList_data: [],
    focus: false, // 是否选中搜索框
    search_data: [], // 搜索结果
    search_success: false
  },

  onLoad() {
    var that = this
    // 请求推荐页的数据
    wx.request({
      url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1531385703933',
      success: function(res) {
        that.setData({
          recommend_data: res.data.data
        })
      }
    });
    // 请求排行榜的数据
    wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?_=1551243810682&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1',
      success: function(res) {
        that.setData({
          rankList_data: res.data.data.topList
        })
      }
    });
  },

  // 修改菜单栏
  changeMenu: function(e) {
    this.setData({
      cur_nav_index: e.currentTarget.dataset.index
    })
  },

  // 点击搜索框
  searchFocus: function(e) {
    this.setData({
      focus: true
    })
  },
  searchBlur: function(e) {
    this.setData({
      focus: false
    })
  },

  // 搜索框中输入回车
  search: function(e) {
    var that = this;
    wx.request({
      url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp?aggr=1&cr=1&flag_qc=0&p=1&n=30&w=' + e.detail.value,
      success: function(res) {
        that.setData({
          search_data: JSON.parse(res.data.slice(9, -1)),
          search_success: true
        });
      }
    })
  },
  // 播放
  play: function(e) {
    wx.request({
      // 请求filename和vkey
      url: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json205361747&platform=yqq&cid=205361747&songmid=' + e.currentTarget.dataset.songmid + '&filename=C400' + e.currentTarget.dataset.songmid + '.m4a&guid=3725862252',
      success: function(res) {
        wx.playBackgroundAudio({
          dataUrl: 'http://dl.stream.qqmusic.qq.com/' + res.data.data.items[0].filename + '?guid=3725862252&vkey=' + res.data.data.items[0].vkey + '&uin=0&fromtag=38'
        })
      }
    })
  }
})