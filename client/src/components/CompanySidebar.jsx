import React from 'react';
import { LayoutDashboard, Upload, FileCode, Users, Settings, Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        end
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1 ${isActive
                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`
        }
    >
        <Icon size={18} />
        {label}
    </NavLink>
);

const CompanySidebar = () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-4 px-4">Workspace</h3>
                <NavItem to="/company/dashboard" icon={LayoutDashboard} label="Overview" />
                <NavItem to="/company/dashboard/publish" icon={Upload} label="Publish Package" />
                <NavItem to="/company/dashboard/versions" icon={FileCode} label="Publish Version" />
            </div>

            <div>
                <h3 className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-4 px-4">Team</h3>
                <NavItem to="/company/dashboard/notifs" icon={Bell} label="Notifications Log" />
                <NavItem to="/company/dashboard/settings" icon={Settings} label="Settings" />
            </div>
        </div>
    );
};

export default CompanySidebar;
