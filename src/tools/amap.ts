let map: any;
// 加载地图
export const loadMap = async (contraction: string, cityName = '辽宁', level = 'province'): Promise<void> => {
    return new Promise((resolve) => {
        map = new AMap.Map(contraction, {
            resizeEnable: true,
            center: [121.614786, 38.913962],//中心点坐标
            viewMode: '3D',//使用3D视图
            zoom: 7,
            mapStyle: "amap://styles/dark",
            showLabel: false
        });
        resolve();
        //掩模
        boundariesArea(cityName, level);
    })
}

// 调整视角
const changeView = (cityName: string, level: string) => {
    boundariesArea(cityName, level);
}

const boundariesArea = (cityName: string, level: string) => {
    const districtSearch = new AMap.DistrictSearch({
        subdistrict: 0,
        extensions: 'all',
        level: `${level}`
    });
    districtSearch.search(cityName, (status: String, result: any) => {
        if (status === 'complete') {
            const bounds = result.districtList[0].boundaries;
            const mask = []
            for (let i = 0; i < bounds.length; i += 1) {
                mask.push([bounds[i]])
            }
            map.setMask(mask);
            //添加高度
            addLayer(bounds);
            //添加描边
            addPolyline(bounds);
            //设置地图样式
            setMapStyle(level);
        }
    });
}
// 调整大小，设置中心点
const setMapStyle = (level: string) => {
    let zoom;
    switch (level) {
        case 'province':
            zoom = 7;
            map.setCenter([122.222222, 40.913962]);
            break;
        case 'city':
            zoom = 9;
            break;
        case 'district':
            zoom = 13;
            break;
    }
    map.setZoom(zoom);
}
//添加高度面
const addLayer = (bounds: any) => {
    const layer = new AMap.Object3DLayer({ zIndex: 1 });
    map.add(layer)
    const wall = new AMap.Object3D.Wall({
        path: bounds,
        height: 0,
        color: '#0088ffcc'
    });
    wall.transparent = true
    layer.add(wall)
}
// 添加描边
const addPolyline = (bounds: any) => {
    for (let i = 0; i < bounds.length; i += 1) {
        new AMap.Polyline({
            path: bounds[i],
            strokeColor: '#99ffff',
            strokeWeight: 4,
            map: map
        })
    }
}