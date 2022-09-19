let map: any;
let cityMarkers: Array<any> = [];
// 当前城市code
let currentCityCode: string | number | undefined = undefined;
// 聚合点位得实例对象
let clusterMarker: any = undefined;
let object3DLayer: any;
type aMapInstance = {
    contraction: string,
    viewType: string,
    viewCityCode: string
}
// 加载地图
export const loadMap = async ({contraction, viewType = 'province', viewCityCode = '210000'}: aMapInstance): Promise<void> => {
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
        // 添加3D图层
        object3DLayer = new AMap.Object3DLayer({zIndex: -1});
        map.add(object3DLayer);
        resolve();
        // 调整视角
        changeMapView(viewType, viewCityCode);
    })
}

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
const changeMapView = (viewType: string, viewCityCode: string) => {
    let level =  viewType === 'district' ?  'city' : viewType
    clearAMap();
    let district = new AMap.DistrictSearch({
        subdistrict: 0,
        extensions: 'all',
        level:level
    });
    // 异步设置中心点 & 掩模 & 描边
    district.search(viewCityCode, (status: string, result: any) => {
        if (status !== 'complete') return;
        const center = viewType === 'province' ? [122.254265, 40.361304] : result.districtList[0].center
        const zoom = viewType === 'province' ? 7.62 : viewType === 'city' ? 9.75 : 11.56;
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
