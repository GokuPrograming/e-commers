import React from 'react'
import Panel from '@/app/ui/administrador_component/panel'
import Admin_panel_component from '@/app/ui/admin_panel/admin_panel_component'
export default function page() {
    return (
        <div>
            <Panel></Panel>
            <Admin_panel_component></Admin_panel_component>
        </div>
    )
}
