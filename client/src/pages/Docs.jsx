import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Users, Building2, FileText, HelpCircle, ChevronRight, Code, Heart, Bell, Upload, GitBranch, RefreshCw, FileCode, CheckCircle } from 'lucide-react';

const Docs = () => {
    const [activeSection, setActiveSection] = useState('getting-started');

    const sections = [
        { id: 'getting-started', title: 'Getting Started', icon: <Book size={20} /> },
        { id: 'employees', title: 'For Employees', icon: <Users size={20} /> },
        { id: 'companies', title: 'For Companies', icon: <Building2 size={20} /> },
        { id: 'markdown', title: 'Writing Docs', icon: <FileCode size={20} /> },
        { id: 'faq', title: 'FAQ', icon: <HelpCircle size={20} /> },
    ];

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="min-h-screen bg-lionsmane pt-20">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">Documentation</h1>
                    <p className="text-xl text-midnight/70">Everything you need to know about ModuleHub</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <div className="sticky top-24 glass-card p-6 rounded-xl border border-celeste bg-white">
                            <h2 className="text-sm font-bold text-midnight/60 uppercase tracking-wider mb-4">Contents</h2>
                            <nav className="space-y-2">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                            activeSection === section.id
                                                ? 'bg-midnight/10 text-midnight border border-midnight/20'
                                                : 'text-midnight/70 hover:text-midnight hover:bg-celeste/10'
                                        }`}
                                    >
                                        {section.icon}
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 max-w-4xl">
                        {/* Getting Started */}
                        <motion.section
                            id="getting-started"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="glass-card p-8 rounded-xl border border-celeste bg-white mb-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Book className="text-midnight" size={24} />
                                <h2 className="text-3xl font-bold text-midnight">Getting Started</h2>
                            </div>
                            <div className="prose prose-midnight max-w-none">
                                <p className="text-midnight/70 text-lg mb-6">
                                    Welcome to ModuleHub! This guide will help you get started with our internal component registry.
                                </p>
                                <div className="space-y-4">
                                    <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                        <h3 className="text-xl font-bold text-midnight mb-2">What is ModuleHub?</h3>
                                        <p className="text-midnight/70">
                                            ModuleHub is an internal registry for managing, versioning, and sharing React components, 
                                            packages, and utilities across your organization. It provides a centralized platform for 
                                            component discovery, documentation, and updates.
                                        </p>
                                    </div>
                                    <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                        <h3 className="text-xl font-bold text-midnight mb-2">Quick Start</h3>
                                        <ol className="list-decimal list-inside space-y-2 text-midnight/70">
                                            <li>Create an account (Employee or Company)</li>
                                            <li>Explore available packages in the registry</li>
                                            <li>Subscribe to packages you want to use</li>
                                            <li>Install packages using npm</li>
                                            <li>Get notified when packages are updated</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* For Employees */}
                        <motion.section
                            id="employees"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="glass-card p-8 rounded-xl border border-celeste bg-white mb-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="text-midnight" size={24} />
                                <h2 className="text-3xl font-bold text-midnight">For Employees</h2>
                            </div>
                            <div className="space-y-8">
                                {/* Using Components */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Code className="text-marigold" size={20} />
                                        <h3 className="text-2xl font-bold text-midnight">Using Components</h3>
                                    </div>
                                    <div className="space-y-4 text-midnight/70">
                                        <p>Discover and use components from your organization's registry.</p>
                                        <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                            <h4 className="font-bold text-midnight mb-2">Installation</h4>
                                            <pre className="bg-white p-3 rounded border border-celeste text-sm overflow-x-auto">
                                                <code className="text-midnight">npm install @company/package-name</code>
                                            </pre>
                                        </div>
                                        <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                            <h4 className="font-bold text-midnight mb-2">Usage</h4>
                                            <pre className="bg-white p-3 rounded border border-celeste text-sm overflow-x-auto">
                                                <code className="text-midnight">{`import { ComponentName } from '@company/package-name';

