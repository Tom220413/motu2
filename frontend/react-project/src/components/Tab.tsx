import React from 'react';

type TabProps = {
    label: string;
    activeTab: string;
    onClick: (tab: string) => void;
};

const Tab: React.FC<TabProps> = ({ label, activeTab, onClick }) => {
    const handleClick = () => {
        onClick(label);
    };

    return (
        <li className={activeTab === label ? 'active' : ''} onClick={handleClick}>
            {label}
        </li>
    );
};

export default Tab;
