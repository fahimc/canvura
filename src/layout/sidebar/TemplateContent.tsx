import React, { FC, useState } from 'react';
import XIcon from '@duyank/icons/regular/X';
import { isMobile } from 'react-device-detect';
import { useEditor } from '@lidojs/editor';
import { SerializedPage } from '@lidojs/core';
import templateContentJson from '../../templates.json';
interface Template {
    img: string;
    data: string;
}
const TemplateContent: FC<{ onClose: () => void }> = ({ onClose }) => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { actions, activePage } = useEditor((state) => ({
        activePage: state.activePage,
    }));
    const addPage = async (data: SerializedPage) => {
        actions.setPage(activePage, data);
        if (isMobile) {
            onClose();
        }
    };
    return (
        <div
            css={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                overflowY: 'auto',
                display: 'flex',
            }}
        >
            <div
                css={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    height: 48,
                    borderBottom: '1px solid rgba(57,76,96,.15)',
                    padding: '0 20px',
                }}
            >
                <p
                    css={{
                        lineHeight: '48px',
                        fontWeight: 600,
                        color: '#181C32',
                        flexGrow: 1,
                    }}
                >
                    Templates
                </p>
                <div
                    css={{
                        fontSize: 20,
                        flexShrink: 0,
                        width: 32,
                        height: 32,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={onClose}
                >
                    <XIcon />
                </div>
            </div>
            <div css={{ flexDirection: 'column', overflowY: 'auto', display: 'flex' }}>
                <div
                    css={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                        gridGap: 8,
                        padding: '16px',
                    }}
                >
                    {isLoading && <div>Loading...</div>}
                    {templateContentJson.map((item, index) => (
                        <div key={index} css={{ cursor: 'pointer' }} onClick={() => addPage(JSON.parse(item.data))}>
                            <img src={item.img} loading="lazy" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateContent;
