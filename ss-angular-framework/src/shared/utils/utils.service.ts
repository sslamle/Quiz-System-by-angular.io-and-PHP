import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth() + 1;

    filterIt(arr, searchKey) {
        return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
    }
      
    changeVN(alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.trim(); 
        return str;
    }

    sortByVNname(data, field = 'name') {
        data.forEach(item => {
            item.vnAlias = this.changeVN(item[field]);
        });
        data.sort((a, b) => {
            return a.vnAlias < b.vnAlias ? -1 : 1;
        });
        return data;
    }

    getYearList() {
        let years = [];
        for (let i = 50; i >= -1; i--) {
            years.push(this.currentYear - i);
        }
        return years;
    }

    getMonthList() {
        return [1,2,3,4,5,6,7,8,9,10,11,12];
    }
}