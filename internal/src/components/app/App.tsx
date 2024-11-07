// Import statements
import React, { FC, useRef, useState } from 'react';
import Map from '../minimap/Minimap';
import { justamapMinimapId } from '../../../config';
import Icon from '@mdi/react';
import { mdiCheckCircle, mdiCloseCircle, mdiAlertCircle } from '@mdi/js';

// Interface definitions

// Constants

// Helper functions

// Component
const App: FC = () => {
    // useState hooks
    const [statusData, setStatusData] = useState<any>(null);

    // useRef hooks
    const minimap: any = useRef(null);

    // Functions

    const onMapReady = (mm) => {
        minimap.current = mm;
        const ses = mm.getSession();
        const pr = ses.createPageRequest('read-log-files-run');
        pr.call({ outtputformat: 'json' }, (resp) => {
            if (resp.stderr !== '') {
                console.log(resp.stderr);
            } else {
                const stdout = resp.stdout;
                const jsonStringArrayParsed = JSON.parse(stdout);
                // console.log('jsonStringArrayParsed: ', typeof jsonStringArrayParsed, jsonStringArrayParsed);
                setStatusData(jsonStringArrayParsed);
            }
        });
    };
    // useEffect hooks

    // Data processing
    const statusContent: JSX.Element[] = [];
    if(statusData){
    for (const data of statusData) {
        const statusIcon =
            data.status === 'OK' ? (
                <span className="icon is-medium is-left">
                    <Icon path={mdiCheckCircle} size={2} color="green" />
                </span>
            ) : data.status === 'ERROR' ? (
                <span className="icon is-medium is-left">
                    <Icon path={mdiCloseCircle} size={2} color="red" />
                </span>
            ) : (
                <span className="icon is-medium is-left">
                    <Icon path={mdiAlertCircle} size={2} color="orange" />
                </span>
            );
        statusContent.push(
            <div key={data.filename} className="cell">
                <div className="card" onClick={() => (console.log(data))}>
                    <header className="card-header">
                        <p className="card-header-title">
                            {statusIcon}
                           <span className="pl-2"> {data.filename.replace('.log', '')}</span>
                        </p>
                    </header>
                </div>
            </div>
        );
    }}
    // Conditional values

    // Component return
    return (
        <>
            <section className="section">
                <div className="container">
                    <h1 className="title">GIS - Driftstatus</h1>
                    <p className="subtitle">
                        FME-Jobs i Task Scheduler (LKGIS01)
                    </p>
                    <div className="fixed-grid">
                        <div className="grid">{statusContent}</div>
                    </div>
                </div>
            </section>
            <Map id={justamapMinimapId} name="hiddenmap" size="is-4" onReady={onMapReady} />
        </>
    );
};
// Component export
export default App;

// Import statements
// Interface definitions
// Constants
// Helper functions
// Component
// useState hooks
// useRef hooks
// Functions
// useEffect hooks
// Data processing
// Conditional values
// Component return
// Component export
