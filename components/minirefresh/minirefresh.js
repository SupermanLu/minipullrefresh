// components/minirefresh/minirefresh.js
const app = getApp(); // 获取全局应用程序实例对象
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    templateName:{
      type:String,
      value:'listTemplate'
    },
    pageSize:{
      type:Number,
      value:10
    },
    pageSizeParam:{
      type: String,
      value: 'PageSize'
    },
    initPageIndex:{
      type:Number,
      value:1
    },
    pageIndexParam:{
      type: String,
      value: 'CurrentPageIndex'
    },
    url:{
      type:String,
      value:'',
      observer(newVal,oldVal){
        this.getUrl(newVal);
      }
    },
    params:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageIndex:0,
    listdata:[]
  },
  ready(){
    this.getWindowHeight();
    this.refresh();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemclick:function(e){
      console.log(e);
      const myEventDetail = {guid:e.target.dataset.guid} // detail对象，提供给事件监听函数
      const myEventOption = {} // 触发事件的选项
      this.triggerEvent('itemclick', myEventDetail, myEventOption)
    },
    getUrl:function(url){
      this.setData({
        url:url
      })
    },
    getlistdata:function(){
      var self=this;
      console.log(self);
      var selfData=this.data;
      selfData.params[selfData.pageSizeParam] = selfData.pageSize;
      selfData.params[selfData.pageIndexParam] = selfData.pageIndex;
      wx.request({
        url: selfData.url,
        method:'GET',
        data: selfData.params,
        success: function (response){
          var list = selfData.listdata.concat(response.data.data);
          self.setData({
            listdata: list
          });
          wx.stopPullDownRefresh();
          self.getMiniHeight().then(function(){
            //判断高度
            console.log(self.height);
            console.log(self.windowHeight);
            if (self.height < self.windowHeight) {
              self.nextPage();
            }
          })
          
        }
      })
    },
    nextPage:function(){
      var self=this;
      var pageIndex=self.data.pageIndex+1;
      console.log(pageIndex);
      self.setData({
        pageIndex: pageIndex
      });
      self.getlistdata();
    },
    refresh:function(){
      var self = this;
      var pageIndex = self.data.initPageIndex;
      console.log(pageIndex);
      self.setData({
        pageIndex: pageIndex,
        listdata:[]
      });
      self.getlistdata();

      
    },
    getMiniHeight(){
      var self = this;
      return new Promise(function(resolve,reject){
        
        var minirefresh = wx.createSelectorQuery().select('#minirefresh').fields({
          dataset: true,
          size: true,
          scrollOffset: true,
          properties: ['scrollX', 'scrollY'],
          computedStyle: ['margin', 'backgroundColor'],
          context: true,
        }, function (res) {
          console.log(res.height);
          self.height = res.height;
          resolve();
        }).exec();
      })
      
    },
    getWindowHeight(){
      try {
        const res = wx.getSystemInfoSync();
        
        console.log(res.windowHeight);

        this.windowHeight = res.windowHeight;
      
      } catch (e) {
        // Do something when catch error
      }
    }
  }
})
