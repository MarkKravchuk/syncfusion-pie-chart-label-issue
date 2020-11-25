import './App.css';
import React from 'react'
import {
    AccumulationChartComponent,
    AccumulationDataLabel,
    AccumulationLegend,
    AccumulationSeriesCollectionDirective,
    AccumulationSeriesDirective,
    AccumulationTooltip,
    DataLabel,
    Inject,
    PieSeries,
} from '@syncfusion/ej2-react-charts';

export default class App extends React.Component {

    state = {
        dataSource: [
            {
                x: "Item 1",
                y: 1
            },
            {
                x: "Item 2",
                y: 2
            },
            {
                x: "Item 3",
                y: 1
            }
        ],
        showLegend: false,
        showLabel: true,
        showValues: true
    }

    render() {
        console.log("State: ", this.state);

        let {dataSource, showLegend} = this.state;

        return (
            <div className={'wrapper'}>

                <div className={'pie-wrapper'}>
                    <AccumulationChartComponent
                        legendSettings={{
                            visible: showLegend || false,
                            position: 'Right',
                        }}
                        className={'pie-chart'}
                        enableSmartLabels={true}
                        enableBorderOnMouseMove={false}
                        enableAnimation={true}
                    >
                        <Inject
                            services={[AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel, DataLabel]}
                        />

                        <AccumulationSeriesCollectionDirective>
                            <AccumulationSeriesDirective
                                dataSource={dataSource}
                                xName={'x'}
                                yName={'y'}
                                legendShape={'Rectangle'}
                                radius={'80%'}
                                dataLabel={this.dataLabelConfig()}
                            />
                        </AccumulationSeriesCollectionDirective>
                    </AccumulationChartComponent>
                </div>

                <div className={'config'}>
                    <input type="checkbox" id="show_labels" onClick={() => {
                        this.setState({showLabel: !this.state.showLabel})
                    }}/>
                    <label htmlFor="show_labels">Show labels</label><br/>


                    <input type="checkbox" id="show_values" onClick={() => {
                        this.setState({showValues: !this.state.showValues})
                    }}/>
                    <label htmlFor="show_values">Show values</label><br/>


                    <input type="checkbox" id="show_legend" onClick={() => {
                        this.setState({showLegend: !this.state.showLegend})
                    }}/>
                    <label htmlFor="show_legend">Show labels</label><br/>

                </div>
            </div>
        );
    }

    dataLabelConfig = () => {

        let { showLabel, showValues } = this.state;

        return {
            // visible = false when all 3 variables are false
            visible: !(showLabel === false && showValues === false),
            position: 'Outside',
            template: (args) => {

                // render depends on the if layout is editable or not
                let displayLabel = '',
                    displayValue = '';

                if (showLabel) {
                    displayLabel = args.point.x;
                }

                if (showValues) {
                    displayValue = 'Value: ' + args.point.y;
                }

                return (
                    <div
                        className={'fc-template-wrap'}>
                        <div className={'fc-pie-chart-template-label'}>{displayLabel}</div>
                        <div>{displayValue}</div>
                    </div>
                );
            }
        };
    };
}
