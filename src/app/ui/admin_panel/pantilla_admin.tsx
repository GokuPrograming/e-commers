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

                <Hero_estadistico></Hero_estadistico>
              </div>
              {/* fun aaaaaaa */}

              <div className="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">
                {/* bbbbbbbbbb */}
                <Top_Clientes></Top_Clientes>
                {/*fin bbbbbbbbbb */}
                {/* ccccccccccccccc */}

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
    
    </div>
  );
}

export default Plantilla_Admin_panel_component;
