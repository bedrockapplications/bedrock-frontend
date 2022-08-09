import React from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page, Inject, Filter,
    Sort, Edit, Toolbar
} from '@syncfusion/ej2-react-grids';



class DocTable extends React.Component {

    constructor(props) {
        super(...arguments);
        this.toolbarOptions = ['Search'];
        this.dataSet = props.data;
        console.log("dataset", props.data);
    }
    render() {



        return (
            <div className='tabcontent'>
                <div>
                   
                </div>
            </div>
        );
    }
}



export default DocTable;