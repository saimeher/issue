// import * as _ from "lodash";
// import {Pipe, PipeTransform} from "@angular/core";

// @Pipe({
//     name: "dataFilter"
// })
// export class DataFilterPipe implements PipeTransform {

//     transform(array: any[], query: string): any {
//         if (query) {
//             return _.filter(array, row=>row.raised_by.indexOf(query) > -1);
//         }
//         return array;
//     }
// }


import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {
keys = [];
    transform(array: any[], query: string): any {
       if (array != null && array.length > 0) {
  let ans = [];

  if (this.keys.length == 0) {
    this.keys = Object.keys(array[0]);
  }

  for (let i of array) {
    for (let k of this.keys) {
      if (i[k].toString().match('^.*' + query +'.*$')) {
        ans.push(i);
        break;
      }
    }
  }
  return ans;
    }
    }
}
