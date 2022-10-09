import {isAvailableArray} from "@/tools/lib"

interface IData {
    expire?: number;

    [key: string]: any;
}

export default {
    get(key: string): IData | null {
        const data = localStorage.getItem(key);
        let locationData: any;
        if (data) {
            const dataObj = JSON.parse(data);
            const locationArray = Object.values(dataObj);
            if (isAvailableArray(locationArray)) {
                locationArray.forEach((item: any, index: number) => {
                    if (item.expire && item.expire < Date.now()) {
                        locationArray.splice(index, 1);
                    }
                })
                // 经过有可能删除
                if (isAvailableArray(locationArray)) {
                    locationData = locationArray[0];
                } else {
                    this.remove(key);
                }
            }
        }
        return locationData || null;
    },
    setExpire(expire: number) {
        return new Date().getTime() + expire * 1000;
    },
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}
