import React, { ChangeEvent, forwardRef, ForwardRefRenderFunction, useRef } from 'react';
import PlayCircleIcon from '@duyank/icons/regular/PlayCircle';
import { downloadObjectAsJson } from '../utils/download';
import { useEditor } from '@lidojs/editor';

const designSizes = [
    { name: 'A4 Landscape', dimensions: { width: 3508, height: 2480 } },
    { name: 'A4 Portrait', dimensions: { width: 2480, height: 3508 } },
    { name: 'A5 Portrait', dimensions: { width: 1748, height: 2480 } },
    { name: 'A5 Landscape', dimensions: { width: 2480, height: 1748 } },
    { name: 'Instagram Post', dimensions: { width: 1080, height: 1080 } },
    { name: 'Instagram Story', dimensions: { width: 1080, height: 1920 } },
    { name: 'TikTok Post', dimensions: { width: 1080, height: 1920 } },
    { name: 'Facebook Post', dimensions: { width: 1200, height: 630 } },
    { name: 'Facebook Cover', dimensions: { width: 820, height: 312 } },
    { name: 'Twitter Post', dimensions: { width: 1024, height: 512 } },
    { name: 'Twitter Header', dimensions: { width: 1500, height: 500 } },
    { name: 'YouTube Thumbnail', dimensions: { width: 1280, height: 720 } },
    { name: 'YouTube Channel Cover', dimensions: { width: 2560, height: 1440 } },
    { name: 'LinkedIn Post', dimensions: { width: 1200, height: 1200 } },
    { name: 'LinkedIn Cover', dimensions: { width: 1128, height: 191 } },
    { name: 'Pinterest Pin', dimensions: { width: 1000, height: 1500 } },
    { name: 'Snapchat Story', dimensions: { width: 1080, height: 1920 } },
];

interface HeaderLayoutProps {
    openPreview: () => void;
}

const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
    data
        .replace(/\n\r|\r\n/, '\n')
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split(/\n|\r/)
        .map((v) => v.split(delimiter));

const HeaderLayout: ForwardRefRenderFunction<HTMLDivElement, HeaderLayoutProps> = ({ openPreview }, ref) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const generateRef = useRef<HTMLInputElement>(null);
    const { actions, query } = useEditor();
    const handleExport = () => {
        downloadObjectAsJson('file', query.serialize());
    };
    // console.log(actions);
    const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const fileContent = JSON.parse(reader.result as string);
                actions.setData(fileContent);
            };
            reader.readAsText(file);
            e.target.value = '';
        }
    };
    const updateData = (data: any, find, replacement) => {
        console.log(data);
        if (data) {
            Object.keys(data.layers).forEach((key: any) => {
                const layer = data.layers[key];
                if (layer.props.text && layer.props.text.includes(find)) {
                    layer.props.text = layer.props.text.replace(find, replacement);
                }
            });
        }
        return data;
    };
    const handleDynamicImport = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const fileContent = reader.result;
                const rows = CSVToArray(fileContent);
                let data = JSON.parse(JSON.stringify(query.serialize()));

                rows.forEach((row, index) => {
                    if (index === 0) return;
                    const page = actions.addPage();
                });
                setTimeout(() => {
                    rows.forEach((row, index) => {
                        if (index === 0) return;
                        row.forEach((col, colIndex) => {
                            console.log(data);
                            const pageData = updateData(data[0], rows[0][colIndex], col);
                            actions.setPage(index, pageData);
                        });
                    });
                }, 100);
                // actions.setData(data);
                setTimeout(() => {
                    console.log('state', query.serialize());
                }, 100);
            };
            reader.readAsText(file);
            e.target.value = '';
        }
    };
    return (
        <div
            ref={ref}
            css={{
                background: '#1E1E2D',
                padding: '12px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '@media (max-width: 900px)': {
                    padding: 12,
                },
            }}
        >
            <div
                css={{
                    color: '#3d8eff',
                    fontSize: 36,
                }}
            >
                <div css={{ color: 'white', height: 46 }}>
                    <img src={'./assets/logo h white.png'} css={{ maxHeight: '100%' }} />
                </div>
            </div>
            <div css={{ display: 'flex', alignItems: 'center' }}>
                <div
                    css={{
                        color: 'white',
                    }}
                >
                    <label css={{ marginRight: '10px' }}>document size</label>
                    <select
                        css={{
                            background: '#3a3a4c',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: 'white',
                            marginRight: '10px',
                        }}
                        onChange={(event) => {
                            const index = Number(event.target.value);
                            actions.changePageSize({
                                width: designSizes[index].dimensions.width,
                                height: designSizes[index].dimensions.height,
                            });
                        }}
                    >
                        {designSizes.map((item, index) => (
                            <option key={index} value={index}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div
                    css={{
                        margin: '0 16px',
                        cursor: 'pointer',
                        color: '#fff',
                        fontWeight: 700,
                        ':hover': {
                            textDecoration: 'underline',
                        },
                    }}
                    onClick={() => generateRef.current?.click()}
                >
                    <input
                        ref={generateRef}
                        type="file"
                        accept=".csv"
                        onChange={handleDynamicImport}
                        css={{ display: 'none' }}
                    />
                    Dynamic content
                </div>
                <div
                    css={{
                        margin: '0 16px',
                        cursor: 'pointer',
                        color: '#fff',
                        fontWeight: 700,
                        ':hover': {
                            textDecoration: 'underline',
                        },
                    }}
                    onClick={() => uploadRef.current?.click()}
                >
                    <input
                        ref={uploadRef}
                        type="file"
                        accept="application/json"
                        onChange={handleImport}
                        css={{ display: 'none' }}
                    />
                    Import
                </div>
                <div
                    css={{
                        margin: '0 16px',
                        cursor: 'pointer',
                        color: '#fff',
                        fontWeight: 700,
                        ':hover': {
                            textDecoration: 'underline',
                        },
                    }}
                    onClick={() => handleExport()}
                >
                    Export
                </div>
                <div
                    css={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#fff',
                        lineHeight: 1,
                        background: '#3a3a4c',
                        padding: '8px 14px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        ':hover': {
                            background: 'rgba(58,58,76,0.5)',
                        },
                    }}
                    onClick={openPreview}
                >
                    <div css={{ marginRight: 4, fontSize: 20 }}>
                        <PlayCircleIcon />
                    </div>{' '}
                    Preview
                </div>
            </div>
        </div>
    );
};

export default forwardRef(HeaderLayout);
