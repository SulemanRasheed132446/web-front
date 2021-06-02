import React, { Component } from 'react';
import { weakGoodColor } from '../../services/Constants';

class WeakGoodColor extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12 text-left">
                        <h4 className="mb-2">Overall Performance</h4>
                    </div>
                </div>
                <div className="row">
                <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3 col-xs-3"></div>
                    <div className="col-xl-6 col-lg-6 col-sm-6 col-md-6 col-xs-6">
                        <div className="d-flex mb-3 colorCodeCenter">
                            <div className="mr-3"><p className="week-good-name">Weak</p></div>
                            {weakGoodColor.length ?
                                weakGoodColor.map((items: any, index: any) => (
                                    <div key={index} className={`week-good-width-height`} style={{ background: items.color }}></div>
                                ))
                                : null}
                            <div className="ml-3"><p className="week-good-name">Good</p></div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-sm-3 col-md-3 col-xs-3"></div>
                </div>
            </div>
        );
    }
}

export default WeakGoodColor;