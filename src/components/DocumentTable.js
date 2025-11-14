import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';

const DocumentTable = ({ graphsData, homePage3TextSamples }) => {
    const columnDefs = useMemo(() => [
        { headerName: homePage3TextSamples.DOCUMENT_NAME, field: "document_name", flex: 1  },
        { headerName: homePage3TextSamples.DOCUMENT_SIZE, field: "document_size",  flex: 1  },
        { headerName: homePage3TextSamples.INGESTION_TIME, field: "ingestion_time",  flex: 1  },
        { headerName: homePage3TextSamples.NO_OF_PAGES, field: "no_of_pages",  flex: 1  },
        {
            headerName: homePage3TextSamples.NO_OF_IMAGE_DOCS,
            valueGetter: params => params.data["no._of_image_docs"],  flex: 1 
        },
        {
            headerName: homePage3TextSamples.NO_OF_TABLE_DOCS,
            valueGetter: params => params.data["no._of_table_docs"],  flex: 1 
        },
        {
            headerName: homePage3TextSamples.NO_OF_TEXT_DOCS,
            valueGetter: params => params.data["no._of_text_docs"],  flex: 1 
        },
        { headerName: homePage3TextSamples.TOTAL_INGESTION_TOKENS, field: "total_ingestion_tokens",  flex: 1  } ], [homePage3TextSamples]);


    const rowData = useMemo(() => (
        graphsData?.graphData && Array.isArray(graphsData.graphData[0])
            ? graphsData.graphData[0]
            : []
    ), [graphsData]);


    return (
        <div className="ag-theme-alpine" style={{ width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                domLayout="autoHeight"
                onGridReady={(params) => {
                    params.api.sizeColumnsToFit(); 
                    
                }}
                defaultColDef={{
                    sortable: true,
                    filter: true,
                    resizable: true,
                    cellStyle: { textAlign: 'center', fontSize: '0.75rem' },
                }}
                noRowsOverlayComponentParams={{ noRowsMessageFunc: () => "No data available" }}
            />
        </div>
    );
};

export default DocumentTable;
