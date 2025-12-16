import React from 'react';
import { Grid, Search, Bell, BookOpen, Heart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        end
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1 ${isActive
                ? 'bg-midnight/10 text-midnight border border-midnight/20'
                : 'text-midnight/70 hover:text-midnight hover:bg-celeste/30'
            }`
        }
    >
        <Icon size={18} />
        {label}
    </NavLink>
);

const EmployeeSidebar = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xs uppercase text-midnight/50 font-bold tracking-wider mb-4 px-4">Menu</h3>
                <NavItem to="/employee/dashboard" icon={Grid} label="Dashboard" />
                <NavItem to="/employee/dashboard/explore" icon={Search} label="Explore Packages" />
                <NavItem to="/employee/dashboard/subscriptions" icon={Heart} label="My Subscriptions" />
            </div>

            <div>
                <h3 className="text-xs uppercase text-midnight/50 font-bold tracking-wider mb-4 px-4">Updates</h3>
                <NavItem to="/employee/dashboard/notifications" icon={Bell} label="Notifications" />
            </div>
        </div>
    );
};

export default EmployeeSidebar;
