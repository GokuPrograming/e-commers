import React from 'react';
import UserData from './UserData';
import Invoices from './Invoices';
import Orders from './Orders';
import PurchaseHistory from './PurchaseHistory';
import UserChart from './UserChart';

const UserProfile: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1">
                    <UserData />
                </div>

                <div className="col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <Invoices />
                        </div>

                        <div className="col-span-1">
                            <Orders />
                        </div>
                    </div>

                    <div className="md:grid md:grid-cols-2 md:gap-4">
                        <PurchaseHistory />
                        <UserChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
