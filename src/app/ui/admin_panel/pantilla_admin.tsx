"use client";
import React from "react";
import Charts from "@/app/ui/administrador_component/charts";
import Ventas_semanales from "@/app/ui/administrador_component/components/Ventas_semanales";
import Transacciones_model from "@/app/ui/administrador_component/components/Transacciones_model";
import Hero_estadistico from "@/app/ui/administrador_component/components/Hero_estadistico";
import Top_Clientes from "@/app/ui/administrador_component/components/Top_Clientes";

function Plantilla_Admin_panel_component() {
  return (
    <div>
      <div className="flex overflow-hidden bg-white pt-16">
        {/*
                 <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
                    <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex-1 px-3 bg-white divide-y space-y-1">
                                <ul className="space-y-2 pb-2">
                                    
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                                            <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                            </svg>
                                            <span className="ml-3">Dashboard</span>
                                        </a>
                                    </li>


                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Users</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Products</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Sign In</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                                            <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">Sign Up</span>
                                        </a>
                                    </li>
                                </ul>
                                <div className="space-y-2 pt-2">
                                    <a href="#" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <svg className="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gem" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"></path>
                                        </svg>
                                        <span className="ml-4">Upgrade to Pro</span>
                                    </a>
                                    <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span className="ml-3">Documentation</span>
                                    </a>
                                    <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                        </svg>
                                        <span className="ml-3">Components</span>
                                    </a>
                                    <a href="#" target="_blank" className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2">
                                        <svg className="w-6 h-6 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span className="ml-3">Help</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside> */}
        {/* <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div> */}
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto "
        >
          <main>
            <div className="pt-6 px-4">
              {/* contenedor */}
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                <Ventas_semanales></Ventas_semanales>
                <Transacciones_model></Transacciones_model>
              </div>
              {/*Fin  contenedor */}
              <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* aaaaaaa */}
                {/* <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        2,340
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        New products this week
                      </h3>
                    </div>

                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      14.6%
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        5,355
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        Visitors this week
                      </h3>
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                      32.9%
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        385
                      </span>
                      <h3 className="text-base font-normal text-gray-500">
                        User signups this week
                      </h3>
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                      -2.7%
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div> */}
                <Hero_estadistico></Hero_estadistico>
              </div>
              {/* fun aaaaaaa */}

              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                {/* bbbbbbbbbb */}
                <Top_Clientes></Top_Clientes>
                {/*fin bbbbbbbbbb */}
                {/* ccccccccccccccc */}
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                    Acquisition Overview
                  </h3>
                  <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Top Channels
                          </th>
                          <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                            Users
                          </th>
                          {/* <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th> */}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr className="text-gray-500">
                          <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            Organic Search
                          </th>
                          <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                            5,649
                          </td>
                          <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                            <div className="flex items-center">
                              <span className="mr-2 text-xs font-medium">
                                30%
                              </span>
                              <div className="relative w-full">
                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                  {/* <div className="bg-cyan-600 h-2 rounded-sm" style="width: 30%"></div> */}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="text-gray-500">
                          <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            Referral
                          </th>
                          <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                            4,025
                          </td>
                          <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                            <div className="flex items-center">
                              <span className="mr-2 text-xs font-medium">
                                24%
                              </span>
                              <div className="relative w-full">
                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                  {/* <div className="bg-orange-300 h-2 rounded-sm" style="width: 24%"></div> */}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="text-gray-500">
                          <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            Direct
                          </th>
                          <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                            3,105
                          </td>
                          <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                            <div className="flex items-center">
                              <span className="mr-2 text-xs font-medium">
                                18%
                              </span>
                              <div className="relative w-full">
                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                  {/* <div className="bg-teal-400 h-2 rounded-sm" style="width: 18%"></div> */}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="text-gray-500">
                          <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            Social
                          </th>
                          <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                            1251
                          </td>
                          <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                            <div className="flex items-center">
                              <span className="mr-2 text-xs font-medium">
                                12%
                              </span>
                              <div className="relative w-full">
                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                  {/* <div className="bg-pink-600 h-2 rounded-sm" style="width: 12%"></div> */}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="text-gray-500">
                          <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            Other
                          </th>
                          <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                            734
                          </td>
                          <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                            <div className="flex items-center">
                              <span className="mr-2 text-xs font-medium">
                                9%
                              </span>
                              <div className="relative w-full">
                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                  {/* <div className="bg-indigo-600 h-2 rounded-sm" style="width: 9%"></div> */}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="text-gray-500">
                          <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">
                            Email
                          </th>
                          <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">
                            456
                          </td>
                          <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                            <div className="flex items-center">
                              <span className="mr-2 text-xs font-medium">
                                7%
                              </span>
                              <div className="relative w-full">
                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                  {/* <div className="bg-purple-500 h-2 rounded-sm" style="width: 7%"></div> */}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                {/*fin ccccccccccccccc */}
              </div>
            </div>
          </main>
          <p className="text-center text-sm text-gray-500 my-10">
            &copy; 2019-2021{" "}
            <a href="#" className="hover:underline" target="_blank">
              Themesberg
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
      {/* <script async defer src="https://buttons.github.io/buttons.js"></script> */}
      {/* <script src="https://demo.themesberg.com/windster/app.bundle.js"></script> */}
    </div>
  );
}

export default Plantilla_Admin_panel_component;
