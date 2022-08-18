import React from 'react';



class DocTable extends React.Component {

    constructor(props) {
        super(...arguments);
        this.toolbarOptions = ['Search'];
        this.dataSet = props.data;
        console.log("dataset", this.dataSet);
       

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