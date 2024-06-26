import React from 'react'

function Venta_total_component() {
  return (
    <div className="flex flex-col mt-8">
    <div className="overflow-x-auto rounded-lg">
        <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Transaction
                            </th>
                            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                Payment from <span className="font-semibold">Bonnie Green</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 23 ,2021
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $2300
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                Payment refund to <span className="font-semibold">#00910</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 23 ,2021
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                -$670
                            </td>
                        </tr>
                        <tr>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                Payment failed from <span className="font-semibold">#087651</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 18 ,2021
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $234
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                Payment from <span className="font-semibold">Lana Byrd</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 15 ,2021
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $5000
                            </td>
                        </tr>
                        <tr>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                Payment from <span className="font-semibold">Jese Leos</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 15 ,2021
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $2300
                            </td>
                        </tr>
                        <tr className="bg-gray-50">
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left">
                                Payment from <span className="font-semibold">THEMESBERG LLC</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 11 ,2021
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $560
                            </td>
                        </tr>
                        <tr>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                Payment from <span className="font-semibold">Lana Lysle</span>
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                Apr 6 ,2021
                            </td>
                            <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                $1437
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
  )
}

export default Venta_total_component
