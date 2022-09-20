// 物联监控-安全用电
export default {
  // 全省数据
  '210000': {
    cityList: [
      /**
       * 城市点位信息
       * projectTotalCnt: 单位总数
       * projectOnlineCnt: 在线单位
       * projectAvailableCnt: 完好单位数
       * deviceTotalCnt: 设备总数
       * deviceAvailableCnt: 完好设备数
       * deviceNormalCnt: 正常设备数
       * deviceOnlineCnt: 在线设备数
       */
      {cityName: '大连', cityCode: '210200', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '沈阳', cityCode: '210100', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '鞍山', cityCode: '210300', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '营口', cityCode: '210800', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '抚顺', cityCode: '210400', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '本溪', cityCode: '210500', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '丹东', cityCode: '210600', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '锦州', cityCode: '210700', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '阜新', cityCode: '210900', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '辽阳', cityCode: '211000', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '盘锦', cityCode: '211100', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '铁岭', cityCode: '211200', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '朝阳', cityCode: '211300', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '葫芦岛', cityCode: '211400', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0}
    ],
    // 单位接入情况
    projectTotalCnt: 0,
    projectOnlineCnt: 0,
    projectOfflineCnt: 0, // 8.17修改为隐患单位
    // 联网单位分布
    projectTypes: [
      {
        type: '重点单位',
        code: 'zddw',
        cnt: 0
      }, {
        type: '一般单位',
        code: 'ybdw',
        cnt: 0
      }, {
        type: '高层民用',
        code: 'gcmy',
        cnt: 0
      }, {
        type: '综合体',
        code: 'zht',
        cnt: 0
      }, {
        type: '高危单位',
        code: 'gwdw',
        cnt: 0
      }
    ],
    // 监控设备概况
    deviceRunningStatus: {
      totalCnt: 0,
      normalCnt: 0,
      faultCnt: 0
    },
    // 设备告警概况
    warnDeviceDist: {
      totalCnt: 0,
      normalCnt: 0,
      warnCnt: 0
    },
    // 底部异常设备统计
    abnormalDeviceStatics: {
      warnLD: 0, // 漏电
      warnDL: 0, // 短路
      warnDY: 0, // 电压
      warnGL: 0, // 功率
      warnWD: 0 // 温度
    }
  },
  // 大连数据
  '210200': {
    cityList: [
      /**
       * 城市点位信息
       * projectTotalCnt: 单位总数
       * projectOnlineCnt: 在线单位
       * projectAvailableCnt: 完好单位数
       * deviceTotalCnt: 设备总数
       * deviceAvailableCnt: 完好设备数
       * deviceNormalCnt: 正常设备数
       * deviceOnlineCnt: 在线设备数
       */
      {cityName: '高新园区', cityCode: '210299', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '中山区', cityCode: '210202', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '西岗区', cityCode: '210203', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '沙河口区', cityCode: '210204', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '甘井子区', cityCode: '210211', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '普兰店', cityCode: '210282', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '瓦房店', cityCode: '210281', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '庄河', cityCode: '210283', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '开发区', cityCode: '210298', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '金石滩', cityCode: '210296', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '保税区', cityCode: '210297', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '金州区', cityCode: '210213', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '旅顺区', cityCode: '210212', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '长兴岛', cityCode: '210295', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '长海县', cityCode: '210224', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0},
      {cityName: '花园口', cityCode: '210294', projectTotalCnt: 0, projectAvailableCnt: 0, projectOnlineCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0}
    ],
    // 单位接入情况
    projectTotalCnt: 0,
    projectOnlineCnt: 0,
    projectOfflineCnt: 0, // 8.17修改为隐患单位
    // 联网单位分布
    projectTypes: [
      {
        type: '重点单位',
        code: 'zddw',
        cnt: 0
      }, {
        type: '一般单位',
        code: 'ybdw',
        cnt: 0
      }, {
        type: '高层民用',
        code: 'gcmy',
        cnt: 0
      }, {
        type: '综合体',
        code: 'zht',
        cnt: 0
      }, {
        type: '高危单位',
        code: 'gwdw',
        cnt: 0
      }
    ],
    // 监控设备概况
    deviceRunningStatus: {
      totalCnt: 0,
      normalCnt: 0,
      faultCnt: 0
    },
    // 设备告警概况
    warnDeviceDist: {
      totalCnt: '100000',
      normalCnt: '100000',
      warnCnt: '100000'
    },
    // 底部异常设备统计
    abnormalDeviceStatics: {
      warnLD: 0, // 漏电
      warnDL: 0, // 短路
      warnDY: 0, // 电压
      warnGL: 0, // 功率
      warnWD: 0 // 温度
    }
  },
  // 高新区数据
  '210299': {
    cityList: [
      /**
       * 城市点位信息
       * projectTotalCnt: 单位总数
       * projectOnlineCnt: 在线单位
       * projectAvailableCnt: 完好有效单位
       * deviceTotalCnt: 设备总数
       * deviceAvailableCnt: 完好设备数
       * deviceNormalCnt: 正常设备数
       * deviceOnlineCnt: 在线设备数
       */
      {cityName: '高新园区', cityCode: '210299', projectTotalCnt: 0, projectOnlineCnt: 0, projectAvailableCnt: 0, deviceTotalCnt: 0, deviceAvailableCnt: 0, deviceNormalCnt: 0, deviceOnlineCnt: 0}
    ],
    /**
     * 重点单位信息
     * name: 单位名称
     * deviceCnt: 监控点位数
     * deviceAvailableCnt: 完好设备数
     * warnDeviceCnt: 告警设备数
     * longitude: 经度
     * latitude: 纬度
     */
    projectList: [
      {id: 1, name: '凯特利催化工程-B楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.848886', longitude: '121.502356'},
      {id: 2, name: '大连市第七人民医院-1号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.876346', longitude: '121.522027'},
      {id: 3, name: '网络产业大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.862402', longitude: '121.530506'},
      {id: 4, name: '东软集团-D2楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.852444', longitude: '121.509371'},
      {id: 5, name: '东软集团-F5楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.851785', longitude: '121.503114'},
      {id: 6, name: '大连高新园区好声音练歌广场', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.861044', longitude: '121.531348'},
      {id: 7, name: '美达老年文化休养院-院楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.854492', longitude: '121.532973'},
      {id: 8, name: '海大科技园B座', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.866401', longitude: '121.532911'},
      {id: 9, name: '凯特利催化工程-E楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849533', longitude: '121.502152'},
      {id: 10, name: '大连东软信息学院-A3教学楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.888767', longitude: '121.535826'},
      {id: 11, name: '税务高等专科学校-4#公寓', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.881734', longitude: '121.544683'},
      {id: 12, name: '大连高级经理学院-教学办公楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.884633', longitude: '121.523756'},
      {id: 13, name: '大连东软信息学院-A6教学楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.891539', longitude: '121.536278'},
      {id: 14, name: '中国华录·松下-VMI仓库', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.854285', longitude: '121.520013'},
      {id: 15, name: '轻工业学校-宿舍1号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.872759', longitude: '121.538294'},
      {id: 16, name: '中国华录·松下-1#厂房', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.855347', longitude: '121.52135'},
      {id: 17, name: '金尊洗浴中心', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.836178', longitude: '121.50349'},
      {id: 18, name: '钓鱼台国宾馆大连山庄-9号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849195', longitude: '121.531758'},
      {id: 19, name: '大连海洋大学学生公寓-4号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.867519', longitude: '121.55431'},
      {id: 20, name: '国家海洋环境监测中心-综合实验楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.8687', longitude: '121.543129'},
      {id: 21, name: '大连软件园16#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.886752', longitude: '121.547356'},
      {id: 22, name: '中国华录·松下-职工文体中心', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.85658', longitude: '121.520741'},
      {id: 23, name: '大连医科大学中山学院-餐饮中心', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.855316', longitude: '121.513752'},
      {id: 24, name: '大连海洋大学学生公寓-3号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.867708', longitude: '121.553986'},
      {id: 25, name: '大连奥托股份有限公司 - 办公楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.846022', longitude: '121.283844'},
      {id: 26, name: '大连天地软件园工程师公寓', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.865101', longitude: '121.444859'},
      {id: 27, name: '东软集团-F2楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.85173', longitude: '121.502848'},
      {id: 28, name: '集电大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.860698', longitude: '121.515401'},
      {id: 29, name: '中国华录·松下-2#办公楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.854472', longitude: '121.521741'},
      {id: 30, name: '国网辽宁电力大连培训中心-学员公寓(A3#)', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.860104', longitude: '121.538923'},
      {id: 31, name: '大连高新万达广场', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.862189', longitude: '121.533736'},
      {id: 33, name: '大连软件园15#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887688', longitude: '121.546387'},
      {id: 34, name: '动漫游产业大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.858213', longitude: '121.526222'},
      {id: 35, name: '华信（国际）软件园1#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.854648', longitude: '121.482591'},
      {id: 36, name: '三丰大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.862067', longitude: '121.516543'},
      {id: 37, name: '中国科学院大连科技创新园', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.850127', longitude: '121.500206'},
      {id: 38, name: '华信（国际）软件园4#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.855796', longitude: '121.480677'},
      {id: 39, name: '埃森哲', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.852924', longitude: '121.495237'},
      {id: 40, name: '大连洪渤假日酒店有限公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.875312', longitude: '121.545748'},
      {id: 41, name: '大连软件园11#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.88403', longitude: '121.546156'},
      {id: 43, name: '大连理工大学附属学校圣克拉校区', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.893783', longitude: '121.52936'},
      {id: 44, name: '新源动力股份有限公司-AB座', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.848181', longitude: '121.50361'},
      {id: 45, name: '大连腾讯大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.861614', longitude: '121.523415'},
      {id: 46, name: '大连软件园24#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.889848', longitude: '121.546642'},
      {id: 47, name: '大连软件园23#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.889269', longitude: '121.54582'},
      {id: 48, name: '大连软件园8#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.88432', longitude: '121.544256'},
      {id: 49, name: '大连软件园腾飞园区2号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.846985', longitude: '121.510641'},
      {id: 50, name: '嘉创大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.861589', longitude: '121.531722'},
      {id: 51, name: '大连高级经理学院-3号学员综合楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.885903', longitude: '121.523059'},
      {id: 52, name: '志恒动漫', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.860207', longitude: '121.530974'},
      {id: 53, name: '智业广场B座', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.851721', longitude: '121.518752'},
      {id: 54, name: '海创（大连）科技交流中心', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.866765', longitude: '121.533309'},
      {id: 55, name: '智荟天地', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.858512', longitude: '121.44533'},
      {id: 56, name: '税务高等专科学校-2#公寓', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.881313', longitude: '121.543041'},
      {id: 57, name: '阳光数码大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.858616', longitude: '121.529358'},
      {id: 58, name: '大连高级经理学院-学员餐厅', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.885974', longitude: '121.523977'},
      {id: 59, name: '凯特利催化工程-C楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849329', longitude: '121.501696'},
      {id: 60, name: '东软软件园B1楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.891133', longitude: '121.537958'},
      {id: 61, name: '晟辉大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.857781', longitude: '121.525788'},
      {id: 62, name: '大连理工大学科技园B座', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887544', longitude: '121.531399'},
      {id: 63, name: '华信（国际）软件园2#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.856294', longitude: '121.484523'},
      {id: 64, name: '中国华录大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.854388', longitude: '121.523226'},
      {id: 66, name: '大连软件园2#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887455', longitude: '121.53408'},
      {id: 67, name: '大连软件园9#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.888287', longitude: '121.533'},
      {id: 68, name: '大连科技创业大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.870007', longitude: '121.537061'},
      {id: 69, name: '国网辽宁电力大连培训中心-学员公寓(A4#)', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.862753', longitude: '121.538185'},
      {id: 70, name: '大连软件园21#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.888965', longitude: '121.5434'},
      {id: 71, name: '大连软件园3#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887453', longitude: '121.544'},
      {id: 72, name: '东软软件园C3楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.888776', longitude: '121.536507'},
      {id: 73, name: '管委会-大连软件园腾飞园区3号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.844718', longitude: '121.512421'},
      {id: 74, name: '东软集团-E楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.852312', longitude: '121.510106'},
      {id: 75, name: '税务高等专科学校-3#公寓', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.881599', longitude: '121.543841'},
      {id: 76, name: '合益大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.848921', longitude: '121.517724'},
      {id: 77, name: '大连软件园17号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887559', longitude: '121.548302'},
      {id: 78, name: '大连高新汽车城 ', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.845128', longitude: '121.435118'},
      {id: 79, name: '大连海洋大学学生公寓-5号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.873385', longitude: '121.542386'},
      {id: 80, name: '弘泰大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.855907', longitude: '121.513321'},
      {id: 81, name: '大连飞马文仪家具有限公司-4号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.845598', longitude: '121.284966'},
      {id: 82, name: '锦辉购物广场(高新店)', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.866033', longitude: '121.532754'},
      {id: 83, name: '大连医科大学中山学院-11、12号公寓', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.855365', longitude: '121.51426'},
      {id: 84, name: '三星大厦（A、B座）', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.858873', longitude: '121.5245'},
      {id: 85, name: '航天大厦—综合楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.858448', longitude: '121.519633'},
      {id: 86, name: '海大科技园A座', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.86521', longitude: '121.532068'},
      {id: 87, name: '大连高级经理学院-2号学员楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.885449', longitude: '121.523963'},
      {id: 88, name: '大连软件园10#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.883435', longitude: '121.544682'},
      {id: 89, name: '大连新城浴酒店有限公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.87684', longitude: '121.527886'},
      {id: 90, name: '大连软件园腾飞园区5号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.845087', longitude: '121.511166'},
      {id: 91, name: '中冶焦耐（大连）工程技术有限公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.867164', longitude: '121.514373'},
      {id: 92, name: '亿达软景中心2、6#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887465', longitude: '121.541029'},
      {id: 93, name: '大连阳光居客舍', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.876125', longitude: '121.528362'},
      {id: 94, name: '大连东软信息学院-A7教学楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.893006', longitude: '121.536595'},
      {id: 95, name: '亿达软景中心3、4#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887195', longitude: '121.540051'},
      {id: 96, name: '大连高级经理学院-1号学员楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.885262', longitude: '121.52313'},
      {id: 97, name: '大连靖鑫酒店管理-全季酒店(大连高新万达广场店)', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.859467', longitude: '121.522547'},
      {id: 98, name: '对外贸易学校-教学综合楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.878489', longitude: '121.541616'},
      {id: 99, name: '东软集团-F6楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.851878', longitude: '121.503886'},
      {id: 100, name: '税务高等专科学校-5#公寓', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.882003', longitude: '121.545526'},
      {id: 101, name: '钓鱼台国宾馆大连山庄-8号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849195', longitude: '121.531758'},
      {id: 102, name: '亿达软景E居2#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.88558', longitude: '121.544623'},
      {id: 103, name: '东软软件园B2楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.890446', longitude: '121.538809'},
      {id: 104, name: '亿达软景E居6#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.884921', longitude: '121.544907'},
      {id: 105, name: '国网辽宁电力大连培训中心-学员公寓(A5#)', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.862828', longitude: '121.538062'},
      {id: 106, name: '亿达软景E居3、5#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.885265', longitude: '121.545684'},
      {id: 107, name: '新源动力股份有限公司-E座', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.848517', longitude: '121.502876'},
      {id: 108, name: '大连柏悦国际公寓', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.857887', longitude: '121.52494'},
      {id: 109, name: '大连高级经理学院-后勤楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.886232', longitude: '121.52196'},
      {id: 110, name: '东软集团-F3楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.851421', longitude: '121.502507'},
      {id: 111, name: '大连飞马文仪家具有限公司-2号成品库', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.845518', longitude: '121.285337'},
      {id: 112, name: '中车大连实业管理有限公司高新园区分公司综合楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.812282', longitude: '121.317026'},
      {id: 113, name: '钓鱼台国宾馆大连山庄-5号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849195', longitude: '121.531758'},
      {id: 114, name: '税务高等专科学校-学员餐厅', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.881171', longitude: '121.54405'},
      {id: 115, name: '大连航天疗养院3号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849671', longitude: '121.523589'},
      {id: 116, name: '钓鱼台国宾馆大连山庄-3号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849195', longitude: '121.531758'},
      {id: 117, name: '消防物联网中心', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.862226', longitude: '121.529751'},
      {id: 118, name: '大连海洋大学学生公寓-2号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.867454', longitude: '121.55397'},
      {id: 119, name: '如家大连高新园区万达广场店', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.854227', longitude: '121.525834'},
      {id: 120, name: '东软软件园C2楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.888777', longitude: '121.536815'},
      {id: 121, name: '大连船用阀门有限公司-试验楼（办公楼）', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.859547', longitude: '121.510994'},
      {id: 122, name: '大连和怡阳光酒店有限公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849346', longitude: '121.519663'},
      {id: 123, name: '东软集团-F1楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.851026', longitude: '121.503976'},
      {id: 124, name: '大连华录宾馆', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.850948', longitude: '121.523346'},
      {id: 125, name: '银海万向大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.855111', longitude: '121.524795'},
      {id: 126, name: '亿达软景中心1、5#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887631', longitude: '121.539962'},
      {id: 127, name: '东软软件园C1楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.888427', longitude: '121.537621'},
      {id: 128, name: '大连蓝堡酒店管理有限公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.838514', longitude: '121.50776'},
      {id: 129, name: '大连华仕山庄养老院', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.836168', longitude: '121.422099'},
      {id: 130, name: '美丽豪酒店', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.859927', longitude: '121.524499'},
      {id: 131, name: '大连驿居杏林酒店有限公司高新园区店(莫泰168）', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.853841', longitude: '121.525265'},
      {id: 132, name: '大连软件园腾飞园区1号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.847366', longitude: '121.513138'},
      {id: 133, name: '科创大厦-智业广场D2', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.852667', longitude: '121.519983'},
      {id: 134, name: '新源动力股份有限公司-D座', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.84911', longitude: '121.503252'},
      {id: 135, name: '华录影音中国华录D201厂房', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.856007', longitude: '121.518189'},
      {id: 136, name: '大连飞马文仪家具有限公司 - 1号办公楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.845446', longitude: '121.285101'},
      {id: 137, name: '大连软件园12#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887592', longitude: '121.545586'},
      {id: 138, name: '大连海洋大学学生公寓-1号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.867519', longitude: '121.55431'},
      {id: 139, name: '大连高新技术产业园区凌创资产管理中心-赛伯乐大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.852933', longitude: '121.519409'},
      {id: 140, name: '大连理工大学附属高中', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.893708', longitude: '121.529022'},
      {id: 141, name: '7号国际商业中心', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.859892', longitude: '121.525106'},
      {id: 142, name: '大连融科储能技术工程研究中心办公楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.857724', longitude: '121.515684'},
      {id: 143, name: '大连德翔宾馆有限公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.875988', longitude: '121.528381'},
      {id: 144, name: '汉庭海事大学店', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.869735', longitude: '121.538197'},
      {id: 145, name: '大连飞马文仪家具有限公司-3号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.84561', longitude: '121.28546'},
      {id: 146, name: '大连设计城有限公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849942', longitude: '121.517375'},
      {id: 147, name: '纳米大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.859727', longitude: '121.526112'},
      {id: 148, name: '大连软件园18#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.876134', longitude: '121.546877'},
      {id: 149, name: '文思海辉大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.858522', longitude: '121.525371'},
      {id: 150, name: '正隆大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.861034', longitude: '121.524849'},
      {id: 151, name: '钓鱼台国宾馆大连山庄-6号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849195', longitude: '121.531758'},
      {id: 152, name: '华录员工宿舍', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.853003', longitude: '121.523207'},
      {id: 153, name: '东软软件园B3楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.889679', longitude: '121.538751'},
      {id: 154, name: '大连慈善颐养院', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.88742', longitude: '121.500291'},
      {id: 155, name: '北京华联生活超市(大有店)', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.878479', longitude: '121.512375'},
      {id: 156, name: '大连爱儿坊国际新城幼儿学苑教学楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.888942', longitude: '121.550005'},
      {id: 157, name: '大连好又多商业广场百货有限公司学院分公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.877637', longitude: '121.547086'},
      {id: 158, name: '凯特利催化工程-A楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.848702', longitude: '121.502193'},
      {id: 159, name: '大连东软信息学院-A5图书馆', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.890723', longitude: '121.535336'},
      {id: 160, name: '东软集团-D1楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.852253', longitude: '121.509609'},
      {id: 161, name: '龙海大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849513', longitude: '121.517966'},
      {id: 162, name: '众力信息技术（创业大厦）', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.860304', longitude: '121.520234'},
      {id: 163, name: '百合水尚休闲酒店', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.877567', longitude: '121.50855'},
      {id: 164, name: '税务高等专科学校-教学楼1', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.879403', longitude: '121.545815'},
      {id: 165, name: '大连市云水瑶汤泉度假酒店有限公司', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.852008', longitude: '121.519355'},
      {id: 166, name: '新源动力股份有限公司-C座', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.848743', longitude: '121.503257'},
      {id: 167, name: '大连环洲购物广场', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.870845', longitude: '121.537776'},
      {id: 168, name: '东财职业技术学院—教学办公楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.880057', longitude: '121.540423'},
      {id: 169, name: '钓鱼台国宾馆大连山庄-2号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.849195', longitude: '121.531758'},
      {id: 170, name: '国网大连供电公司培训分中心-宾馆楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.85669', longitude: '121.533484'},
      {id: 171, name: '凯特利催化工程-D楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.84907', longitude: '121.501546'},
      {id: 172, name: '税务高等专科学校-1#公寓', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.88087', longitude: '121.54317'},
      {id: 173, name: '锦辉购物广场(书香园店)', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.87751', longitude: '121.546826'},
      {id: 174, name: '中国联合网络通信有限公司大连分公司软件园综合楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.887291', longitude: '121.542009'},
      {id: 175, name: '大连软件园22#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.889402', longitude: '121.546447'},
      {id: 176, name: '泰德大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.863243', longitude: '121.53096'},
      {id: 177, name: '大连华畅科技办公楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.879523', longitude: '121.517437'},
      {id: 178, name: '亿达软景E居1#楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.885551', longitude: '121.54535'},
      {id: 179, name: '高新区公安分局', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.832491', longitude: '121.506211'},
      {id: 180, name: '大连海洋大学学生公寓-6号楼', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.873073', longitude: '121.541608'},
      {id: 181, name: '国网辽宁电力大连培训中心-综合实训楼（A2#)', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.861421', longitude: '121.538303'},
      {id: 182, name: '嘉隆网络数据中心大厦', deviceCnt: 0, deviceAvailableCnt: 0, warnDeviceCnt: 0, latitude: '38.866216', longitude: '121.516197'}
    ],
    /**
     * 用电告警历史
     * title: 标题
     * time: 时间
     * status: 处理状态
     * reason: 核警结果
     */
    warnHistoryEventList: [],
    // 单位接入情况
    projectTotalCnt: 0,
    projectOnlineCnt: 0,
    projectOfflineCnt: 0, // 8.17修改为隐患单位
    // 联网单位分布
    projectTypes: [
      {
        type: '重点单位',
        code: 'zddw',
        cnt: 0
      }, {
        type: '一般单位',
        code: 'ybdw',
        cnt: 0
      }, {
        type: '高层民用',
        code: 'gcmy',
        cnt: 0
      }, {
        type: '综合体',
        code: 'zht',
        cnt: 0
      }, {
        type: '高危单位',
        code: 'gwdw',
        cnt: 0
      }
    ],
    // 监控设备概况
    deviceRunningStatus: {
      totalCnt: 0,
      normalCnt: 0,
      faultCnt: 0
    },
    // 设备告警概况
    warnDeviceDist: {
      totalCnt: 0,
      normalCnt: 0,
      warnCnt: 0
    },
    // 底部异常设备统计
    abnormalDeviceStatics: {
      warnLD: 0, // 漏电
      warnDL: 0, // 短路
      warnDY: 0, // 电压
      warnGL: 0, // 功率
      warnWD: 0 // 温度
    }
  }
};
