import React, { useState } from 'react';
import Tab from './Tab';

type TabsProps = {
    children: React.ReactElement[];
};

const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const onClickTab = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <ul className="tabs">
                {children.map((child) => (
                    <Tab
                        key={child.props.label}
                        activeTab={activeTab}
                        label={child.props.label}
                        onClick={onClickTab}
                    />
                ))}
            </ul>
            {children.map((child) => {
                if (child.props.label !== activeTab) return undefined;
                return child.props.children;
            })}
        </>
    );
};

export default Tabs;
