import AdminNvar from '@/app/ui/Nvar/adminNvar';
import MenuStore from '@/app/ui/MenuStore/MenuStore'; // Importa el componente MiComponente
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">

      {/* Integra el componente MiComponente para mostrar los datos de la API */}
      <div className="mt-8">
     
        <MenuStore></MenuStore>
      </div>
    </main>
  );
}
