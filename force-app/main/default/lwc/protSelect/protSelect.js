import { LightningElement, track } from 'lwc';

export default class ProtSelect extends LightningElement {
    @track tableHead = ['eating', 'singing', 'sleeping', 'sports', 'game'];
    @track dataList = [
        ['1h', '2h', '3h', '4h', '2h'],
        ['3h', '2h', '4h', '1h', '1h'],
        ['1h', '4h', '2h', '4h', '2h'],
        ['4h', '1h', '4h', '4h', '1h'],
        ['1h', '2h', '2h', '1h', '1h'],
    ];
    get options() {
        return [
            {label:'1h', value:'1h'},
            {label:'2h', value:'2h'},
            {label:'3h', value:'3h'},
            {label:'4h', value:'4h'}
        ];
    }
}