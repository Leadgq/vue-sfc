let map: any;
// marker集合
let cityMarkers: any[] = [];
// 当前城市code
let currentCityCode: string | number | undefined = undefined;
// 当前视角
let currentViewType: string
// 聚合点位得实例对象
let clusterMarker: any = undefined;
//  3D
let object3DLayer: any;
//  信息提示框
let cityInfoWindow: any;
type aMapInstance = {
    contraction: string,
    viewType: string,
    viewCityCode: string,
    toViewType: () => void
}
let  cityList:any = []
// 无法匹配的辖区数据
const specialCityInfo = [
    {belongToProvince: '大连', cityCode: '210298', city: '开发区', level: 'district', center: [121.901641, 39.063867]},
    {belongToProvince: '大连', cityCode: '210282', city: '普兰店市', level: 'district', center: [121.938299, 39.391565]},
    {belongToProvince: '大连', cityCode: '210299', city: '高新园区', level: 'district', center: [121.528854, 38.858948]},
    {belongToProvince: '大连', cityCode: '210295', city: '长兴岛', level: 'district', center: [121.428787, 39.571643]},
    {belongToProvince: '大连', cityCode: '210294', city: '花园口', level: 'district', center: [122.640624, 39.556593]},
    {belongToProvince: '大连', cityCode: '210297', city: '保税区', level: 'district', center: [121.802372, 39.060374]},
    {belongToProvince: '大连', cityCode: '210296', city: '金石滩', level: 'district', center: [122.0156, 39.079789]},
    {belongToProvince: '盘锦', cityCode: '211121', city: '大洼县', level: 'district', center: [122.082227, 41.002679]},
    {belongToProvince: '盘锦', cityCode: '211190', city: '辽滨经济区', level: 'district', center: [122.239737, 40.695747]},
    {belongToProvince: '锦州', cityCode: '210791', city: '锦州港', level: 'district', center: [121.048169, 40.807108]},
    {belongToProvince: '锦州', cityCode: '210790', city: '滨海新区', level: 'district', center: [121.073175, 40.829298]},
    {belongToProvince: '沈阳', cityCode: '210190', city: '经济技术开发区', level: 'district', center: [123.296272, 41.767981]},
    {belongToProvince: '沈阳', cityCode: '210191', city: '金融商贸开发区', level: 'district', center: [123.430395, 41.813583]},
    {belongToProvince: '抚顺', cityCode: '210424', city: '开发区', level: 'district', center: [123.720572, 41.822035]},
    {belongToProvince: '铁岭', cityCode: '211283', city: '凡河新区', level: 'district', center: [123.733652, 42.222791]}
];
// 加载地图
export const loadMap = async ({contraction, viewType = 'province', viewCityCode = '210000', toViewType }: aMapInstance): Promise<void> => {
    return new Promise((resolve) => {
        map = new AMap.Map(contraction, {
            resizeEnable: true,
            center: [122.254265, 40.361304],//中心点坐标
            viewMode: '3D',//使用3D视图
            zoom: 7.62,
            zooms: [3, 18],
            mapStyle: "amap://styles/dark",
            showLabel: false
        });
        initInfoWindow(toViewType)
        // 添加3D图层
        object3DLayer = new AMap.Object3DLayer({zIndex: -1});
        map.add(object3DLayer);
        resolve();
        // 调整视角
        changeMapView(viewType, viewCityCode);
    })
}
export const drawCityMakers = (list: any[], viewType: string, viewCityCode: string) => {
    // 保存视角
    saveView(viewType, viewCityCode);
    clearAMap();
     cityList = [...list];
    // 预先计算code对应经纬度
    let district = new AMap.DistrictSearch({
        subdistrict: 0,
        level: viewType === 'province' ? 'city' : 'district',
        showbiz: false,
        extensions: 'base'
    });
    cityList.forEach((city:Record<string,any>, index:number) => {
        const specialCity = specialCityInfo.find(item => item.cityCode === city.cityCode);
        if (specialCity) {
            cityList[index].center = specialCity.center;
            cityList[index].level = specialCity.level;
            drawCityMarker({
                ...city,
                center: specialCity.center
            });
            return;
        }
        // 异步设置中心点 & 掩模 & 描边
        district.search(city.cityCode, (status: string, result: Record<string, any>) => {
            if (status !== 'complete') {
                return;
            }
            cityList[index].center = result.districtList[0].center;
            cityList[index].level = result.districtList[0].level;
            drawCityMarker({
                ...city,
                center: result.districtList[0].center
            });
        });
    })
}
const drawCityMarker = (city: Record<string, any>) => {
    const marker = new AMap.Marker({
        position: city.center,
        offset: new AMap.Pixel(0, -25),
        content: `<div class="city-marker">
                <div class="city-marker-img"></div>
               <div class="city-name">${city.cityName}</div>
      </div>`,
        anchor: 'top-center'
    });
    marker.on('click',()=>{
        setTimeout(()=>{
             currentCityCode = city.cityCode;
             window.ToViewType(city.level,city.cityCode,city.cityName);
        },10)
    })
    cityMarkers.push(marker);
    map.add(marker);
}
const saveView = (viewType: string, viewCityCode: string) => {
    currentCityCode = viewCityCode;
    currentViewType = viewType;
}

