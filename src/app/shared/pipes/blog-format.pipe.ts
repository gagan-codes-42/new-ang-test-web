import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'BlogContentFormatPipe'
})
export class BlogContentFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if(value !== ''){
        const tempValue = JSON.parse(value);
        if(tempValue && tempValue.blocks && tempValue.blocks.length > 0 && tempValue.blocks[0].text) {
            return tempValue.blocks[0].text;
        } else {
            return '';
        }
    }
    return '';
  }
}
