import React from 'react';
import { data } from '../../data';
import { DesignFrame } from '@lidojs/editor';

const EditorContent = (props: {}) => {
    return <DesignFrame data={data} />;
};

export default EditorContent;