// 画区级数据
export const drawDistrictMaker = (DistrictList:any[] = [],viewType:string, viewCityCode:string ) => {
    clearAMap();
    saveView(viewType, viewCityCode);
    cityList = DistrictList;
    cityList.forEach((item:Record<string, any>) => drawCityMarker(item));
    map.setFitView(cityMarkers, true, [150, 60, 100, 60]);
    if (cityList.length > 30) {
        // 聚合开始
        renderClusterMarker();
    }
};
const handlerClusterMarker = (context: any) => {
    const count = cityMarkers.length;
    let div = document.createElement('div');
    let fontColor = '#fff';
    let size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20);
    div.style.width = 29 + 'px';
    div.style.height = 35 + 'px';
    div.innerHTML = context.count;
    div.style.lineHeight = 33 + 'px';
    div.style.color = fontColor;
    div.style.fontSize = '11px';
    div.style.textAlign = 'center';
    div.className = 'point';
    context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
    context.marker.setContent(div);
};

// 点位聚合
const renderClusterMarker = () => {
    clusterMarker = new AMap.MarkerClusterer(map, cityMarkers, {
        gridSize: 80,
        renderClusterMarker: handlerClusterMarker,
        minClusterSize: 10
    });
};
/**
 * 初始化建筑的infoWindow
 */
const initInfoWindow = (toViewType: () => void) => {
    // 建筑物弹窗
    cityInfoWindow = new AMap.InfoWindow({
        isCustom: true,
        closeWhenClickMap: true,
        autoMove: true,
        offset: new AMap.Pixel(0, -25),
        anchor: 'bottom-right'
    });
    window.ToViewType = toViewType;
    cityInfoWindow.on('open', () => {});
    cityInfoWindow.on('close', () => {});
};
export const clearAMap = () => {
    if (cityMarkers.length > 0) {
        map && map.remove(cityMarkers);
        cityMarkers = [];
    }
    map && map.clearInfoWindow();
    currentCityCode = undefined;
    if (clusterMarker) {
        clusterMarker.clearMarkers();
    }
};
// 调整视角
export const changeMapView = (viewType: string, viewCityCode: string) => {
    clearAMap();
    let defaultCenter: any[] | undefined = undefined;
    const specialCityIndex = specialCityInfo.findIndex(item => item.cityCode === viewCityCode);
    if (specialCityIndex !== -1) {
        // 无法匹配的行政区，掩模做上级城市掩模
        viewCityCode = viewCityCode.substring(0, 4) + '00';
        defaultCenter = specialCityInfo[specialCityIndex].center;
    }
    let district = new AMap.DistrictSearch({
        subdistrict: 0,
        extensions: 'all',
        level: defaultCenter ? 'city' : viewType
    });
    // 异步设置中心点 & 掩模 & 描边
    district.search(viewCityCode, (status: string, result: any) => {
        if (status !== 'complete') return;
        const center = defaultCenter || (viewType === 'province' ? [122.254265, 40.361304] : result.districtList[0].center);
        const zoom = viewType === 'province' ? 7.62 : (viewType === 'city' && !defaultCenter) ? 9.75 : 12;
        map.setZoomAndCenter(zoom, center);
        const bounds = result.districtList[0].boundaries;
        drawMask(viewType, bounds);
    });
}
/**
 * 区域掩模 + 描边
 * @param viewType
 * @param bounds
 */
const drawMask = (viewType: string, bounds: Array<any>) => {
    // 清理bounds数据，第一个map将坐标对象转为数组；第二个map进行数据缩略
    let maskMap = bounds.map(cake => cake.map((item: any) => [item.getLng(), item.getLat()])).map(cake => {
        let shrink = 1;
        // 大型陆块描边量减半
        if (cake.length > 10000) {
            shrink = 2;
        }
        let filteredCake = cake.filter((item: any, index: number) => index % shrink === 0);
        // 如果不能整除保留最后一个点位，形成闭环
        if ((cake.length - 1) % shrink !== 0) {
            filteredCake.push(cake[cake.length - 1]);
        }
        return filteredCake;
    });
    // 组装数据进行掩模
    map.setMask(maskMap.map(item => [item]));
    // 添加描边，提高加载速度，只描大型岛屿
    maskMap.filter(item => item.length > 50).forEach(mask => new AMap.Polyline({
        path: mask,
        strokeColor: '#298BAB',
        strokeWeight: 4,
        map: map
    }));
    // 添加高度面
    if (!object3DLayer) return;
    object3DLayer.clear();
    let wall = new AMap.Object3D.Wall({
        path: maskMap.filter(item => item.length > 200),
        height: viewType === 'province' ? -100000 : viewType === 'city' ? -50000 : -10000,
        color: '#101010',
        transparent: true
    });
    object3DLayer.add(wall);
};