function App() {
  return <ComponentName />;
}`}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>

                                {/* Subscriptions */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Heart className="text-marigold" size={20} />
                                        <h3 className="text-2xl font-bold text-midnight">Subscriptions</h3>
                                    </div>
                                    <div className="space-y-4 text-midnight/70">
                                        <p>Subscribe to packages to stay updated with the latest versions and changes.</p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Click the "Subscribe" button on any package page</li>
                                            <li>Receive notifications when new versions are released</li>
                                            <li>View all your subscribed packages in the "My Subscriptions" section</li>
                                            <li>Unsubscribe anytime if you no longer need updates</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Notifications */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Bell className="text-marigold" size={20} />
                                        <h3 className="text-2xl font-bold text-midnight">Notifications</h3>
                                    </div>
                                    <div className="space-y-4 text-midnight/70">
                                        <p>Get real-time updates about package changes and new releases.</p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>Real-time WebSocket notifications for instant updates</li>
                                            <li>View notification history in your dashboard</li>
                                            <li>Mark notifications as read to keep track</li>
                                            <li>Notifications include version numbers and changelogs</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* For Companies */}
                        <motion.section
                            id="companies"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="glass-card p-8 rounded-xl border border-celeste bg-white mb-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Building2 className="text-midnight" size={24} />
                                <h2 className="text-3xl font-bold text-midnight">For Companies</h2>
                            </div>
                            <div className="space-y-8">
                                {/* Publishing Components */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Upload className="text-herb" size={20} />
                                        <h3 className="text-2xl font-bold text-midnight">Publishing Components</h3>
                                    </div>
                                    <div className="space-y-4 text-midnight/70">
                                        <p>Publish your internal components and packages to the registry.</p>
                                        <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                            <h4 className="font-bold text-midnight mb-2">Steps to Publish</h4>
                                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                                <li>Navigate to "Publish New Package" in your dashboard</li>
                                                <li>Fill in package details: name, version, description</li>
                                                <li>Add documentation in Markdown format</li>
                                                <li>Click "Publish Package"</li>
                                                <li>All employees will be notified automatically</li>
                                            </ol>
                                        </div>
                                        <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                            <h4 className="font-bold text-midnight mb-2">Package Naming</h4>
                                            <p>Use the format: <code className="bg-white px-2 py-1 rounded border border-celeste text-sm">@company/package-name</code></p>
                                        </div>
                                    </div>
                                </div>

                                {/* Versioning Strategy */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <GitBranch className="text-herb" size={20} />
                                        <h3 className="text-2xl font-bold text-midnight">Versioning Strategy</h3>
                                    </div>
                                    <div className="space-y-4 text-midnight/70">
                                        <p>Follow semantic versioning (SemVer) for your packages.</p>
                                        <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                            <h4 className="font-bold text-midnight mb-2">Version Format: MAJOR.MINOR.PATCH</h4>
                                            <ul className="list-disc list-inside space-y-2 ml-4">
                                                <li><strong>MAJOR</strong> (1.0.0): Breaking changes</li>
                                                <li><strong>MINOR</strong> (0.1.0): New features, backward compatible</li>
                                                <li><strong>PATCH</strong> (0.0.1): Bug fixes, backward compatible</li>
                                            </ul>
                                        </div>
                                        <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                            <h4 className="font-bold text-midnight mb-2">Best Practices</h4>
                                            <ul className="list-disc list-inside space-y-2 ml-4">
                                                <li>Always include a changelog when publishing updates</li>
                                                <li>Test thoroughly before publishing major versions</li>
                                                <li>Communicate breaking changes clearly</li>
                                                <li>Maintain backward compatibility when possible</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Component Updates */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <RefreshCw className="text-herb" size={20} />
                                        <h3 className="text-2xl font-bold text-midnight">Component Updates</h3>
                                    </div>
                                    <div className="space-y-4 text-midnight/70">
                                        <p>Release updates to existing packages and notify your team.</p>
                                        <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                            <h4 className="font-bold text-midnight mb-2">Publishing Updates</h4>
                                            <ol className="list-decimal list-inside space-y-2 ml-4">
                                                <li>Go to "Publish Version" in your dashboard</li>
                                                <li>Select the package to update</li>
                                                <li>Enter the new version number</li>
                                                <li>Add a changelog describing the changes</li>
                                                <li>Click "Release Update"</li>
                                            </ol>
                                        </div>
                                        <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                            <h4 className="font-bold text-midnight mb-2">Automatic Notifications</h4>
                                            <p>All subscribed employees will automatically receive:</p>
                                            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                                                <li>Real-time WebSocket notifications</li>
                                                <li>Email notifications (if configured)</li>
                                                <li>In-app notification badges</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Writing Docs */}
                        <motion.section
                            id="markdown"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="glass-card p-8 rounded-xl border border-celeste bg-white mb-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <FileCode className="text-midnight" size={24} />
                                <h2 className="text-3xl font-bold text-midnight">Writing Docs (Markdown Guide)</h2>
                            </div>
                            <div className="space-y-6 text-midnight/70">
                                <p>Use Markdown to write clear and comprehensive documentation for your packages.</p>
                                
                                <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                    <h3 className="text-xl font-bold text-midnight mb-4">Markdown Basics</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold text-midnight mb-2">Headers</h4>
                                            <pre className="bg-white p-3 rounded border border-celeste text-sm overflow-x-auto">
                                                <code>{`# H1 Header
