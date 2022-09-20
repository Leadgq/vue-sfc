// @ts-ignore
import {jsonp} from 'vue-jsonp';

type  distanceType = {
    lon: string,
    lat: string
}

// 判断当前是否是一个可用数组
const isAvailableArray = (arr: any[]) => {
    return arr && Array.isArray(arr) && arr.length > 0;
};

// 拼接字符串
const handlerData = (data: distanceType[]) => {
    let str: string = '';
    if (data.length === 1) {
        str = data.reduce((str, cur) => {
            const {lon, lat} = cur;
            return str + `${lon},${lat}`;
        }, '');
    }
    if (data.length > 1) {
        data.forEach((item) => {
            const {lon, lat} = item;
            str += `${lon},${lat}|`;
        });
        str = str.substring(0, str.length - 1);
    }
    return str;
};

// 处理参数
const parmaHandler = (from: distanceType[], to: distanceType[]) => {
    let distanceFrom = handlerData(from);
    let distanceTo = handlerData(to);
    return {
        distanceFrom,
        distanceTo
    };
};

export const computeDistance = (from: distanceType[], to: distanceType[]) => {
    return new Promise((resolve) => {
        (function () {
            // 距离集合
            let distanceData = [];
            // 不是一个可用数组，返回
            if (!isAvailableArray(from) || !isAvailableArray(to)) {
                resolve([]);
            }
            // 参数处理
            let {distanceFrom, distanceTo} = parmaHandler(from, to);
            // 获取距离
            jsonp('https://restapi.amap.com/v3/distance', {
                type: 1,
                origins: distanceTo,
                destination: distanceFrom,
                key: 'b9d4d162cc2293dfb5e42c8b64b05bab',
                output: 'JSON'
            }).then((data: Record<string, any>) => {
                // 如果是错误的状态
                if (data.status !== '1') {
                    resolve([]);
                }
                // 高德返回数组
                const distanceArray = data.results;
                // 不是一个可用的数组返回
                if (!distanceArray || !isAvailableArray(distanceArray)) {
                    resolve([]);
                }
                distanceData = distanceArray.map((item: Record<string, any>) => {
                    return {
                        distance: item.distance
                    };
                });
                resolve(distanceData);
            })
        })();
    });
};
