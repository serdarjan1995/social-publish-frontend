<template>
  <v-card class="neu-glow">
    <div>

    </div>
    <v-row class="mx-0 pa-4" justify="space-between" align="center">
      <!-- title and subtitle -->
      <div>
        <div class="text-h6">Facebook</div>
      </div>
      <!-- Stats -->
      <div class="d-flex flex-column align-end">
          <v-icon color="secondary">mdi-facebook</v-icon>
      </div>
    </v-row>
    <v-card-text class="pt-0" v-if='render'>
        <button @click='reload'>Reload</button>
        <highcharts :constructorType="'stockChart'" class="hc max-height400" :options="chartOptions" ref="chart" style="max-height:400px"></highcharts>

    </v-card-text>
  </v-card>
</template>

<script>
    import Highcharts from 'highcharts';
    import {Chart} from 'highcharts-vue';
    import exportingInit from 'highcharts/modules/exporting'
    import stockInit from "highcharts/modules/stock";
    import HIndicatorsAll from "highcharts/indicators/indicators-all";
    import HDragPanes from "highcharts/modules/drag-panes";
    import HAnnotationsAdvanced from "highcharts/modules/annotations-advanced";
    import HPriceIndicator from "highcharts/modules/price-indicator";
    import HFullScreen from "highcharts/modules/full-screen";
    import HStockTools from "highcharts/modules/stock-tools";

    import EventBus from "@/plugins/event-bus";
    //import Vue from "vue";

    export default {
        components: {
            highcharts: Chart
        },
        name: "LineChart",
        data: () => ({
            render: true,
            chartOptions: {
                title: {
                    text: 'Facebook data'
                },
                chart: {
                    type: 'spline'
                },
                series: [
                    {
                        name: 'NVDA',
                        data: [
                            [1492300800000, 0.1, 8.4],
                            [1492387200000, -1.9, 8.2],
                            [1492473600000, -5.7, 1.6],
                            [1492560000000, 8.2, 7.5],
                            [1492646400000, 8.9, 9.1],
                            [1492732800000, 2.3, 1.5],
                            [1492819200000, 1.0, 2.4],
                            [1492905600000, 1.6, 1.9],
                            [1492992000000, 1.4, 4.7],
                            [1493078400000, -7.9, 4.7],
                        ],
                        website: 'https://www.nvaccess.org',
                        accessibility: {
                            description: 'This is the most used screen reader in 2019'
                        }
                    },
                    {
                        name: 'JAWS',
                        data: [
                            [1492300800000, 0.9, 1.4],
                            [1492387200000, -0.9, 4.2],
                            [1492473600000, -1.7, 0.6],
                            [1492560000000, 3.2, 7.5],
                            [1492646400000, 3.9, 2.1],
                            [1492732800000, 3.3, 6.5],
                            [1492819200000, 1.0, 1.4],
                            [1492905600000, 2.6, 6.9],
                            [1492992000000, 5.4, 1.7],
                            [1493078400000, -0.9, 9.7],
                        ],
                        website: 'https://www.freedomscientific.com/Products/Blindness/JAWS',
                        dashStyle: 'ShortDashDot',
                    },
                    {
                        name: 'VoiceOver',
                        data: [
                            [1492300800000, 1.9, 4.4],
                            [1492387200000, -1.9, 8.2],
                            [1492473600000, -2.7, 9.6],
                            [1492560000000, 3.2, 7.5],
                            [1492646400000, 4.9, 9.1],
                            [1492732800000, 3.3, 6.5],
                            [1492819200000, 6.0, 7.4],
                            [1492905600000, -1.6, 6.9],
                            [1492992000000, -1.4, 4.7],
                            [1493078400000, 0.9, 9.7],
                        ],
                        website: 'http://www.apple.com/accessibility/osx/voiceover',
                        dashStyle: 'ShortDot',
                    },
                ],
                legend: {
                    enabled: true,
                    align: 'center',
                    borderWidth: 1,
                    borderRadius: 3,
                    shadow: true,

                },
                tooltip: {
                    valueSuffix: '%',
                    split: true,
                },
                plotOptions: {
                    series: {
                        stickyTracking: false,
                        showInLegend: true,
                        showInNavigator: true,
                        point: {
                            events: {
    /*                            click: function () {
                                    window.location.href = this.series.options.website;
                                }*/
                            }
                        },
                        cursor: 'pointer'
                    }
                },
                credits: {
                    enabled: true,
                    text: 'example.com',
                    href: 'http://example.com'
                },
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 800
                        },
                        chartOptions: {
                            rangeSelector: {
                                inputEnabled: false
                            }
                        }
                    }]
                },
                stockTools: {
                    gui: {
                        enabled: true,
                    }
                },
                rangeSelector: {
                    //allButtonsEnabled: true,
                    buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    },{
                        type: 'day',
                        count: 1,
                        text: '1d'
                    },{
                        type: 'month',
                        count: 1,
                        text: '1m'
                    }, {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    }, {
                        type: 'month',
                        count: 6,
                        text: '6m'
                    },{
                        type: 'year',
                        count: 1,
                        text: '1y'
                    }, {
                        type: 'all',
                        text: 'All'
                    }],
                    buttonTheme: {
                        width: 60
                    },
                    inputDateFormat: '%H:%M:%S.%L',
                    inputEditDateFormat: '%H:%M:%S.%L',
                    //selected: 2, //default selection
                },
            }
        }),
        methods: {
            reload() {
                this.render = false;
                this.$nextTick(() => {
                    this.render = true;
                });
            }
        },
        mounted(){

            stockInit(Highcharts);
            HDragPanes(Highcharts);
            HIndicatorsAll(Highcharts);

            HAnnotationsAdvanced(Highcharts);
            HPriceIndicator(Highcharts);
            HFullScreen(Highcharts);
            HStockTools(Highcharts);
            exportingInit(Highcharts);
            Highcharts.theme_default = {
                colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
                    '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(240, 240, 240)']
                        ]
                    },
                    style: {
                        color: "#000"
                    }
                },
                yAxis: {
                    gridLineColor: "rgba(15,15,15,0.2)"
                },
                title: {
                    style: {
                        color: '#000',
                    }
                },
                subtitle: {
                    style: {
                        color: '#666666',
                    }
                },
                legend: {
                    itemStyle: {
                        color: 'black'
                    },
                    itemHoverStyle:{
                        color: 'gray'
                    }
                }
            };
            Highcharts.theme_dark = {
                colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572',
                    '#FF9655', '#FFF263', '#6AF9C4'],
                chart: {
                    backgroundColor: {
                        linearGradient: [100, 50, 500, 500],
                        stops: [
                            [0, 'rgb(45, 45, 45)'],
                            [1, 'rgb(30, 30, 30)']
                        ]
                    },
                    style: {
                        color: "#fff"
                    }
                },
                yAxis: {
                    gridLineColor: '#505050'
                },
                title: {
                    style: {
                        color: '#fff',
                    }
                },
                subtitle: {
                    style: {
                        color: '#aaa',
                    }
                },
                legend: {
                    itemStyle: {
                        color: 'white'
                    },
                    itemHoverStyle:{
                        color: 'gray'
                    }
                }
            };
            EventBus.$on('dark-mode-theme', dark_theme => {
                if(dark_theme){
                    Highcharts.setOptions(Highcharts.theme_dark);
                    this.reload();
                }
                else{
                    Highcharts.setOptions(Highcharts.theme_default);
                    this.reload();
                }
            });
            this.reload();
        }
    }
</script>

<style  scoped>
  @import "../../../../../node_modules/highcharts/css/annotations/popup.css";
  @import "../../../../../node_modules/highcharts/css/stocktools/gui.css";

</style>