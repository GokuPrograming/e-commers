
"use client"
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Corrección en la importación
import AdminNvar from '@/app/ui/Nvar/adminNvar';
import Image from 'next/image';

//validar para entrar a la cuenta
const redirectToPage = (path: string) => {

    window.location.href = path;
};
function indexComponent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter(); 

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        // Verificar si el usuario está logeado
        const token = Cookies.get('token');
        if (token) {
            // Si hay un token válido, redirigir al usuario a la tienda
            redirectToPage('pages/Tienda');
        } else {
            // Si no hay un token válido, redirigir al usuario a la página principal
            //   router.push('/pages/auth/login');
        }
    }, []);
    ///////
    return (
        <>
            <AdminNvar></AdminNvar>
            <div className="relative isolate overflow-hidden bg-green-500">
                <svg className="absolute inset-0 -z-10 h-full w-full stroke-red-100/10 mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)" aria-hidden="true">
                    <defs>
                        <pattern id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
                        <path d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z" strokeWidth="0" />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
                </svg>
                <div className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]" aria-hidden="true">
                    <div className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#216918] to-[#30303102] opacity-20" style={{ clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" }}></div>
                </div>
                <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">

                    <Image
    className="h-20 w-20 object-contain rounded-full shadow-lg"
    src="/img/page_img/logo.jpeg"
    alt="Your Company"
    width={400} // Establece un valor adecuado para el ancho de la imagen
    height={400} // Establece un valor adecuado para la altura de la imagen
/>




                     

                            {/* <Image
                                src="https://th.bing.com/th/id/OIG1.wd_GRphO4taOCSmOMtUB?w=1024&h=1024&rs=1&pid=ImgDetMain"
                                width={500}
                              
                                alt="Picture of the author"
                            /> */}

                        
                        <div className="mt-24 sm:mt-32 lg:mt-16">
                            <a href="#" className="inline-flex space-x-6">
                                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-gray-800 ring-1 ring-inset ring-indigo-500/20">Que hay de nuevo</span>
                                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                                    <span>Just shipped v1.0</span>
                                    <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                        <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">Todo lo que quieras y todo en lo que te puedas endeudar</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">¡Bienvenido a Cuchau Store, donde vendemos a precios que te dejarán con la boca abierta y ofrecemos un servicio tan lento que te preguntarás si hemos inventado la máquina del tiempo! ¡Porque aquí, lo único que corre rápido es nuestro descaro!</p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <a href="#" className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">VAMOS!! GASTA TU DINERO</a>
                            <a href="#" className="text-sm font-semibold leading-6 text-white">Learn more <span aria-hidden="true">→</span></a>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                            <Image src="/img/page_img/banner.jpeg" alt="App screenshot" width="2432" height="1442" className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default indexComponent;
