type point = {
    lnglat: {
        lng: number;
        lat: number;
    }
}
export class Amap {
    protected contraction: string;

    private map: any;

    protected  driving: any;

    constructor(contraction: string) {
        this.contraction = contraction;
        this.loadMap();
    }

    private loadMap() {
        this.map = new AMap.Map(this.contraction, {
            resizeEnable: true,
            zooms: [3, 18],
            showLabel: true
        });
        this.driving= new AMap.Driving({
            map: this.map,
            panel: 'panel'
        });
    }

    public registerEvents(type: string, callback: Function) {
        this.map.on(type, (e: point) => {
            callback(e);
        });
    }

    public setCenter(lng: number, lat: number) {
        this.map.setCenter([lng, lat]);
    }


    public plainPath(start: number[], end: number[]) {
        this.driving.search([116.379028, 39.865042],  [116.427281, 39.903719], (status: any, result: any) => {
            if (status === 'complete') {
                console.log('绘制驾车路线完成');
            } else {
                console.log('获取驾车数据失败：' + result);
            }
        });
    }
}
