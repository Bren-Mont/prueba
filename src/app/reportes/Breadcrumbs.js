'use client'
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const NextBreadcrumb = ({ homeElement, separator, containerClasses, listClasses, activeClasses, capitalizeLinks }) => {
    const paths = usePathname();
    const pathNames = paths.split('/').filter(path => path);
    const reversedPathNames = [...pathNames].reverse(); // Revertir el orden de los elementos

    return (
        <div>
            <ul className={containerClasses}ya>
                <li className={listClasses}>{homeElement}</li>
                {pathNames.length > 0 && separator}
                {
                    reversedPathNames.map((link, index) => {
                        let itemText = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link;
                        let itemClasses = paths === `/${reversedPathNames.slice(0, index + 1).join('/')}` ? `${listClasses} ${activeClasses}` : listClasses;

                        return (
                            <React.Fragment key={index}>
                                <li className={`${itemClasses} text-white pl-8 pt-6 font-bold text-base`}	>
                                    {itemText}
                                </li>
                                {pathNames.length !== index + 1 && separator}
                            </React.Fragment>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default NextBreadcrumb;