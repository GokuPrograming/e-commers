"use client"
import React from 'react'
import Charts from "@/app/ui/administrador_component/charts";

function Ventas_semanales() {
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
    <div className="flex items-center justify-between mb-4">
      <div className="flex-shrink-0">
        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
          $45,385
        </span>
        <h3 className="text-base font-normal text-gray-500">
          Sales this week
        </h3>
      </div>
      <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
        12.5%
      </div>
    </div>
    <div id="main-chart">
      {" "}
      <Charts></Charts>
    </div>
  </div>
  )
}

export default Ventas_semanales