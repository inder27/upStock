import React, { useRef, useLayoutEffect, Fragment } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated)

const buildChartData = (data) => {
	for ( let i = 0; i < data.length; i++ ) {
		data[i].timestamp = moment(data[i].timestamp * 1).format('MM/DD/YYYY')
	}
	return data
}

const HistoricalRecords = ({ payload }) => {
	const records = buildChartData(get(payload, 'data', ''))
	const chartRef = useRef(null)

	useLayoutEffect(() => {
		let chart = am4core.create("chartdiv", am4charts.XYChart)
		chart.paddingRight = 20

		chart.dateFormatter.inputDateFormat = "YYYY-MM-dd"

		let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
		dateAxis.renderer.grid.template.location = 0

		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
		valueAxis.tooltip.disabled = true

		let series = chart.series.push(new am4charts.OHLCSeries())
		series.dataFields.dateX = "timestamp"
		series.dataFields.valueY = "close"
		series.dataFields.openValueY = "open"
		series.dataFields.lowValueY = "low"
		series.dataFields.highValueY = "high"
		series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}"
		series.strokeWidth = 2

		chart.cursor = new am4charts.XYCursor()

		// a separate series for scrollbar
		let lineSeries = chart.series.push(new am4charts.LineSeries())
		lineSeries.dataFields.dateX = "timestamp"
		lineSeries.dataFields.valueY = "close"
		// need to set on default state, as initially series is "show"
		lineSeries.defaultState.properties.visible = false

		// hide from legend too (in case there is one)
		lineSeries.hiddenInLegend = true
		lineSeries.fillOpacity = 0.5
		lineSeries.strokeOpacity = 0.5

		let scrollbarX = new am4charts.XYChartScrollbar()
		scrollbarX.series.push(lineSeries)
		chart.scrollbarX = scrollbarX

		chart.data = records

		chart.events.on("inited", function() {
		// dateAxis.zoomToDates(series.dataFields.dateX, lineSeries.dataFields.dateX)

		chartRef.current = chart
	
		return () => {
		  chart.dispose()
		}
		})
	}, [])
  
	return (
	  <Fragment>
		<div id="chartdiv" style={{ width: "100%", height: "500px" }} />
	  </Fragment>
	)
}

HistoricalRecords.propTypes = {
	payload: PropTypes.object.isRequired,
}

export default HistoricalRecords;
