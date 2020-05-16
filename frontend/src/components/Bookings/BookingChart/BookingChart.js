import React from "react"
import { Bar } from "react-chartjs-2"

import "./BookingChart.css"

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 100,
  },
  Normal: {
    min: 101,
    max: 200,
  },
  Expensive: {
    min: 201,
    max: 1000000000,
  },
}

const bookingChart = (props) => {
  const chartData = { labels: [], datasets: [] }
  let values = []
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1
      }
      return prev
    }, 0)
    values.push(filteredBookingsCount)
  }

  chartData.labels = Object.keys(BOOKINGS_BUCKETS)
  chartData.datasets = [
    {
      backgroundColor: "rgba(81, 45, 168, 0.2)",
      borderColor: "rgba(81, 45, 168, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(49, 27, 146, 0.4)",
      hoverBorderColor: "rgba(49, 27, 146, 1)",
      data: values,
    },
  ]

  const chartOptions = {
    responsive: true,
    legend: { display: false },
    title: {
      display: true,
      text: "Bookings per expense category",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  return (
    <div className="booking-chart">
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default bookingChart