## H2 Header
### H3 Header`}</code>
                                            </pre>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-midnight mb-2">Code Blocks</h4>
                                            <pre className="bg-white p-3 rounded border border-celeste text-sm overflow-x-auto">
                                                <code>{`\`\`\`javascript
function example() {
  return "Hello World";
}
\`\`\``}</code>
                                            </pre>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-midnight mb-2">Lists</h4>
                                            <pre className="bg-white p-3 rounded border border-celeste text-sm overflow-x-auto">
                                                <code>{`- Item 1
- Item 2
- Item 3

1. First item
2. Second item
3. Third item`}</code>
                                            </pre>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-midnight mb-2">Links and Images</h4>
                                            <pre className="bg-white p-3 rounded border border-celeste text-sm overflow-x-auto">
                                                <code>{`[Link text](https://example.com)
![Image alt](image-url.jpg)`}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-celeste/20 p-4 rounded-lg border border-celeste">
                                    <h3 className="text-xl font-bold text-midnight mb-4">Documentation Best Practices</h3>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Start with a clear overview of what the package does</li>
                                        <li>Include installation instructions</li>
                                        <li>Provide usage examples with code snippets</li>
                                        <li>Document all props and parameters</li>
                                        <li>Include troubleshooting tips</li>
                                        <li>Add links to related resources</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* FAQ */}
                        <motion.section
                            id="faq"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="glass-card p-8 rounded-xl border border-celeste bg-white mb-8"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <HelpCircle className="text-midnight" size={24} />
                                <h2 className="text-3xl font-bold text-midnight">Frequently Asked Questions</h2>
                            </div>
                            <div className="space-y-6">
                                <div className="border-b border-celeste pb-6">
                                    <h3 className="text-xl font-bold text-midnight mb-2">How do I get access to ModuleHub?</h3>
                                    <p className="text-midnight/70">
                                        Contact your organization's admin to get a company code, then sign up as an employee. 
                                        If you're setting up a new company, create a company account.
                                    </p>
                                </div>
                                <div className="border-b border-celeste pb-6">
                                    <h3 className="text-xl font-bold text-midnight mb-2">Can I use packages from other companies?</h3>
                                    <p className="text-midnight/70">
                                        No, ModuleHub is designed for internal use only. You can only access packages published 
                                        by your own organization.
                                    </p>
                                </div>
                                <div className="border-b border-celeste pb-6">
                                    <h3 className="text-xl font-bold text-midnight mb-2">How do I update a package I'm using?</h3>
                                    <p className="text-midnight/70">
                                        Run <code className="bg-celeste/30 px-2 py-1 rounded text-sm">npm update @company/package-name</code> in your project. 
                                        You'll receive notifications when new versions are available.
                                    </p>
                                </div>
                                <div className="border-b border-celeste pb-6">
                                    <h3 className="text-xl font-bold text-midnight mb-2">What happens if I break something with an update?</h3>
                                    <p className="text-midnight/70">
                                        You can always revert to a previous version. Check the version history in the package details 
                                        page to see all available versions and their changelogs.
                                    </p>
                                </div>
                                <div className="pb-6">
                                    <h3 className="text-xl font-bold text-midnight mb-2">How do I report a bug in a package?</h3>
                                    <p className="text-midnight/70">
                                        Contact the package maintainer through your organization's communication channels. 
                                        Include the package name, version, and a detailed description of the issue.
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Docs;

