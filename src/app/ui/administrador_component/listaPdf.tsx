import React from 'react';
import PDF from './pdf_componente';

function ListaPdf() {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md">
            <div className="rounded-xl border border-gray-200 bg-white py-6 px-4 shadow-md max-h-80 overflow-y-auto">
                <div className="flex items-center justify-between px-2 text-base font-medium text-gray-700 p-2">
                    <div>Add Block</div>
                </div>
                <div className="mt-4">
                    <div className="flex flex-col">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-green-100 w-full">
                                <div className="flex flex-col items-start justify-between font-light text-gray-600">
                                    <p className="text-sm md:text-lg mb-1">Text sadasdasdsdsadaw dawds</p>
                                    <span className="text-xs">Just start writing with plain text</span>
                                    <PDF />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListaPdf;
